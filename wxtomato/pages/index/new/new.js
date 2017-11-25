import target from "../../../utils/target.js";
import icon from "../../../utils/icon.js"
let app = getApp();
Page({
  data: {
    isFrequent: false,
    btn:'run',
    id:'',
    time:40,
    name:'',
    des:'',
    count:0,
    target:target.STUDY,
    ico:"study"
  },
  onLoad: function (options) {
    if (options.type=="list"){
      this.setData({
        isFrequent:true,
        btn: 'save'
      })
    }
    let date = new Date();
    let id = "ID" + date.getTime().toString() + Math.floor((Math.random()*1000)).toString();
    this.setData({
      id
    })
  },
  setIsFrequent:function(event){
    let isFrequent = event.detail.value;
    this.setData({
      isFrequent
    })
  },
  setTarget:function(event){
    let target=event.currentTarget.dataset.target;
    let ico = icon[target-1];
    this.setData({
      target,
      ico
    });
  },
  setTime:function(event){
    let time = event.detail.value;
    this.setData({
      time
    });
  },
  setName: function (event) {
    let name = event.detail.value;
    this.setData({
      name
    });
  },
  setDes: function (event) {
    let des = event.detail.value;
    this.setData({
      des
    });
  },
  newSubmit:function(){
    if (this.data.isFrequent== true){
      let frequent = app.getFrequent();
      let newTomato = {
        id: this.data.id,
        time:this.data.time,
        name: this.data.name,
        des: this.data.des,
        ico: this.data.ico,
        count: this.data.count,
        target: this.data.target
      }
      frequent.push(newTomato);
      app.setFrequent(frequent)
      let runningUrl = `../running/running?from=list&list=frequent&index=last`;
      this.data.btn == 'save' ? wx.navigateBack({
        delta: 1
      }) : wx.redirectTo({
          url: runningUrl
      });
    }else{
      let runningUrl = `../running/running?fromList=false&time=${this.data.time}&target=${this.data.target}`;
      wx.navigateTo({
        url: runningUrl
      })
    }
  }
})