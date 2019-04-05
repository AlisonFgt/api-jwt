import 'reflect-metadata';
import { ReflectiveInjector } from 'injection-js';

import { App } from './app';
import { AppRouter } from './router';
import { TopicsController } from './modules/topics/topics.controller';
import { AuthController } from './modules/auth/auth.controller';
import { AuthMiddleware } from './modules/auth/auth.middleware';
import { RedisService } from './shared/redis.service';
import { AppConfig } from './config';

const injector = ReflectiveInjector.resolveAndCreate([
  App,
  AppConfig,
  AppRouter,
  TopicsController,
  AuthController,
  AuthMiddleware,
  RedisService
]);

injector.get(App);