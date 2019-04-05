import { Injectable } from 'injection-js';
import { Router } from 'express';
import { TopicsController } from './modules/topics/topics.controller';
import { AuthController } from './modules/auth/auth.controller';
import { AuthMiddleware } from './modules/auth/auth.middleware';

@Injectable()
export class AppRouter {
  router: Router;
  constructor(topicsController: TopicsController
    ,authController: AuthController
    ,authMiddleware: AuthMiddleware) {
    console.log('Routing...');
    this.router = Router();

    this.router.get('/', (req, res) => {
      res.status(401).send('Api Authentication Service');
    } )

    // topics
    this.router.get('/topics', topicsController.list);
    this.router.get('/topic/:id', topicsController.find);
    this.router.post('/topic', topicsController.create);
    this.router.delete('/topic/:id', topicsController.delete);
    this.router.put('/topic/:id', topicsController.update);

    // auth 
    this.router.get('/auth', authController.isLive);
    this.router.post('/auth', [ authMiddleware.checkHeaders, authMiddleware.findUserRedis ] , authController.login);
  }
}