const major = require("../../common/route/major")
var sms = require('../../common/route/sms')
var account = require('../../common/route/account')
var payload = require('../../framework/packet_client')
var header = require('../../framework/header')
var sms_business = require('../../business/sms/verification_code')
var runtime = require('../../runtime/runtime')
var code = require('../../common/code/code')
var log =  require('../../utils/log')
var translator = require('../../common/translator/translator')
var language = require('../../common/translator/language')
var config = require('../../config/config')
Page({

  /**
   * Page initial data
   */
  data: {
    from: 'register',
    phoneNumber: '',
    verificationCode: '',
    submitButtonDisabled: true,
    countdownNumber: 60,
    verificationCodeRequested: false,
    smsButtonLabel: '获取',
    registerRequested: false,
  },
  onPhoneNumberChange(e) {
    this.setData({
      phoneNumber: e.detail.value
    })
    if(this.data.phoneNumber.length >= config.Instance.GetLengthOfPhoneNumber() && this.data.verificationCode >= config.Instance.GetLengthOfVerificationCode()) {
      this.setData({
        submitButtonDisabled: false,
      })
    } else {
      if (!this.data.submitButtonDisabled) {
        this.setData({
          submitButtonDisabled: true,
        })
      }
    }
  },
  onVerificationCodeChange(e) {
    this.setData({
      verificationCode: e.detail.value
    })
    console.log(this.data.phoneNumber.length)
    console.log(this.data.verificationCode)
    if(this.data.phoneNumber.length >= config.Instance.GetLengthOfPhoneNumber() && this.data.verificationCode.length >= config.Instance.GetLengthOfVerificationCode()) {
      this.setData({
        submitButtonDisabled: false,
      })
    } else {
      if (!this.data.submitButtonDisabled) {
        this.setData({
          submitButtonDisabled: true,
        })
      }
    }
  },
  request_to_register() {
    if (this.data.registerRequested) {
      return
    }
    if(this.data.verificationCode.length < config.Instance.GetLengthOfVerificationCode()) {
      console.log(this.data.verificationCode.length)
      console.log(config.Instance.GetLengthOfVerificationCode())
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
  },
  request_to_send_sms() {
    if(this.data.verificationCodeRequested) {
      return
    }
    if(this.data.phoneNumber.length < 11) {
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
    try {
      var caller = 'request_to_send_sms'
      var packet = payload.CreateInstance()
      var hdr = header.CreateInstance()
      var ma = major.Instance.SMS
      var mi = sms.Instance.GetVerificationCodeRequest()
      var behavior = sms_business.Behavior.Register()
      var phoneNumber = this.data.phoneNumber
      var request = sms_business.CreateRequestInstance(behavior, "86", phoneNumber)
      hdr.SetMajor(ma)
      hdr.SetMinor(mi)
      packet.SetHeader(hdr)
      packet.SetBody(request)
      runtime.Instance.Request({packet:packet, from: 'login', caller:'request_to_send_sms'})

      var that = this
      this.setData({
        verificationCodeRequested: true,
        countdownNumber: 60,
      });
      var timer = setInterval(
        function() {
          var number = that.data.countdownNumber
          number = number - 1
          console.log('number: ', number)
          if (number >= 0 ) {
            that.setData({
              smsButtonLabel: number,
              // countdownNumber: number,
            });
          }
          if (number <= 0) {
            console.log('close timer')
            clearInterval(timer)
            that.setData({
              smsButtonLabel:translator.Instance.Translate(language.request_to_send_sms_message),
              verificationCodeRequested: false,
            })
          }
        }, 1000,
      );
    } catch(e) {
      log.Instance.Debug({
        major: ma,
        minor: mi,
        from: this.data.from,
        caller: caller,
        message: 'failure, err: ' + e,
      })
    }
  },
  observe(packet) {
    try{
      var caller = 'observe';
      var ma = packet.GetHeader().GetMajor()
      var mi = packet.GetHeader().GetMinor()
      
      log.Instance.Debug({
        major: ma,
        minor: mi,
        from: this.data.from,
        caller: caller,
        message: 'responsed',
      })
      
      if(ma == major.Instance.SMS && mi == sms.Instance.GetVerificationCodeResponse()) {
        this.smsHandler(packet)
      } else {
        log.Instance.Debug({
          major: ma,
          minor: mi,
          from: this.data.from,
          caller: caller,
         message: 'not matched',
        })
      }
    } catch(e) {
      log.Instance.Debug({
        major: ma,
        minor: mi,
        from: this.data.from,
        caller: caller,
        message: 'failure, err: ' + e,
      })
    } finally {
      return 
    }
  },
  smsHandler(packet) {
    var caller = 'smsHandler'
    var response = sms_business.CreateResponseInstance().FromJson(packet.GetBody())
    var c = response.GetCode()
    log.Instance.Debug({
      major: packet.GetHeader().GetMajor(),
      minor: packet.GetHeader().GetMinor(),
      from: this.data.from,
      caller: caller,
      message: 'code: ' + c,
   })
    if ( c == code.Instance.OK) {
      // success
    } else {
      this.setData({
        smsButtonLabel: '获取',
        verificationCodeRequested: false,
        countdownNumber: 0,
      })
      if (c == code.Instance.InvalidDataType ) {
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
    }
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    console.log('register.onLoad');
    runtime.Instance.SetObserve(this.observe)
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {
    console.log('register.onReady');
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    console.log('register.onShow');
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {
    console.log('register.onUnload');
  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {
    console.log('register.onUnload');
    this.setData({
      countdownNumber: 0,
    })
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