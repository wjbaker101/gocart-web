(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-77114dce"],{"04b9":function(t,e,n){"use strict";var c=n("8e31"),r=n.n(c);r.a},4169:function(t,e,n){"use strict";var c=n("f8b2"),r=n.n(c);r.a},"52b9":function(t,e,n){"use strict";n.r(e);var c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"shopping-list-view"},[n("div",{staticClass:"shopping-list-container"},[n("div",{staticClass:"heading-container"},[n("p",{staticClass:"heading-left"},[t._v("Shopping List:")]),n("p",{staticClass:"heading-right"},[t._v("("+t._s(t.uncheckedProducts.length)+")")])]),n("div",{staticClass:"unchecked-products-container"},t._l(t.uncheckedProducts,function(t,e){return n("ProductItemComponent",{key:e,attrs:{product:t,hasCheckBox:"true"}})}),1),n("div",{staticClass:"heading-container"},[n("p",{staticClass:"heading-left"},[t._v("Checked Items:")]),n("p",{staticClass:"heading-right"},[t._v("("+t._s(t.checkedProducts.length)+")")])]),n("div",{staticClass:"unchecked-products-container"},t._l(t.checkedProducts,function(t,e){return n("ProductItemComponent",{key:e,staticStyle:{"animation-duration":"0"},attrs:{product:t,hasCheckBox:"true"}})}),1)])])},r=[],s=(n("96cf"),n("3b8d")),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"shopping-list-container"},[n("h2",[t._v("Search Result")]),t._l(t.productSearchResult,function(e,c){return n("article",{key:c,staticClass:"card",attrs:{"data-product-id":e.tpnc}},[n("div",{staticClass:"image-container"},[n("img",{staticClass:"product-image",attrs:{src:e.image}})]),n("div",{staticClass:"product-name"},[n("div",[n("span",[t._v(t._s(e.name))])])]),n("div",{staticClass:"product-price"},[n("span",[t._v("£"+t._s(e.price.toFixed(2)))])])])})],2)},a=[],u=n("19e3"),o={name:"ShoppingListComponent",props:["shoppingList"],data:function(){return{productSearchResult:[]}},computed:{checkedProducts:function(){return this.shoppingList.filter(function(t){return t.checked})},uncheckedProducts:function(){return this.shoppingList.filter(function(t){return!t.checked})}},mounted:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,u["a"].searchProduct("ketchup");case 2:e=t.sent,this.productSearchResult=e.data.result,this.$emit("productSelected",this.productSearchResult[0]);case 5:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},d=o,p=(n("4169"),n("2877")),h=Object(p["a"])(d,i,a,!1,null,null,null),l=h.exports,f=n("ae54"),m=n("461a"),g={name:"ShoppingListView",components:{ShoppingListComponent:l,ProductItemComponent:f["a"]},data:function(){return{products:[]}},computed:{uncheckedProducts:function(){return this.products.filter(function(t){return!t.isChecked})},checkedProducts:function(){return this.products.filter(function(t){return t.isChecked})}},mounted:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,m["a"].getProducts();case 2:this.products=t.sent;case 3:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},v=g,k=(n("04b9"),Object(p["a"])(v,c,r,!1,null,null,null));e["default"]=k.exports},"8e31":function(t,e,n){},f8b2:function(t,e,n){}}]);
//# sourceMappingURL=chunk-77114dce.b2da00e5.js.map