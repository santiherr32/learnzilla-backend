export class HttpError extends Error {
  constructor(status, body) {
    const message = typeof body === "string" ? body : body.message || "HttpError";
    super(message);
    this.status = status;
    this.body = body;
  }
}
