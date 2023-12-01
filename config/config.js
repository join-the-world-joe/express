var setting = require('./setting')
class Config {
  constructor() {
    this._url = setting.url
    this._encryption = setting.encryption
    this._aesKey = setting.key
    this._aesIV = setting.iv
    this._rsaPublicKey = setting.publicKey
    this._rsaPrivateKey = setting.privateKey
  }
  GetUrl() {
    return this._url
  }
  GetEncryption() {
    return this._encryption
  }
  GetAESKey() {
    return this._aesKey
  }
  GetAESIV() {
    return this._aesIV
  }
  GetRSAPublicKey() {
    return this._rsaPublicKey
  }
  GetRSAPrivateKey() {
    return this._rsaPrivateKey
  }
}

var _instance = new Config()

module.exports = {
  Instance: _instance,
}
