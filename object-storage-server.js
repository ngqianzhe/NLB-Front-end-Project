import cors from 'cors';
import express from 'express';
import oracledb from 'oracledb';
//... other imports
const app = express();
app.use(cors()); // Enable CORS for all routes 
//... (OCI and ADB connection configuration)

app.get('/upload', async (req, res) => {
    try {
        const file = req.files.image; // Assuming you're sending the file with the key 'image'
        // 2. Execute PL/SQL to register the file in ADB (if needed)
        const connection = await oracledb.getConnection(dbConfig);
        let plsql1 = "BEGIN\n"
        + "DBMS_CLOUD_AI.SET_PROFILE('ObjectStorage');\n"
        + "END;"
        const result = await connection.execute(`
            BEGIN
                DBMS_CLOUD.PUT_OBJECT(
                    credential_name => 'ObjectStorage',
                    object_uri =>:objectUri, 
                    file_name =>:fileName
                );
            END;
        `, {
            objectUri: 'https://objectstorage.us-chicago-1.oraclecloud.com/n/ax8aqd8mb0d4/b/image_bucket',
            fileName: file.name // Or the path where you saved it in Object Storage
        });

        await connection.close();
        res.json({ message: 'File uploaded and registered in ADB.' });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error uploading file.' });
    }
});

//...
PORT = 3600
app.listen(port, () => {
  console.log(`Proxy server listening on http://localhost:${PORT}/upload`);
});