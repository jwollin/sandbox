import { AppError, ERROR_CODES } from '.';

export class ValidationError extends AppError {
  constructor(message = 'Validation failed') {
    super(ERROR_CODES.VALIDATION_ERROR, message, 400);
  }
}
