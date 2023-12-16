class Major {
  constructor() {
    this.FrontendGateway = "1"
    this.BackendGateway = "2"
    this.Account = "3"
    this.SMS = "4"
    this.Admin = "5"
    this.Inform = "6"
  }

  getName(input) {
    switch (input) {
      case this.SMS:
        return 'SMS';
      case this.Admin:
        return 'Admin';
      case this.FrontendGateway:
        return 'FrontendGateway';
      case this.BackendGateway:
        return 'BackendGateway';
      case this.Account:
        return 'Account';
      case this.Inform:
        return 'Inform';
      default:
        return 'unknown';
    }
  }
}

var _instance = new Major()

module.exports = {
  Instance: _instance
}