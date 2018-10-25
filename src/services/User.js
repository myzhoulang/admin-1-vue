import http from '../Util/http';

export default class UserService {
  // 用户状态
  userStatus = [];

  /**
   * 查询用户列表
   * @param params
   * @returns {Promise}
   */
  getUsers(params = {}) {
    return http.get('/users', { params });
  }

  /**
   * 根据 ID 获取用户详情
   * @param id
   * @returns {Promise}
   */
  getUser(id) {
    return http.get(`/users/${id}`);
  }
}
