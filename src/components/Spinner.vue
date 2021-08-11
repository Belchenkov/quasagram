<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row items-center justify-center align-center">
      <q-spinner-cube
        v-for="size in ['xl']"
        :key="size"
        :size="size"
        color="orange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Spinner"
}
</script>

<style scoped>

</style>
