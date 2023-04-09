import { CustomError } from "./custom-error";

export class UnauthorizedError extends CustomError {
  statusCode = 401;

  constructor(
    public code: string = "UNAUTHORIZED",
    message: string = "unauthorized"
  ) {
    super(message);

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors() {
    return { code: this.code, errors: [{ message: this.message }] };
  }
}
