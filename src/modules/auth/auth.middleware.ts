import { Injectable } from 'injection-js';

@Injectable()
export class AuthMiddleware {
    checkHeaders(req, res, next) {
        var header_client_secret = req.headers['client-secret'];
        var header_authorization = req.headers['authorization'];
        if (header_client_secret === undefined || header_authorization === undefined) {
            return res.status(500).send("Header Authorization or Client-Secret not send!")
        } 
        next();
    }
}