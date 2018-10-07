import 'css/common.css'
import './category.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

// import FootNav from 'components/footnav.vue'
import mixin from 'js/mixin';

new Vue({
    el: '#app',
    data: {
        topLists: null,
        topIndex: 0,
        subData: null,
        rankData:null
    },
    created() {
        this.getTopLists()
        this.getSubList(0)
    },
    methods: {
        getTopLists() {
            axios.post(url.topList).then((response) => {
                this.topLists = response.data.lists
            })
        },
        getSubList(index,id) {
            this.topIndex = index
            if (index === 0) {
                this.getRank()
            } else {
                axios.post(url.subList, {id}).then((response) => {
                  this.subData = response.data.data
                })
            }
        },
        getRank() {
            axios.post(url.rank).then((response) => {
                this.rankData = response.data.data
            })
        },
        toSearch(list) {
            location.href = `search.html?keyword=${list.name}&id=${list.id}`
        }
    },
    // components: {
    //     FootNav
    // },
    // filters: {
    //     number(price) {
    //         return price + '.00'
    //     }
    // },
    mixins:[mixin]
})