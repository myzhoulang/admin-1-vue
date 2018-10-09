<template>
  <SliderBar />
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import SliderBar from './SliderBar';

@Component({
  components: {
    SliderBar,
  },
})
export default class SiderMenu extends Vue {

}
</script>
