class SMS {
  constructor() {
    this._verificationCodeRequest = "1"
    this._verificationCodeResponse = "2"
  }
  GetVerificationCodeRequest() {
    return this._verificationCodeRequest
  }
  GetVerificationCodeResponse() {
    return this._verificationCodeResponse
  }

  getName(input) {
    switch (input) {
      case this._verificationCodeRequest:
        return 'verificationCodeRequest';
      case this._verificationCodeResponse:
        return 'verificationCodeResponse';
      default:
        return 'unknown';
    }
  }
}

var _instance = new SMS()

module.exports = {
  Instance: _instance
}