<template>
   <div>
     <div v-for="(item,index) in data" :key="index" :class="disType">
      <span class="icon" :class="classMap[data[index].type]" ></span> 
      <span class="text">{{data[index].description}}</span>
     </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array
    },
    size: {
      type: Number
    }
  },
  created () {
    this.classMap = ['decress', 'discount', 'guarantee', 'invoice', 'special']
  },
  computed: {
    disType () {
      return 'discounts-' + this.size
    }
  }
}
</script>

<style lang="stylus">
@import '../../common/stylus/mixin'

.discounts-1
  discounts(12px)
  .text
    font-size 10px
    line-height 12px
.discounts-2
  discounts(16px)
  .text
    font-size 12px
    line-height 16px
</style>
