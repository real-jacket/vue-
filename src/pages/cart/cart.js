import './cart.css'
import './cart_trade.css'
import './cart_base.css'

import Vue from 'vue'
import mixin from 'js/mixin.js'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'

new Vue({
    el: '.container',
    data: {
        lists: null,
        total:0,
    },
    computed: {
        allSelected: {
            get() {
                if (this.lists && this.lists.length) {
                    return this.lists.every(shop => {
                        return shop.checked === true
                    })
                }
                return false
            },
            set(newVal) {
                this.lists.forEach(shop => {
                    shop.checked = newVal
                    shop.goodsList.forEach(good => {
                        good.checked = newVal
                    })
                })
            }
        },
        selectLists() {
            if (this.lists && this.lists.length) {
                let arr = []
                let total = 0
                this.lists.forEach(shop => {
                    shop.goodsList.forEach(good => {
                        if (good.checked) {
                            arr.push(good)
                            total += good.price*good.number
                        }
                    })
                })
                this.total = total
                return arr
            }
            return []
        }
    },
    created() {
        this.getLists()
    },
    methods: {
        getLists() {
            axios.post(url.cartLists).then(res => {
                let lists = res.data.cartList
                lists.forEach(shop => {
                    shop.checked =true
                    shop.goodsList.forEach(good => {
                    good.checked = true
                    });
                });
                
                this.lists = lists
            })
        },
        selectGood(shop,good) {
            good.checked = !good.checked
            shop.checked = shop.goodsList.every(good => {
                return good.checked
            })
        },
        selectShop(shop) {
            shop.checked = !shop.checked
            shop.goodsList.forEach(good => {
                good.checked = shop.checked
            })
        },
        selectAll() {
            this.allSelected = !this.allSelected
        }
    },
    mixins:[mixin]
})