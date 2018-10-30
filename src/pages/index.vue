<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-drawer
      v-if="store.isMobile"
      :visible="!store.siderCollapsed"
      :closable="false"
      placement="left"
      wrapClassName="drawer"
      @close="onClose">
      <SiderMenu
        :style="{height: '100%'}"
        :collapsed=" false" />
    </a-drawer>

    <SiderMenu
      :style="{height: '100%'}"
      :collapsed="store.siderCollapsed" v-else/>

    <a-layout>
      <Header />
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px' }">
        <div :style="{margin: '-24px -24px 0'}">
          <router-view />
        </div>
      </a-layout-content>
      <Footer />
    </a-layout>
  </a-layout>
</template>

<script>
import { Vue, Component, Inject } from 'vue-property-decorator';
import { observer } from 'mobx-vue';

import SiderMenu from '../components/SiderMenu';
import Header from '../components/Header';
import Footer from '../components/Footer';

@observer
@Component({
  components: {
    SiderMenu,
    Header,
    Footer,
  },
})
export default class Admin extends Vue {
  @Inject() store;
  onClose() {
    this.store.toggleSiderCollapsed(true);
  }
}
</script>

<style lang="less" scoped>

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
  }

  #components-layout-demo-custom-trigger{
    height: 100%;
  }
</style>

