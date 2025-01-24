import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());
const myHeaders = new Headers();
myHeaders.append("x-api-key", "<P}o$s$v.|X4~w#*4/+8GxrIJd_I5Wtt");
myHeaders.append("x-app-code", "DEV-NgQianZhe");
myHeaders.append("Cookie", "AWSALB=ocEaQ9sXcmDiQFk2OFXbzDQDGfDQ6evQAvAjS2/l+mJd0Z/fdfEq4/JjVRGAoJnCGpRyrRoXNR/lM8MV/pFXxSsQBSgmCuU6MfzZP97ZQ/FrLqQBlU65H4my3l75; AWSALBCORS=ocEaQ9sXcmDiQFk2OFXbzDQDGfDQ6evQAvAjS2/l+mJd0Z/fdfEq4/JjVRGAoJnCGpRyrRoXNR/lM8MV/pFXxSsQBSgmCuU6MfzZP97ZQ/FrLqQBlU65H4my3l75");

app.get('/NLB', async (req, res) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://openweb.nlb.gov.sg/api/v1/Library/GetBranches',
      headers: {
        'x-api-key': '<P}o$s$v.|X4~w#*4/+8GxrIJd_I5Wtt',
        'x-app-code': 'DEV-NgQianZhe'
      }
    };
  
    try {
      const response = await axios.request(config);
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });
  
const currentURL = new URL(window.location.href);
const origin = currentURL.origin;
const PORT = 3400; // Choose a different port than your other servers
app.listen(PORT, () => {
  console.log(`Proxy server is running on ${origin}:${PORT}/NLB`);
});