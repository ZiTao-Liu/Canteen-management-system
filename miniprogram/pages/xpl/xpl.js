// pages/xpl/xpl.js
wx.cloud.init({
    env: 'ccntst-8gsp6zkw250f8e38',
    traceUser: true,
})
const db = wx.cloud.database()
var myDate = new Date();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list_id: "",
        userid: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            list_id: options.list_id
        })
        console.log(this.data.list_id)
        const app = getApp()
        var userid = app.globalData.userid
        this.setData({
            userid: userid,
        })
    },
    showsq: function () {
        wx.switchTab({
            url: '../my/my',
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    btnSub(res) {

        if (res.detail.value.text != '' && res.detail.value.username != '') {
            var {
                text,
                username
            } = res.detail.value;
            db.collection("glplgl").add({
                data: {
                    user: this.data.userid,
                    text: text,
                    plwz: this.data.list_id,
                    username: username,
                    data: myDate.toLocaleString(),
                    _createTime: Date.parse(new Date()),
                }
            }).then(res => {
                wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 2000
                })
            })
        } else {
            wx.showToast({
                title: '请填写信息',
                icon: 'error',
                duration: 2000
            })
        }
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