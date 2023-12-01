var chinese = require('chinese')
var english = require('./english')

class Translator {
  constructor() {
    this._native = chinese.GetInstance().GetName();
  }
  SetNative(native) {
    this._native = native
  }
  GetNative() {
    return this._native
  }
  Translate(input) {
    if(this._native.localeCompare(chinese.GetInstance().GetName()) == 0) {
      return chinese.GetInstance().Translate(input)
    }
    return '未知翻译语言';
  }
}

var _instance = new Translator()

module.exports = {
  Instance: _instance,
}