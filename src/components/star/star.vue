<template>
  <div class="star" :class="starType">
      <span v-for="itemClass in itemClasses" :key="itemClass" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script>
export default {

}
</script>

<style>
/* 6-14 */
</style>
