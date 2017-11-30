<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to='/goods'>商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to='/ratings'>评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to='/seller'>商家</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import header from '@/components/header/header.vue'
import axios from 'axios'

const ERR_OK = 0

export default {
  name: 'app',
  data () {
    return {
      seller: { }
    }
  },
  created: function () {
    axios.get('/api/seller')
    .then(res => {
      if (res.data.errno == ERR_OK) {
        this.seller = res.data.data
      }
      console.log(res.data)
      console.log(this.seller)
    })
    .catch(err => {
      console.log(err)
    })
  },
  components: {
    'v-header': header
  }
}
</script>

<style>
.tab{
  background: #008080;
}
</style>

<style lang="stylus">
  @import './common/stylus/mixin.styl'
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    /* border-bottom: 1px solid */
    border-1px(#ddd)
    dddddd
    .tab-item
      flex: 1
      text-align: center
</style>
