// pages/duanzidetail/duanzidetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //页面的数据源
    artdata: {

    },
    //评论的数据源
    pldata: {

    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;
    wx.request({
      url: 'https://app.xiaogechui.cn/webservice/article/articles.ashx?t=2&v=1.0.9&deviceid=867343030559393&phonemodel=M15&osversion=7.1.2&simtype=%E4%B8%AD%E5%9B%BD%E8%81%94%E9%80%9A&simid=460017027920749&package=com.lz.xgc&unixt=1553221921387&pid=4&keycode=6d0b8007acfc812faf3efd87e427cc48&userid=42873&token=5lrrurohp2oej19rac6ztrsbucqusu1qcodu8uca&action=QueryArtInfo&artid=115864',
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        //转码操作
        res.data.content = decodeURIComponent(res.data.content);
        res.data.zhaiyao = options.zhaiyao;
        
        var tags = res.data.tags;
        if (tags) {
          for (var i = 0; i < tags.length; i++) {
            if (i == tags.length - 1) {
              tags[i].TAG = decodeURIComponent(tags[i].TAG);
            } else {
              tags[i].TAG = decodeURIComponent(tags[i].TAG + '   ');
            }

          }
        }

        that.setData({
          artdata: res.data
        });

        //请求评论数据
        that.getPLData();

      }
    })

  },

  /**
   * 获取评论的数据
   */
  getPLData: function() {
    var that = this;
    wx.request({
      url: 'https://app.xiaogechui.cn/webservice/article/comment.ashx?t=2&v=1.0.9&deviceid=867343030559393&phonemodel=M15&osversion=7.1.2&simtype=%E4%B8%AD%E5%9B%BD%E8%81%94%E9%80%9A&simid=460017027920749&package=com.lz.xgc&unixt=1553134706682&pid=4&keycode=da9fc7c918b5a0a973229b42d30a0819&userid=42873&token=5lrrurohp2oej19rac6ztrsbucqusu1qcodu8uca&action=QueryCommentList&artid=115864&pageno=1&stime=',
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        //解码操作
        var items = res.data.items;
        if (items) {
          for (var i = 0; i < items.length; i++) {
            items[i].NICKNAME = decodeURIComponent(items[i].NICKNAME);
            items[i].HEADURL = decodeURIComponent(items[i].HEADURL);
            items[i].CONTENT = decodeURIComponent(items[i].CONTENT);
          }
        }

        that.setData({
          pldata: res.data
        });


      }
    })
  },




  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})