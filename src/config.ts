import dotenv from 'dotenv';
import { Injectable } from "injection-js";

@Injectable()
export class AppConfig {
  MONGO_URI: string;

  constructor() {
    dotenv.config();
    this.MONGO_URI = process.env.MONGO_URI;
  }
}
