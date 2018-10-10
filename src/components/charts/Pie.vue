<template>
  <div class="pie-chart" style="position: relative;">

    <a-row  type="flex" align="middle">
      <a-col :xs="24" :lg="13">
        <div>
          <v-chart :padding="padding" :forceFit="true" :height="height" :data="data" :scale="scale">
            <v-tooltip :showTitle="false" dataKey="item*percent" />
            <v-axis position="left" />
            <v-pie position="percent" color="item" :vStyle="pieStyle" />
            <v-coord type="theta" :radius="0.8" :innerRadius="0.7" />
            <v-legend container="#legend-container" :itemFormatter="itemFormatter" useHtml="true"/>
          </v-chart>
        </div>

        <div class="pie-total">
          <h4 class="sub-title"><span>销售额</span></h4>
          <p class="total"><span>¥15,781</span></p>
        </div>
      </a-col>
      <a-col :xs="24" :lg="11">
        <div id="legend-container"></div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

const DataSet = require('@antv/data-set');

const sourceData = [
  { item: '家用电器', count: 40, percent: '28.79%', price: '4,544' },
  { item: '食用酒水', count: 21, percent: '21.04%', price: '3,321' },
  { item: '个护健康', count: 17, percent: '19.73%', price: '3,113' },
  { item: '服饰箱包', count: 13, percent: '14.83%', price: '2,341' },
  { item: '母婴产品', count: 9, percent: '7.80%', price: '1,231' },
  { item: '其他', count: 9, percent: '7.80%', price: '1,231' },
];

const scale = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.0%',
}];

const dv = new DataSet.View().source(sourceData);
dv.transform({
  type: 'percent',
  field: 'count',
  dimension: 'item',
  as: 'percent',
});
const data = dv.rows;

@Component
export default class Pie extends Vue {
  height = 320;
  padding = [0, 0, 0, 0];
  data = data;
  scale = scale;
  pieStyle = {
    stroke: '#fff',
    lineWidth: 5,
  };

  itemFormatter = (value) => {
    const item = sourceData.find(item2 => item2.item === value);
    return (
      `<span class="legend-name">${item.item}</span>
     <span class="ant-divider ant-divider-vertical"></span>
     <span class="legend-percent">${item.percent}</span>
     <span class="legend-price">￥${item.price}</span>`
    );
  }
}
</script>

<style lang="less" scoped>
  #lists{
    transform: translateY(50%);
  }
  .pie-total{
    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%, -50%);
    font-size: 25px;
    text-align: center;

    h4{
      color: rgba(0,0,0,.45);
      font-size: 16px;
      line-height: 22px;
      height: 22px;
      margin-bottom: 8px;
      font-weight: 400;
    }

    .total{
      font-size: 25px;
      margin-bottom: 0;
    }
  }
</style>

<style scoped>
  .pie-chart >>> .g2-legend-list-item{
    width: 100%;
    margin-right: 0 !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .pie-chart >>> .g2-legend-list-item span{
    font-size: 14px;
    color: rgba(0,0,0,.65);
  }
  .pie-chart >>> .g2-legend-list-item .ant-divider,
  .pie-chart >>> .g2-legend-list-item .legend-percent{
    color: rgba(0,0,0,.45);
  }
  .pie-chart >>> .g2-legend{
    overflow: hidden;
  }
  .pie-chart >>> .legend-price{
    float: right;
  }

  .pie-chart >>> .g2-legend-text{
    width: calc(100% - 20px);
  }
</style>
