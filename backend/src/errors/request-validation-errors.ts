import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {

  statusCode = 400

  constructor(public errors: ValidationError[]) {
    super('request invalid params');
    // ONLY BECAUSE WE ARE EXTENDING A BUILT-IN CLASS
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => {
      if (error.type === 'field') {
        return { message: error.msg, field: error.path };
      }
      return { message: error.msg };
    });
  }

}