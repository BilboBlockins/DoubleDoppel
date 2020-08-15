<template>
	<div class="card-wrapper">
    <div class="card-container">
    <slot>
    </slot>
    </div>
	</div>
</template>

<script>
export default {
  name: 'CardWrapper',
  data: () => ({

  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.card-wrapper {
  display: flex;
  width:100%;
	margin:0;
	padding:0;
  justify-content: center;
}
.card-container {
  width:100%;
  max-width: 840px;
  display: block;
  padding: 10px;
}

</style>
