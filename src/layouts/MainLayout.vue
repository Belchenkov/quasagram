<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-brown-8" elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
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
          <q-route-tab to="/" name="home" icon="home" label="Home" />
          <q-route-tab to="/camera" name="camera" icon="camera" label="Camera" />
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
