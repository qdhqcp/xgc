//app.js
App({

  globalData: {
    userInfo: null
  },

  onLaunch: function () {

    // this.WXLogin(function (res) {
    //   wx.redirectTo({
    //     url: '../index/index'
    //   })
    // })

  },

  //获取微信用户非敏感信息
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {

      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权过，可以获取头像昵称信息
            wx.getUserInfo({
              withCredentials:true,
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo;
                typeof cb == "function" && cb(res.userInfo);
              },
              fail:e =>{
                console.log('用户信息获取失败！'+e);
              }
            })
          } else {
            // 未授权，引导去登录页
            wx.redirectTo({
              url: '../login/login'
            })
          }
        },
        fail:function(){
          // 检查授权失败
          wx.showModal({
            title: '提示',
            content: '授权失败！请检查网络'
          })
        }
      })

      

    }
  },

  /**
   * 微信登录
   * cb 回调函数 可不传
   * cbparam 回调函数中还需要回传的参数 可不传 主要是为了cb本身还需要参数的情况
   */
  WXLogin: function (cb, cbparam) {
    var that = this

    //调用登录接口
    wx.login({
      success: function (e) {

        // 获取用户信息
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权过，可以获取头像昵称信息
              wx.getUserInfo({
                withCredentials: true,
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  that.globalData.userInfo = res.userInfo;

                  console.log(res);
                  console.log(e);

                  var code = e.code;
                  var rawData = encodeURIComponent(res.rawData);
                  var signature = encodeURIComponent(res.signature);
                  var encryptedData = encodeURIComponent(res.encryptedData);
                  var iv = encodeURIComponent(res.iv);
                  if (code) {
                    that.thirdLogin(code, rawData, signature, encryptedData, iv, cb, cbparam);
                  }
                  
                },
                fail: e => {
                  console.log('用户信息获取失败！' + e);
                }
              })
            } else {
              // 未授权，引导去登录页
              wx.redirectTo({
                url: '../login/login'
              })
            }
          },
          fail: function () {
            // 检查授权失败
            wx.showModal({
              title: '提示',
              content: '授权失败！请检查网络'
            })
          }
        })

      },

      fail: function (e) {
        console.log(e);
      }

    })

  },

  //第三方登录方法
  thirdLogin: function (code, rawData, signature, encryptedData, iv, cb, cbparam) {

    var that = this;

    wx.request({
      url: 'https://app.xiaogechui.cn/xcx/login.ashx',
      data: {
        code: code,
        rawData: rawData,
        signature: signature,
        encryptedData: encryptedData,
        iv: iv
      },
      fail: function (e) {
        console.log(e);
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.status != 0) {
          wx.showModal({
            title: '提示',
            content: '登录失败！请稍后再试'
          })
          return;
        }

        wx.showModal({
          title: '登录结果',
          content: 'openid:' + res.data.openid + ',unionid:' + res.data.unionid,
          success: function (res) {
            
          }
        })

        wx.setStorageSync('thirdSessionId', res.data.thirdSessionId);
        if (cbparam) {
          typeof cb == "function" && cb(cbparam, that.globalData.userInfo);
        } else {
          typeof cb == "function" && cb(that.globalData.userInfo);
        }

      }
    });
  },

  //获取本地thirdSessionId
  getThirdSessionId: function () {
    try {
      var value = wx.getStorageSync('thirdSessionId')
      if (value) {
        return value;
      }
    } catch (e) {

    }
    return undefined;
  },

  //需要带上 thirdSessionId 的 request 请求
  requestWithSessionId: function (object) {

    var that = this;

    //判断微信登录态是否过期
    wx.checkSession({
      success: function () {

        //登录态未过期
        console.log('登录态未过期');

        //取本地 thirdSessionId
        var thirdSessionId = that.getThirdSessionId();
        if (!thirdSessionId) {
          that.WXLogin(that.requestWithSessionId, object);
          return;
        }

        //请求数据加入 thirdSessionId
        object.data.sessionid = thirdSessionId;

        //发起请求
        var url = object.url;
        var data = object.data;
        var fail = object.fail;
        wx.request({
          url: url,
          data: data,
          fail: fail,
          success: function (res) {

            //服务端用户信息缓存已丢失，则重新发起登录请求
            if (res.data.status == 1000) {
              that.WXLogin(that.requestWithSessionId, object);
              return;
            }

            //调用原有成功回调函数
            object.success(res);

          }
        });

      },
      fail: function () {
        //登录态过期
        console.log('登录态过期');

        that.WXLogin(that.requestWithSessionId, object);

      }
    })


  },


  
})