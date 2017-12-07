<template>
  <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <li v-for="(item,index) in goods" :key="index" class="menu-item">
            <span class="icon" ></span>{{goods[index].name}}
          </li>
        </ul>
      </div>
      <div class="foods-wrapper"></div>
  </div>
</template>

<script>
import axios from 'axios'
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
    
    .foods-wrapper 
        flex 1
    

</style>
