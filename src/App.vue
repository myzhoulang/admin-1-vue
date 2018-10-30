<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import '@/assets/less/index.less';
import { Vue, Component, Provide } from 'vue-property-decorator';
import {
  Alert,
  DatePicker,
  Layout,
  Table,
  Card,
  Drawer,
  Form,
  Menu,
  Row,
  Col,
  Input,
  AutoComplete,
  Select,
  Checkbox,
  Radio,
  Button,
  Icon,
  Spin,
  Avatar,
  Tooltip,
  Dropdown,
  Modal,
  Divider } from 'ant-design-vue';

import store from './store';

Vue.use(Layout);
Vue.use(Table);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Drawer);
Vue.use(Menu);

Vue.use(Form);
Vue.use(Input);
Vue.use(AutoComplete);
Vue.use(Select);
Vue.use(Checkbox);
Vue.use(Radio);
Vue.use(Button);

Vue.use(Icon);
Vue.use(Divider);
Vue.use(Spin);
Vue.use(Modal);
Vue.use(Avatar);
Vue.use(Tooltip);
Vue.use(Dropdown);
Vue.use(Alert);

Vue.use(DatePicker);
Vue.prototype.$confirm = Modal.confirm;
@Component
export default class App extends Vue {
  @Provide() store = store
}
</script>

<style scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>

