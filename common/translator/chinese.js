var language = require('../translator/language')

class Chinese {
  constructor() {
    this._name = 'Chinese'
    this._language = {}

    // title
    this._language[language.titleOfMiniProgram] = "万事通配送小程序"
    this._language[language.phoneNumberInvalid] = "非法的手机号"
    this._language[language.titleOfDialog] = "温馨提示："
    this._language[language.userRecordNotFound] = "未注册"
    this._language[language.verificationCodeNotInCache] = "验证码错误"
    this._language[language.illegalVerificationCode] = "无效的验证码"
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