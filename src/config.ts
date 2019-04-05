import dotenv from 'dotenv';
import { Injectable } from "injection-js";

@Injectable()
export class AppConfig {
  MONGO_URI: string;
  REDIS_URI: string;
  APP_PORT: string;

  constructor() {
    dotenv.config();
    this.MONGO_URI = process.env.MONGO_URI;
    this.APP_PORT = process.env.APP_PORT;
    this.REDIS_URI = process.env.REDIS_URI;
  }
}
