//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
  },
  onLoad: function () {
    let _this = this;
    app.getUserInfo(function (userInfo) {
      _this.setData({
        userInfo
      })
    });
  },
  onShow: function () {
    let frequent = app.getFrequent();
    let recommend = app.getRecommend();
    this.setData({
      frequent,
      recommend
    })
  },
  goToList: function (event) {
    // let toRouter = event.currentTarget.dataset.type;
    // let url = `./list/list?type=${toRouter}`;
    // wx.navigateTo({
    //   url: url,
    // });
  },
  goToNew: function (event) {
    wx.navigateTo({
      url: './new/new?type=list'
    })
  },
  goToRun: function (event) {
    let listType = event.currentTarget.dataset.type;
    let key = event.currentTarget.dataset.key;
    let id = event.currentTarget.dataset.id;
    let tomato = this.data[listType][key];
    let url = `./running/running?fromList=true&list=${listType}&index=${key}`
    wx.navigateTo({
      url
    })
  }
})
