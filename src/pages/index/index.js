import 'css/common.css'
import './index.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

import {InfiniteScroll} from 'mint-ui';
Vue.use(InfiniteScroll);

import FootNav from 'components/footnav.vue'
import Swiper from 'components/Swiper.vue'

new Vue({
  el: '#app',
  //存放所有vue实例的数据
  data: {
    lists: null,
    pageNum: 1,
    loading: false,
    pageSize:6,
    allLoaded: false,
    bannerLists:null
  },
  created() {
    this.getLists()
    this.getBanner()
  },
  methods: {
    getLists() {
      if(this.allLoaded) return
      this.loading = true
      axios.post(url.hotLists, {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then((response) => {
        let curLists = response.data.lists
        //判断所有数据是否加载完毕
        if (curLists.length < this.pageSize) {
          this.allLoaded =true
        }
        if (this.lists) {
          this.lists = this.lists.concat(curLists)
        } else {
          this.lists = curLists
        }
        this.loading = false
        this.pageNum++
      })
    },
    getBanner() {
      axios.get(url.banner).then((response) => {
        this.bannerLists = response.data.lists
      })
    }
  },
  components: {
    FootNav,Swiper
  }
})