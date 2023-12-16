var route = require('../common/route/route')
var config = require('../config/config')

class Log {
  Debug({major, minor, from, caller, message}) {
    if (config.Instance.getDebug()) {
      var key = '(' + route.Instance.getKey({major:major,minor:minor}) + ':' + major + '-' + minor + ')'    
      console.log(from + '.'+caller + key + ':' + message)
    }
  }
}

var _instalce = new Log()

module.exports = {
  Instance:_instalce
}