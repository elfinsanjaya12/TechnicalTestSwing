import { CustomError } from "./custom-error";

export class ForbiddenError extends CustomError {
  statusCode = 403;

  constructor(
    public code: string = "FORBIDDEN_ERROR",
    message: string = "forbidden error"
  ) {
    super(message);

    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  serializeErrors() {
    return { code: this.code, errors: [{ message: this.message }] };
  }
}
