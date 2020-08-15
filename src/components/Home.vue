<template>
	<div class="home">
    <card-wrap>
      <img-load></img-load>
      <img-card :data='doubles[0]'></img-card>
      <img-card :data='doubles[1]'></img-card>
      <img-card :data='doubles[2]'></img-card>
    </card-wrap>
	</div>
</template>

<script>
import ImgLoad from '@/components/ImgLoad.vue'
import ImgCard from '@/components/ImgCard.vue'
import CardWrap from '@/components/CardWrapper.vue'
import Doubles from '../../public/data/doubles.json'

export default {
  name: 'Home',
  components: {
    ImgLoad,
    ImgCard,
    CardWrap
  },
  data: () => ({
    doubles: Doubles
  }),
  created() {
    console.log(this.doubles[0])
  }
}
</script>
<style scoped>

</style>
