<template>
  <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <!-- <li v-for="(item,index) in goods" :key="index" class="menu-item">
            <span class="icon" ></span>
            <span class="text">{{goods[index].name}}</span>
          </li> -->
        </ul>
      </div>
      <div class="foods-wrapper">
        <!-- <discount :icons="i-discount" :texts="t-discount"></discount> -->
      </div>
  </div>
</template>

<script>
import axios from 'axios'
// import discount from '@/components/discount/discount'
const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: []
    }
  },
  created () {
    axios
      .get('/api/goods')
      .then(res => {
        if (res.data.errno === ERR_OK) {
          this.goods = res.data.data
          // console.log(this.goods)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang="stylus">
.goods 
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper 
        flex 0 0 80px
        width 80px
        background #f3f5f7
      .menu-item
        display table
        width 56px
        height 54px
        padding 0 12px
        font-size 12px
        line-height 14px
        .text
          display table-cell
          vertical-align middle
    .foods-wrapper 
        flex 1
    

</style>
