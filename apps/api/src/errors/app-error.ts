export class AppError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);

    this.code = code;
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}
