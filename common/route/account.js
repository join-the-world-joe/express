class Account {
  constructor() {
    this._loginRequest = "1"
    this._loginResponse = "2"
    this._logoutRequest = "3"
    this._logoutResponse = "4"
    this._registerRequest = "5"
    this._registerResponse = "6"
  }
  GetLoginRequest() {
    return this._loginRequest
  }
  GetLoginResponse() {
    return this._loginResponse
  }
  GetLogoutRequest() {
    return this._logoutRequest
  }
  GetLogoutResponse() {
    return this._logoutResponse
  }
  GetRegisterRequest() {
    return this._registerRequest
  }
  GetRegisterResponse() {
    return this._registerResponse
  }
}

var _instance = new Account()

module.exports = {
  Instance: _instance
}