import { Injectable } from "injection-js";
import redis from "redis";

@Injectable()
export class RedisService {
    client;
    
    constructor() {
        this.client = redis.createClient();
        this.client.on("error", function (err) {
            console.log("Error " + err);
        });
    }
}