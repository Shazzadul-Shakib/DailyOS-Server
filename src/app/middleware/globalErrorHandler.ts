/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import AppError from '../errors/appError';
import { TError } from '../interfaces/error.interface';
import { envConfig } from '../config';
import { handleZodError } from '../errors/zodErrorHandler';
import { handleDuplicateError } from '../errors/duplicateErrorHandler';

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next
) => {
  let statusCode = 500;
  let message = err.message || 'Something went wrong!';
  let error: TError = [{ path: '', message }];

  if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    error = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.error;
  } else if (err?.code === 'P2002') {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.error;
  }

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error,
    stack: envConfig.node_env === 'development' ? err?.stack : null,
  });
};
