<template>
  <div class="pie-chart">
    <v-chart :padding="[0, 300, 0, 0]" :forceFit="true" :height="height" :data="data" :scale="scale">
      <v-tooltip :showTitle="false" dataKey="item*percent" />
      <v-axis position="left" />
      <v-legend :useHtml="true" :itemGap="16" :item-formatter="itemFormatter" position="right-center" :offsetX="0" />
      <v-pie position="percent" color="item" :vStyle="pieStyle" />
      <v-coord type="theta" :radius="0.85" :innerRadius="0.7" />
    </v-chart>
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
  data = data;
  scale = scale;
  pieStyle = {
    stroke: '#fff',
    lineWidth: 5,
  };


  itemFormatter = (value) => {
    const item = sourceData.find(item => item.item === value);
    return (
      `<span class="legend-name">${item.item}</span>
     <span class="ant-divider ant-divider-vertical"></span>
     <span class="legend-percent">${item.percent}</span>
     <span class="legend-price">￥${item.price}</span>`
    );
  }
}
</script>

<style scoped>
  .pie-chart >>> span{
    font-size: 14px;
    color: rgba(0,0,0,.65);
  }
  .pie-chart >>> .ant-divider,
  .pie-chart >>> .legend-percent{
    color: rgba(0,0,0,.45);
  }
  .pie-chart >>> .g2-legend{
    overflow: hidden;
    margin-right: 25px;
  }
  .pie-chart >>> .legend-price{
    float: right;
  }
  .pie-chart >>> .g2-legend-list-item{
    width: 100%;
    margin-right: 0 !important;
  }

  .pie-chart >>> .g2-legend-text{
    width: calc(100% - 20px);
  }
</style>
