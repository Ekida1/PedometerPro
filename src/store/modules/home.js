import { imgBaseUrl } from "@/utils"
import { post, get } from "@/utils/request"
import { removeEmptyProperty } from "@/utils";
const state = {
  token: null,
  myUserInfo: {},
  StepInfoList: [],
  StepData: {},
  UserStepInfo: {},
}

const mutations = {
  setUserInfo(state, result) {
    state.myUserInfo = result;
  },
  setToken(state, result) {
    state.token = result;
  },
  setStepInfo(state, result) {
    state.StepData = result;
    if (result.current > 1) {
      state.StepInfoList.push(...result.records)
    } else {
      state.StepInfoList = result.records;
    }
  },
  setUserStepInfo(state, result) {
    state.UserStepInfo = result;
  },
}


const actions = {
  login({ commit }, params) {
    return new Promise((resolve, rej) => {
      get("user/login", params)
        .then(data => {
          console.log("成功了", data)
          wx.setStorageSync("token", data);
          commit("setToken", data);
          resolve();
        })
        .catch(err => {
          console.info('err==> \n', err)
          rej()
        })
    })
  },
  getUserInfo({ commit }, params) {
    return new Promise((resolve, rej) => {
      get("user/info", params, { Authorization: wx.getStorageSync("token") })
        .then(data => {
          commit("setUserInfo", data);
          resolve();
        })
        .catch(err => {
          console.info('err==> \n', err)
          rej()
        })
    })
  },
  getStep({ commit }, params) {
    return new Promise((resolve, rej) => {
      get("step", removeEmptyProperty({ ...params, size: 10 }), { Authorization: wx.getStorageSync("token") })
        .then(data => {
          commit("setStepInfo", data);
          resolve();
        })
        .catch(err => {
          console.info('err==> \n', err)
          rej()
        })
    })
  },
  getUserStep({ commit }, params) {
    return new Promise((resolve, rej) => {
      post("/user/step", params, { Authorization: wx.getStorageSync("token") })
        .then(data => {
          commit("setUserStepInfo", data);
          resolve();
        })
        .catch(err => {
          console.info('err==> \n', err)
          rej()
        })
    })
  }
}


export default {
  state,
  mutations,
  actions
}
