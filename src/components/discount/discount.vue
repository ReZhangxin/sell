<template>
   <div>
     <div class="discounts-1"  v-for="(item,index) in data" :key="index" :class="disType">
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
  vertical-align top
  padding 0 0 12px 0
  &:last-child
    padding-bottom 0
  .icon
    display inline-block
    width 12px
    height 12px
    margin-right 4px
    background-size 12px 12px
    background-repeat no-repeat
    vertical-align top
    &.decress
      bg-image('decrease_1')
    &.discount
      bg-image('discount_1')
    &.guarantee
      bg-image('guarantee_1')
    &.invoice
      bg-image('invoice_1')
    &.special
      bg-image('special_1')
.discounts-2
  vertical-align top
  padding 0 0 12px 0
  &:last-child
    padding-bottom 0
  .icon
    display inline-block
    width 12px
    height 12px
    margin-right 4px
    background-size 12px 12px
    background-repeat no-repeat
    vertical-align top
    &.decress
      bg-image('decrease_2')
    &.discount
      bg-image('discount_2')
    &.guarantee
      bg-image('guarantee_2')
    &.invoice
      bg-image('invoice_2')
    &.special
      bg-image('special_2')
  .text
    line-height 12px
</style>
