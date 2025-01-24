import express from 'express';
import cors from 'cors';
import oracledb from 'oracledb';

const app = express();
app.use(cors()); // Enable CORS for all routes 
let message;

app.get('/oracledb', async (req, res) => {
  if (req.query.message) {
    try {
          const connection = await oracledb.getConnection({
              user: "admin",
              password: "Qzlovesskibidi1",
              connectString: "nlbadb23ai_high"
          });
    let result; 
    //message = "tell me about the book inventories";
    message = req.query.message;
    let plsql1 = "BEGIN\n"
        + "DBMS_CLOUD_AI.SET_PROFILE('OPENAI_GPT_ADMIN_TABLE');\n"
        + "END;"

    let plsql2 = `select ai narrate ${message}`;

    await connection.execute(plsql1);
    result = await connection.execute(plsql2);
    res.json({message: result.rows});
    await connection.close();
      } catch (err) {
      console.error(err);
          res.status(500).send(err.message);
      }
  } else {
    res.status(400).json({ error: 'Missing parameter', message: 'Error' });
  }
});

const currentURL = new URL(window.location.href);
const origin = currentURL.origin;
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${origin}:${PORT}/oracledb`);
})

  