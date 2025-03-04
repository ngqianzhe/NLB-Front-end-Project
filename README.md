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

## Using EmailJS Template to Send Emails for Forgetting Password
1. Create a new EmailJS Account first.
2. Add a new email service and link your email account to EmailJS Email Service.
3. Create a template for you to send your emails. 
4. If you have any variables, please write them in the template, for example: {{your_username}}.
5. Link your EmailJS Public Key, Service ID and Request ID in the API options.

## Hosting the React Application on a Compute Instance using Apache Server
1. Create your Oracle Cloud Tenancy.
2. Host the compute instance with your SSH Keys saved into your local machine.
3. Type ssh -i "your key path" "username"@"ip address of compute instance" to connect your instance through CLI.
4. Run the following commands:
- sudo yum install httpd -y
- sudo apachectl start
- sudo systemctl enable httpd
- sudo apachectl configtest
- sudo firewall-cmd --permanent --zone=public --add-service=http
- sudo firewall-cmd --reload
5. This will set up the Apache server. In order to run the react application, it is necessary to copy over the production files into the directory /var/www/html. To do that, run the following commands:
- scp -i "your key path" -r "dist folder path" "username"@"ip address of compute instance":/var/www/html
- sudo chmod 755 /var/www/html
- sudo chmod 755 /var/www/html/assets
6. Allow ingress rules ports 80 and 443 in your default security lists for that particular virtual cloud network connected to your instance with TCP protocol to run the website.

## Running the Development Server of the React Application
1. Open a terminal and navigate to the NLB folder.
2. Type npm run dev and press enter. This will launch the development server and open your browser to a new tab with your React application running.

## Deploying the React Application
1. Build your React application by typing npm run build in the terminal. This will create a minified version of your application in the build folder.
2. You can deploy your React application to any web hosting service that supports static websites.

## Running the Production Server of the React Application 
1. Open a terminal and navigate to the NLB folder.
2. Type npm run preview and press enter. This will launch the production server and open your browser to a new tab with your React application running.

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
2. Type npm install -g pm2 and press enter. This will install all the dependencies that are listed in the package.json file.
3. Run pm2 database-server.js to continuously run this database server for your React application to work.
Note: Set-up your own Select AI Profile for your autonomous database and replace the connection with your own credentials for it to work.

## Running the proxy server for the API
1. Open a terminal and navigate to the NLB folder.
2. Type npm install -g pm2 and press enter. This will install all of the dependencies that are listed in the package.json file.
3. Run pm2 proxy-server.js to continuously run this proxy server for your React application to enable the API to work.

## Uploading files to the Object Storage from the server
1. Open a terminal and navigate to the NLB folder.
2. Type npm install -g pm2 and press enter. This will install all of the dependencies that are listed in the package.json file.
3. Run pm2 object-storage-server.js to continuously run this proxy server for your React application to enable the uploading of the object storage.
Note: Set-up your Oracle Cloud Tenancy and use the Oracle SDK with your config file of your API Key to connect your application code to the Oracle Cloud - Requires a bucket with a namespace as well as the compartment you are linking this bucket to.

## Hosting the Proxy and Database Server on a Compute Instance using Node.js
1. Create your Oracle Cloud Tenancy.
2. Host the compute instance with your SSH keys saved into your local machine.
3. Type ssh -i "your key path" "username"@"ip address of compute instance" to connect your instance through CLI.
4. Copy 3 new files adapted from the files beforehand, database-server.cjs, database-server-2.cjs and proxy-server.cjs as a new file using the command – nano “filename”.
5. Allow ports for that server being hosted in the instance using security lists. Enable ingress rules of all CIDR Blocks for specific ports hosted. Note: Look at the PORT assigned in the code.
6. Run the command to allow firewall for the specific ports hosted:
- sudo firewall-cmd --permanent --zone=public --add-service=http
- sudo firewall-cmd –reload

## Additional Resources
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/en)
- [npm Documentation](https://www.npmjs.com/)
- [Oracle Instant Client and SQL*Plus Downloads](https://www.oracle.com/sg/database/technologies/instant-client/downloads.html)
- [Oracle JavaScript and TypeScript SDK](https://docs.oracle.com/en-us/iaas/Content/API/SDKDocs/typescriptsdk.htm)
- [PutObject API Reference](https://docs.oracle.com/en-us/iaas/api/#/en/objectstorage/20160918/Object/PutObject)
- [EmailJS Documentation](https://www.npmjs.com/package/emailjs)
- [Hosting a Compute Instance Example Documentation](https://docs.oracle.com/en/learn/lab_compute_instance/#connect-to-the-instance-and-install-apache-http-server)
