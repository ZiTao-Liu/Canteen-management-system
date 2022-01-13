// pages/xgxx/xgxx.js
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
      userid:''
    },
    formSubmit(e) {
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
      console.log(this.data.userid)
      if(e.detail.value.mc!=''){
      db.collection('people').where({userid:this.data.userid}).update({
        // data 传入需要局部更新的数
        data: {
          name:e.detail.value.name,
          xy:e.detail.value.xy,  
          dz:e.detail.value.dz,
          tel:e.detail.value.tel,
        },
        success: function(res) {
          wx.switchTab({
            url: '../my/my',
          })
        }
      })
    }
      else{
        wx.showToast({
          title: '请填写后提交',
          icon: 'loading',
          duration: 1500
      })
      }
     
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