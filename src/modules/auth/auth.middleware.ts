import { Injectable } from 'injection-js';

@Injectable()
export class AuthMiddleware {
    checkHeaders(req, res, next) {
        var header_client_secret = req.headers['client-secret'];
        var header_authorization = req.headers['authorization'];
        if (!header_client_secret || !header_authorization) {
            return res.status(500).send("Header Authorization or Client-Secret not send!")
        } 
        req.client_secret = header_client_secret;
        req.authorization = header_authorization;
        next();
    }
}