import { AppError, ERROR_CODES } from '.';

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(ERROR_CODES.NOT_FOUND, message, 404);
  }
}
