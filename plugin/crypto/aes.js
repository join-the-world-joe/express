var config = require('../../config/config')
var _crypto = require('crypto-js');
var convert = require('../../utils/convert') 

class AES {
  constructor(key, iv) {
    this._key = key
    this._iv = iv
  }

  decrypt(cipherText) {
    var output = ""
    try {
      var temp =  wx.arrayBufferToBase64(cipherText)
      var decrypted = _crypto.AES.decrypt(temp, this._key, {
        iv: this._iv,
        mode: _crypto.mode.CBC,
        padding: _crypto.pad.Pkcs7
      });
      output =  _crypto.enc.Utf8.stringify(decrypted).toString();
    } catch(e) {
      console.log("AES.decrypt failure, err: ", e)
    }
    finally {
      return output
    }
  }

  encrypt(plainText) {
    var output = Uint8Array.from([])
    try{
      var encrypted = _crypto.AES.encrypt(plainText, this._key, {
        iv: this._iv,
        mode: _crypto.mode.CBC,
        padding: _crypto.pad.Pkcs7
      });
      output = convert.CreateInstance().StringToUint8Array(encrypted.ciphertext.toString())
    } catch(e) {
      console.log("AES.encrypt failure, err: ", e)
    }
    finally {
      return output
    }
  }
}

var _instance = new AES(_crypto.enc.Utf8.parse(config.Instance.GetAESKey()), _crypto.enc.Utf8.parse(config.Instance.GetAESIV()))

module.exports = {
  Instance: _instance,
}