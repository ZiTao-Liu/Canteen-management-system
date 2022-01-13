// pages/fbgl/fbgl.js
wx.cloud.init({
    env: 'ccntst-8gsp6zkw250f8e38',
    traceUser: true,
  })
  const db=wx.cloud.database()
  var myDate = new Date();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userid: '',
        list_id:'',
        rmb:''
    }, 

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            list_id:options.list_id
          })
          console.log( this.data.list_id)
        const app = getApp()
        var userid = app.globalData.userid
        this.setData({
            userid: userid,
        })
        db.collection("sp").where({sj:this.data.list_id}).get().then(res=>{
            console.log(res)
            this.setData({
              rmb:res.data
            })
        })
    },
    showsq: function () {
        wx.switchTab({
            url: '../my/my',
        })
    }, 
    addCart(res) {
        console.log(res)
            db.collection("dd").add({
                data: {
                    userid: this.data.userid,
                    sp: res.currentTarget.id,
                    _createTime: Date.parse(new Date()),
                    time: myDate.toLocaleString(),
                    xd:0,
                    qccg:0,
                }
            }).then(res => {
                wx.showToast({
                    title: '添加成功',
                    icon: 'success',
                    duration: 2000
                })
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