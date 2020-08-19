<template>
	<div class="card">

		<div class="card-image">
      <a v-if='data.length' :href='data[matchNum].profile' target="_blank">
        <img class="results-image"  :src='baseUrl + data[matchNum].image_path' :alt='data.name' />
      </a>
		</div>

    <div class="actionRow">
      <button 
        @click="prevBtnClick" 
        class="controlBtn nkn-button nkn-ripple icon-button actionBtn">
        <span class="material-icons icon-adjust-left">keyboard_arrow_left</span>
      </button>
      <button 
        @click="nextBtnClick" 
        class="controlBtn nkn-button nkn-ripple icon-button actionBtn">
        <span class="material-icons icon-adjust-right">keyboard_arrow_right</span>
      </button>
    </div>

	</div>
</template>

<script>
import matcher from '../modules/matcher.js'

export default {
  name: 'OutputCard',
  props: {
    data: Array
  },
  data: () => ({
    baseUrl: process.env.VUE_APP_BASE_URL,
    matchNum: 0
  }),
  methods: {
    nextBtnClick(e) {
      this.createRipple(e)
      if(this.data.length) {
        if(this.matchNum < this.data.length-1) {
          this.matchNum++
        } else {
          this.matchNum = 0
        }
        this.outputCurrent()
      }
    },
    prevBtnClick(e) {
      this.createRipple(e)
      if(this.data.length) {
        if(this.matchNum > 0) {
          this.matchNum--
        } else {
          this.matchNum = this.data.length - 1
        }
        this.outputCurrent()
      }
    },
    createRipple(e) {
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
    },
    outputCurrent() {
      let pronoun = 'their'
      if(this.data[this.matchNum].gender === 'F') { pronoun = 'her' }
      if(this.data[this.matchNum].gender === 'M') { pronoun = 'his' }
      matcher.output(
        'Found '+
        '<a class="title2" target="_blank" href="'+
        this.data[this.matchNum].profile +
        '"><span>' + 
        this.data[this.matchNum].name + 
        '</span>' +
        '</a>' +
        ' with a ' + 
        this.getPercent(this.data[this.matchNum].dist) + 
        '% match. See '+
        pronoun +
        ' actor profile ' +
        '<span class="title2"><a class="title2" target="_blank" href="' +
        this.data[this.matchNum].profile +
        '">here.</a></span>'
      )
    }
  },
  watch: {
    data() {
      this.matchNum = 0
      if(this.data.length) { 
        this.outputCurrent()
      }
    }
  }
}
</script>

<style scoped>
.card {
  padding-right: 2px;
  margin-left: 150px;
  height:250px;
  width: 250px;
	text-decoration: none;
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
  object-position: 50% 25%;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: 4;
  border-radius: 50%;
  cursor: pointer;
}

.actionRow {
  margin-top: -5px;
  margin-left: 2px;
  margin-right: -1px;
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
.icon-adjust-right {
  position: relative;
  top: -2px;
  right: -1px;
  font-size: 30px;
}
.icon-adjust-left {
  position: relative;
  top: -2px;
  left: -1px;
  font-size: 30px;
}

@media(max-width: 900px) {
  .card {
    margin-left: 60px;
  }
}
@media(max-width: 600px) {
  .card {
    padding: 0px;
    margin-left: 0px;
    margin-top: 20px;
  }
  .actionRow {
    margin-left: 0px;
    margin-right: 0px;
  }
}

</style>
