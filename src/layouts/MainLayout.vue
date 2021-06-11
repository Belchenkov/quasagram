<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-brown-8" elevated>
      <q-toolbar>
        <q-toolbar-title class="row justify-center items-center text-bold">
          <q-icon class="q-mr-sm" size="25px" name="camera_enhance"></q-icon>
          <div>Quasagram</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-brown-8" elevated>
        <q-tabs
            indicator-color="transparent"
            active-color="warning"
            align="center"
            class="text-white"
        >
          <q-route-tab
            to="/"
            icon="home"
          />
          <q-route-tab
            to="/camera"
            icon="camera"
          />
        </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      tab: ''
    }
  }
}
</script>

<style lang="sass">
  .q-toobar__title
    text-align: center
    font-size: 30px
  .q-footer
    .q-tab__icon
      font-size: 30px
</style>
