// var wilddog = require("/utils/wilddog");
// var config = {
//   authDomain: "morelearn-todoproj.wilddog.com",
//   syncURL: "https://morelearn-todoproj.wilddogio.com"
// }
App({
  globalData: {
  },
  onLaunch: function () {
    var that = this;
    let logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
  },
  onHide:function(){
    this.setLocal(this.globalData.todo);
  },
  //登陆得到用户信息  其中如果获取用户信息失败或者登陆失败 则使用默认用户
  getLogin:function(fn){
    wx.login({
      success: function() {
        wx.getUserInfo({
          withCredentials: false,
          success: function (res) {
            let userInfo = {
              name:res.userInfo.nickName,
              photoUrl: res.userInfo.avatarUrl
            }
            if(fn){
              typeof fn === "function" && fn(userInfo);
            }
            return userInfo;
          },
          fail:function(err){
            let defaultUser = {
              name: "好好学习",
              photoUrl: "/img/defaultPortrait.png"
            }
            if (fn) {
              typeof fn === "function" && fn(defaultUser);
            }
          }
        })
      },
      fail: function(res) {
        let defaultUser = {
          name:"好好学习",
          photoUrl:"/img/defaultPortrait.png"
        }
        if (fn) {
          typeof fn === "function" && fn(defaultUser);
        }
      }
    })
  },
  //数据操作
  setTodo:function(data){
    var that = this;
    this.globalData.todo = data;
    this.setLocal();
  },
  getTodo:function(){
    return this.globalData.todo;
  },
  getUserInfo:function(){
    return this.globalData.todo.userInfo;
  },
  getProjs: function () {
    return this.globalData.todo.projs;
  },
  setProjs: function (data) {
    var that = this;
    this.globalData.todo.projs = data;
    this.setLocal();
  },
  getProj:function(index){
    return this.globalData.todo.projs[index];
  },
  addProj:function(proj){
    this.globalData.todo.projs.push(proj);
    this.setLocal();
  },
  editProj:function(index,proj){
    this.globalData.todo.projs[index] = proj;
    this.setLocal();
  },
  //缓存操作
  setLocal:function(){
    let todo = this.getTodo();
    wx.setStorage({
      key: 'todoList',
      data: todo
    })
  },
  //数据统计和计算
  computeProcess:function(index){
    const that = this;
    if(index){
      
    }
    let proj = that.globalData.todo.projs[index];

  }
})