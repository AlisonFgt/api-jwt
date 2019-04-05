import { Injectable } from 'injection-js';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthController {
  isLive(req, res) {
    res.status(200).send("It's Ok");
  }

  login(req, res) {
    console.log(req.username);
    console.log(req.password);
    if(req.authorization != null){
        //auth ok
        const id = 1; //esse id viria do banco de dados
        var token = jwt.sign({ id }, 'my_secret', {
          expiresIn: 300 // expires in 5min
        });
        return res.status(200).send({ auth: true, token: token });
      } 
      
      return res.status(500).send('Login inválido!');
  }
}