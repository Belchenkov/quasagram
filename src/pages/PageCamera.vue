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
        v-if="hasCameraSupport"
        :disable="imageCaptured"
        color="primary"
        icon="eva-camera"
        round
        size="lg"
      />
      <q-file
        v-else
        v-model="imageUpload"
        outlined
        label="Choose an image"
        accept="image/*"
        @input="captureImageFallback"
      >
        <template v-slot:prepend>
          <q-icon name="eva-attach-outline" />
        </template>
      </q-file>
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
          :loading="locationLoading"
        >
          <template v-slot:append>
            <q-btn
              v-if="!locationLoading && locationSupported"
              @click="getLocation"
              round
              dense
              flat
              icon="eva-navigation-2-outline"
            />
          </template>
        </q-input>
      </div>
      <div class="row justify-center q-mt-lg">
        <q-btn
          @click="addPost"
          :disable="!post.caption || !post.photo"
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

export default {
  name: 'PageCamera',
  data() {
    return {
      imageUpload: [],
      imageCaptured: false,
      hasCameraSupport: true,
      locationLoading: false,
      post: {
        id: uid(),
        caption: '',
        location: '',
        photo: null,
        date: Date.now(),
      }
    }
  },
  beforeDestroy() {
    if (this.hasCameraSupport) {
      this.disableCamera();
    }
  },
  computed: {
    locationSupported() {
      return ('geolocation' in navigator);
    }
  },
  methods: {
    initCamera() {
      navigator.mediaDevices.getUserMedia({
        video: true,
      }).then(stream => {
        this.$refs.video.srcObject = stream;
      }).catch(err => {
        this.hasCameraSupport = false;
        console.error(err);
      })
    },
    captureImage() {
      let video = this.$refs.video;
      let canvas = this.$refs.canvas;

      canvas.width = video.getBoundingClientRect().width;
      canvas.height = video.getBoundingClientRect().height;

      let context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      this.imageCaptured = true;
      this.post.photo = this.dataURItoBlob(canvas.toDataURL());
      this.disableCamera();
    },
    captureImageFallback(file) {
      let canvas = this.$refs.canvas;
      let context = canvas.getContext('2d');
      const reader = new FileReader();

      this.post.photo = file;

      reader.onload = event => {
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
          this.imageCaptured = true;
        }
        img.src = event.target.result;
      }
      reader.readAsDataURL(file);
    },
    disableCamera() {
      this.$refs.video.srcObject.getVideoTracks().forEach(track => {
        track.stop();
      });
    },
    getLocation() {
      this.locationLoading = true;
      navigator.geolocation.getCurrentPosition(position => {
        this.getCityAndCountry(position);
      }, err => {
        this.locationError(err);
      }, {
        timeout: 7000
      });
    },
    async getCityAndCountry({ coords: { latitude, longitude } }) {
      const apiUrl = `https://geocode.xyz/${latitude},${longitude}?json=1`;
      try {
        const location = await this.$axios.get(apiUrl);
        this.locationSuccess(location);
      } catch (err) {
        this.locationError(err);
      }
    },
    locationSuccess({ data }) {
      this.post.location = data.city;

      if (data.country) {
        this.post.location += `, ${data.country}`;
      }
      this.locationLoading = false;
    },
    locationError(err) {
      this.$q.dialog({
        title: 'Error',
        message: err.message
      });
      this.locationLoading = false;
    },
    async addPost() {
      if (!this.post.photo) {
        this.$q.dialog({
          title: 'Error',
          message: 'Need upload a photo!'
        });
        return;
      }

      const formData = new FormData();
      formData.append('id', this.post.id);
      formData.append('caption', this.post.caption);
      formData.append('location', this.post.location);
      formData.append('date', this.post.date);
      formData.append('file', this.post.photo, this.post.id + '.png');

      try {
        const res = await this.$axios.post(`${process.env.API}/posts`, formData);
        console.log(res);
      } catch (err) {
        console.error(err);
        this.$q.dialog({
          title: 'Error',
          message: err.message
        });
      }
    },
    dataURItoBlob(dataURI) {
      // convert base64 to raw binary data held in a string
      // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
      const byteString = atob(dataURI.split(',')[1]);

      // separate out the mime component
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

      // write the bytes of the string to an ArrayBuffer
      const ab = new ArrayBuffer(byteString.length);

      // create a view into the buffer
      const ia = new Uint8Array(ab);

      // set the bytes of the buffer to the correct values
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      // write the ArrayBuffer to a blob, and you're done
      return new Blob([ab], {type: mimeString});
    },
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
