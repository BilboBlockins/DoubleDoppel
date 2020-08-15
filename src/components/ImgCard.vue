<template>
	<div class="card">
		<a class="card-image is-loaded" :href='data.profile' target="_blank">
			<img :src='data.image_path' :alt='data.name' />
		</a>
		<a class="card-description" :href='data.profile' target="_blank">
			<h2>{{data.name}}</h2>
			<p>{{match}}</p>
		</a>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

.card {
  height:400px;
  width: calc(100%/3);;
  margin-top: 15px;
	display:inline-block;
	text-decoration: none;
	overflow: hidden;
	box-shadow: 0 0 3rem -1rem rgba(0,0,0,0.5);
	transition: transform 0.1s ease-in-out, box-shadow 0.1s;
  border-radius: 4px;
}

.card:hover {
	transform: translateY(-4px) scale(1.0125);
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
