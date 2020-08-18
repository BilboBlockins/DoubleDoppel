<template>
	<div class="home">
  <progress class="progress" id="file-progress" value="0">
    <span>0</span>%
  </progress>
  <div class="titleTxt">
  <span class="title1">DOUBLE</span><span class="title2">DOPPEL</span>
    
  </div>
<div id="messages"></div>
    <card-wrap>
      <input-card :matchNum='matchNum' @get-matches='showMatches'></input-card>
      <output-card :data='matches'></output-card>
    <!-- <div id="response" class="hidden"> -->
      
    <!-- </div> -->
    </card-wrap>

    <label class="fab">
  <input type="checkbox">
  <div class="fab-menu">
    <div class="fab-btn">

  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39.687 39.688">
  <g paint-order="markers fill stroke" transform="matrix(.94194 0 0 1 1.152 0)">
    <rect width="42.133" height="39.688" x="-1.223" fill="#000" rx="31.849" ry="30"/>
    <ellipse cx="19.843" cy="19.844" fill="none" rx="16.894" ry="19.581"/>
  </g>
  <g paint-order="markers fill stroke">
    <path fill="#5fd38d" d="M14.58 4.4a16.317 16.317 0 000 30.89z"/>
    <path fill="#f06" d="M25.107 4.402v30.886a16.317 16.317 0 0011.054-15.444A16.317 16.317 0 0025.107 4.402z"/>
    <g transform="matrix(.96148 0 0 .96148 -73.901 -1.068)">
      <circle cx="-86.575" cy="21.75" r="2.812" fill="#000" transform="scale(-1 1)"/>
      <circle cx="-97.5" cy="21.75" r="2.812" fill="#5fd38d" transform="scale(-1 1)"/>
      <circle cx="108.425" cy="21.75" r="2.812" fill="#000"/>
      <circle cx="97.5" cy="21.75" r="2.812" fill="#f06"/>
      <path fill="#5fd38d" d="M97.5 18.939a2.812 2.812 0 00-2.812 2.811 2.812 2.812 0 002.811 2.811z"/>
    </g>
  </g>
</svg>

    </div>
    <ul class="fab-menu-list">
      <li ><button class="nkn-button">ABOUT</button></li>
      <li>
      <button :disabled='!removeOk' @click="removeMatch" class="nkn-button icon-button">
        <span class="material-icons">keyboard_arrow_left</span>
        </button>
      <span class="liText">
        MATCHES: {{matchNum}}
      </span>
        <button :disabled='!addOk' @click="addMatch" class="nkn-button icon-button">
          <span class="material-icons">keyboard_arrow_right</span>
        </button>
      </li>
      
      
      
      <!-- <li tooltip="F"><button>F</button></li> -->
    </ul>
  </div>
  <div class="fab-blank"></div>



</label>

	</div>
</template>

<script>
import InputCard from '@/components/InputCard.vue'
import OutputCard from '@/components/OutputCard.vue'
import CardWrap from '@/components/CardWrapper.vue'

export default {
  name: 'Home',
  components: {
    InputCard,
    OutputCard,
    CardWrap
  },
  data: () => ({
    matches: [],
    matchNum: 3,
    addOk: true,
    removeOk: true
  }),
  created() {
  },
  methods: {
    showMatches(matches) {
      console.log(matches)
      this.matches = matches
    },
    addMatch() {
      if (this.matchNum < 6) {
        this.matchNum++
      }
      if(this.matchNum === 6) {
        this.addOk = false
      }
      if(this.matchNum > 1) {
        this.removeOk = true
      }
    },
    removeMatch() {
      console.log('in remove match')
      if (this.matchNum >= 2) {
        this.matchNum--
      }
      if(this.matchNum === 1) {
        this.removeOk = false
      }
      if(this.matchNum < 6) {
        this.addOk = true
      }
    },
    createRipple(e) {
      let target = e.target
      let c = target.getElementsByClassName('circle')[0]
      if(c) {target.removeChild(c)}
      let circle = document.createElement('div')
      target.appendChild(circle)
      let d = Math.max(target.clientWidth, target.clientHeight)
      circle.style.width = circle.style.height = d + 'px'
      circle.style.left = e.clientX - target.offsetLeft - d / 2 + 'px'
      circle.style.top = e.clientY - target.offsetTop - d / 2 + 'px'
      circle.classList.add('circle')
    }
  }
}
</script>
<style>

.titleTxt {
  color:#fff;
  margin-top: 20px;
  font-size: 40px;
  margin-bottom: 20px;
}

.title1 {
  color: #5FD38D;
  text-decoration: underline;
}

.title2 {
  color: #FF0066;
  text-decoration: underline;
}

.actionBtn {
  color: rgba(255,255,255,.85);
  position: relative;
  top: -15px;
  user-select: none;
  box-shadow: 0 0 1rem .5rem rgba(0,0,0,.15);
	transition: box-shadow .2s;
}

.actionBtn:hover {
  border: 1px solid orange;
  box-shadow: 0 .2rem .5rem .5rem rgba(0,0,0,.3);
} 

.actionBtn:disabled {
  color: rgba(155,155,155,.85);
  background-color: rgba(155,155,155, .2);
  border: 1px solid  rgba(155,155,155, 1);
}

.progress {
  display: block;
  clear: both;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 3px;
  border: 0;
  overflow: hidden;
}
.progress[value] {
  /* Reset the default appearance */
  -webkit-appearance: none;
  appearance: none;
}
progress[value]::-webkit-progress-bar {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
}
progress[value]::-webkit-progress-value {
  background-color: orange;
}

#messages {
  color: #fff;
}
.liText {
  min-width:80px;
  margin-left: 6px;
  margin-right: 6px;
}
/* button styles */
.nkn-blue, .nkn-hover-blue:hover {
  background-color: #448aff !important;
}
.nkn-red, .nkn-hover-red:hover {
  background-color: #ff5722 !important;
}
.nkn-button.save {
  background-color: #20cc66 !important;
}
.nkn-button.edit {
  background-color: #448aff !important;
}
.nkn-button.delete, .nkn-button.cancel {
  background-color: #ff5722 !important;
}
.nkn-button {
  -webkit-tap-highlight-color: transparent;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}
.nkn-button {
  background: 0 0;
  border: none;
  border-radius: 2px;
  color: #fff;
  position: relative;
  height: 36px;
  margin: 0;
  min-width: 60px;
  padding: 0 12px;
  display: inline-block;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1.2;
  overflow: hidden;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  line-height: 36px;
  vertical-align: middle;
}
.nkn-button::-moz-focus-inner {
  border: 0;
}
.nkn-button:hover {
  background-color: rgba(158, 158, 158, .2);
}
.nkn-button[disabled][disabled] {
  color: rgba(139, 139, 139, 0.50);
  cursor: default;
  background-color: transparent;
}
.nkn-button-raised {
  background: rgba(158, 158, 158, .2);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14),
    0 3px 1px -2px rgba(0, 0, 0, .2),
    0 1px 5px 0 rgba(0, 0, 0, .12);
}
.nkn-button-raised:active {
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .14),
    0 1px 10px 0 rgba(0, 0, 0, .12),
    0 2px 4px -1px rgba(0, 0, 0, .2);
  background-color: rgba(158, 158, 158, .4);
}

.nkn-button-raised[disabled][disabled] {
  background-color: rgba(0, 0, 0, .12);
  color: rgba(0, 0, 0, .26);
  box-shadow: none;
}
.nkn-colored {
  color: rgb(255, 255, 255);
}
.material-icons {
  font-family: 'Material Icons';
  font-weight: 400;
  font-style: normal;
  font-size: 26px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  word-wrap: normal;
  -moz-font-feature-settings: 'liga';
  font-feature-settings: 'liga';
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
  pointer-events: none;
}
.nkn-button .material-icons {
  vertical-align: middle;
}
button .circle {
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.7);
    position: absolute;
    transform: scale(0);
    animation: ripple linear 0.4s;
}
@keyframes ripple {
    to {
        opacity: 0;
        transform: scale(3);
    }
}
/*Pagination buttons*/
.nkn-button.first, .nkn-button.last, .nkn-button.next, .nkn-button.previous{
  border: none;
  background: none;
  border-radius: 50%;
  font-size: 24px;
  height: 36px;
  margin: auto;
  min-width: 36px;
  width: 36px;
  padding: 0;
  overflow: hidden;
}
.nkn-button.first:focus, .nkn-button.last:focus, .nkn-button.previous:focus, .nkn-button.next:focus, .nkn-button.all:focus{
  background: none;
  outline:0;
}

.icon-button {
  border-radius: 50%;
  font-size: 28px;
  height: 48px;
  min-width: 48px;
  width: 36px;
  padding: 0;
  overflow: hidden;
}

.up:before {
  content: "keyboard_arrow_left";
}

.down:before {
  content: "keyboard_arrow_right";
}

.nkn-button.first:before{
  content: "keyboard_arrow_left";
  color: black;
}
.nkn-button.last:before{
  content: "keyboard_arrow_right";
  color: black;
}
.nkn-button.all:before{
  content: "ALL";
  color: black;
}
.nkn-button.next:before{
  content: "keyboard_arrow_right";
  color: black;
}
.nkn-button.previous:before{
  content: "keyboard_arrow_left";
  color: black;
}
.nkn-button.first:hover, .nkn-button.last:hover, .nkn-button.previous:hover, .nkn-button.next:hover{
  background: rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
}
.nkn-button.all:hover{
  background: none;
}
.nkn-button.first:active, .nkn-button.last:active, .nkn-button.previous:active, .nkn-button.next:active{
   background: rgba(0, 0, 0, 0.1);
   animation: iconripple 0.3s linear forwards; 
}
@keyframes iconripple {
  0% {
    box-shadow: 0px 0px 0px 1px transparent;
  }
  50% {
    box-shadow: 0px 0px 0px 15px rgba(0, 0, 0, 0.1);
  }
  100% {
    box-shadow: 0px 0px 0px 15px transparent;
  }
}

/* menu button */
.fab {
  position: fixed;
  bottom: 2rem;
  cursor: pointer;
  left: 50%;
  margin-left: -35px;
  z-index: 20;
}
.fab input { 
  display: none;
}
.fab-menu {
  position: relative;
  z-index: 9999;
  width: 70px;
  height: 70px;
}
.fab-btn {
  position: absolute;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 24px rgba(0,0,0,1);
  border-radius:50%;
  text-align: center;
  color: #fff;
  line-height: 3rem;
  font-size: 2rem;
  z-index: 20;
  transform: scale(1);
  transition: transform 0.4s;
  transition-timing-function: cubic-bezier(0.74, -1.73, 0.41, 2.95);
}
.fab-btn:hover {
  transform: scale(1.1);
  transition: transform 0.4s;
  transition-timing-function: cubic-bezier(0.74, -1.73, 0.41, 2.95);
}
.fab ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  width:100%;
  color: #fff;
  z-index: 1;
  padding: 0;
  margin: 0;
  list-style: none;
  transition: 0.4s;
  transform: translateY(-40%) scale(0);
}
.fab ul li {
  font-size: 14px;
  width: 300px;
  position: relative;
  text-align: center;
  margin-bottom: 4px;
  cursor: default;
}
.fab-blank {
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: none;
  z-index: 9998;
}
.fab input:checked + .fab-menu .fab-btn { 
  background-color: green;
  transform: scale(1.1) rotate(90deg);
}
.fab input:checked + .fab-menu ul {
  padding-bottom: 0.1rem;
  transition: 0.4s;
  transform: translateY(-110%) scale(1);
}
.fab input:checked ~ .fab-blank {
  display: block;
}
.fab [tooltip]:before {
  content: attr(tooltip);
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 2px;
  color: #fff;
  white-space: nowrap;
  padding: .2rem .4rem;
  font-family: arial;
  font-size: .8rem;
  margin-right: .5rem;
  visibility: hidden;
  opacity: 0;
}
.fab [tooltip]:hover:before, .fab [tooltip]:hover:after {
  visibility: visible;
  opacity: 1;
}

</style>
