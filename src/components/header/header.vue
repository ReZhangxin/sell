<template>
  <div class="header">
    <div class="content-wrapper">
      <!-- 商家图片 -->
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64" >
      </div>
      <!-- 商家信息 -->
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="supports">
          {{seller.supports[0]['description']}}
        </div>
      </div>
    </div>
    <div class="background">
        <img :src="seller.avatar" width="100%" height="100%" >
    </div>
    <!-- 商家公告 -->
    <div class="bulletin-wrapper">
      {{seller.bulletin}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object
    }
  }
}
</script>

<style lang="stylus">
.header
  position relative
  blur: 10px
  background: rgba(7,17,27,.5)
  color rgb(255,255,255)
  overflow hidden
  .avatar
    margin 24px 16px 18px 24px
    border-radius 2px
    display inline-block
    vertical-align middle
  .content
    display inline-block
    vertical-align middle
    .title
      .name
        font-size 16px
        font-weight bold
        line-height 18px
    .description
      font-size 12px
      font-weight 200
      line-height 12px
      margin 8px 0 10px

.background
  position absolute
  z-index -1
  top 0
  left 0
  width 100%
  height 100%
  filter blur(10px)
.bulletin-wrapper
  padding 0 16px 0 12px
  height 28px
  line-height 28px
  font-size 10px
  font-weight 200
  color rgb(255,255,255)
  background-color rgba(7,17,27,.2)
  overflow hidden
  text-overflow ellipsis
  white-space nowrap
  position relative
  cursor pointer
  &:after
    content '>'
    position absolute
    right 12px
    top 0
    padding-left 4px

</style>
