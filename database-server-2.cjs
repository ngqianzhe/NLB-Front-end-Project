const express = require('express');
const cors = require('cors');
const oracledb = require('oracledb');
oracledb.fetchAsString = [ oracledb.CLOB ];

const app = express();
app.use(cors()); // Enable CORS for all routes 
let message;
app.get('/faq-chatbot', async (req, res) => {
  if (req.query.message) {
    try {
          const connection = await oracledb.getConnection({
              user: "admin",
              password: "Qzlovesskibidi1",
              connectString: "nlbadb23ai_high"
          });
    let result; 
    //message = "How do I register for NLB Partner Membership";
    message = req.query.message;
    let plsql1 = "BEGIN\n"
        + "DBMS_CLOUD_AI.SET_PROFILE('M_OPENAI_VECTOR_GPT');\n"
        + "END;"

    let plsql2 = `select ai narrate ${message}`;

    await connection.execute(plsql1);
    result = await connection.execute(plsql2);
    delete result.metaData;
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

const PORT = 3100;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/faq-chatbot?message=${message}`);
})

  