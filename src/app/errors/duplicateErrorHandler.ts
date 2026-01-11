/* eslint-disable @typescript-eslint/no-explicit-any */

import { TError, TGenericErrorResponse } from '../interfaces/error.interface';

export const handleDuplicateError = (err: any): TGenericErrorResponse => {
  let duplicateValue = '';

  // Prisma P2002: "Unique constraint failed on the fields: (`fieldName`)"
  if (err.code === 'P2002') {
    if (Array.isArray(err.meta?.target)) {
      duplicateValue = err.meta.target.join(', ');
    } else if (err.meta?.target) {
      duplicateValue = err.meta.target;
    } else {
      // Fallback: extract field name from message like "Unique constraint failed on the fields: (`email`)"
      const match = err.message?.match(
        /Unique constraint failed on the fields?: \(`([^`]+)`\)/
      );
      duplicateValue = match ? match[1] : 'Value';
    }
  } else {
    // Fallback: extract quoted value from message
    const match = err.message?.match(/"([^"]*)"/);
    duplicateValue = match ? match[1] : 'Value';
  }

  const error: TError = [
    {
      path: duplicateValue,
      message: `${duplicateValue} already exists`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Duplicate Error',
    error,
  };
};
