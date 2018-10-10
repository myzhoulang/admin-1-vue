<template>

    <a-row :gutter="24">
      <a-col :span="12">
        <div class="hot">
          <h4>搜索用户数
            <a-tooltip placement="top" >
              <template slot="title">
                <span>指标说明</span>
              </template>
              <a-icon style="margin-left: 8px;" type="exclamation-circle-o" />
            </a-tooltip>
          </h4>
          <div class="value">
            <span class="total">12,321</span>
            <span class="sub-total">
              17.2
              <a-icon class="trend-icon trend-up" style="color: red;" type="caret-up" />
            </span>
          </div>
          <div style="height: 45px;">
            <SmoothArea  v-if="state === 'success'"/>
          </div>
        </div>
      </a-col>
      <a-col :span="12">
        <div class="hot">
          <h4>人均搜索次数 </h4>
          <div class="value">
            <span class="total">12,321</span>
            <span class="sub-total">
              15.2
              <a-icon class="trend-icon trend-down" type="caret-down" />
            </span>
          </div>
          <div style="height: 45px;">
            <SmoothArea  v-if="state === 'success'"/>
          </div>
        </div>
      </a-col>
    </a-row>

</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import SmoothArea from '@/components/charts/SmoothArea';

@Component({
  components: {
    SmoothArea,
  },
})
export default class HotSearch extends Vue {
  state = 'pedding';

  mounted() {
    setTimeout(() => {
      this.state = 'success';
    }, 1000);
  }
}
</script>

<style lang='less' scoped>
  .hot{
    position: relative;
    .value > span{
      font-size: 24px;
      margin-right: 32px;
      display: inline-block;
      color: rgba(0,0,0,.85);
      line-height: 32px;
      line-height: 32px;
    }

    .value > .sub-total{
      font-size: 16px;
      vertical-align: top;
      color: rgba(0,0,0,.45);
    }
  }
</style>
