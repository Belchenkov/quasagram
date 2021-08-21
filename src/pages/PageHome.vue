<template>
  <q-page class="constrain q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        <template v-if="loadingPosts">
          <app-spinner />
        </template>
        <template v-if="!loadingPosts && posts.length === 0">
          <h5 class="text-center text-grey">No Posts Yet.</h5>
        </template>
        <template v-else>
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
        </template>
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
import AppSpinner from "components/Spinner";

export default {
  name: 'PageHome',
  data() {
    return {
      posts: [],
      loadingPosts: false,
    }
  },
  created() {
    this.getPosts();
  },
  components: {
    AppSpinner
  },
  filters: {
    niceDate(value) {
      return date.formatDate(value, 'MMMM D h:mmA')
    }
  },
  methods: {
    getPosts() {
      this.loadingPosts = true;

      this.$axios.get(`${process.env.API}/posts`)
      .then(response => {
        this.posts = response.data;
        this.loadingPosts = false;
      }).catch(err => {
        this.$q.dialog({
          title: 'Error',
          message: err.message
        });
        this.loadingPosts = false;
      });
    }
  }
}
</script>

<style lang="sass">
  .card-post
    .q-img
      min-height: 200px
</style>
