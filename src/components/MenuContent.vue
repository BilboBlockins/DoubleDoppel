<template>
  <div class="menuText">
    <div :class='["about", {"hidden": !showAbout}]'>
      <p>
        Inspired by the impressive casting in the show 'Dark', 
        where different versions of the same character span multiple timelines, 
        DoubleDoppel is a demo machine learning application that uses facial recognition to compare a face in a reference image with
        ~8000+ profiles on <span class="title2"><a class="title2" href="https://www.backstage.com/" target="_blank">backstage.com</a></span> 
        and returns a list of actors/actresses with similar features.
      </p>
      <p>
        Upload an image and find a new star!
      </p>
    </div>
    <div :class='["help", {"hidden": !showHelp}]'>
      <p>
        Click or drag a reference image into the
        <span class="title1 noBorder">green</span> circle to find actors with similar features.
      </p>
      <p>
        The matches will show up in the <span class="title2 noBorder">pink</span> circle and you can use the arrow buttons to scroll through the results.
      </p>
      <p>
        By default, 3 matches are returned, but you can adjust the number of matches with the setting below.
        If you are not happy with the results or the program has trouble finding a face in the reference image, try using another picture.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuContent',
  props: {
    showAbout: Boolean,
    showHelp:Boolean
  }
}
</script>
