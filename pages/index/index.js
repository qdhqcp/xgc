//index.js

import timer from 'timer.js'

//获取应用实例
const app = getApp()

Page({
  ...timer.options,
  data: {
    ...timer.data,
    userInfo: {},
    isLogin: false,
    CurListData: {
      items: [],
      scrolly: 0,
      curpage: 1
    },
    timeConfigTimes:4, //每圈分几段
    timeConfigSec:8 //每段几秒钟
  },
  onLoad: function() {
    this.setData({
      userInfo: app.globalData.userInfo
    });

    this.LoadNextPage();

    this.ProgressStartNextSection();

  },
  //事件处理函数
  onPullDownRefresh: function() {
    console.log('onPullDownRefresh');
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //选中导航菜单
  SelectMenu: function(e) {
    console.log(e.currentTarget.dataset.type);
  },
  //加载下一页
  LoadNextPage: function() {
    var that = this;
    wx.request({
      url: 'https://app.xiaogechui.cn/WebService/article/articles.ashx?t=1&v=1.0.4&deviceid=8927A895-820A-42A6-8CBE-681FBC317C9A&orideviceid=&phonemodel=iPhone8,1&osversion=10.1&simtype=0&simid=0&isbroken=0&package=com.lz.xgc&pid=0&unixt=1540888837&userid=0&token=0&action=QueryArtList&pageno=1&tagid=&stime=1540888750&keycode=0e512c65365b498152c938c868dac4fa',
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        var items = res.data.items;
        for (var i = 0; i < items.length; i++) {
          items[i].title = decodeURIComponent(items[i].title);
          items[i].imgurl = decodeURIComponent(items[i].imgurl);
          items[i].tag = decodeURIComponent(items[i].tag);
          items[i].zhaiyao = decodeURIComponent(items[i].zhaiyao);
          items[i].zhaiyao_seeall = '';
          if (items[i].zhaiyao.indexOf('查看全文') >= 0) {
            items[i].zhaiyao_seeall = '查看全文';
            items[i].zhaiyao = items[i].zhaiyao.replace('查看全文', '');
          }
          if (items[i].hotcomment) {
            for (var j = 0; j < items[i].hotcomment.length; j++) {
              items[i].hotcomment[j].HEADURL = decodeURIComponent(items[i].hotcomment[j].HEADURL);
              items[i].hotcomment[j].NICKNAME = decodeURIComponent(items[i].hotcomment[j].NICKNAME);
              items[i].hotcomment[j].CONTENT = decodeURIComponent(items[i].hotcomment[j].CONTENT);
            }
          }
        }
        var data = {
          items: items,
          scrolly: 0,
          curpage: 1
        }
        that.setData({
          CurListData: data
        });
      }
    })
  },

  //列表滚动事件
  ScrollViewDidScroll:function(){
    this.ProgressStartNextSection();
  },

  //开启下一段计时
  ProgressStartNextSection:function(){
    
    
    //正在执行动画，不处理
    if (this.data.isAniming) {
      return;
    }

    var perSection = 95 / this.data.timeConfigTimes;

    var progress = this.data.curProgress + perSection;
    var duration = this.data.timeConfigSec*1000;

    if (progress > 95) {
      if (this.data.curProgress < 95) {
        progress = 95;
      }else {
        progress = 100;
        duration = 5 / perSection * this.data.timeConfigSec;
      }
    }

    if (progress > 100) {
      progress = 100;
    }

    this.draw('timerCanvas', progress, duration, true, this.ProgressArriveAtDelegate);

  },

  //到达指定进度代理
  ProgressArriveAtDelegate: function(progress)
  {
    console.log(progress);
      
    if(progress== 100) {
      this.draw('timerCanvas', 1, 10, false, this.ProgressArriveAtDelegate);

      //阅读奖励
      wx.showToast({
        title: '发放阅读奖励',
        icon: 'success',
        duration: 2000
      })
    }
  },


  //点击文章进入详情
  GoArtDetail: function (event) {

    var index = event.currentTarget.dataset.index;
    var itemdata = this.data.CurListData.items[index];
    var atype = itemdata.atype;
    var url;
    if ('0' == atype) {
      //段子
      url = '../duanzidetail/duanzidetail?zhaiyao=' + itemdata.zhaiyao;
    } else if ('5' == atype) {
      //图文
      url = '../tuwendetail/tuwendetail'
    } else if ('2' == atype || '4' == atype) {
      //图片和gif
      url = '../picdetail/picdetail'
    } else if ('1' == atype || '3' == atype) {
      //视频
      url = '../videodetail/videodetail'
    }
    if (url) {
      wx.navigateTo({
        url: url + '?index=' + index
      })
    }

  },





  GoTestDetail: function(){
    wx.navigateTo({
      url: '../videodetail/videodetail'
    })
  }

})