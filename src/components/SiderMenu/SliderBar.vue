<template>
  <a-layout-sider
    :width="256"
    :trigger="null"
    breakpoint="xl"
    v-model="store.siderCollapsed"
    collapsible
  >
    <div class="sider-menu-index-logo" key="logo" id="logo">
      <img :src="logo" alt="logo" />
      <h1>孚临风控商户中心</h1>
    </div>
    <BaseMenu :siderCollapsed="store.siderCollapsed"/>
  </a-layout-sider>
</template>

<script>
import { Vue, Component, Inject } from 'vue-property-decorator';
import { observer } from 'mobx-vue';

import logo from '../../assets/svg/logo.svg';
import BaseMenu from './BaseMenu';

@observer
@Component({
  components: {
    BaseMenu,
  },
})
export default class SliderBar extends Vue {
  @Inject() store;
  logo = logo;
}
</script>

<style lang="less" scoped>

  .sider-menu-index-logo {
    background-color: #002140;
    height: 64px;
    overflow: hidden;
    position: relative;
    line-height: 64px;
    transition: all .3s;
    padding-left: 24px;

    img {
      height: 32px;
      vertical-align: middle;
      display: inline-block;
    }

    h1 {
      color: #fff;
      display: inline-block;
      font-size: 20px;
      font-weight: 600;
      margin: 0 0 0 12px;
      vertical-align: middle;
    }
  }
</style>
