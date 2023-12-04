// screen/home/home.js
Page({

  /**
   * Page initial data
   */
  data: {
    contentIndex: 0,
    imageUrls : [
      "/asset/image/1.jpg",
      "/asset/image/2.jpg",
      "/asset/image/3.jpg"
    ]
  },
  item0 () {
    this.setData({
      contentIndex:0,
    })
    wx.showLoading({
      title: '加载中',
    })
    
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  },
  item1 () {
    this.setData({
      contentIndex:1,
    })
    wx.showLoading({
      title: '加载中',
    })
    
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  },
  item2 () {
    this.setData({
      contentIndex:2,
    })
  },
  item3 () {
    this.setData({
      contentIndex:3,
    })
  },
  changeImage() {
    console.log('changeImage')
    this.setData({
      imageUrls: [
        "/asset/image/4.jpg",
      "/asset/image/5.jpg",
      "/asset/image/6.jpg"
      ],
    })
  },
  jump() {
    wx.switchTab({
      url: "/screen/layout/layout",
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {

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