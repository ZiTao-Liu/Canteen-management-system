// pages/gltl/gltl.js
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
        rmbs:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        db.collection("glpj").get().then(res=>{
            console.log(res)
            this.setData({
              rmbs:res.data
            })
             })
    },
    showbs:function(e){
        console.log(e.currentTarget.id)
        wx.navigateTo({
          url:'/pages/glxq/glxq?list_id='+e.currentTarget.id,
      })
    },
    showtl:function(e){
      wx.navigateTo({
        url:'/pages/fbpl/fbpl',
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