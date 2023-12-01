const language = require('../../common/translator/language')
var translator = require('../../common/translator/translator')
var rateLimiter = require('../../framework/rate_limiter')
var header = require('../../framework/header')
var verificationCode = require('../../business/sms/verification_code')
var major = require("../../common/route/major")
var minor = require("../../common/route/minor")
var payload = require("../../framework/packet_client")
var runtime = require('../../runtime/runtime')
var aes = require('../../plugin/crypto/aes')

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
  observe(packet) {
    if(major.Instance.GetSMS() == packet.GetHeader().GetMajor() && 
    minor.Instance.SMS.GetVerificationCodeResponse() == packet.GetHeader().GetMinor()) {
      // todo:
    }
  },
  sendVerificationCode() {
    var hdr = header.CreateInstance()
    hdr.SetMajor(major.Instance.GetSMS())
    hdr.SetMinor(minor.Instance.SMS.GetVerificationCodeRequest())
    var request = verificationCode.CreateRequestInstance("86", this.data.phoneNumber)
    var packet = payload.CreateInstance()
    packet.SetHeader(hdr)
    packet.SetBody(request)
    runtime.Instance.SendRequest(packet.ToJson())
  },
  login() {
    console.log("login, number: ", this.data.phoneNumber, ", code: ", this.data.code)
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