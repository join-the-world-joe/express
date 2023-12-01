class Major {
  constructor() {
    this._FrontendGateway = "1"
    this._BackendGateway = "2"
    this._Account = "3"
    this._SMS = "4"
    this._Admin = "5"
    this._Inform = "6"
  }
  GetFrontendGateway() {
    return this._FrontendGateway
  }
  GetBackendGateway() {
    return this._BackendGateway
  }
  GetAccount() {
    return this._Account
  }
  GetSMS() {
    return this._SMS
  }
  GetAdmin() {
    return this._Admin
  }
  GetInform() {
    return this._Inform
  }
}

var _instance = new Major()

module.exports = {
  Instance: _instance
}