const fs = require('fs');
const dotenv = require('dotenv');
const crypto = require('crypto');

const path = require('path');


const setJwtTokenInEnv = () =>{

    const envFilePath = path.join(__dirname, './../../.env');

    // Load the existing .env file
    const envConfig = dotenv.parse(fs.readFileSync(envFilePath));

    //Generate JWT secret key
    const secretKey = crypto.randomBytes(32).toString('hex');

    // Add or update the JWT_SECRET environment variable
    envConfig.JWT_SECRET = secretKey;

    // Save the secret back to the .env file
    const envContent = Object.keys(envConfig)
    .map((key) => `${key}=${envConfig[key]}`)
    .join('\n');

    fs.writeFileSync(envFilePath, envContent);

    jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' });

    console.log('successfully set token!!');
}

module.exports = setJwtTokenInEnv;