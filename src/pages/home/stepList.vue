<template>
  <ul class="step-ul">
    <li class="step-li mine" v-if="!shows">
      <div class="rank-num" style="visibility:hidden">0</div>
      <img class="avatar" :src="myUserInfo.avatarUrl" />
      <div class="center">
        <div class="name">{{myUserInfo.username}}</div>
        <div class="mine-rank">第{{UserStepInfo.stepRank}}名</div>
      </div>
      <div class="step-number">{{UserStepInfo.step}}</div>
    </li>
    <button
      v-if="shows"
      size="mini"
      class="authorize-btn"
      type="primary"
      @click="openSetting"
      bindopensetting="openSetting"
    >授权获取微信运动步数</button>
    <li class="step-li friends" v-for="item in StepInfoList" :key="item.rank">
      <div class="rank-num">{{item.rank}}</div>
      <img class="avatar" :src="item.avatarUrl" />
      <div class="center">
        <div class="name">{{item.userName}}</div>
      </div>
      <div class="step-number">{{item.step}}</div>
    </li>
  </ul>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: { showAuthorize: Boolean },
  watch: {
    showAuthorize(bool) {
      console.log("watch");
      this.shows = bool;
    }
  },
  data() {
    return {
      shows: false
    };
  },
  computed: {
    ...mapState({
      myUserInfo: state => state.home.myUserInfo,
      StepInfoList: state => state.home.StepInfoList,
      UserStepInfo: state => state.home.UserStepInfo
    })
  },
  methods: {
    openSetting() {
      wx.openSetting({
        success(res) {
          console.log("成功了", rundata);
          wx.reLaunch({
            url: "/pages/home/index"
          });
        }
      });
    }
  }
};
</script>
<style lang="less">
.step-ul {
  background-color: #f3f3f3;
  .mine {
    margin-bottom: 12rpx;
  }
  .friends {
    border-bottom: 1rpx solid #f5f5f5;
  }
  .step-li {
    background-color: #fffdfd;
    display: flex;
    align-items: center;
    padding: 20rpx 50rpx;
    .rank-num {
      width: 40rpx;
      text-align: right;
    }
    .avatar {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
      margin: 0 20rpx;
    }
    .name {
      font-size: 26rpx;
    }
    .mine-rank {
      font-size: 24rpx;
      color: #999999;
    }
    .step-number {
      flex: 1;
      text-align: right;
    }
  }
  .step-li:after {
    content: "";
    width: 1px;
    height: 40px;
    background-color: #dbdbdb;
    position: absolute;
    left: -9px;
    top: 12px;
  }
  .authorize-btn {
    width: 100%;
    height: 110rpx;
    line-height: 110rpx;
    font-size: 29rpx;
  }
}
</style>
