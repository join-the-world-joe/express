var language = require('../translator/language')

class Chinese {
  constructor() {
    this._name = 'Chinese'
    this._language = {}

    // title
    this._language[language.titleOfMiniProgram] = "万事通配送小程序"
  }
  GetName() {
    return this._name
  }
  Translate(input) {
    if (this._language[input] != null) {
      return this._language[input]
    }
    return '未作中文翻译'
  }
}

var _instance = new Chinese()
function GetInstance() {
  return _instance
}

module.exports = {
  GetInstance
}