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
