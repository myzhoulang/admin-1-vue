<template>
  <a-menu
    :style="{ padding: '16px 0', width:'100%'}"
    :defaultSelectedKeys="['1']"
    :defaultOpenKeys="getOpenKeys()"
    :inlineCollapsed="false"
    :selectedKeys="selectedKeys"
    @click="setCurrentPaths"
    theme="dark"
    mode="inline"
    >
    <a-sub-menu key="sub1">
      <span slot="title"><a-icon type="dashboard" /><span>实时监控</span></span>
      <a-menu-item key="1"><router-link to="/admin/dashboard">风控大盘</router-link></a-menu-item>
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
      <a-menu-item key="9"><span>订单记录</span></a-menu-item>
      <a-menu-item key="10"><span>数据统计</span></a-menu-item>
    </a-sub-menu>

    <a-sub-menu key="sub5">
      <span slot="title"><a-icon type="database" /><span>数据中心</span></span>
      <a-menu-item key="9"><span>风控报告</span></a-menu-item>
    </a-sub-menu>

    <a-sub-menu key="sub6">
      <span slot="title"><a-icon type="laptop" /><span>控制中心</span></span>
      <a-menu-item key="9"><span>风控报告</span></a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script>
import { Vue, Component, Inject } from 'vue-property-decorator';
import { observer } from 'mobx-vue';

@observer
@Component
export default class BaseMenu extends Vue {
  @Inject() store;

  selectedKeys = [];
  openKeys = [];

  // 设置当前选中的那一个路由
  setCurrentPaths({ key }) {
    this.selectedKeys = [key];
  }

  // 获取到当前打开的那一层
  getOpenKeys() {
    const { fullPath } = this.$route;
    const paths = {
      sub1: ['/admin/dashboard'],
      sub3: ['/admin/users', '/admin/orders'],
    };
    const keys = Object.keys(paths);
    for (const item of keys) {
      if (paths[item].find(k => k === fullPath)) {
        return [item];
      }
    }
    return [];
  }
  mounted() {
    this.selectedKeys = [this.$route.fullPath];
  }
}
</script>

<style scoped>

</style>
