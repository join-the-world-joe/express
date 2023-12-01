var sms = require("./sms")
class Minor {
  constructor() {
    this.SMS = sms.Instance
  }
}

var _instance =  new Minor()

module.exports = {
  Instance: _instance
}
