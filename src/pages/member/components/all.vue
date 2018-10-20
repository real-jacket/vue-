<template>
  <div class="container " style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block" v-if="this.lists&&this.lists.length">
      <a class="block-item js-address-item address-item " 
        v-for="list in this.lists"
        :key = "list.id"
        :class="{'address-item-default':list.isDefault}"
      >
        <div class="address-title">{{list.name}} {{list.tel}}</div>
        <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
        <a class="edit" @click="toEdit(list)">编辑</a>
      </a>
    </div>
    <div v-if="this.lists && !this.lists.length">暂无相关地址，请添加地址！</div>
    <div class="block stick-bottom-row center">
      <router-link class="btn btn-blue js-no-webview-block js-add-address-btn" 
        :to="{ path: 'form', query: { type: 'add' }}"
      >
        新增地址
      </router-link>
    </div>
  </div>
</template>

<script>
  import Address from 'js/addressService.js'
  // import axios from 'axios'
  // import url from 'js/api.js'
  
  export default{
    computed:{
      lists(){
        return this.$store.state.lists
      }
    },
    created() {
      if(!this.lists){
        this.$store.dispatch('getLists')
      }
      // Address.list().then(res =>{
      //   this.lists = res.data.lists
      // })
      // axios.post(url.addressLists).then(res =>{
      //   console.log(res)
      // })
    },
    methods:{
      toEdit(list){
        this.$router.push(
          {
            path:'form',
            query:{
              type:'edit',
              instance: list
            }
          })
      }
    }
  }
</script>
