import { AppError, ERROR_CODES } from '.';

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(ERROR_CODES.UNAUTHORIZED, message, 401);
  }
}
