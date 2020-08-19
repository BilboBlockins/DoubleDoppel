<template>
	<div class="load-card">
    
    <form id="file-upload-form" class="uploader">
      <input id="file-upload" type="file" name="fileUpload" accept="image/jpg" />
      <label for="file-upload" id="file-drag">
        <img id="file-image" src="#" alt="Preview" class="hidden" crossorigin="">
      </label>
    </form>

    <div class="actionRow">
        <button
        id="clearBtn"
        @click="clearBtnClick" 
        class="controlBtn nkn-button nkn-ripple icon-button actionBtn"
      >
        <span class="material-icons">clear</span>
      </button>
        <button
        id="uploadBtn"
        @click="uploadBtnClick" 
        class="controlBtn nkn-button nkn-ripple icon-button actionBtn"
      >
        <span class="material-icons">add_photo_alternate</span>
      </button>
    </div>

	</div>

</template>

<script>
import matcher from '../modules/matcher.js'

export default {
  name: 'InputCard',
  props: {
    data: Object,
    matchNum: Number
  },
  data: () => ({
    matches: []
  }),
  async mounted () {
    await matcher.run()
    if (window.File && window.FileList && window.FileReader) {
      this.loaderInit()
    } else {
      document.getElementById('file-drag').style.display = 'none'
    }
  },
  methods: {
    loaderInit () {
      let fileSelect = document.getElementById('file-upload')
      let fileDrag = document.getElementById('file-drag')
      fileSelect.addEventListener('change', this.fileSelector, false)
      fileDrag.addEventListener('dragover', this.fileDragHover, false)
      fileDrag.addEventListener('dragleave', this.fileDragHover, false)
      fileDrag.addEventListener('drop', this.fileSelector, false)
    },
    fileDragHover(e) {
      var fileDrag = document.getElementById('file-drag')
      e.stopPropagation();
      e.preventDefault();
      fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload')
    },
    fileSelector(e) {
      var files = e.target.files || e.dataTransfer.files;
      this.fileDragHover(e)
      this.parseFile(files[0])
      matcher.output('Locating best double matches...')
    },
    async getMatches() {
      console.log('current match num: ', this.matchNum)
      const matches = await matcher.findMatches(this.matchNum)
      console.log(matches)
      this.matches = matches
      this.$emit('get-matches', matches)
    },
    parseFile(file) {
      if(file) {
        const fileSrc = URL.createObjectURL(file)
        document.getElementById('file-image').classList.remove("hidden")
        document.getElementById('file-image').src = fileSrc
        this.getMatches()
      } else {
        const progressBar = document.getElementById('file-progress')
        progressBar.value = 0
        document.getElementById('file-image').classList.add("hidden")
        document.getElementById("file-upload-form").reset()
        this.$emit('get-matches', [])
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
    uploadBtnClick(e) {
      this.createRipple(e)
      let fileSelect = document.getElementById('file-upload')
      fileSelect.click()
      console.log('upload btn clicked') 
    },
    clearBtnClick(e) {
      this.createRipple(e)
      const progressBar = document.getElementById('file-progress')
      progressBar.value = 0
      document.getElementById('file-image').classList.add("hidden")
      document.getElementById("file-upload-form").reset()
      this.$emit('get-matches', [])
    }
  }
}
</script>

<style scoped>

.descText {
  color:#5FD38D;
  text-align: center;
  margin-bottom: 5px;
  border-bottom: 1px solid #5FD38D;
}

.actionRow {
  display: flex;
  justify-content: space-between;
}

.controlBtn {
  background-color: rgba(95, 211, 141, .6);
  border: 1px solid #5FD38D;
}

.controlBtn:hover {
  background-color: rgba(95, 211, 141, .2);
}

.load-card {
  /* border-radius: 50%; */
  height:250px;
  width: 250px;
	text-decoration: none;
}

@media(max-width: 500px) {
  .load-card {
    margin-top:0px;
  }
}

/* loader style */
.uploader {
  display: block;
  clear: both;
  width: 250px;
  height: 250px;
}
#file-drag {
  height: 250px;
  width: 250px;
  position: relative;
  display: inline-block;
  clear: both;
  text-align: center;
  user-select: none;
  overflow: hidden;
  cursor: pointer;
  border-radius: 50%;
  border: 1px solid #5FD38D;
  background-color: rgba(95, 211, 141, .6);
  box-shadow: 0 1em 3rem .5rem rgba(0,0,0,.25);
	transition: box-shadow .2s;
}

#file-drag::before {
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

#file-drag:hover {
  box-shadow: 0 1em 3rem 1rem rgba(0,0,0,.5);
  background-color: rgba(95, 211, 141, .2);
}

#file-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: absolute;
  object-fit: cover;
  object-position: 50% 25%;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: 4;
}

.hidden {
  display: none;
}

input[type="file"] {
  display: none;
}


</style>
