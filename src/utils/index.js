
function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  // const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('-')
  const t2 = [hour, minute].map(formatNumber).join(':')

  return `${t1} ${t2}`
}
export const removeEmptyProperty = (obj, options = {}) => {
  for (let key in obj) {
    let val = obj[key];
    if (options.ignores && options.ignores.indexOf(key) !== -1) continue;
    if (options.trim !== false && typeof val === 'string') {
      val = val.trim();
    }
    if (null == val || '' === val) delete obj[key];
  }
  return obj;
};
// let env = 1; // 0为测试环境，1 为正式环境,page/qrPay生成二维码的也需要改!!!!!!!!!!
// export const host = (env === 1 ? 'https://miniqr.paycooplus.com/api/' : 'https://minibar.chinafintech.com.cn/api/')
export const host = 'https://www.yunzhouxifu.cn/api/';
export const imgBaseUrl = host + 'web/cms/file/download/';
export default {
  formatNumber,
  formatTime
}
export const getCookie = (cookies, name) => {//获取指定名称的cookie的值
  const arrStr = cookies.split("; ");
  for (let i = 0; i < arrStr.length; i++) {
    const temp = arrStr[i].split("=");
    if (temp[0] == name) {
      return decodeURI(temp[1]);
    }
  }
}

export const queryNodes = (id, attr) => {
  const query = wx.createSelectorQuery().in(this)
  query.select(id).boundingClientRect(function (rect) {
    console.log('rectrect111', rect)
  }).exec()
}

