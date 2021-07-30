<template>
  <q-page class="constrain-more q-pa-md">
    <div class="camera-frame q-pa-md">
      <img
        src="https://www.cruisemapper.com/images/ports/11802-29232893d4.jpg"
        alt="Image"
        class="full-width"
      />
    </div>
    <div class="text-center q-pa-md">
      <q-btn
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

export default {
  name: 'PageCamera',
  data() {
    return {
      post: {
        id: uid(),
        caption: '',
        location: '',
        photo: null,
        date: Date.now(),
      }
    }
  }
}
</script>

<style lang="sass">
.camera-frame
  border: 2px solid $grey-10
  border-radius: 10px
</style>
