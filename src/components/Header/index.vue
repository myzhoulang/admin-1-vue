<template>
  <a-layout-header class="header">
    <div class="global-header-index-header">
      <a-icon
        class="trigger"
        :type="store.siderCollapsed ? 'menu-unfold' : 'menu-fold'"
        @click="store.toggleSiderCollapsed"
      />

      <!--全屏-->
      <div class="global-header-index-right">
        <a href="/" class="global-header-index-action">
          <a-icon type="arrows-alt" />
        </a>

        <!--帮助-->
        <a-tooltip>
          <template slot="title">
            <span>使用文档</span>
          </template>
          <a href="/" class="global-header-index-action">
            <a-icon type="question-circle" />
          </a>
        </a-tooltip>

        <!--通知-->
        <Notices />

        <!--登录用户-->
        <a-dropdown>
          <span class="global-header-index-action">
            <a-avatar size="small" :src="userAvatar" class="global-header-index-avatar" alt="" />
            <span>zhoulang</span>
          </span>

          <a-menu slot="overlay">
            <a-menu-item key="1"><a-icon type="user"/>个人中心</a-menu-item>
            <a-menu-item key="2"><a-icon type="setting"/>个人设置</a-menu-item>
            <a-menu-divider />

            <a-menu-item key="3" @click="logout">
              <a-icon type="logout"/>退出登录
            </a-menu-item>
          </a-menu>
        </a-dropdown>

        <!--语言切换-->
        <a-button size="small" style="margin: 0 8px;">English</a-button>
      </div>
    </div>
  </a-layout-header>
</template>

<script>
import { Vue, Component, Inject } from 'vue-property-decorator';
import { observer } from 'mobx-vue';

import Notices from './Notices';
import userAvatar from '../../assets/images/user.png';

@observer
@Component({
  components: {
    Notices,
  },
})
export default class HeaderView extends Vue {
  userAvatar = userAvatar;
  isMobile = false;
  @Inject() store

  logout() {
    this.$router.push('/login');
  }
}
</script>

<style scoped lang="less">

  .header {
    padding: 0;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    .trigger {
      font-size: 18px;
      line-height: 64px;
      padding: 0 24px;
      cursor: pointer;
      transition: color .3s;
    }
    .global-header-index-header {
      boxShadow: 0 1px 4px rgba(0,21,41,.08);
      height: 64px;
      padding: 0 12px 0 0;
      background-color: #fff;
      position: relative;
    }
    .global-header-index-right {
      float: right;
      line-height: 64px;
    }
    .global-header-index-action {
      padding: 0 12px;
      height: 100%;
      cursor: pointer;
      display: inline-block;
      transition: all .3s;
      &:hover {
         background: #e6f7ff;
       }
      > i {
        font-size: 18px;
        color: rgba(0, 0, 0, .65);
        vertical-align: middle;
      }
    }

    .global-header-index-avatar {
      margin: 0 8px;
      vertical-align: middle;
      color: #1890ff;
    }
  }

</style>
