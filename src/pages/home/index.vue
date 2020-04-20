<template>
  <div class="step-list-wrap">
    <photoWall></photoWall>
    <stepList :showAuthorize="showAuthorize"></stepList>
    <div style="text-align: center;margin: 10px;">
      <div v-if="loading">加载中...</div>
      <div v-if="noMore">到底啦~</div>
      <div v-if="loadingFailed">数据加载失败,请重试</div>
    </div>
  </div>
</template>

<script>
import photoWall from "./photoWall";
import stepList from "./stepList";
import { mapState } from "vuex";
export default {
  components: {
    photoWall,
    stepList
  },
  computed: {
    ...mapState({
      StepData: state => state.home.StepData
    })
  },
  data() {
    return {
      pageNo: 1,
      loading: false,
      noMore: false,
      loadingFailed: false
    };
  },
  onReachBottom() {
    this.pageNo = this.pageNo + 1;
    if (this.pageNo <= this.StepData.pages) {
      this.loading = true;
      this.$store
        .dispatch("getStep", { current: this.pageNo })
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
          this.loadingFailed = true;
        });
    } else {
      this.noMore = true;
      console.log("触底了");
    }
  },
  methods: {
    getRunData() {
      wx.getWeRunData({
        success: rundata => {
          console.log("成功了", rundata);
          this.$store.dispatch("getUserStep", {
            encryptedData: rundata.encryptedData,
            iv: rundata.iv
          });
          this.$store.dispatch("getStep", { current: 1 });
          this.showAuthorize = false;
        },
        fail: err => {
          console.log("失败了", err);
          this.$store.dispatch("getStep", { current: 1 });
          this.showAuthorize = true;
        }
      });
      console.log("getUserInfo成功了");
    }
  },
  onShow() {
    wx.pageScrollTo({
      scrollTop: 0
    });
    this.pageNo = 1;
    this.loading = false;
    this.noMore = false;
    this.loadingFailed = false;
    this.getRunData();
  }
};
</script>
<style lang="less">
.step-list-wrap {
  width: 100%;
  height: 100vh;
}
</style>
