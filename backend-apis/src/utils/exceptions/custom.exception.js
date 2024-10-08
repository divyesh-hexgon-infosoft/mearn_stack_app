class CustomError extends Error {
    constructor(...params) {
      // Pass remaining arguments (including vendor specific ones) to parent constructor
      super(...params);

      // Maintains proper stack trace for where our error was thrown (only available on V8)
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, CustomError);
      }

      // Custom debugging information
      this.error = 'ServerErrorException';
      this.code = 1;
      this.status=500;
      this.date = new Date();
    }
  }
module.exports = {CustomError};