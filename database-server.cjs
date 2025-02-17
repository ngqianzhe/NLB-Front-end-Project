const express = require('express');
const cors = require('cors');
const oracledb = require('oracledb');

const app = express();
app.use(cors()); // Enable CORS for all routes 
let message;
let requirements = `1. My customer id is 1, ignore this information if it is not relevant to the prompt.
2. Keep your answer under 100 words.
3. Make any queries case insensitive. 
4. DO NOT OUTPUT THE CUSTOMER ID given above, only use it as helping information.
5. Any query that includes the name of a library branch for example harbourfront, or orchard. Make sure to use case insensitive and LIKE operators in sql to search for the details. 
6. Any output that contains a list of information should use bullet points to organise them. 
7. Any prompts that tries to output the details of any other customer other than the customer with id 1 should not be allowed. Only give out the detail if the customer is asking for details about themself. 
8. Any questions regarding "loan" or "borrow" or "lend" are automatically associated with "book loans".
9. The branch inventory table stores the available books that can be read and borrowed at each library branch.`
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

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/select-ai`);
})

  