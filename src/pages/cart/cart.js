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
        total: 0,
        editingShop: null,
        editingShopIndex: -1,
        removePopup: false,
        removeData:null,
        removeMsg:'',
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
        },
        allRemoveSelected: {
            get() {
                if (this.editingShop) {
                    return this.editingShop.removeChecked
                }
                return false
            },
            set(newVal) {
                if (this.editingShop) {
                    this.editingShop.removeChecked = newVal
                    this.editingShop.goodsList.forEach(good => {
                        good.removeChecked = newVal;
                    })
                }
            }
        },
        removeLists() {
            if (this.editingShop) {
              let arr = []
              this.lists.forEach(shop => {
                shop.goodsList.forEach(good => {
                  if (good.removeChecked) {
                    arr.push(good)
                  }
                })
              })
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
                    shop.checked = true
                    shop.removeChecked = false
                    shop.editing = false
                    shop.editingMsg = '编辑'
                    shop.goodsList.forEach(good => {
                        good.checked = true
                        good.removeChecked = false
                    });
                });
                
                this.lists = lists
            })
        },
        selectGood(shop, good) {
            let attr = this.editingShop ? 'removeChecked' : 'checked'
            good[attr] = !good[attr]
            shop[attr] = shop.goodsList.every(good => {
                return good[attr]
            })
        },
        selectShop(shop) {
            let attr = this.editingShop ? 'removeChecked' : 'checked'
            shop[attr] = !shop[attr]
            shop.goodsList.forEach(good => {
                good[attr] = shop[attr]
            })
        },
        selectAll() {
            let attr = this.editingShop ? 'allRemoveSelected' : 'allSelected'
            this[attr] = !this[attr]
        },
        edit(shop, shopIndex) {
            shop.editing = !shop.editing
            shop.editingMsg = shop.editing ? "完成" : "编辑"
            this.lists.forEach((item, index) => {
                if (index !== shopIndex) {
                    item.editing = false
                    item.editingMsg = shop.editing ? "" : "编辑"
                }
            })
            this.editingShop = shop.editing ? shop : null
            this.editingShopIndex = shop.editing ? shopIndex : -1
        },
        reduce(good) {
            if(good.number===1) return
            good.number--
        },
        add(good) {
            good.number++
        },
        remove(shop, shopIndex, good, goodIndex) {
            this.removePopup = true
            this.removeData = { shop, shopIndex, good, goodIndex }
            this.removeMsg = "确定要删除商品么？"
        },
        removeConfirm() {
            let { shop, shopIndex, good, goodIndex } = this.removeData
            axios.post(url.cartRemove, {
              id: good.id
            }).then(res => {
                shop.goodsList.splice(goodIndex, 1)
                if (!shop.goodsList.length) {
                    this.lists.splice(shopIndex, 1)
                    this.removeShop()
                }
                this.removePopup = false
            })
            
        },
        removeShop() {
            this.editingShop = null
            this.editingShopIndex = -1
            this.lists.forEach(item => {
              item.editing = false
              item.editingMsg = '编辑'
            })
        }
    },
    mixins:[mixin]
})