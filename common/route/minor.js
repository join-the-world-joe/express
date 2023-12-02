var sms = require("./sms")
var account = require('./account')
class Minor {
  constructor() {
    this.SMS = sms.Instance
    this.Account = account.Instance
  }
}

var _instance =  new Minor()

module.exports = {
  Instance: _instance
}
