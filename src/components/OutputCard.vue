<template>
	<div class="card">
		<div class="card-image">
			<img class="results-image" v-if='data.length' :src='baseUrl + data[matchNum].image_path' :alt='data.name' />
		</div>
<div class="actionRow">
    <button
    @click="prevBtnClick" 
    class="controlBtn nkn-button nkn-ripple icon-button actionBtn"
  >
    <span class="material-icons icon-adjust">keyboard_arrow_left</span>
  </button>
  <div v-if='data.length' class="descText">
    <div>
      {{getPercent(data[matchNum].dist)}}% MATCH
    </div>
    <div>
      NAME: {{data[matchNum].name}}
    </div>
    <div>
      NAME: {{data[matchNum].name}}
    </div>

  </div>
    <button
    id="uploadBtn"
    @click="nextBtnClick" 
    class="controlBtn nkn-button nkn-ripple icon-button actionBtn"
  >
    <span class="material-icons icon-adjust">keyboard_arrow_right</span>
  </button>

  
</div>
	</div>
</template>

<script>
export default {
  name: 'OutputCard',
  props: {
    data: Array
  },
  data: () => ({
    baseUrl: 'https://bilboblockins.github.io/double/',
    matchNum: 0
  }),
  methods: {
    nextBtnClick(e) {
      this.createRipple(e)
      console.log(this.matchNum)
      console.log(this.data.length)
      if(this.data.length) {
        if(this.matchNum < this.data.length-1) {
          this.matchNum++
        } else {
          this.matchNum = 0
        }
      }
    },
    prevBtnClick(e) {
      this.createRipple(e)
      console.log(this.matchNum)
      console.log(this.data.length)
      if(this.data.length) {
        if(this.matchNum > 0) {
          this.matchNum--
        } else {
          this.matchNum = this.data.length - 1
        }
      }
    },
    createRipple(e) {
      console.log('in ripple func')
      let target = e.target
      let c = target.getElementsByClassName('circle')[0]
      if(c) { target.removeChild(c) }
      let circle = document.createElement('div')
      target.appendChild(circle)
      let d = Math.max(target.clientWidth, target.clientHeight)
      circle.style.width = circle.style.height = d + 'px'
      circle.style.left = e.clientX - target.offsetLeft - d / 2 + 'px'
      circle.style.top = e.clientY - target.offsetTop - d / 2 + 'px'
      circle.classList.add('circle')
    },
    getPercent(dist) {
      return ((1-dist) * 100).toFixed(1)
    }
  },
  watch: {
    data() {
      console.log('got data change') 
      this.matchNum = 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.descText {
  position: absolute;
}

.icon-adjust {
  position: relative;
  top: -2px;
  font-size: 30px;
}

.actionRow {
  margin-top: -6px;
  display: flex;
  justify-content: space-between;
  align-items:center;
  color: #FF0066;
}

.controlBtn {
  background-color: rgba(255, 0, 102, .6);
  border: 1px solid #FF0066;
}

.controlBtn:hover {
  background-color: rgba(255, 0, 102, .2);
}

.card-image {
  height: 250px;
  width: 250px;
  position: relative;
  display: inline-block;
  clear: both;
  text-align: center;
  user-select: none;
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid #FF0066;
  background-color: rgba(255, 0, 102, .6);
  box-shadow: 0 1em 3rem .5rem rgba(0,0,0,.25);
	transition: box-shadow .2s;
}

 .card-image::before {
  content: '';
  background-image: url('/images/face_proportions.jpg');
  background-size: cover;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  opacity: 100%;
  z-index: 0;
  mix-blend-mode: screen;
  border-radius: 50%;
}

.card-image:hover {
  box-shadow: 0 1em 3rem 1rem rgba(0,0,0,.5);
  background-color: rgba(255, 0, 102, .2);
}

.results-image {
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
  object-position: 50% 0%;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: 4;
  border-radius: 50%;
}

.card {
  margin-left: 60px;
  height:250px;
  width: 250px;
	text-decoration: none;
}

@media(max-width: 500px) {
  .card {
    margin-left: 0px;
    margin-top: 50px;
  }
}

</style>
