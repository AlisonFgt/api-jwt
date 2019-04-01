import dotenv from 'dotenv';
import { Injectable } from "injection-js";

@Injectable()
export class AppConfig {
  readonly MONGO_URI = process.env.MONGO_URI;

  constructor() {
    dotenv.config();
  }
}
