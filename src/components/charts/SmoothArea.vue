<template>
  <v-chart :force-fit="true" :height="height" :data="data" :padding="padding">
    <v-tooltip />
    <v-smooth-line position="x*y" :size="2" color="#13c2c2" adjust="stack" />
    <v-smooth-area position="x*y"  color="#a4f5f5"/>
  </v-chart>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component({
  props: ['title'],
})
export default class BarChart extends Vue {
  data = [
    { x: '1月', y: 418 },
    { x: '2月', y: 352 },
    { x: '3月', y: 599 },
    { x: '4月', y: 881 },
    { x: '5月', y: 20 },
    { x: '6月', y: 290 },
    { x: '7月', y: 250 },
    { x: '8月', y: 20 },
    { x: '9月', y: 220 },
    { x: '10月', y: 120 },
    { x: '11月', y: 20 },
  ];
  scale = [{
    dataKey: 'year',
    type: 'linear',
    tickInterval: 50,
  }];
  height = 60;
  padding = [0, 5, 18, 0];
}
</script>
