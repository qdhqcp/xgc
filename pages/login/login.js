// pages/login/login.js

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },


  //获取用户信息回调
  getUserInfoCallBack:function(res){
    console.log(res)
    app.globalData.userInfo = res.detail.userInfo;

    //调用登录接口
    wx.login({
      success: function (e) {

        var code = e.code;
        var rawData = encodeURIComponent(res.detail.rawData);
        var signature = encodeURIComponent(res.detail.signature);
        var encryptedData = encodeURIComponent(res.detail.encryptedData);
        var iv = encodeURIComponent(res.detail.iv);
        if (code) {
          app.thirdLogin(code, rawData, signature, encryptedData, iv, function(){
            wx.redirectTo({
              url: '../index/index'
            })
          }, undefined);
        }

      },

      fail: function (e) {
        console.log(e);
      }

    })
  }

})