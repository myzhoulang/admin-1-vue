<template>
  <div >
    <h4>{{title}}</h4>
    <div :style="{marginTop: '25px'}">
      <v-chart :forceFit="true" :height="height" :data="data" :padding="padding" :scale="scale">
        <v-tooltip />
        <v-axis />
        <v-bar position="month*value" />
      </v-chart>
    </div>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component({
  props: ['title'],
})
export default class BarChart extends Vue {
  data = [
    { month: '1月', value: 418 },
    { month: '2月', value: 352 },
    { month: '3月', value: 599 },
    { month: '4月', value: 881 },
    { month: '5月', value: 1057 },
    { month: '6月', value: 958 },
    { month: '7月', value: 500 },
    { month: '8月', value: 244 },
    { month: '9月', value: 418 },
    { month: '10月', value: 535 },
    { month: '11月', value: 810 },
    { month: '12月', value: 950 },
  ];
  scale = [{ dataKey: 'sales', tickInterval: 20 }];
  height = 254;
  padding = [20, 20, 40, 40];
}
</script>

<style lang='less' scoped>

</style>
