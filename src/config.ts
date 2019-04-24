import dotenv from 'dotenv';
import { Injectable } from "injection-js";

@Injectable()
export class AppConfig {
  MONGO_URI: string;
  REDIS_URI: string;
  APP_PORT: string;
  CRYPT_SECRET_KEY: string;
  JWT_KEY: string;

  constructor() {
    dotenv.config();
    this.MONGO_URI = process.env.MONGO_URI;
    this.APP_PORT = process.env.APP_PORT;
    this.REDIS_URI = process.env.REDIS_URI;
    this.CRYPT_SECRET_KEY = process.env.CRYPT_SECRET_KEY;
    this.JWT_KEY = process.env.JWT_KEY;
  }
}
