export class ValidationError extends Error {
  constructor(message: any) {
    super(message);
    this.name = "ValidationError";
    this.message = message;
  }
}

export class ConnectionError extends Error {
  constructor(message: any) {
    super(message);
    this.name = "ConnectionError";
    this.message = message;
  }
}
