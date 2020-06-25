// used on our app flux/ routes, receive and respond

class AppError {
  public readonly message: string; // public = accessible outside this class

  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
