var aes = require('../plugin/crypto/aes')
var config = require('../config/config')
var websock = require('../framework/websocket')
var rateLimiter = require('../framework/rate_limiter')
var convert = require('../utils/convert')
var payload = require('../framework/packet_client')
var log = require('../utils/log')

class Runtime {
  constructor() {
    this._token = ''
    this._observe = null
    this._rateLimiting = {}
    this._initialized = false
    this._connectivity = false
    this._defaultPeriod = 1000
    this._websock = websock.Instance
  }

  onMessage(input) {
    try{
      var packet = payload.CreateInstance()
      if (config.Instance.GetEncryption()) {
        packet.FromJson(aes.Instance.decrypt(new Uint8Array(input.data)))
      } else {
        packet.FromJson(convert.CreateInstance().Int8ArrayToString(new Int8Array(input.data)))
      }
      // console.log('onMessage: ', packet)
      if (this._observe != null) {
        this._observe(packet)
        return
      }
      console.log('Runtime.Websocket.OnMessage.Warning, drop: ', plainText)
    } catch(e) {
      console.log("runtime.Setup.OnMessage failure, err: ", e)
    } finally {
      return
    }
  }

  SetObserve(observe) {
    this._observe = observe
  }

  GetObserve() {
    return this._observe
  }

  Allow(major, minor) {
    const key = ''
    if (this._rateLimiting[key] == null) {
      _rateLimiting[key] = rateLimiter.CreateInstance()
      return  _rateLimiting[key].allow()
    }
    return _rateLimiting[key].allow()
  }

  UpdateRateLimiter(key, rateLimiter) {
    this._rateLimiting[key] = rateLimiter
  }

  onRequestSuccess(res) {
    // console.log("Runtime.onRequestSuccess")
  }

  onRequestFailure(res) {
    console.log("Runtime.onRequestFailure")
  }

  onRequestComplete(res) {
    // console.log("Runtime.onRequestComplete")
  }

  Request({packet, from, caller}) {
    var output = packet.ToJson()
    try{
      // if(!this._initialized || !this._connectivity) {
      //   this.Setup()
      // }
      
      if (config.Instance.GetEncryption()) {
        output = aes.Instance.encrypt(output)
      }

      this._websock.Send(
        output, 
        (res) => this.onRequestSuccess(res),
        (res) => this.onRequestFailure(res),
        (res) => this.onRequestComplete(res),
      )
      log.Instance.Debug({
        major: packet.GetHeader().GetMajor(),
        minor: packet.GetHeader().GetMinor(),
        from: from,
        caller: caller,
        message: 'requested',
     })
      return
    } catch(e) {
      console.log("Runtime.SendRequest failure, err: ", e)
      return
    }
    finally {
      return 
    }
  }

  Setup() {
    try{
      if (!this._initialized) {
        this._websock.SetURL(config.Instance.GetUrl())
        this._websock.SetOnOpen((result) => {
          // callback in connect phase
          console.log("Runtime.Websocket.onOpen")
        })
        this._websock.SetOnSuccess(() => {
          // callback in connect phase
          console.log("Runtime.Websocket.OnSuccess")
          this._initialized = true
          this._connectivity = true
        }) 
        this._websock.SetOnFial( ()=>{
          // callback in connect phase
          console.log("Runtime.Websocket.OnSuccess")
          this._initialized = false
          this._connectivity = false
        })
        this._websock.SetOnClose(() => {
          console.log("Runtime.Websocket.OnClose")
          this._connectivity = false
        })
        this._websock.SetOnError(() => {
          console.log("Runtime.Websocket.OnError")
        })
        this._websock.SetOnSuccess(() => {
          console.log("OnSuccess")
          this._connectivity = true
        })
        this._websock.SetOnMessage((input) => this.onMessage(input))
        // connect to remote websocket server
        this._websock.Connect()
        return
      }
      return
    } catch(e) {
      console.log("runtime.Setup failure, err: ", e)
    }
    finally {
      return
    }
  }

  SetToken(token) {
    this._token = token
  }
  
  GetToken() {
    return this._token
  }
}

var _instance = new Runtime()

module.exports = {
  Instance: _instance
}
