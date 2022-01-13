// pages/dp/dp.js
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
        rmbs:"",
        list: [],
        list_id:''
    },
    bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
          index: e.detail.value
        })
    },
    bindPickerChange1: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
          index1: e.detail.value
        })
    },
    input(e) {
      console.log(e)
      this.search(e.detail.value)
    },
    //点击完成按钮时触发
    confirm(e) {
      this.search(e.detail.value)
    }, 
    search(key) {
      var that = this;
      //从本地缓存中异步获取指定 key 的内容
      var list = wx.getStorage({
        key: 'list',
        //从Storage中取出存储的数据
        success: function (res) {
          // console.log(res)
          if (key == '') { //用户没有输入时全部显示
            that.setData({
              list: res.data
            })
            return;
          }
          var arr = []; //临时数组，用于存放匹配到的数组
          for (let i in res.data) {
            res.data[i].show = false; //所有数据隐藏
            if (res.data[i].name.indexOf(key) >= 0) {
              res.data[i].show = true; //让匹配到的数据显示
              arr.push(res.data[i])
            }
          }
          if (arr.length == 0) {
            that.setData({
              list: [{
                show: true,
                name: '没有相关数据！'
              }]
            })
          } else {
            that.setData({
              list: arr
            })
          }
        },
      })
    },
    bindPickerChange2: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
          index1: e.detail.value
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.setData({
        list_id:options.list_id
      })
      console.log( this.data.list_id),
        db.collection("dp").get().then(res=>{
            wx.setStorage({
                key: 'list',
                data: res.data
                })
              this.setData({
                list: res.data,
              })
             })
    },
    showbs:function(e){
      console.log(e.currentTarget.id)
      wx.navigateTo({
        url:'/pages/fbgl/fbgl?list_id='+e.currentTarget.id,
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