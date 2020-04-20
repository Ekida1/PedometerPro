<script>
export default {
  created() {
    console.log("create..");
  },
  data() {
    return {};
  }
};
</script>
<style>
@import "./../static/fonts/iconfont.css";
@import "./components/dialog/dialog.wxss";
</style>
<style lang="less">
//公共样式
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
.gutter-h-lg {
  margin: 30rpx auto;
}
.van-tabs__line {
  background-color: @primary-color !important;
}
.van-tabbar--fixed {
  position: static !important;
}
.van-sidebar {
  height: 100%;
  background-color: #f8f8f8;
}
.van-dialog__header {
  color: #333;
}
.van-button--primary {
  background: linear-gradient(to right, @primary-color-6, @primary-color-8);
  border: 0 !important;
  background-color: transparent !important;
  color: #ffffff !important;
  .van-button__text {
    color: #ffffff !important;
  }
  font-family: Monospaced Number, Chinese Quote, -apple-system,
    BlinkMacSystemFont, Segoe UI, Roboto, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif !important;
}
.dialog-index--van-dialog__confirm {
  .van-button__text {
    color: @primary-color !important;
  }
}
.van-button--small {
  font-size: 15px !important;
  padding: 0 14px !important;
}
.van-icon-description {
  color: @primary-color !important;
}
.van-picker__cancel,
.van-picker__confirm {
  color: @primary-color !important;
}
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
::-webkit-scrollbar {
  display: none;
}
.inline-block {
  display: inline-block;
}
.selectGroup {
  .service-title {
    font-size: 30rpx;
    margin: 20rpx 0 15rpx 0;
  }
  .service-item {
    padding: 12rpx 25rpx;
    border-radius: 20rpx;
    border: 1px solid #e4e4e4;
    text-align: center;
    font-size: 12px;
    margin: 10rpx 10rpx;
    color: #7d7e80;
    display: inline-block;
  }
  .active {
    border-color: @primary-color-6;
  }
}
textarea,
.placeholder-wrap {
  background: #f6f7fb;
  height: 170rpx;
  border-radius: 20rpx;
  width: 100%;
  font-size: 28rpx;
  padding: 30rpx;
  box-sizing: border-box;
}
.placeholder-wrap {
  padding-top: 29rpx;
}
.placeholder {
  color: #7d7e80;
}
scroll-view {
  -webkit-overflow-scrolling: touch;
}
</style>
