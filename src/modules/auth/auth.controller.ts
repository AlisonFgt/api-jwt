import { Injectable } from 'injection-js';
import { RedisService } from '../../shared/redis.service';
import { AppConfig } from '../../config';
import { User } from './auth.models';
import { Bind } from '../../shared/utils/bind';
import jwt from 'jsonwebtoken';


@Injectable()
export class AuthController {
  constructor(private redis: RedisService, private appConfig: AppConfig) {}
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
  async token(req, res) {
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

    var token = jwt.sign({ value: userId }, this.appConfig.JWT_KEY, { expiresIn: 600 }); // expires in 10min
    return res.status(200).send({ auth: true, id: userId, login: req.userName, token: token });
  }

  @Bind
  verifyToken(req, res) {
    jwt.verify(req.query.token, this.appConfig.JWT_KEY , result => {
      if (result instanceof Error) {
          res.json({ isValid: false, reason: result.message });
      } else {
          res.json({ isValid: true, decoded: jwt.decode(req.query.token, { complete: true }) });
      }
    });
  }
}