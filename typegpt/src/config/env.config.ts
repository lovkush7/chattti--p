import "dotenv/config"

export class envconfig {
    static DB_NAME= process.env.DB_NAME;
    static DB_USERNAME= process.env.DB_USERNAME;
    static DB_PASSWORD = process.env.DB_PASSWORD;
    static DB_PORT = process.env.DB_PORT;
    static DB_HOST = process.env.DB_HOST;

    static JWT_SECRET = process.env.JWT_SECRET;


    static CLOUD_NAME = process.env.CLOUD_NAME;
    static API_KEY = process.env.API_KEY;
    static API_SECRET = process.env.API_SECRET;
}


