<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <i class="icon-shopp  ing_cart"></i>
          </div>
        </div>
        <div class="price"></div>
        <div class="des"></div>
      </div>
      <div class="content-right"></div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus">
.shopcart
  position fixed
  left 0
  bottom 0
  z-index 20
  width 100%
  height 48px
  .content
    display flex
    background #141d27
    font-size 0
    .content-left
      flex 1
      .logo-wrapper
        display inline-block
        position relative
        top -10px
        width 56px
        height 56px
        margin 0 12px
        padding 6px
        box-sizing border-box
        vertical-align top
        border-radius 50%
        background #141d27
        .logo
          width 100%
          height 100%
          border-radius 50%
          background #2b343c
          text-align center
          .icon-shopping_cart
            line-height 44px
            width 100%
            font-size 24px
            color #80858a
      .price
        display inline-block
      .desc
        display inline-block
    .content-right
      flex 0 0 105px
      width 105px
</style>
