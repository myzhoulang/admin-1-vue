import { observable, action } from 'mobx';
import { enquireScreen } from '../Util/Util';

const padQuery = 'only screen and (min-width: 576px) and (max-width: 768px)';

class Store {
  @observable isMobile = false;
  @observable isPad = false;
  @observable siderCollapsed = false;

  constructor() {
    enquireScreen((mobile) => {
      this.setDeviceRatio('isMobile', mobile);
      if (mobile) {
        this.toggleSiderCollapsed(false);
      }
    });

    enquireScreen((pad) => {
      this.setDeviceRatio('isPad', pad);
    }, padQuery);
  }


  @action.bound
  setDeviceRatio(ratio, status) {
    this[ratio] = status;
  }

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
