let app = getApp();
Page({
  data: {
    listType:'recommend'
  },
  onLoad: function (options) {
    let listType = options.type;
    this.setData({
      listType
    })
  },
  onShow:function(){
    let data=null;
    if (this.data.listType=="frequent"){
      console.log('a');
      data = app.getFrequent()
    } else {
      data = app.getRecommend();
    }
    this.setData({
      data
    })
  },
  addNewTomato:function(){
    wx.navigateTo({
      url:'../new/new?type=list'
    })
  },
  moveLeft:function(event){
    console.log(event);
  }
})