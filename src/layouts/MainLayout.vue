<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-brown-8" elevated>
      <q-toolbar>
        <q-btn
          to="/camera"
          dense
          class="q-mr-sm large-screen-only"
          size="15px"
          icon="camera"
        ></q-btn>
        <q-separator vertical class="large-screen-only" />
        <q-toolbar-title class="row justify-center items-center text-bold constrain">
          <q-icon
            name="camera_enhance"
            class="q-mr-sm"
            size="25px"
          ></q-icon>
          <div>Quasagram</div>
        </q-toolbar-title>
        <q-btn
          to="/"
          dense
          class="q-mr-sm large-screen-only"
          size="15px"
          icon="home"
        ></q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-brown-8 small-screen-only" elevated>
      <div
        v-if="showAppInstallBanner"
        class="banner-container bg-primary"
      >
        <div class="constrain">
          <q-banner
            inline-actions
            class="bg-primary text-white"
            dense
          >
            <template v-slot:avatar>
              <q-avatar
                color="white"
                icon="eva-camera-outline"
                text-color="grey-10"
                font-size="22px"
              />
            </template>

            <strong>Install Quasagram?</strong>
            <template v-slot:action>
              <q-btn
                @click="installApp"
                flat
                label="Yes"
                dense
                class="q-px-sm"
              />
              <q-btn flat label="Later" dense class="q-px-sm"/>
              <q-btn flat label="Never" dense class="q-px-sm"/>
            </template>
          </q-banner>
        </div>
      </div>
        <q-tabs
            indicator-color="transparent"
            active-color="warning"
            align="center"
            class="text-white small-screen-only"
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
let deferredPrompt;

export default {
  name: 'MainLayout',
  data () {
    return {
      tab: '',
      showAppInstallBanner: true,
    }
  },
  methods: {
    installApp() {
      this.showAppInstallBanner = false;
      deferredPrompt.prompt();
      deferredPrompt.userChoice
        .then(choiceResult => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt')
          } else {
            console.log('User dismissed the install prompt')
          }
        })
    }
  },
  mounted() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      console.log(deferredPrompt, '12333')
      setTimeout(() => {
        this.showAppInstallBanner = true;
      }, 3000);
    });

  }
}
</script>

<style lang="sass">
  .q-toobar
    @media (min-width: $breakpoint-sm-min)
      height: 77px
  .q-toobar__title
    text-align: center
    font-size: 30px
  .q-footer
    .q-tab__icon
      font-size: 30px
</style>
