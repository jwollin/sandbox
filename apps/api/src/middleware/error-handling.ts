import { Request, Response, NextFunction } from 'express';
import { AppError } from '@errors/app-error';
import { ERROR_CODES } from '@errors/error-codes';

export function errorHandler(
  error: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
      },
    });
  }

  return res.status(500).json({
    success: false,
    error: {
      code: ERROR_CODES.INTERNAL_SERVER_ERROR,
      message: 'Ruh roh Raggy',
    },
  });
}
