import mongoose from 'mongoose';
import express, {Application} from 'express';
import bodyParser from 'body-parser';
import { AppRouter } from './router';
import { Injectable } from "injection-js";
import { AppConfig } from './config';

@Injectable()
export class App {
  server: Application;
  constructor(appRouter: AppRouter, appConfig: AppConfig) {

    //mongo config
    const uri: string = appConfig.MONGO_URI;
    const uri_ = 'mongodb://localhost:27017/auth';
    mongoose.connect(uri_, (err: any) => {
        if (err) {
            console.log(err.message)
        } else {
            console.log('uri = ' + uri);
            console.log('uri_ = ' + uri_);
            console.log("Sucessfully Connected to MongoDB");
        }
    });

    this.server = express();
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({extended: true}));

    this.server.use(appRouter.router);

    this.server.listen(8080);
    console.log('App listening on 8080');
  }
}
