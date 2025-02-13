const oci = require('oci-sdk');  // Correct import syntax
const fs = require('fs');
const express = require('express');
const fileUpload = require('express-fileupload');
const os = require('os');
const path = require('path');

//... other imports
const app = express();
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp' })); // Explicitly use temp files
const cors = require('cors');
app.use(cors());
// Resolve the config file path using the path module
const configPath = path.join(os.homedir(), '.oci', 'config');
if (!fs.existsSync(configPath)) {
    console.error(`Config file not found at: ${configPath}`);
}


// Configuration (replace with your values)
const configuration = {
    authenticationDetailsProvider: new oci.common.ConfigFileAuthenticationDetailsProvider(
    configPath, // Path to your OCI config file
    'DEFAULT'// Profile name in the config file (optional)
    ),
    region: 'us-chicago-1' // Example: 'us-ashburn-1'
}

const objectStorageClient = new oci.objectstorage.ObjectStorageClient(configuration);

// API Endpoint for Image Upload (same logic as before)

app.put('/upload', async (req, res) => {
    // 2. Get data from the request (e.g., image file)
    const imageFile = req.files.image; // Assuming you are using middleware like express-fileupload
    if (!imageFile) {
        return res.status(400).send("No file uploaded");
    }

    const namespace = 'ax8aqd8mb0d4';
    const bucketName = 'image_bucket';
    const objectName = imageFile.name; // Use the original filename or generate a unique one
    const imageSize = imageFile.size;
    // 3. Upload to OCI (same as before)
    try {
      const fileBuffer = fs.readFileSync(imageFile.tempFilePath); // Read from temporary file
      const putObjectRequest = {
        namespaceName: namespace,
        bucketName: bucketName,
        objectName: objectName,
        putObjectBody: fileBuffer, 
        contentLength: imageSize,
        contentType: imageFile.mimetype,
      };

      const response = await objectStorageClient.putObject(putObjectRequest);
      res.status(200).json({ message: "Image uploaded successfully", objectName: objectName, response: response }); // Send success response
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Error uploading image' }); // Send error response
    } finally {
      // Clean up the temporary file (important!)
      fs.unlinkSync(imageFile.tempFilePath);
    }
});

const PORT = 3600;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/upload`);
})