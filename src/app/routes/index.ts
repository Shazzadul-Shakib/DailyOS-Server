import { Router } from 'express';
import { userRouter } from '../modules/user/user.route';

export const appRoutes: Router = Router();
const moduleRoutes: Array<{ path: string; router: Router }> = [
  {
    path: '/user',
    router: userRouter,
  },
];

moduleRoutes.forEach(route => {
  appRoutes.use(route.path, route.router);
});
