import { Injectable } from 'injection-js';
import { RedisService } from '../../shared/redis.service';
import { User } from './auth.models';
import jwt from 'jsonwebtoken';
import { resolve } from 'path';

@Injectable()
export class AuthController {
  constructor(private redis: RedisService) {}
  isLive(req, res) {
    res.status(200).send("It's Ok");
  }

  createUser(req,res) {
    let user = new User(req.body);

    user.save((err: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send(user);
      }
    });
  }

  login(req, res) {
    let userId = 0;

    if(req.userId) {
      userId = req.userId
      var token = jwt.sign({ value: userId }, 'my_secret', { expiresIn: 600 }); // expires in 10min
      return res.status(200).send({ auth: true, id: userId, login: req.username, token: token });
    } else {
      //userId = await this.findUserMongo();
      User.findOne({ login: req.username, password: req.password}, function(err, user: any) {
        if (user) {
          var token = jwt.sign({ value: userId }, 'my_secret', { expiresIn: 600 }); // expires in 10min
          let key = req.app + ':' + req.client + ':' + req.username;
          //this.saveRedisKey(key, user.id);
          return res.status(200).send({ auth: true, id: user.id, login: req.username, token: token });
        }
      });
    }
  }

  sendToken(req, res, userId) {
    if (userId != 0) {
      var token = jwt.sign({ value: userId }, 'my_secret', { expiresIn: 600 }); // expires in 10min
      return res.status(200).send({ auth: true, login: req.username, token: token });
    } else {
      return res.status(500).send('Invalid login!');
    }
  }

  findUserMongo = async function (req) {
    return new Promise((resolve, reject)=>{
      User.findOne({ login: req.username, password: req.password}, function(err, user: any) {
          if (user) {
            resolve(user.id);
          } else {
            reject(err);
          }
        }
      );
    })
  };

  saveRedisKey = async function (key, value) {
    this.redis.client.set(key, value);
  }
}