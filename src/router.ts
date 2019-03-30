import { Injectable } from 'injection-js';
import { Router } from 'express';
import { TopicsController } from './modules/topics/topics.controller';

@Injectable()
export class AppRouter {
  router: Router;
  constructor(topicsController: TopicsController) {
    console.log('Routing...');

    this.router = Router();
    this.router.get('/topics', topicsController.list);
    this.router.get('/topic/:id', topicsController.find);
    this.router.put('/topic', topicsController.create);
    this.router.delete('/topic/:id', topicsController.delete);
    this.router.post('/topic/:id', topicsController.update);
  }
}