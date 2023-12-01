var code = require("../../common/code/code")

class Behavior {
  constructor() {
    this.Login = "Login"
    this.SignIn = "SignIn"
    this.Register = "Register"
  }
}

var _instanceOfBehavior = new Behavior()

class Request {
  constructor(countryCode, phoneNumber) {
    this.behavior = _instanceOfBehavior.SignIn
    this.countryCode = countryCode
    this.phoneNumber = phoneNumber
  }
}

class Response {
  constructor() {
    this._code = code.GetInstance().InternalError
  }
}

function CreateRequestInstance(countryCode, phoneNumber) {
  return new Request(countryCode, phoneNumber)
}

function CreateResponseInstance() {
  return new Response()
}

module.exports = {
  CreateRequestInstance,
  CreateResponseInstance
}