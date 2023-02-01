export default class RequestError extends Error {
  constructor(message, requestObject) {
    super(message);
    this._requestObject = requestObject;
  }

  get status() {
    return this._requestObject.status;
  }
}
