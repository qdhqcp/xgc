// pages/picdetail/picdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //页面的数据源
    artdata: {

    },
    //图片撑满样式
    imageStyle: 'pic-gif-style1',
    //评论的数据源
    pldata: {},
    //是否展示enmoji
    isshowenmoji: false,
    //scrollview底部占位的高度
    zhanweiheight: 110,
    //表情的集合
    enmojis: [{
        index: 0,
        name: "00.gif"
      },
      {
        index: 1,
        name: "01.gif"
      },
      {
        index: 1,
        name: "01.gif"
      },
      {
        index: 1,
        name: "01.gif"
      },
      {
        index: 1,
        name: "01.gif"
      },
      {
        index: 1,
        name: "01.gif"
      },
      {
        index: 1,
        name: "01.gif"
      },
      {
        index: 1,
        name: "01.gif"
      },
      {
        index: 1,
        name: "01.gif"
      },
      {
        index: 1,
        name: "01.gif"
      },
      {
        index: 1,
        name: "01.gif"
      },
      {
        index: 1,
        name: "01.gif"
      },
      {
        index: 1,
        name: "01.gif"
      },
      {
        index: 1,
        name: "01.gif"
      },
      {
        index: 1,
        name: "01.gif"
      },
      {
        index: 1,
        name: "01.gif"
      },
      {
        index: 1,
        name: "01.gif"
      }

    ],
    enmojipages: [0, 1]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: 'https://app.xiaogechui.cn/webservice/article/articles.ashx?t=2&v=1.0.9&deviceid=867343030559393&phonemodel=M15&osversion=7.1.2&simtype=%E4%B8%AD%E5%9B%BD%E8%81%94%E9%80%9A&simid=460017027920749&package=com.lz.xgc&unixt=1553135297833&pid=4&keycode=047855fb055212a894e6f91ea07cf464&userid=42873&token=5lrrurohp2oej19rac6ztrsbucqusu1qcodu8uca&action=QueryArtInfo&artid=37625', // 仅为示例，并非真实的接口地址
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

        res.data.title = decodeURIComponent(res.data.title);
        res.data.imgurl = decodeURIComponent(res.data.imgurl);

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


        //计算图片比例
        var imgW = res.data.imgw;
        var imgH = res.data.imgw;
        var scale = imgW / imgH;
        var imgfitw = res.data.imgfitw
        if (scale < 0.8 && 1 != imgfitw) {
          //将图片宽度设置成60%，样式2
          that.setData({
            imageStyle: 'pic-gif-style2'
          })
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
      url: 'https://app.xiaogechui.cn/webservice/article/comment.ashx?t=2&v=1.0.9&deviceid=867343030559393&phonemodel=M15&osversion=7.1.2&simtype=%E4%B8%AD%E5%9B%BD%E8%81%94%E9%80%9A&simid=460017027920749&package=com.lz.xgc&unixt=1553134706682&pid=4&keycode=da9fc7c918b5a0a973229b42d30a0819&userid=42873&token=5lrrurohp2oej19rac6ztrsbucqusu1qcodu8uca&action=QueryCommentList&artid=37625&pageno=1&stime=',
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
   * 收藏的点击
   */
  onCollectionClick: function() {
    this.setData({
      isshowenmoji: !this.data.isshowenmoji,
    });

    //如果表情展示，占位高度加上表情高度，如果表情收起，占位高度减去表情高度
    var height = this.data.zhanweiheight;
    if (this.data.isshowenmoji) {
      height = height + 200;
    } else {
      height = height - 200;
    }
    this.setData({
      zhanweiheight: height
    });
    console.log("ewfwefwee  " + this.data.zhanweiheight);
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