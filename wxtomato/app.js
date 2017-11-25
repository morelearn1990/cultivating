import { formatTimeAll, formatTimeYMD } from "./utils/util.js"

//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    let data = wx.getStorageSync('data') || {};
    // this.globalData.frequent = data.frequent || [];
    // this.globalData.recommend = data.recommend || [];
    // this.globalData.statictis = data.statictis || {};
  },
  onHide: function () {
    let data = {};
    data.frequent = this.globalData.frequent;
    data.recommend = this.globalData.recommend;
    data.statictis = this.globalData.statictis;
    wx.setStorage({
      key: 'data',
      data
    })
  },
  globalData: {
    userInfo: null,
    frequent: [],
    recommend: [
      {
        id: "0000000001",
        name: "冥想",
        des: "冥想是个好东西",
        ico: "think",
        time: 25,
        count: 0,
        target: "THINK"
      },
      {
        id: "0000000002",
        name: "运动",
        des: "运动也是个好东西",
        ico: "sport",
        time: 30,
        count: 0,
        target: "SPORT"
      },
      {
        id: "0000000003",
        name: "阅读",
        des: "阅读也也是个好东西",
        ico: "read",
        time: 40,
        count: 0,
        target: "READ"
      }
    ],
    statictis: {
      timeLine: {
        "2017-11-18":{
          count:2,
          duration:30
        },
        "2017-11-19": {
          count: 3,
          duration: 30
        },
        "2017-11-20": {
          count: 2,
          duration: 40
        },
        "2017-11-21": {
          count: 4,
          duration: 40
        },
        "2017-11-22": {
          count: 5,
          duration: 150
        }
      },
      total: {
        count: 16,
        duration: 290,
        target: {
          "STUDY":{
            count:3,
            duration:30
          },
          "READ":{
            count:4,
            duration:50
          },
          "WORK": {
            count: 4,
            duration: 50
          },
          "GAME": {
            count: 4,
            duration: 50
          },
          "THINK": {
            count: 4,
            duration: 50
          },
          "SPORT": {
            count: 4,
            duration: 50
          }
        }
      },
      logs: {}
    }
  },
  addStatictis: function (data) {
    let logs = this.globalData.statictis.logs;
    let timeLine = this.globalData.statictis.timeLine;
    let total = this.globalData.statictis.total;

    let date = new Date();
    let dateAllStr = formatTimeAll(date);
    let dateYMDStr = formatTimeYMD(date);

    logs[dateAllStr] = data

    total.count += 1;
    total.duration += data.duration;
    if (total.target[data.target] == undefined) {
      total.target[data.target] = {
        count: 0,
        duration: 0,
      }
    }
    total.target[data.target].count += 1;
    total.target[data.target].duration += data.duration;

    if (timeLine[dateYMDStr] == undefined) {
      timeLine[dateYMDStr] = {
        count: 0,
        duration: 0,
        target: {}
      }
    }
    if (timeLine[dateYMDStr].target[data.target] == undefined) {
      timeLine[dateYMDStr].target[data.target] = {
        count: 0,
        duration: 0,
      }
    }
    timeLine[dateYMDStr].count += 1;
    timeLine[dateYMDStr].duration += data.duration;
    timeLine[dateYMDStr].target[data.target].count += 1;
    timeLine[dateYMDStr].target[data.target].duration += data.duration;

  },
  getUserInfo: function (fn) {
    this.globalData.userInfo ?
      fn(this.globalData.userInfo)
      : this.appLogin(fn);
  },
  getTomato: function (list, index) {
    return index ? this.globalData[list][index] : this.globalData[list];
  },
  getFrequent: function () {
    return this.globalData.frequent;
  },
  getRecommend: function () {
    return this.globalData.recommend;
  },
  getStatictis: function () {
    return this.globalData.statictis;
  },
  setUserInfo: function (data) {
    this.globalData.userInfo = data;
  },
  setFrequent: function (data) {
    this.globalData.frequent = data;
  },
  setRecommend: function (data) {
    this.globalData.recommend = data;
  },
  appLogin: function (fn) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.appUserInfo(fn);
        } else {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              this.appUserInfo(fn);
            }
          })
        }
      }
    })
  },
  appUserInfo: function (fn) {
    wx.getUserInfo({
      success: res => {
        let userInfo = res.userInfo
        this.setUserInfo(userInfo);
        fn && fn(userInfo);
      }
    })
  }, 
  getGid: (function () {//全局唯一id
    let id = 0
    return function () {
      id++
      return id
    }
  })()
})