import { NextFunction, Request, Response } from 'express';
import { ZodObject } from 'zod';

export const validateRequest = (schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });

      if (parsed.body) {
        req.body = parsed.body;
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};
