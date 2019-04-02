import 'reflect-metadata';

import { AuthController } from './auth.controller';
import { testHandler } from '../../shared/utils/testUtils';

describe('AuthController', () => {
  test('status: It should return API OK', async () => {
    const response = await testHandler('get', new AuthController().isLive);
    expect(response.status).toBe(200);
  });
});
