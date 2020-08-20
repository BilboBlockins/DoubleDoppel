<template>
	<div class="home">
    <loading-screen></loading-screen>
    <menu-content 
      :showAbout='showAbout'
      :showHelp='showHelp'>
    </menu-content>

    <progress id="file-progress" value="0">
    </progress>

    <div class="titleTxt">
      <span class="title1">DOUBLE</span><span class="title2">DOPPEL</span>
    </div>

    <div id="messages">
      Click/Drag an image into the
      green circle to find doubles.
    </div>

    <card-wrap>
      <input-card 
        :matchNum='matchNum' 
        @get-matches='showMatches'>
      </input-card>
      <output-card :data='matches'>
      </output-card>
    </card-wrap>

    <label class="fab">
      <input type="checkbox">
      <div class="fab-menu">
        <div @click='openMenu'  class="fab-btn">
          <logo></logo>
        </div>
        <ul @click='openMenu'  class="fab-menu-list">
          <li>
            <button 
              @click='clickAbout' 
              :class='["nkn-button", {"aboutBtnOn": showAbout}]'>
              ABOUT
            </button>
          </li>
          <li>
          <li>
            <button 
              @click='clickHelp' 
              :class='["nkn-button", {"helpBtnOn": showHelp}]'>
              HELP
            </button>
          </li>
          <li class="matchControl">
            <button 
              :disabled='!removeOk' 
              @click.self='removeMatch' 
              class="nkn-button nkn-ripple icon-button">
              <span 
                class="material-icons" 
                @click.self='removeMatch'>
                keyboard_arrow_left
              </span>
            </button>
          <span class="matchText">
            MATCHES: {{matchNum}}
          </span>
            <button 
              :disabled='!addOk' 
              @click.self='addMatch' 
              class="nkn-button nkn-ripple icon-button">
              <span 
                class="material-icons" 
                @click.self='addMatch'>
                keyboard_arrow_right
              </span>
            </button>
          </li>
        </ul>
      </div>
      <div @click='openMenu' class="fab-blank"></div>
    </label>
    <div class="attrText">Brett Hiebert, 2020</div>
	</div>
</template>

<script>
import LoadingScreen from '@/components/LoadingScreen.vue'
import InputCard from '@/components/InputCard.vue'
import OutputCard from '@/components/OutputCard.vue'
import CardWrap from '@/components/CardWrapper.vue'
import MenuContent from '@/components/MenuContent.vue'
import Logo from '@/components/Logo.vue'
import matcher from '../modules/matcher.js'

export default {
  name: 'Home',
  components: {
    LoadingScreen,
    InputCard,
    OutputCard,
    CardWrap,
    MenuContent,
    Logo
  },
  data: () => ({
    matches: [],
    matchNum: 3,
    addOk: true,
    removeOk: true,
    menuOpen: false,
    showAbout: false,
    showHelp: false,
    progressVal: 0,
  }),  
  methods: {
    showMatches(matches) {
      this.matches = matches
    },
    addMatch() {
      this.menuOpen = false
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
      this.menuOpen = false
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
    openMenu () {
      if (this.menuOpen) {
        this.showAbout = false
        this.showHelp = false
        this.menuOpen = false
        this.resetMsg()
      } else {
        this.menuOpen = true
        matcher.output('')
      }
    },
    clickAbout() {
      this.menuOpen = false
      this.showAbout = true
      this.showHelp = false
    },
    clickHelp() {
      this.menuOpen = false
      this.showAbout = false
      this.showHelp = true
    },
    progressHandler(e) {
      console.log('Got progress event: ', e)
    },
    resetMsg() {
      matcher.output(
        'Click/Drag an image into the' +
        ' green circle to find doubles.'
      )
    }
  }
}
</script>

<style>

.loadingScreen {
  font-size: 20px;
  font-family: 'Comfortaa', cursive;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #111;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100;
  text-align:center;
  transition: .3s linear opacity;
}
.logo {
  text-align:center;
  width:80px;
  height: 80px;
  margin-bottom: 8px;
  -webkit-animation: 2s linear 0s infinite spin_logo;
  animation: 2s linear 0s infinite spin_logo;
}
.fade {
  opacity: 0;
}
.hidden {
  display: none;
}

progress[value] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: block;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 6px;
  border: 0;
  background-color: black;
}

progress[value]::-webkit-progress-bar {
  background-color: black;
  height: 6px;
}
progress[value]::-webkit-progress-value {
  background-image: -webkit-linear-gradient(
    0turn,
    #5FD38D,
    #5FD38D,
    #FF0066, 
    #FF0066
  );
}

progress[value]::-moz-progress-bar {
  background-image: -moz-linear-gradient(
    0turn,
    #5FD38D,
    #5FD38D,
    #FF0066, 
    #FF0066
  );
}

.titleTxt {
  color:#fff;
  margin-top: 16px;
  font-size: 36px;
  margin-bottom: 10px;
  font-family: 'Comfortaa', cursive;
  user-select: none;
}
.title1 {
  color: #5FD38D;
  border-bottom: 1px solid #5FD38D;
}
.title2 {
  color: #FF0066;
  border-bottom: 1px solid #FF0066;
}
a.title2 {
  color: #FF0066;
  border: none;
  text-decoration: none;
  pointer-events:all;
}
a.title2:visited {
  color: #FF0066;
}
.noBorder {
  border: none;
}
#messages {
  color: #fff;
  padding-right:24px;
  padding-left:24px;
  margin-bottom: 10px;
  min-height: 40px;
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
  box-shadow: 0 .2rem .5rem .5rem rgba(0,0,0,.3);
} 
.actionBtn:disabled {
  color: rgba(155,155,155,.85);
  background-color: rgba(155,155,155, .2);
  border: 1px solid  rgba(155,155,155, 1);
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
  min-width: 100px;
  padding: 0 12px;
  display: inline-block;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
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
.icon-button {
  border-radius: 50%;
  font-size: 28px;
  height: 48px;
  min-width: 48px;
  width: 36px;
  padding: 0;
  overflow: hidden;
}
.aboutBtnOn {
  color: #5FD38D;
}
.helpBtnOn {
  color: #FF0066;
}
.about, .help {
  max-width: 500px;
  margin-top: 60px;
  margin-right: 30px;
  margin-left: 30px;
  line-height: 1.5;
  margin-right: 20px;
}
.menuText {
  position: absolute;
  color: #fff;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 101;
  pointer-events: none;
  text-align: center;
}

.fab {
  position: fixed;
  bottom: 1.6rem;
  cursor: pointer;
  left: 50%;
  margin-left: -30px;
  z-index: 10;
  user-select: none;
}
.fab input { 
  display: none;
}
.fab-menu {
  position: relative;
  z-index: 12;
  width: 60px;
  height: 60px;
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
  margin-bottom: 15px;
  list-style: none;
  transition: 0.4s;
  transform: translateY(-40%) scale(0);
}
.fab ul li {
  width: 300px;
  position: relative;
  text-align: center;
  margin-bottom: 4px;
  cursor: default;
}
.fab-blank {
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: none;
  z-index: 5;
}
.fab input:checked + .fab-menu .fab-btn { 
  transform: scale(1.1) rotate(90deg);
}
.fab input:checked + .fab-menu ul {
  transition: 0.4s;
  transform: translateY(-115%) scale(1);
}
.fab input:checked ~ .fab-blank {
  display: block;
}
.attrText {
  font-size: 12px;
  color: #fff;
  position: fixed;
  bottom: 8px;
  right: 8px;
  pointer-events:none;
  opacity: 50%;
}

@-webkit-keyframes ripple {
  to {
    opacity: 0;
    transform: scale(3);
  }
}
@keyframes ripple {
  to {
    opacity: 0;
    transform: scale(3);
  }
}
@-webkit-keyframes spin_logo { 
  from { transform: rotate(0deg); } 
  to { transform: rotate(360deg); }  
}
@keyframes spin_logo { 
  from { transform: rotate(0deg); } 
  to { transform: rotate(360deg); }  
}

</style>
