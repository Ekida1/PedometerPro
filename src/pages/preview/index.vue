<template>
  <div class="wrapper">
    <image class="img" src="/static/img/cover.jpg" mode="aspectFill" />
    <button
      v-if="isShowBtn"
      size="mini"
      class="btn"
      type="primary"
      open-type="getUserInfo"
      @click="bindGetUserInfo"
    >授权登录</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowBtn: false
    };
  },
  methods: {
    bindGetUserInfo() {
      wx.getUserInfo({
        success: res => {
          wx.setStorageSync("setWXUserInfo", JSON.stringify(res));
          this.GotoHome().then(() => {
            wx.reLaunch({
              url: "/pages/home/index"
            });
          });
        }
      });
    },
    GotoHome() {
      return new Promise((resolve, rej) => {
        const userInfo = JSON.parse(wx.getStorageSync("setWXUserInfo"));
        this.isShowBtn = false;
        this.$store
          .dispatch("getUserInfo", {
            encryptedData: userInfo.encryptedData,
            iv: userInfo.iv,
            rawData: userInfo.rawData,
            signature: userInfo.signature
          })
          .then(() => {
            resolve();
          })
          .catch(() => {
            console.log("getUserInfo失败了,准备重新取token");
            wx.login({
              success: res => {
                console.log("登录了..", res);
                this.$store
                  .dispatch("login", {
                    code: res.code
                  })
                  .then(() => {
                    this.isShowBtn = true;
                    console.log("token失效,请重新点击按钮");
                    rej();
                  });
              }
            });
          });
      });
    },
    wxLogin() {
      this.isShowBtn = true;
      wx.login({
        success: res => {
          console.log("登录了..", res);
          this.$store.dispatch("login", {
            code: res.code
          });
        }
      });
    }
  },
  onShow() {
    if (wx.getStorageSync("setWXUserInfo")) {
      let that = this;
      wx.checkSession({
        success() {
          that.GotoHome().then(() => {
            setTimeout(function() {
              wx.reLaunch({
                url: `/pages/home/index`
              });
            }, 1400);
          });
        },
        fail() {
          that.wxLogin();
        }
      });
    } else {
      this.wxLogin();
    }
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 100vh;
  .img {
    width: 100%;
    height: 100vh;
  }
  .btn {
    font-size: 29rpx;
    height: 90rpx;
    line-height: 90rpx;
    width: 30%;
    position: absolute;
    left: 0;
    right: 0;
    top: 56%;
    bottom: 0;
    margin: 0 auto;
    z-index: 10;
  }
}
</style>
