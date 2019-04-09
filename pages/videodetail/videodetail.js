// pages/videodetail/videodetail.js
Page({

  /**
    * 页面的初始数据
    */
  data: {
    //文章数据
    artdata: {},
    //评论数据
    pldata: {},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    wx.request({
      url: 'https://app.xiaogechui.cn/webservice/article/articles.ashx?t=2&v=1.0.9&deviceid=867343030559393&phonemodel=M15&osversion=7.1.2&simtype=%E4%B8%AD%E5%9B%BD%E8%81%94%E9%80%9A&simid=460017027920749&package=com.lz.xgc&unixt=1553241691218&pid=4&keycode=cc0c2ca32cd39ffbdcd39cb43a010b4f&userid=42873&token=5lrrurohp2oej19rac6ztrsbucqusu1qcodu8uca&action=QueryArtInfo&artid=50749',
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {

        //转码操作
        res.data.title = decodeURIComponent(res.data.title);

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
  getPLData: function () {
    var that = this;
    wx.request({
      url: 'https://app.xiaogechui.cn/webservice/article/comment.ashx?t=2&v=1.0.9&deviceid=867343030559393&phonemodel=M15&osversion=7.1.2&simtype=%E4%B8%AD%E5%9B%BD%E8%81%94%E9%80%9A&simid=460017027920749&package=com.lz.xgc&unixt=1553134706682&pid=4&keycode=da9fc7c918b5a0a973229b42d30a0819&userid=42873&token=5lrrurohp2oej19rac6ztrsbucqusu1qcodu8uca&action=QueryCommentList&artid=50749&pageno=1&stime=',//37625  50749
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

  }
})