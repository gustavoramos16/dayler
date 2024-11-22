import dotenv from 'dotenv'
dotenv.config();

const config = {
    AI_REQUEST_KEY: process.env['AI_REQUEST_KEY']
}

export default config;