var header = require('../framework/header')

class PacketClient {
  constructor() {
    this._header = null
    this._body = null
  }
  SetHeader(header) {
    this._header = header
  }
  GetHeader() {
    return this._header
  }
  SetBody(body) {
    this._body = body
  }
  GetBody() {
    return this._body
  }
  ToJson() {
    var json = "{}"
    try{
      json = JSON.stringify({"header":this._header, "body":this._body})
    } catch(e) {
      console.log("framework.packet_client.PacketClient.ToJson failure, err: ", e)
    } finally {
      return json
    }
  }
  FromJson(json) { // modify itself
    try {
      // console.log('PacketClient.FromJson.json: ', json)
      var obj = JSON.parse(json)
      this._body = obj.body
      this._header = header.CreateInstance().FromJson(obj.header)
    } catch(e) {
      console.log('PacketClient.FromJson failure, err: ', e)
    } finally {
      return this
    }
  }
}

function CreateInstance() {
  return new PacketClient()
}

module.exports = {
  CreateInstance
}