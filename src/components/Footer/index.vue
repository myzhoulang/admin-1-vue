<template>
  <a-layout-footer class="text-center footer">
    <p>Copyright©2014-2018 浙江孚临科技有限公司 版权所有</p>
    <p>商务合作：bd@fulintechfin.com 客服电话：0571-28874257#803</p>
  </a-layout-footer>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
}
</script>

<style lang='less' scoped>
  .footer{
    padding: 24px 30px;
  }
</style>
