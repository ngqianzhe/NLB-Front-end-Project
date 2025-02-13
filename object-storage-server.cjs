const oci = require('oci-sdk');  // Correct import syntax
const fs = require('fs');
const express = require('express');
const fileUpload = require('express-fileupload');
//... other imports
const app = express();
app.use(fileUpload());
const cors = require('cors');
app.use(cors());
const crypto = require('crypto');
// Resolve the config file path using the path module
const configPath = 'C:/Users/qng/.oci/config';
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
    async function uploadImage() {
      try {
        const putObjectRequest = {
          namespaceName: namespace,
          bucketName: bucketName,
          objectName: objectName,
          putObjectbody: imageFile,
          contentLength: imageFile.size,
          contentType: imageFile.mimetype
        };

        const response = await objectStorageClient.putObject(putObjectRequest);
        // Get the opc-content-md5 header from the response
        const opcContentMd5 = response.opcContentMd5;

        // Decode the base64-encoded MD5 hash
        const decodedHash = Buffer.from(opcContentMd5, 'base64').toString('hex');

        // Calculate the MD5 hash of your original data
        const dataMd5 = crypto.createHash('md5').update(imageFile.data).digest('hex');

        // Compare the hashes
        if (decodedHash === dataMd5) {
          console.log('Data integrity verified.');
        } else {
          console.error('Data corruption detected!');
        }
        res.status(200).json({ message: "Image uploaded successfully", objectName: objectName, file: imageFile, eTag: response.eTag }); // Send success response
      } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Error uploading image' }); // Send error response
      } 
    }

    uploadImage();
});


const PORT = 3600;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/upload`);
})