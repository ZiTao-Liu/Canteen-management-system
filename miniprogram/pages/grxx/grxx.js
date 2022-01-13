// pages/grxx/grxx.js
wx.cloud.init({
    env: 'ccntst-8gsp6zkw250f8e38',
  traceUser: true,
})
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:'',
    rmbs:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app = getApp()
    var  userid = app.globalData.userid
    this.setData({
      userid:userid,
    }) 
    db.collection("people").where({userid:userid}).get().then(res=>{
      console.log(res)
      this.setData({
        rmbs:res.data
      })
       })
  },
  showgrlw:function(){
    wx.navigateTo({
      url: '../grldt/grldt',
    })
  },
  showgrxg:function(){
    wx.navigateTo({
      url: '../xgxx/xgxx?openid='+this.data.userid,
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