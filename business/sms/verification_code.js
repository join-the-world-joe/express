var code = require("../../common/code/code")

class Behavior {
  constructor() {
    this._login = "Login"
    this._signIn = "SignIn"
    this._register = "Register"
  }
  Login() {
    return this._login
  }
  SignIn() {
    return this._signIn
  }
  Register() {
    return this._register
  }
}

var _instanceOfBehavior = new Behavior()
function GetBehaviorInstance() {
  return _instanceOfBehavior
}

class Request {
  constructor(behavior, countryCode, phoneNumber) {
    this.behavior = behavior
    this.country_code = countryCode
    this.phone_number = phoneNumber
  }
}

class Response {
  constructor() {
    this._code = code.Instance.InternalError
  }
  GetCode() {
    return this._code
  }
  FromJson(json) { // modify itself
    try {
      console.log('VerificationCode.Response.FromJson.json: ', json)
      if (json != undefined) {
        if (json.code != undefined) {
          this._code = json.code
        }
      }
    } catch(e) {
      console.log('PacketClient.FromJson failure, err: ', e)
    } finally {
      return this
    }
  }
}

function CreateRequestInstance(behavior, countryCode, phoneNumber) {
  return new Request(behavior, countryCode, phoneNumber)
}

function CreateResponseInstance() {
  return new Response()
}

module.exports = {
  Behavior: GetBehaviorInstance(),
  CreateRequestInstance,
  CreateResponseInstance
}