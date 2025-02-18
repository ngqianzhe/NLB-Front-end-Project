const express = require('express');
const cors = require('cors');
const oracledb = require('oracledb');

const app = express();
app.use(cors()); // Enable CORS for all routes 
let message;
let requirements = `The customer id is 1, ignore this information if it is not relevant to the prompt. 
    DO NOT OUTPUT THE CUSTOMER ID given above, only use it as helping information
    Keep your answer under 100 words. 
    Make any queries case insensitive, such as searches to CUSTOMER, BOOKDETAILS, BRANCH tables.
    Any query that includes the name of a library branch, Make sure to use case insensitive and LIKE operators in sql to search for the branch.
    Any output that contains a list of information should use bullet points to organise them.
    Any questions regarding "loan" or "borrow" or "lend" are automatically associated with "book loans".
    You are a cheerful library book agent for NLB that answers customer queries on details about your libraries, books, borrowing and more. 
    Answer questions in a professional tone.
    To find where a book is available at, you have to use BRANCHINVENTORY table`;
app.get('/select-ai', async (req, res) => {
  if (req.query.message) {
    try {
          const connection = await oracledb.getConnection({
              user: "admin",
              password: "Qzlovesskibidi1",
              connectString: "nlbadb23ai_high"
          });
    let result; 
    //message = "tell me about the book inventories" + "/n" + requirements;
    message = req.query.message + "/n" + requirements;
    let plsql1 = "BEGIN\n"
        + "DBMS_CLOUD_AI.SET_PROFILE('OPENAI_GPT_ADMIN_NEW');\n"
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

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/select-ai`);
})

  