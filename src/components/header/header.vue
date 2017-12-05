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
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span> 
          <span class="text">{{seller.supports[1].description}}</span>
        </div>
      </div>
      <!-- 多少优惠券 -->
      <div v-if="seller.supports" class="support-content" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <!-- 商家公告 -->
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <!-- 背景图 -->
    <div class="background">
        <img :src="seller.avatar" width="100%" height="100%" >
    </div>
    <!-- 弹出层 -->
    <transition name="slide-fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <star :size='48' :score="seller.score"></star>
          </div>
        </div>
        <div class="detail-close"@click="detailShow = !detailShow">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import star from '@/components/star/star'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetail: function () {
      this.detailShow = true
    }
  },
  created () {
    this.classMap = ['decress', 'discount', 'guarantee', 'invoice', 'special']
  },
  components: {
    star
  }
}
</script>

<style lang="stylus">
@import '../../common/stylus/mixin'
.header
  position relative
  blur: 10px
  // 为了让底部图片显示设置半透明背景
  background: rgba(7,17,27,.5)
  color rgb(255,255,255)
  overflow hidden
  .content-wrapper
    position relative
    padding 24px 12px 18px 24px
    // 消除图片与文字之间的缝隙
    font-size 0
    .avatar
      border-radius 2px
      display inline-block
      vertical-align middle
    .content
      display inline-block
      vertical-align middle
      margin-left 16px
      .title
        margin 2px 0 8px 0
        .brand
          width 30px
          height 18px
          display inline-block
          // inline-block 顶部对齐
          vertical-align top
          bg-image('brand')
          background-size 30px 18px
          background-repeat no-repeat
        .name
          margin-left 6px
          font-size 16px
          font-weight bold
          line-height 18px
      .description
        font-size 12px
        line-height 12px
        margin 8px 0 10px
      .support
        .icon
          display inline-block
          vertical-align top
          width 12px
          height 12px
          margin-right 4px
          background-size 12px 12px
          background-repeat no-repeat
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
        .text
          line-height 12px
          font-size 10px
    .support-content
      position absolute
      right 12px
      bottom 14px
      padding 0 8px
      height 24px
      line-height 24px
      border-radius 14px
      background rgba(0,0,0,.2)
      text-align center
      .count
        font-size 10px
        // 为了让图标字体和文字居中就要top
        vertical-align top
      .icon-keyboard_arrow_right
        margin-left 2px
        // 全局默认line-height 1所以要设置相同行高
        line-height 24px
        font-size 10px
  .bulletin-wrapper
    position relative
    height 28px
    padding 0 22px 0 12px
    line-height 28px
    background-color rgba(7,17,27,.2)
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    cursor pointer
    .bulletin-title
      display inline-block
      width 22px
      height 12px
      margin-top 8px
      vertical-align top
      bg-image('bulletin')
      background-size 22px 12px
      background-repeat no-repeat
    .bulletin-text
      margin 0 4px
      font-size 10px
      vertical-align top
    .icon-keyboard_arrow_right
      position absolute
      font-size 10px
      right 12px
      top 9px
  .background
    position absolute
    z-index -1
    top 0
    left 0
    width 100%
    height 100%
    filter blur(10px)
  .detail
    position fixed
    z-index 100
    top 0
    left 0
    width 100%
    height 100%
    // 内容超出，出现滚动条
    overflow auto
    background rgba(7,17,27,.8)
    .detail-wrapper
      width 100%
      min-height 100%
      .detail-main
        margin-top 64px
        padding-bottom 64px
        .name
          line-height 16px
          text-align center
          font-size 16px
          font-weight 700

    .detail-close
      position relative
      width 32px
      height 32px
      margin -64px auto 0 auto
      clear both
      font-size 32px

.slide-fade-enter-active 
  transition: all .5s ease
.slide-fade-leave-active 
  transition: all .5s ease
.slide-fade-enter, .slide-fade-leave-to
  transform: translateX(100%)
  opacity: 0

</style>
