import { Injectable } from 'injection-js';
import { RedisService } from '../../shared/redis.service';
import { User } from './auth.models';
import { Bind } from '../../shared/utils/bind';
import jwt from 'jsonwebtoken';


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

  @Bind
  async login(req, res) {
    let userId = 0;

    if (req.isCached) {
      userId = req.userId;
    } else {
      const user = await User.findOne({ login: req.userName, password: req.password});
      if (user) {
        let key = this.redis.buildKey(req);
        this.redis.client.set(key, user.id);
        userId = user.id;
      } else {
        return res.status(401).send('User ' + req.userName + ' not found');
      }
    }

    var token = jwt.sign({ value: userId }, 'my_secret', { expiresIn: 600 }); // expires in 10min
    return res.status(200).send({ auth: true, id: userId, login: req.userName, token: token });
  }
}