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
}

var _instance = new SMS()

module.exports = {
  Instance: _instance
}