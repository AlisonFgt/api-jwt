import { Injectable } from 'injection-js';
import { RedisService } from '../../shared/redis.service';
import { AppConfig } from '../../config';
import crypto from 'crypto-js';

@Injectable()
export class AuthMiddleware { 
    constructor (private redis: RedisService, public appConfig: AppConfig) {}
    checkHeaders(req, res, next) {
        const header_client_secret = req.headers['client-secret'];
        const header_authorization = req.headers['authorization'];

        if (!header_client_secret || !header_authorization) {
            return res.status(500).send("Header Authorization or Client-Secret not send!")
        }

        let encodedCredentials = header_authorization.split(header_authorization.substr(0, 6))[1];
        let credentials = new Buffer(encodedCredentials, 'base64').toString().split(':');
        req.userName = credentials[0];
        req.password = crypto.MD5(credentials[1]).toString();

        const bytes = crypto.AES.decrypt(header_client_secret, "@l150n_");
        const decryptedSecretKey = bytes.toString(crypto.enc.Utf8);
        const client_credentials = decryptedSecretKey.split(":");
        req.app = client_credentials[0];
        req.client = client_credentials[1];
        next();
    }

    findUserRedis = (req, res, next) => {
        let key = this.redis.buildKey(req);
        this.redis.client.get(key, function (err, reply) {
            if (reply) {
                req.userId = reply;
                req.isCached = true;
            }
            next();    
        });       
    }
}
