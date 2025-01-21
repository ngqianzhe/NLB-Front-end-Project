# Creating a React Application with Node.js
This guide will walk you through the steps of creating a React application using Node.js. We will cover everything from setting up your development environment to deploying your application.

## Requirements
- Node.js
- npm (Node Package Manager)
- Visual Studio Code (Optional, but recommended)

## Installing Node.js and npm
1. Go to the Node.js website and download the installer for your operating system.
2. Run the installer and follow the prompts.
3. Once Node.js is installed, open a terminal and type node -v to verify that it is installed correctly.
4. npm is included with Node.js, so you don't need to install it separately. However, you can verify that npm is installed by typing npm -v in the terminal.

## Retrieving the React Application
1. Clone the files in this repository using Visual Studio Code.
2. Open a terminal and navigate to the folder you cloned in step 1.
3. When cloning the file, rename the folder as NLB.
4. Once the cloning process is complete, navigate to the NLB folder in your file explorer.

## Installing React Dependencies
1. Open a terminal and navigate to the NLB folder.
2. Type npm install and press enter. This will install all of the dependencies that are listed in the package.json file.

## Installing SQL*Plus and Oracle Instant Client, as well as installing your wallet for setting environment variables
1. Go to the official website to download Oracle Instant Client and SQL*Plus.
2. Extract the ZIP file to a directory of your choice.
3. Set the environment variables ORACLE_HOME and PATH to point to the directory where you extracted the Oracle Instant Client files. For example, if you extracted the files to /opt/oracle/instantclient_19_8, you would set the environment variables as follows:
- export ORACLE_HOME=/opt/oracle/instantclient_19_8
- export PATH=$ORACLE_HOME/bin:$PATH
4. Install the wallet through your Oracle Cloud Infrastructure's Autonomous Database.
5. Create a directory for your wallet. For example, you could create a directory called wallet in your home directory.
6. Set the environment variables TNS_ADMIN and ORACLE_WALLET_DIR to point to the directory where you created your wallet. For example, if you created your wallet in /home/user/wallet, you would set the environment variables as follows:
- export TNS_ADMIN=/home/user/wallet
- export ORACLE_WALLET_DIR=/home/user/wallet

## Running the database server to use Select AI
1. Open a terminal and navigate to the NLB folder.
2. Type npm install -g pm2 and press enter. This will install all of the dependencies that are listed in the package.json file.
3. Run pm2 database-server.js to continuously run this database server for your React application to work.
Note: Set-up your own Select AI Profile for your autonomous database and replace the connection with your own credentials for it to work.

## Running the proxy server for the API
1. Open a terminal and navigate to the NLB folder.
2. Type npm install -g pm2 and press enter. This will install all of the dependencies that are listed in the package.json file.
3. Run pm2 proxy-server.js to continuously run this proxy server for your React application to enable the API to work.

## Running the Development Server of the React Application
1. Open a terminal and navigate to the NLB folder.
2. Type npm run dev and press enter. This will launch the development server and open your browser to a new tab with your React application running.

## Deploying the React Application
1. Build your React application by typing npm run build in the terminal. This will create a minified version of your application in the build folder.
2. You can deploy your React application to any web hosting service that supports static websites.

## Running the Production Server of the React Application 
1. Open a terminal and navigate to the NLB folder.
2. Type npm run preview and press enter. This will launch the production server and open your browser to a new tab with your React application running.

## Additional Resources
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/en)
- [npm Documentation](https://www.npmjs.com/)
- [Oracle Instant Client and SQL*Plus Downloads](https://www.oracle.com/sg/database/technologies/instant-client/downloads.html)
