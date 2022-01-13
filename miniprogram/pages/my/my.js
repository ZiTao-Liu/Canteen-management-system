// pages/my/my.js
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        username:"",
        openid: '',
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
     
    },
    getUserInfo(e){
        console.log(e);
        this.setData({
          username:e.detail.userInfo.nickName 
      })
      },
      getopenid(){
        var that=this;
        wx.cloud.callFunction({
          name: 'open',
          success:(res)=> {
            var usid = res.result.openid
            console.log(usid)
            this.setData({
              openid:res.result.openid,
            })
            getApp().globalData. userid=res.result.openid
          },
          fail(res) {
            console.log("获取失败", res);
          }
        })
      },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    showgywm:function(e){
        wx.navigateTo({
          url: '../gywm/gywm',
        })
      },
      showgyqfk:function(e){
        wx.navigateTo({
          url: '../yjfk/yjfk',
        }) 
      },
      showgbzzx:function(){
        wx.navigateTo({
          url: '../buzx/buzx',
        })
      },
      showgsj:function(e){
        if(e.currentTarget.id!=''){
          wx.navigateTo({
            url: '../sjgl/sjgl',
          })}else{
            wx.showToast({
              title: '未有权限请登录',
              icon: 'loading',
              duration: 2000 
            })}
      },
      showgrzl:function(e){
        if(e.currentTarget.id!=''){
        console.log(e.currentTarget.id);
        var openidto=e.currentTarget.id
        wx.navigateTo({
          url: '../grxx/grxx? list_id= '+openidto,
        })}else{
          wx.showToast({
            title: '请登录',
            icon: 'loading',
            duration: 2000
          })}
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

    },
    onShareAppMessage() {
      const promise = new Promise(resolve => {
        setTimeout(() => {
          resolve({
            title: '自定义转发标题'
          })
        }, 2000)
      })
      return {
        title: '自定义转发标题',
        path: '/ineex/index',
        promise 
      }
    },
    onShareTimeline:function(){
      title: '自定义转发标题'
    }
})