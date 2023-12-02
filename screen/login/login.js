const language = require('../../common/translator/language')
var translator = require('../../common/translator/translator')
var rateLimiter = require('../../framework/rate_limiter')
var header = require('../../framework/header')
var bSMSVC = require('../../business/sms/verification_code')
var major = require("../../common/route/major")
var minor = require("../../common/route/minor")
var payload = require("../../framework/packet_client")
var runtime = require('../../runtime/runtime')
var aes = require('../../plugin/crypto/aes')
const code = require('../../common/code/code')
var bLogin = require('../../business/account/login')

Page({
  data: {
    title: translator.Instance.Translate(language.titleOfMiniProgram),
    phoneNumber: "",
    code: "",
  },
  onCodeChange(e) {
    this.setData({
      code: e.detail.value
    })
  },
  onPhoneNumberChange(e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  smsHandler(packet) {
    console.log('smsHandler.packet: ', packet)
    var response = bSMSVC.CreateResponseInstance().FromJson(packet.GetBody())
    var c = response.GetCode()
    if ( c == code.Instance.OK) {
      // success
    } else if (c == code.Instance.InvalidDataType ) {
      wx.showModal({
        title: translator.Instance.Translate(language.titleOfDialog),
        content: translator.Instance.Translate(language.phoneNumberInvalid),
        showCancel: false,
        success (res) {
          if (res.confirm) {
            console.log('press confirm')
          }
        }
      })
      // phone number is invalid
    } else {
      // error code
    }
  },
  register() {
    console.log('register')
    wx.navigateTo({
      url: '/screen/register/register',
    })
  },
  loginHandler(packet) {
    console.log('loginHandler.packet:', packet)
    var response = bLogin.CreateResponseInstance().FromJson(packet.GetBody())
    var c = response.GetCode()
    if ( c == code.Instance.OK) {
      // success
    } else if (c == code.Instance.InvalidData ) {
      // phone number is invalid
      wx.showModal({
        title: translator.Instance.Translate(language.titleOfDialog),
        content: translator.Instance.Translate(language.verificationCodeNotInCache),
        showCancel: false,
        success (res) {
          if (res.confirm) {
            console.log('press confirm')
          }
        }
      })
    } else if (c == code.Instance.EntryNotFound) {
      wx.showModal({
        title: translator.Instance.Translate(language.titleOfDialog),
        content: translator.Instance.Translate(language.userRecordNotFound),
        showCancel: false,
        success (res) {
          if (res.confirm) {
            console.log('press confirm')
          }
        }
      })
    } else {
      // error code
    }
  },
  observe(packet) {
    try{
      var ma = packet.GetHeader().GetMajor()
      var mi = packet.GetHeader().GetMinor()
      console.log('Login.observe: major: ', ma, ", minor: ", mi)
      console.log(major.Instance.SMS, minor.Instance.SMS.GetVerificationCodeResponse())
      if(ma == major.Instance.SMS && mi == minor.Instance.SMS.GetVerificationCodeResponse()) {
        this.smsHandler(packet)
      } else if (ma == major.Instance.Account && mi == minor.Instance.Account.GetLoginResponse()) {
        this.loginHandler(packet)
      } else {
        console.log('Login.observe.warning, major: ', ma, ", minor: ", mi)
      }
    } catch(e) {
      console.log('Login.observe failure, err: ', e)
    } finally {
      return 
    }
  },
  sendVerificationCode() {
    var packet = payload.CreateInstance()
    var hdr = header.CreateInstance()
    hdr.SetMajor(major.Instance.SMS)
    hdr.SetMinor(minor.Instance.SMS.GetVerificationCodeRequest())
    var request = bSMSVC.CreateRequestInstance(bSMSVC.Behavior.Login(), "86", this.data.phoneNumber)
    packet.SetHeader(hdr)
    packet.SetBody(request)
    runtime.Instance.SendRequest(packet.ToJson())
  },
  login() {
    if (this.data.phoneNumber.length < 11) {
      wx.showModal({
        title: translator.Instance.Translate(language.titleOfDialog),
        content: translator.Instance.Translate(language.phoneNumberInvalid),
        showCancel: false,
        success (res) {
          if (res.confirm) {
            console.log('press confirm')
          }
        }
      })
      return
    }
    if(this.data.code < 3) {
      wx.showModal({
        title: translator.Instance.Translate(language.titleOfDialog),
        content: translator.Instance.Translate(language.illegalVerificationCode),
        showCancel: false,
        success (res) {
          if (res.confirm) {
            console.log('press confirm')
          }
        }
      })
      return
    }
    var packet = payload.CreateInstance()
    console.log("login, number: ", this.data.phoneNumber, ", code: ", parseInt(this.data.code))
    var hdr = header.CreateInstance()
    hdr.SetMajor(major.Instance.Account)
    hdr.SetMinor(minor.Instance.SMS.GetVerificationCodeRequest())
    var request = bLogin.CreateRequestInstance()
    request.SetBehavior(2)
    request.SetCountryCode('86')
    request.SetPhoneNumber(this.data.phoneNumber)
    request.SetVerificationCode(this.data.code)
    packet.SetHeader(hdr)
    packet.SetBody(request)
    runtime.Instance.SendRequest(packet.ToJson())
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    runtime.Instance.Setup()
    runtime.Instance.SetObserve(this.observe)
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
})