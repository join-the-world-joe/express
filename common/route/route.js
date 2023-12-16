var Major = require('../route/major')
var sms = require('../route/sms')

class Route {
  getKey({major, minor}) {
    switch (major) {
      case Major.Instance.SMS:
        return Major.Instance.getName(major) + '.' + sms.Instance.getName(minor)
      default:
        return 'unknown.unknown'
    }
  }
}

var _instance = new Route()

module.exports = {
  Instance: _instance
}