export class ApiServiceError extends Error {
  public status: number;
  public resErrors: object | string;

  constructor(status: number, errors: object | string) {
    super();
    this.status = status;
    this.resErrors = errors;
  }
}
