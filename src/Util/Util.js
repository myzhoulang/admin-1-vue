import enquire from 'enquire.js';

export default class Util {
  // 过滤一个对象中类型为字符串的，并且值为空的字段
  static filterObjectStringEmpty(obj = {}) {
    const params = {};
    Object.entries(obj).forEach((item) => {
      let value = item[1];
      const key = item[0];
      // 过滤掉没有值的字符串类型的参数
      if (typeof value === 'string' && !value.trim()) {
        value = value.trim();
        return;
      }
      params[key] = value;
    });
    return params;
  }
}

const mobileQuery = 'only screen and (max-width: 575px)';

export function enquireScreen(cb, query = mobileQuery) {
  enquire.register(query, {
    match() {
      if (typeof cb === 'function') {
        cb(true);
      }
    },
    unmatch() {
      if (typeof cb === 'function') {
        cb(false);
      }
    },
  });
}
