import { Router } from 'express';
import { userRouter } from '../modules/user/user.route';
import { authRouter } from '../modules/auth/auth.route';

export const appRoutes: Router = Router();
const moduleRoutes: Array<{ path: string; router: Router }> = [
  {
    path: '/user',
    router: userRouter,
  },
  {
    path: '/auth',
    router: authRouter,
  },
];

moduleRoutes.forEach(route => {
  appRoutes.use(route.path, route.router);
});
