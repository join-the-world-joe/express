class Major {
  constructor() {
    this.FrontendGateway = "1"
    this.BackendGateway = "2"
    this.Account = "3"
    this.SMS = "4"
    this.Admin = "5"
    this.Inform = "6"
  }
}

var _instance = new Major()

module.exports = {
  Instance: _instance
}