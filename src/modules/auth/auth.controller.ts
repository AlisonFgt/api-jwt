import { Injectable } from 'injection-js';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthController {
  isLive(req, res) {
    res.status(200).send("It's Ok");
  }

  login(req, res) {
    var header_client_secret = req.headers['client-secret'];
    var header_authorization = req.headers['authorization'];

    if(header_authorization != null){
        //auth ok
        const id = 1; //esse id viria do banco de dados
        var token = jwt.sign({ id }, 'my_secret', {
          expiresIn: 300 // expires in 5min
        });
        res.status(200).send({ auth: true, token: token });
      }
      
      res.status(500).send('Login inválido!');
  }
}
