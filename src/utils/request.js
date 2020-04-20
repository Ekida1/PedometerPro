import { getCookie } from './index'
// let env = 1; // 0为测试环境，1 为正式环境
let host = '';
// if (env) {
//   host = 'https://miniqr.paycooplus.com/api/' //正式版本域名
// } else {
//   host = 'https://minibar.chinafintech.com.cn/api/' //体验版域名
// }
host = 'https://www.yunzhouxifu.cn/api/';
let SESSION = '';
function request(options) {
  return new Promise((resolve, reject) => {
    const option = {
      ...options,
      dataType: 'json',
      // responseType: 'json',
      url: host + options.url,
    };
    if (SESSION) {
      option.header.Cookie = `SESSION=${SESSION}`;
    }
    if (!option.header) {
      option.header = {}
    }
    wx.showLoading({
      title: 'loading',
    });
    wx.request({
      ...option,
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 400) {
          const data = res.data;
          if (data.code === 200) {
            resolve(data.data);
          } else {
            reject({
              message: `接口请求失败 [${data.code}]`,
              code: data.code,
              response: data
            })
          }
          wx.hideLoading()
        } else {
          reject({
            message: `微信请求超时，请求码： [${res.statusCode}]`,
            code: res.statusCode,
            response: res
          })
          wx.showToast({
            title: text,
            icon: 'none'
          })
        }
      },
      fail: function (err) {
        reject(err);
        const text = JSON.parse(JSON.stringify(error)).response.status === 404
          ? '404!'
          : '网络异常，请重试';
        wx.showToast({
          title: text,
          icon: 'none'
        })
      }
    })
  })
}


export const get = (url, params, headers = {}) => {
  return request({
    method: 'GET',
    url,
    data: params,
    header: headers
  })
}

export const post = (url, params, headers = {}) => {
  return request({
    method: 'POST',
    url,
    data: params,
    header: { ...headers, "Content-Type": "application/x-www-form-urlencoded" },
  })
}
