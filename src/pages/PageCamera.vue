<template>
  <q-page class="constrain-more q-pa-md">
    <div class="camera-frame q-pa-md">
      <video
        v-show="!imageCaptured"
        class="full-width"
        autoplay
        ref="video"
      />
      <canvas
        v-show="imageCaptured"
        ref="canvas"
        class="full-width"
        height="240"
      />
    </div>
    <div class="text-center q-pa-md">
      <q-btn
        @click="captureImage"
        color="primary"
        icon="eva-camera"
        round
        size="lg"
      />
      <div class="row justify-center q-ma-md">
        <q-input
          class="col col-sm-6"
          label="Caption"
          v-model="post.caption"
          dense
        />
      </div>
      <div class="row justify-center q-ma-md">
        <q-input
          class="col col-sm-6"
          label="Location"
          v-model="post.location"
          dense
        >
          <template v-slot:append>
            <q-btn round dense flat icon="eva-navigation-2-outline" />
          </template>
        </q-input>
      </div>
      <div class="row justify-center q-mt-lg">
        <q-btn
          color="primary"
          label="Post Image"
          rounded
          unelevated
          icon="eva-cloud-upload-outline"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { uid } from "quasar";
require('md-gum-polyfill');

export default {
  name: 'PageCamera',
  data() {
    return {
      imageCaptured: false,
      post: {
        id: uid(),
        caption: '',
        location: '',
        photo: null,
        date: Date.now(),
      }
    }
  },
  methods: {
    initCamera() {
      navigator.mediaDevices.getUserMedia({
        video: true,
      }).then(stream => {
        this.$refs.video.srcObject = stream;
      }).catch(err => console.error(err));
    },
    captureImage() {
      let video = this.$refs.video;
      let canvas = this.$refs.canvas;

      canvas.width = video.getBoundingClientRect().width;
      canvas.height = video.getBoundingClientRect().height;

      let context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.imageCaptured = true;
    }
  },
  mounted() {
    this.initCamera();
  }
}
</script>

<style lang="sass">
.camera-frame
  border: 2px solid $grey-10
  border-radius: 10px
</style>
