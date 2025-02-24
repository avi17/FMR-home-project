export class WebResponse<Type> {
  body: Type;
  errorMessage? : string
  statusCode? : string

  constructor(value: Type) {
    this.body = value;
  }
}