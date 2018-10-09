<template>
  <div>
    <a-row :gutter="24">
      <a-col>
        <a-card :bordered="false">
          <a-tabs
            defaultActiveKey="salesVolume"
            :activeKey="currentActive"
            :tabBarStyle="{marginBottom: '24px', paddingLeft: '16px'}"
            @change="key => currentActive = key">
            <a-tab-pane tab="销售额" key="salesVolume">
              <!--销售-->
              <a-row :gutter="24">
                <a-col :span="16">
                  <BarChart title="销售额趋势" v-if="state === 'success'"/>
                </a-col>

                <a-col :span="8">
                  <h4>门店销售额排名</h4>
                  <ul class="ranks">
                    <li :key="rank.name" v-for="(rank, index) in ranks">
                      <span class="index" :class="{'hot': index <= 2}">{{index + 1}}</span>
                      <span class="name">{{rank.name}}</span>
                      <span>{{rank.total}}</span>
                    </li>
                  </ul>
                </a-col>
              </a-row>
            </a-tab-pane>
            <a-tab-pane  tab="访问量" key="pageView">
              <!--访问-->
              <a-row :gutter="24">
                <a-col :span="16">
                  <BarChart title="访问量趋势" v-if="state === 'success'"/>
                </a-col>

                <a-col :span="8">
                  <h4>门店访问量排名</h4>
                  <ul class="ranks">
                    <li :key="rank.name" v-for="(rank, index) in ranks">
                      <span class="index" :class="{'hot': index <= 2}">{{index + 1}}</span>
                      <span class="name">{{rank.name}}</span>
                      <span>{{rank.total}}</span>
                    </li>
                  </ul>
                </a-col>
              </a-row>
            </a-tab-pane>

            <div slot="tabBarExtraContent" class="sales-extra-wrap">
              <div class="sales-extra">
                <a class="active" href="#">今日</a>
                <a href="#">本周</a>
                <a href="#">本月</a>
                <a href="#">全年</a>
              </div>

              <div class="sales-pick">
                <a-range-picker @change="onChange" />
              </div>
            </div>
          </a-tabs>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="24">
      <a-col :xl="12" :md="24" :sm="24" :xs="24" :lg="24" >
        <a-card :style="{marginTop: '24px', minHeight: '509px'}" title="线上热门搜索" :bordered="false">
          <HotSearch/>

          <div style="padding: 5px 0;">
            <a-table size="small" :columns="columns" :dataSource="hotSearchData">
              <span slot="trend" slot-scope="text, record">
                {{text}}
                <a-icon :style="{fontSize: '10px', color:record.trend === 'up'?'red':'green'}"
                        :type="`caret-${record.trend}`" />
              </span>
            </a-table>
          </div>
        </a-card>
      </a-col>
      <a-col :xl="12" :md="24" :sm="24" :xs="24" :lg="24">
        <a-card :bordered="false" class="sales">
          <template slot="title">
            <div class="title">销售额类别占比</div>
            <a-radio-group @change="onChanelChange" v-model="chanel">
              <a-radio-button value="a">全部渠道</a-radio-button>
              <a-radio-button value="b">线上</a-radio-button>
              <a-radio-button value="c">门店</a-radio-button>
            </a-radio-group>
          </template>
          <h4>销售额</h4>
          <Pie  v-if="state === 'success'"/>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import BarChart from '@/components/charts/BarChart';
import HotSearch from './HotSearch';
import Pie from '../../components/charts/Pie';

const ranks = [];
for (let i = 0; i < 7; i += 1) {
  ranks.push({
    name: `工专路${i}号店`,
    total: 323234,
  });
}

const hotSearchData = [
  { sortIndex: 1, keyword: '搜索关键词-0', users: 661, increase: '40%', trend: 'up' },
  { sortIndex: 2, keyword: '搜索关键词-1', users: 661, increase: '40%', trend: 'down' },
  { sortIndex: 3, keyword: '搜索关键词-2', users: 661, increase: '40%', trend: 'up' },
  { sortIndex: 4, keyword: '搜索关键词-3', users: 661, increase: '40%', trend: 'up' },
  { sortIndex: 5, keyword: '搜索关键词-4', users: 661, increase: '40%', trend: 'down' },
];

@Component({
  components: {
    BarChart,
    HotSearch,
    Pie,
  },
})
export default class Dashboard extends Vue {
  state = 'pedding';
  ranks = ranks;
  chanel = 'a';
  columns = [
    {
      title: '排名',
      dataIndex: 'sortIndex',
    }, {
      title: '搜索关键词',
      dataIndex: 'keyword',
    }, {
      title: '用户数',
      sorter: true,
      dataIndex: 'users',
    }, {
      title: '周涨幅',
      sorter: true,
      align: 'right',
      scopedSlots: { customRender: 'trend' },
      dataIndex: 'increase',
    },
  ];
  hotSearchData = hotSearchData;

  data = [];

  tabList = [{
    key: 'salesVolume',
    tab: '销售额',
  }, {
    key: 'pageView',
    tab: '访问量',
  }];
  currentActive = 'salesVolume';

  value = 'a';

  mounted() {
    setTimeout(() => {
      this.state = 'success';
    }, 1000);
  }

  onChange() {
    console.log(this);
  }
}
</script>

<style lang='less' scoped>
  @import "~ant-design-vue/lib/style/themes/default";
  .ranks{
    margin: 25px 0;
    padding: 0;
    list-style: none;
    li {
      margin-top: 16px;
      display: flex;
      align-items: center;
    }

    .index{
      display: inline-block;
      font-weight: 600;
      margin-right: 16px;
      border-radius: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      margin-top: 1.5px;
      background-color: #f5f5f5;
      width: 20px;
      font-size: 12px;

      &.hot{
        background-color: #314659;
        color: #fff;
      }
    }

    .name{
      flex: 1 1;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;margin-right: 8px;
    }
  }

  .sales-extra-wrap{
    .sales-extra{
      display: inline-block;
      margin-right: 24px;

      a{
        color: rgba(0,0,0,.65);
        margin-left: 24px;

        &.active{
          color: @primary-color;
        }
      }
    }

    .sales-pick{
      display: inline-block;
      width: 256px;
    }
  }
  .sales{
    margin-top: 24px;
    .title{
      margin-bottom: 20px;
    }
  }

</style>
