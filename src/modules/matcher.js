let faceapi = require('../../assets/face-api.js')
let axios = require('../../public/js/axios.min.js')

const matcher = {
  inputSize: 416,
  scoreThreshold: .35,
  doubleModelData: [],
  doubleData: [],
  baseUrl: 'https://bilboblockins.github.io/double/',
  warmUp: async () => {
    const loadScreen = document.getElementById('loading-screen')
    const loadMsg = document.getElementById('load-message')
    const inputImgEl = document.getElementById('file-image')
    loadMsg.innerText = 'Warming up net...'
    inputImgEl.src = matcher.baseUrl + matcher.doubleData[0].image_path
    await faceapi
      .detectSingleFace(inputImgEl, 
        new faceapi.TinyFaceDetectorOptions({inputSize: matcher.inputSize, scoreThreshold: matcher.scoreThreshold}))
      .withFaceLandmarks()
      .withFaceDescriptor()
    loadMsg.innerText = 'Ready'
    loadScreen.classList.add('fade')
    setTimeout(()=>{
      loadScreen.classList.add('hidden')
    }, 300)
  },
  findMatches: async (num) => {
    const progressBar = document.getElementById('file-progress')
    const inputImgEl = document.getElementById('file-image')
    const results = []
    progressBar.value = 0
    const result = await faceapi
      .detectSingleFace(inputImgEl, 
        new faceapi.TinyFaceDetectorOptions({inputSize: matcher.inputSize, scoreThreshold: matcher.scoreThreshold}))
      .withFaceLandmarks()
      .withFaceDescriptor()
    if(result) {
      let distArray = []
      const modelLen = matcher.doubleModelData.length
      matcher.setMaxProgress(modelLen-1)
      for(let i=0; i<modelLen; i++) {
        let dist = faceapi.euclideanDistance(result.descriptor, matcher.doubleModelData[i])
        distArray.push(dist)
        progressBar.value = i
        if(i%200 === 0) {await matcher.sleep(1)}
      }
      let minDist = distArray.slice()
      minDist = minDist.sort((a,b) => a-b).slice(0, num)
    
      for(let min of minDist) {
        let index = distArray.indexOf(min)
        let minMatch = matcher.doubleData[index]
        if(results.indexOf((el) => el.id === minMatch.id) === -1) {
          minMatch.dist = min
          results.push(minMatch)
        }
      }
      return results
    } else {
      matcher.output('Sorry, couldn\'t find a face in that one. Try a different picture.')
      return results
    }
  },
  output: (msg) => {
    let m = document.getElementById('messages')
    m.innerHTML = msg
  },
  setMaxProgress: (num) => {
    let progressBar = document.getElementById('file-progress')
    progressBar.max = num
  },
  sleep: (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    })
  }, 
  run: async () => {
    //Load doubles model and data
    const doubleRes = await axios.get('https://bilboblockins.github.io/double/data/doubles.json')
    const doubleModelRes = await axios.get('https://bilboblockins.github.io/double/data/doubles_model.json')
    matcher.doubleData = doubleRes.data
    matcher.doubleModelData = doubleModelRes.data
    // load face detection, face landmark model and face recognition models
    await faceapi.loadTinyFaceDetectorModel('https://bilboblockins.github.io/double/doppel/data/weights/')
    await faceapi.loadFaceLandmarkModel('https://bilboblockins.github.io/double/doppel/data/weights/')
    await faceapi.loadFaceRecognitionModel('https://bilboblockins.github.io/double/doppel/data/weights/')
    matcher.warmUp()
  }
}

module.exports = matcher
