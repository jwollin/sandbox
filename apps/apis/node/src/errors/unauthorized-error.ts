import { AppError, ERROR_CODES } from './index';

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(ERROR_CODES.UNAUTHORIZED, message, 401);
  }
}
