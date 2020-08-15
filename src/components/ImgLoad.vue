<template>
	<div class="load-card">

	</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    data: Object,
    match: Number
  },
  data: () => ({

  })
}
</script>

<style scoped>
.card-image {
	display: block;
	/* background: #fff center center no-repeat; */
	/* background-size: cover; */
}

.card-image > img {
  object-fit: cover;
  width: 100%;
	display: block;
	width: 300px;
  height: 320px;
}

.load-card {
  height:400px;
  width: 100%;
	display:block;
	font-size: 1rem;
	text-decoration: none;
	overflow: hidden;
	box-shadow: 0 0 3rem -1rem rgba(0,0,0,0.5);
	transition: transform 0.1s ease-in-out, box-shadow 0.1s;
  border-radius: 4px;
}

.card:hover {
	transform: translateY(-0.5rem) scale(1.0125);
	box-shadow: 0 1em 3rem -1rem rgba(0,0,0,0.5);
}

.card-description {
  background-color:#444;
  text-align: left;
  font-size: 11px;
  font-weight: 400;
  height: 60px;
	display: block;
	padding: 12px;
	color:#fff;
	text-decoration: none;
}

.card-description > h2 {
	margin: 0 0 0.5em;
}

.card-description > p {
	margin: 0;
}
</style>
