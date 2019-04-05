import { Injectable } from 'injection-js';
import { RedisService } from '../../shared/redis.service';
import crypto from 'crypto-js';

@Injectable()
export class AuthMiddleware { 
    constructor (private redis: RedisService) {}

    checkHeaders(req, res, next) {
        const header_client_secret = req.headers['client-secret'];
        const header_authorization = req.headers['authorization'];
        if (!header_client_secret || !header_authorization) {
            return res.status(500).send("Header Authorization or Client-Secret not send!")
        }
        
        let encodedCredentials = header_authorization.split(header_authorization.substr(0, 6))[1];
        let credentials = new Buffer(encodedCredentials, 'base64').toString().split(':');
        let username = credentials[0];
        let password = crypto.MD5(credentials[1]).toString();
        req.username = username;
        req.password = password;
        next();
    }

    findUserRedis = (req, res, next) => {
        this.redis.client.set(req.username, req.password)
        next();
    }
}
