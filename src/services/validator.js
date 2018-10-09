const phone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$/;
export default {
  phone: [
    { required: true, message: '请输入您的手机号!' },
    { type: 'number', pattern: phone, message: '请输入正确的邮箱!' },
  ],
  email: [{ required: true, message: '请输入您的邮箱账号!' }, { type: 'email', message: '请输入正确的邮箱!' }],
  user: [],
  // 必填
  require(msg) {
    return { required: true, message: msg };
  },
};
