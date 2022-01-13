// pages/fbpl/fbpl.js
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
        files: []
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
        wx.cloud.init({
            traceUser: true
          })
      
          this.setData({
            selectFile: this.selectFile.bind(this),
            uplaodFile: this.uplaodFile.bind(this)
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    formInputChange(e) {
        const {
          field
        } = e.currentTarget.dataset
        this.setData({
          [`formData.${field}`]: e.detail.value
        })
      },
      formplInputChange(e) {
        console.log(e)
        this.setData({
          palce: e.detail.value
        })
      },
      formwtInputChange(e) {
        console.log(e)
        this.setData({
          wt: e.detail.value
        })
      },
      submitForm(e) {
            this.setData({
              name: this.data.formData.name,
              phone: this.data.formData.mobile,
              tsbm: this.data.tsbmun,
            })
            if(this.data.wt.length>10 && this.data.openid!='')
            {
              db.collection('glpj').add({
                // data 字段表示需新增的 JSON 数据
                data: {
                  title: this.data.name,
                  user: this.data.mobile,
                  xq: this.data.wt,
                  phpto:this.data.files,
                  userid: this.data.openid,
                  time: Date.parse(new Date()),
                  _createTime: Date.parse(new Date()),
                  lll:0,
                }
              })
              wx.reLaunch({
                  url: '../gltl/gltl',
                  success: (res)=> {
                    wx.showToast({
                      title: '完成',
                      success:(res)=>{
                        wx.navigateTo({
                          url: '../index/index',
                        })
                      }
                    })
                  }
                })
            }else{
              wx.showToast({
                title: '描述',
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
    showsq: function () {
      wx.switchTab({
          url: '../my/my',
      })
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
    chooseImage: function (e) {
        var that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    files: that.data.files.concat(res.tempFilePaths)
                });
            }
        })
    },
    previewImage: function(e){
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: this.data.files // 需要预览的图片http链接列表
        })
    },
    selectFile(files) {
        console.log('files', files)
        // 返回false可以阻止某次文件上传
    },
    uplaodFile(files) {
        console.log('upload files', files)
        console.log('upload files', files)
        // 文件上传的函数，返回一个promise
        return new Promise((resolve, reject) => {
          const tempFilePaths = files.tempFilePaths;
          //上传返回值
          const that = this;
          const object = {};
          for (var i = 0; i < tempFilePaths.length; i++) {
            let filePath = '',cloudPath = ''
            filePath = tempFilePaths[i]
            // 上传图片
            // cloudPath 最好按时间 遍历的index来排序，避免文件名重复
            cloudPath = 'blog-title-image-' + new Date().getTime() + '-' + i + filePath.match(/\.[^.]+?$/)[0]
    
            console.log(filePath)
            console.log(cloudPath)
            const upload_task = wx.cloud.uploadFile({
              filePath, 
              cloudPath, 
              success: function(res) {
                console.log(res)
                // 可能会有好几个200+的返回码，表示成功
                if (res.statusCode === 200  || res.statusCode === 204 || res.statusCode === 205) {
                  const url = res.fileID
                  that.data.files.push(url)
                  if (that.data.files.length === tempFilePaths.length) {
                    object.urls = that.data.files;
                    resolve(object)  //这就是判断是不是最后一张已经上传了，用来返回，
                  }
                } else {
                  reject('error')
                }
              },
              fail: function(err) {
                console.log(err)
              }, 
              conplete: () => {
                
              }
            })
          }
        })
        // 文件上传的函数，返回一个promise
    },
    uploadError(e) {
        console.log('upload error', e.detail)
    },
    uploadSuccess(e) {
        console.log('upload success', e.detail)
    }
});