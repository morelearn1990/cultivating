import chartWrap from '../../../utils/chartWrap'
import getLineConfig from './getLineConfig'
import getPieConfig from './getPieConfig'
import { targetArr } from '../../../utils/target'
import { formatTimeYMD, getMonthWeek } from '../../../utils/util'
var app = getApp()
Page({
  data: {

  },
  onLoad: function (options) {
    let _this = this;
    let statictisData = app.getStatictis();

    app.getUserInfo(function (userInfo) {
      _this.setData({
        userInfo
      })
    });
    let statictis = {
      count: [],
      duration: [],
      cycle: {
        day: {
          labels: [],
          data: []
        },
        week: {
          labels: [],
          data: []
        },
        month: {
          labels: [],
          data: []
        }
      }
    };
    let target = statictisData.total.target;

    targetArr.forEach(function (item) {
      statictis.count.push(target[item].count);
      statictis.duration.push(target[item].duration);
    })

    _this.setData({
      statictisData,
      statictis
    })
    this.cycleDay(statictisData);
    this.drawPie(statictis.count, "targetCountCanvas")
    this.drawPie(statictis.duration, "targetdurationCanvas")
  },
  promiseGetSystemInfo(fn) {
    wx.getSystemInfo({
      success: function (deviceInfo) {
        fn && fn(deviceInfo);
      }
    })
  },
  cycleDay: function (statictisData) {
    if (!statictisData) return;
    let today = new Date();
    let labels = [], count = [], duration = [];
    let days = [];
    let timeLine = statictisData.timeLine;

    for (let i = 0; i < 7; i++) {
      days.unshift(formatTimeYMD(today))
      today -= 24 * 60 * 60 * 1000;
    }
    labels = days.map(function (day) {
      return day.replace(/^\d{4}-/, '');
    });
    days.forEach(function (item) {
      count.push(timeLine[item] ? timeLine[item].count : 0);
      duration.push(timeLine[item] ? timeLine[item].duration : 0);
    })
    this.drawCycle(labels, duration, "durationCanvas");
    this.drawCycle(labels, count, "countCanvas");
  },
  cycleWeek: function (statictisData) {
    if (!statictisData) return;
    let today = new Date();
    let labels = ["本周"], durations = [0], counts = [0];
    let weeks = [[]], index = 0;
    let timeLine = statictisData.timeLine;

    // 将7个星期时间按照每个周放入到一个二维数组里面，再来匹配时间线里面的时间，
    // 将每个周的次数和时长加起来
    for (let i = 0; i < 49; i++) {
      today = new Date(today);
      // 获取周几，根据周几的时间来放入到数组时间里面。
      // 由于是倒序放入，所以只需要 unshift 数据，weeks[0]来放入时间和数据。
      let day = today.getDay();
      let dateStr = formatTimeYMD(today);
      if (day == 0) {
        if (weeks.length == 7) break;
        let mw = getMonthWeek(today);
        labels.unshift(mw);
        weeks.unshift([]);
        durations.unshift(0);
        counts.unshift(0);
      }
      weeks[0].push(formatTimeYMD(today))
      durations[0] += timeLine[dateStr] ? timeLine[dateStr].duration : 0;
      counts[0] += timeLine[dateStr] ? timeLine[dateStr].count : 0;
      today -= 24 * 60 * 60 * 1000;
    }
    this.drawCycle(labels, durations, "durationCanvas");
    this.drawCycle(labels, counts, "countCanvas");
  },
  cycleMonth: function (statictisData) {
    if (!statictisData) return;
    let today = new Date();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let labels = [], durations = [], counts = [];
    let timeLine = statictisData.timeLine;

    for (let i = 0; i < 7; i++) {
      let label = year + "-" + month;
      let count = 0, duration = 0;
      labels.unshift(month + "月");
      month -= 1;
      if (month < 1) {
        month = 12;
        year -= 1;
      }
      for (let key in timeLine) {
        if (key.match(label)) {
          count += timeLine[key].count;
          duration += timeLine[key].duration;
        }
      }
      durations.unshift(duration);
      counts.unshift(count);
    }
    this.drawCycle(labels, durations, "durationCanvas");
    this.drawCycle(labels, counts, "countCanvas");
  },
  setCycle: function (e) {
    let cycle = e.currentTarget.dataset.cycle;
    let data = this.data.statictisData;
    switch (cycle) {
      case "month":
        this.cycleMonth(data);
        break;
      case "week":
        this.cycleWeek(data);
        break;
      default:
        this.cycleDay(data);
        break;
    }
  },
  drawCycle: function (label, data, canvasId) {
    let pagethis = this;
    this.promiseGetSystemInfo(function (deviceInfo) {
      let width = Math.floor(deviceInfo.windowWidth * 700 / 750);
      let height = Math.floor(width / 2);
      let canvasConfig = {
        width,
        height,
        id: canvasId,
      }
      let config = getLineConfig(canvasConfig, label, data)
      chartWrap.bind(pagethis)(config)
    });
  },
  drawPie: function (data, canvasId) {
    let pagethis = this;
    this.promiseGetSystemInfo(function (deviceInfo) {
      let width = Math.floor(deviceInfo.windowWidth * 340 / 750);
      let height = Math.floor(width / 1);
      let labels = ["11-01", "11-02", "11-03", "11-04", "11-05", "11-06", "十二月"]
      let dataa = [11, 22, 60, 120, 22, 46, 90]
      let canvasConfig = {
        width,
        height,
        id: canvasId,
      }
      let config = getPieConfig(canvasConfig, labels, data)
      chartWrap.bind(pagethis)(config)
    });
  }
})