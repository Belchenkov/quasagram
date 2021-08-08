<template>
  <q-page class="constrain q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        <q-card
          v-for="post in posts"
          :key="post.id"
          class="card-post q-mb-md"
          flat
          bordered
        >
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="http://193.187.173.150/img/avatar.c67798a5.png">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-bold">aleksey_belchenkov</q-item-label>
              <q-item-label caption>
                {{ post.location }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-img :src="post.imageUrl" />

          <q-card-section>
            <div>{{ post.caption }}</div>
            <div class="row no-wrap items-center">
              <span class="text-caption text-grey q-ml-sm">{{ post.date | niceDate}}</span>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-4 large-screen-only">
        <q-item class="fixed">
          <q-item-section avatar>
            <q-avatar size="48px">
              <img src="http://193.187.173.150/img/avatar.c67798a5.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">aleksey_belchenkov</q-item-label>
            <q-item-label caption>
              Saratov, Russia
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import { date } from "quasar";

export default {
  name: 'PageHome',
  data() {
    return {
      posts: [
        {
          id: 1,
          caption: 'Volga Bridge',
          date: 1627386478610,
          location: 'Saratov, Russia',
          imageUrl: 'https://www.cruisemapper.com/images/ports/11802-29232893d4.jpg'
        },
        {
          id: 2,
          caption: 'St. Petersburg in spring',
          date: 1227386473610,
          location: 'St.-Petersburg',
          imageUrl: 'https://blog.radissonblu.com/wp-content/uploads/2019/02/St.-Petersburg-Russia.jpg'
        },
        {
          id: 3,
          caption: 'Red Square on the night',
          date: 1647486478610,
          location: 'Moscow, Russia',
          imageUrl: 'https://c4.wallpaperflare.com/wallpaper/277/94/439/russland-moskau-basiliuskathedrale-wallpaper-preview.jpg'
        },
        {
          id: 4,
          caption: 'Kazan Digital Week',
          date: 1627386378610,
          location: 'Kazan, Russia',
          imageUrl: 'https://cdn24.img.ria.ru/images/154345/43/1543454330_0:78:1501:922_1920x0_80_0_0_284987a45d91abba236ba05293645aef.jpg'
        },
        {
          id: 5,
          caption: 'Southern capital of Russia',
          date: 1657386478610,
          location: 'Krasnodar, Russia',
          imageUrl: 'https://www.advantour.com/russia/images/krasnodar/krasnodar.jpg'
        }
      ]
    }
  },
  filters: {
    niceDate(value) {
      return date.formatDate(value, 'MMMM D h:mmA')
    }
  }
}
</script>

<style lang="sass">
  .card-post
    .q-img
      min-height: 200px
</style>
