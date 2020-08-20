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
        @click="clearBtnClick" 
        class="controlBtn nkn-button nkn-ripple icon-button actionBtn">
        <span class="material-icons">clear</span>
      </button>
      <button
        @click="uploadBtnClick" 
        class="controlBtn nkn-button nkn-ripple icon-button actionBtn">
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
  async created() {
    await matcher.run()
    if (window.File && window.FileList && window.FileReader) {
      this.loaderInit()
    } else {
      document.getElementById('file-drag').style.display = 'none'
    }
  },
  methods: {
    async getMatches() {
      const matches = await matcher.findMatches(this.matchNum)
      this.matches = matches
      this.$emit('get-matches', matches)
    },
    loaderInit() {
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
    },
    parseFile(file) {
      if(file) {
        const fileSrc = URL.createObjectURL(file)
        let imgEl = document.getElementById('file-image')
        imgEl.src = fileSrc
        setTimeout(() => {
          imgEl.classList.remove("hidden")
          matcher.output('Finding closest doubles...')
          setTimeout(() => {
            this.getMatches()
          }, 50)
        }, 50) 
      } else {
        const progressBar = document.getElementById('file-progress')
        progressBar.value = 0
        document.getElementById('file-image').classList.add("hidden")
        document.getElementById("file-upload-form").reset()
        this.$emit('get-matches', [])
        this.resetMsg()
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
      this.resetMsg()
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

<style scoped>

.load-card {
  height:250px;
  width: 250px;
	text-decoration: none;
}
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
  background-image: url('https://bilboblockins.github.io/double/doppel/images/face_proportions.jpg');
  background-size: cover;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
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
input[type="file"] {
  display: none;
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

</style>
