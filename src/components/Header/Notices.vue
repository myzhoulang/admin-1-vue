<template>
  <a-popover
    placement="topLeft"
    class="notice-index-popover-inner-content"
    trigger="click">
    <div slot="content">
      <div style="width: 340px">
        <a-tabs defaultActiveKey="1">
          <a-tab-pane tab="通知(2)" key="1">
            <a-list itemLayout="horizontal" :dataSource="data">
              <div class="components-notice-index-notice-list-clear" slot="footer">清空通知</div>
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a href="https://ant.design" slot="title">{{item.title}}</a>
                <a-list-item-meta :description="item.desc" >
                  <a-avatar slot="avatar" :src="item.avatar" />
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-tab-pane>
          <a-tab-pane tab="通知(2)" key="2">
            <a-list itemLayout="horizontal" :dataSource="data">
              <div class="components-notice-index-notice-list-clear" slot="footer">清空通知</div>
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a href="https://ant.design" slot="title">{{item.title}}</a>
                <a-list-item-meta :description="item.desc" >
                  <a-avatar slot="avatar" :src="item.avatar" />
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-tab-pane>
          <a-tab-pane tab="通知(2)" key="3">
            <a-list itemLayout="horizontal" :dataSource="data">
              <div class="components-notice-index-notice-list-clear" slot="footer">清空通知</div>
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a href="https://ant.design" slot="title">{{item.title}}</a>
                <a-list-item-meta :description="item.desc" >
                  <a-avatar slot="avatar" :src="item.avatar" />
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <a href="/" class="global-header-index-action">
      <a-icon class="bell" type="bell"></a-icon>
    </a>
  </a-popover>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import { Icon, Tabs, Popover, List, Avatar } from 'ant-design-vue';

import dingding from '../../assets/images/dingding.png';
import message from '../../assets/images/message.png';
import plus from '../../assets/images/plus.png';
import star from '../../assets/images/star.png';

const { TabPane } = Tabs;
const { Item } = List;
const { Meta } = Item;

Vue.component(Icon.name, Icon);
Vue.component(Tabs.name, Tabs);
Vue.component(Popover.name, Popover);
Vue.component(List.name, List);
Vue.component(Avatar.name, Avatar);
Vue.component(TabPane.name, TabPane);
Vue.component(Item.name, Item);
Vue.component(Meta.name, Meta);

@Component
export default class Notices extends Vue {
  data = [
    {
      avatar: message,
      title: '您收到14份简历',
      desc: 'a years ago',
    },
    {
      avatar: dingding,
      title: 'Ant Design Title 2',
      desc: 'a years ago',
    },
    {
      avatar: plus,
      title: 'Ant Design Title 3',
      desc: 'a years ago',
    },
    {
      avatar: star,
      title: 'Ant Design Title 4',
      desc: 'a years ago',
    },
  ];
}

</script>

<style scoped lang="less">
  .notice-index-popover-inner-content {
    .ant-popover-inner-content{
      padding: 0;
    }
    .ant-list-item {
      padding-left: 24px;
      padding-right: 24px;
    }
  }
  .global-header-index-action{
    font-size: 18px;

    .bell{
      vertical-align: middle;
    }
  }
  .components-notice-index-notice-list-clear{
    cursor: pointer;
    text-align: center;
    color:  #1890ff;
  }
</style>
