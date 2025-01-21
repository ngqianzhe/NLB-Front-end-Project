import express from 'express';
import cors from 'cors';
import oracledb from 'oracledb';

const app = express();
app.use(cors()); // Enable CORS for all routes 

let message;

app.get('/oracledb', async (req, res) => {
  try {
        const connection = await oracledb.getConnection({
            user: "admin",
            password: "Qzlovesskibidi1",
            connectString: "nlbadb23ai_high"
        });
	let result; 
  //message = "list the book inventories";
  message = req.query.messageText;

	let plsql1 = "BEGIN\n"
	    + "DBMS_CLOUD_AI.SET_PROFILE('OPENAI_GPT_ADMIN_TABLE');\n"
	    + "END;"

	let plsql2 = `select ai narrate ${message}`;

	await connection.execute(plsql1);
	result = await connection.execute(plsql2);
	console.log(result.rows);
	res.json(result.rows);
	await connection.close();
    } catch (err) {
		console.error(err);
        res.status(500).send(err.message);
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/oracledb?message=${message}`);
})

  