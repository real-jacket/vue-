webpackJsonp([3],{0:function(t,e,a){"use strict";var n={hotLists:"/index/hotLists",banner:"/index/banner",topList:"/category/topList",subList:"/category/sublist",rank:"/category/rank",searchList:"/search/list",details:"/goods/details",deal:"/goods/deal",cartAdd:"/cart/add",cartLists:"/cart/list",cartReduce:"/cart/reduce",cartRemove:"/cart/remove",cartMremove:"/cart/mremove",cartUpdate:"/cart/update",addressLists:"/address/list",addressAdd:"/address/add",addressRemove:"/address/remove",addressUpdate:"/address/update",addressSetDefault:"/address/setDefault"};for(var s in n)n.hasOwnProperty(s)&&(n[s]="http://rap2api.taobao.org/app/mock/7058"+n[s]);e.a=n},10:function(t,e){},107:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(71),s=(a.n(n),a(85)),i=a.n(s),r=a(14),o=(a.n(r),a(83)),c=(a.n(o),a(1)),d=a(3),l=a.n(d),u=a(0),p=a(8),f=a.n(p),h=a(22),v=a.n(h);c.default.use(i.a),new c.default({el:"#app",data:{lists:null,pageNum:1,loading:!1,pageSize:6,allLoaded:!1,bannerLists:null},created:function(){this.getLists(),this.getBanner()},methods:{getLists:function(){var t=this;this.allLoaded||(this.loading=!0,l.a.post(u.a.hotLists,{pageNum:this.pageNum,pageSize:this.pageSize}).then(function(e){var a=e.data.lists;a.length<t.pageSize&&(t.allLoaded=!0),t.lists?t.lists=t.lists.concat(a):t.lists=a,t.loading=!1,t.pageNum++}))},getBanner:function(){var t=this;l.a.get(u.a.banner).then(function(e){t.bannerLists=e.data.lists})}},components:{FootNav:f.a,Swiper:v.a}})},11:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bottom-nav"},[a("ul",t._l(t.navConfig,function(e,n){return a("li",{class:{active:n===t.curIndex},on:{click:function(a){t.changeNav(e,n)}}},[a("a",[a("i",{class:e.icon}),t._v(" "),a("div",[t._v("有赞")])])])}))])},staticRenderFns:[]}},14:function(t,e){},22:function(t,e,a){function n(t){a(40)}var s=a(6)(a(30),a(41),n,null,null);t.exports=s.exports},30:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(67),s=a(39);a.n(s);e.default={name:"swiper",props:{lists:{type:Array,require:!0}},mounted:function(){this.init()},methods:{init:function(){new n.a(".swiper-container",{loop:!0,pagination:{el:".swiper-pagination"}})}}}},39:function(t,e){},40:function(t,e){},41:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"swiper-container"},[a("div",{staticClass:"swiper-wrapper"},t._l(t.lists,function(t,e){return a("div",{key:e,staticClass:"swip-page swiper-slide"},[a("a",{staticClass:"js-no-follow",attrs:{href:t.clickUrl}},[a("img",{staticClass:"goods-main-photo fadeIn",attrs:{src:t.img}})])])})),t._v(" "),a("div",{staticClass:"swiper-pagination"})])},staticRenderFns:[]}},71:function(t,e){},8:function(t,e,a){function n(t){a(10)}var s=a(6)(a(9),a(11),n,null,null);t.exports=s.exports},83:function(t,e){},9:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(12),s=a.n(n),i=[{name:"有赞",href:"index.html",icon:"icon-home"},{name:"分类",href:"category.html",icon:"icon-category"},{name:"购物车",href:"cart.html",icon:"icon-cart"},{name:"我",href:"member.html",icon:"icon-user"}];e.default={data:function(){return{navConfig:i,curIndex:parseInt(s.a.parse(location.search.substr(1)).index)||0}},methods:{changeNav:function(t,e){location.href=t.href+"?index="+e}}}}},[107]);
//# sourceMappingURL=index.c8fa85bf2e960e1c6a8f.js.map