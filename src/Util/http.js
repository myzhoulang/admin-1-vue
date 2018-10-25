import axios from 'axios';
import Util from './Util';
import router from '../router';
import Cookie from './Cookie';

const http = axios.create({
  timeout: 80000, //  超时时间
  baseURL: '/api',
  // withCredentials: true, //  发送跨域请求
  headers: {
    post: { 'Content-Type': 'application/json' }, // 设置请求
  },
});

http.interceptors.request.use((conf) => {
  const config = conf;
  config.headers.token = Cookie.get('token');
  if (typeof config.params === 'object') {
    // 过滤一些类型为字符串 值为空的字段
    config.params = Util.filterObjectStringEmpty(config.params);
  }
  return config;
});
http.interceptors.response.use((response) => {
  const data = response.data || {};
  return Promise.resolve(data);
}, ({ response }) => {
  // 处理异常
  if (response.status === 401) {
    Cookie.remove('token');
    const href = window.location.href;
    const sso = process.env.sso;
    window.location.href = `${sso}/login?url=${href}`;
  } else if (response.status === 403) {
    router.push({ name: '403.admin' });
  }
});

export default http;
