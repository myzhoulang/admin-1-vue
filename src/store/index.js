import { observable, action } from 'mobx';

class Store {
  @observable siderCollapsed = false;

  @action.bound
  toggleSiderCollapsed(state) {
    if (typeof state === 'boolean') {
      this.siderCollapsed = state;
    } else {
      this.siderCollapsed = !this.siderCollapsed;
    }
  }
}

export default new Store();
