<template>
  <a-menu
    :style="{ padding: '16px 0', width:'100%'}"
    :defaultSelectedKeys="['1']"
    :defaultOpenKeys="['sub1']"
    :inlineCollapsed="true"
    :openKeys="openKeys"
    :selectedKeys="selectedKeys"
    @click="setCurrentPaths"
    @openChange="onpenChange"
    theme="dark"
    mode="inline"
    >
    <a-sub-menu key="sub1">
      <span slot="title"><a-icon type="dashboard" /><span>实时监控</span></span>
      <a-menu-item key="/admin/dashboard">
        <router-link to="/admin/dashboard">风控大盘</router-link>
      </a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub2">
      <span slot="title"><a-icon type="solution" /><span>策略中心</span></span>
      <a-menu-item key="5"><span>业务配置</span></a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub3">
      <span slot="title"><a-icon type="team" /><span>管理中心</span></span>
      <a-menu-item key="9"><span>产品管理</span></a-menu-item>
      <a-menu-item key="/admin/users">
        <router-link to="/admin/users">用户管理</router-link>
      </a-menu-item>
      <a-menu-item key="11"><span>角色管理</span></a-menu-item>
      <a-menu-item key="12"><span>登录历史</span></a-menu-item>
    </a-sub-menu>

    <a-sub-menu key="sub4">
      <span slot="title"><a-icon type="usb" /><span>模型管理</span></span>
      <a-menu-item key="13"><span>订单记录</span></a-menu-item>
      <a-menu-item key="14"><span>数据统计</span></a-menu-item>
    </a-sub-menu>

    <a-sub-menu key="sub5">
      <span slot="title"><a-icon type="database" /><span>数据中心</span></span>
      <a-menu-item key="15"><span>风控报告</span></a-menu-item>
    </a-sub-menu>

    <a-sub-menu key="sub6">
      <span slot="title"><a-icon type="laptop" /><span>控制中心</span></span>
      <a-menu-item key="16"><span>风控报告</span></a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script>
import { Vue, Component, Inject, Watch } from 'vue-property-decorator';
import { observer } from 'mobx-vue';
import pathToRegexp from 'path-to-regexp';

@observer
@Component({
  props: {
    siderCollapsed: Boolean,
  },
})
export default class BaseMenu extends Vue {
  @Inject() store;

  selectedKeys = [];
  openKeys = [];
  cachedOpenKeys = [];
  rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6'];

  // 监测左侧栏展开显示的一个标识符
  // 在关闭状态下讲过openkeys 设置为空数组
  // 以解决在左侧栏收缩的时候二级菜单会展示在页面上
  @Watch('siderCollapsed')
  onSideeCollapsedChange(val) {
    if (val) {
      this.cachedOpenKeys = this.openKeys;
      this.openKeys = [];
    } else {
      this.openKeys = this.cachedOpenKeys;
    }
  }

  // 设置当前选中的那一个路由
  setCurrentPaths({ key }) {
    this.selectedKeys = [key];
  }

  // 获取到当前打开的那一层
  getMenuSelectKeys() {
    const { fullPath } = this.$route;
    const menusSelects = { openKeys: [], selectKeys: [] };
    const paths = [
      { path: '/admin/dashboard', parent: 'sub1' },
      { path: '/admin/users', parent: 'sub3' },
      { path: '/admin/users/:id', parent: 'sub3', key: '/admin/users' },
      { path: '/admin/orders', parent: 'sub3' },
    ];
    for (const item of paths) {
      if (pathToRegexp(item.path).test(fullPath)) {
        menusSelects.openKeys = [item.parent];
        menusSelects.selectKeys = [item.key || item.path];
        return menusSelects;
      }
    }
    return menusSelects;
  }

  onpenChange(openkeys) {
    const latestOpenkey = openkeys.find(key => this.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenkey) === -1) {
      this.openKeys = openkeys;
    } else {
      this.openKeys = latestOpenkey ? [latestOpenkey] : [];
    }
  }
  mounted() {
    const { openKeys, selectKeys } = this.getMenuSelectKeys();
    this.openKeys = openKeys;
    this.selectedKeys = selectKeys;
  }
}
</script>

<style scoped>

</style>
