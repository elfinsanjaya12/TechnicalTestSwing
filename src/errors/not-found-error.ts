import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(
    public code: string = "RESOURCE_NOT_FOUND",
    message: string = "resource not found"
  ) {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return {
      code: this.code,
      errors: [{ message: this.message }],
    };
  }
}
