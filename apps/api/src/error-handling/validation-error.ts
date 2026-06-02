import { AppError } from './app-error';

export class ValidationError extends AppError {
  constructor(message = 'Validation failed') {
    super('VALIDATION_ERROR', message, 400);
  }
}
