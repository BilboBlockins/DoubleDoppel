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
  name: 'CardWrapper'
}
</script>

<style scoped>

.card-wrapper {
  height: 90%;
  display: flex;
  width:100%;
	margin:0;
	padding:0;
  justify-content: center;
}
.card-container {
  height: 60vh;
  width:100%;
  max-width: 640px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}
@media (max-width: 600px) {
  .card-container {
    flex-direction: column;
    justify-content: unset;
    align-items: center;
  }
}

</style>
