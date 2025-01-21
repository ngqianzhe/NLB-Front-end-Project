import express from 'express';
import cors from 'cors';
import oracledb from 'oracledb';

const app = express();
app.use(cors()); // Enable CORS for all routes 

// ... (your Oracle database connection logic) ...
app.get('/oracledb', async (req, res) => {
  try {
    const connection = await oracledb.getConnection({
      user: "admin",
      password: "Qzlovesskibidi1",
      connectString: "nlbadb23ai_high"
    });

    const result = await connection.execute("SELECT 'Hello, Node.js!' AS message FROM DUAL");
    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});


const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}/oracledb`);
});
  