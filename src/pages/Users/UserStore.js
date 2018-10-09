/* eslint-disable class-methods-use-this */
import { action } from 'mobx';
import axios from 'axios';

class UserStore {
  @action
  getUsers(params) {
    return axios.get('/api/users', { params });
  }

  @action
  getUser(id) {
    return axios.get(`/api/users/${id}`);
  }
}

export default new UserStore();
