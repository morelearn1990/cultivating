let app = getApp();
let timeRunning;
Page({
  data: {
    time: 2400,
    timeNow: 2400,
    duration: 0,
    timeText: "40:00",
    target: '',
    fromList: "false",
    list: '',
    index: null,
    stop: false,
    started: false
  },
  onLoad: function (options) {
    let fromList = options.fromList;
    let list = options.list;
    let index = options.index;
    let time = options.time * 60;
    let target = options.target;
    if (options.fromList == "true") {
      let tomato = app.getTomato(list, index);
      time = tomato.time * 60;
      target = tomato.target;
    }
    let timeNow = time;
    let timeText = this.formatTime(timeNow);
    this.setData({
      fromList,
      list,
      index,
      time,
      target,
      timeText,
      timeNow
    })
  },
  onUnload: function () {
    if (this.data.duration < 300) return;
    let data = {
      duration: Math.floor(this.data.duration / 60),
      target: this.data.target,
      list: this.data.list,
      index: this.data.index,
      fromList: this.data.fromList
    }
    app.addStatistic(data)
  },
  formatTime: function (time) {
    let minutes = parseInt(time / 60);
    let scends = time % 60;
    return [minutes, scends].map(function (n) {
      n = n.toString()
      return n[1] ? n : '0' + n;
    }).join(":");
  },
  start: function () {
    let _this = this;
    this.setData({
      started: true
    })
    timeRunning = this.running();
  },
  running: function () {
    let _this = this;
    return setInterval(function () {
      let timeNow = _this.data.timeNow;
      let duration = _this.data.duration;
      timeNow -= 1;
      duration += 1;
      if (timeNow <= 0) {
        wx.navigateBack({
          delta: 1
        })
      }
      let timeText = _this.formatTime(timeNow);
      _this.setData({
        timeNow,
        timeText,
        duration
      })
    }, 1000);
  },
  pause: function () {
    let _this = this;
    if (this.data.stop == false) {
      clearInterval(timeRunning);
      this.setData({
        stop: true
      })
    } else {
      timeRunning = this.running();
      this.setData({
        stop: false
      })
    }
  },
  cancel: function () {
    wx.navigateBack({
      delta: 1
    })
  }
})