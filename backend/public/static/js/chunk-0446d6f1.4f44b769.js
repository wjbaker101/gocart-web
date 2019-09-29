(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0446d6f1"],{"04b9":function(t,n,e){"use strict";var c=e("8e31"),s=e.n(c);s.a},2770:function(t,n,e){"use strict";var c=e("6df6"),s=e.n(c);s.a},"29a8":function(t,n,e){"use strict";var c=e("d903"),s=e.n(c);s.a},"52b9":function(t,n,e){"use strict";e.r(n);var c=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"shopping-list-view"},[e("HeaderComponent",{scopedSlots:t._u([{key:"right-side",fn:function(){return[e("BasketIcon"),e("span",{staticClass:"total-price"},[t._v(t._s(t.totalPrice))])]},proxy:!0}])}),e("div",{staticClass:"shopping-list-container"},[e("div",{staticClass:"heading-container"},[e("p",{staticClass:"heading-left"},[t._v("Shopping List:")]),e("p",{staticClass:"heading-right"},[t._v("("+t._s(t.uncheckedProducts.length)+")")])]),e("div",{staticClass:"unchecked-products-container"},t._l(t.uncheckedProducts,function(n,c){return e("ProductItemComponent",{key:n.tpnc,style:"animation-duration: "+t.loadAnimationDuration(c)+"s",attrs:{product:n,hasCheckBox:"true"}})}),1),e("div",{staticClass:"heading-container"},[e("p",{staticClass:"heading-left"},[t._v("Checked Items:")]),e("p",{staticClass:"heading-right"},[t._v("("+t._s(t.checkedProducts.length)+")")])]),e("div",{staticClass:"unchecked-products-container"},t._l(t.checkedProducts,function(n,c){return e("ProductItemComponent",{key:n.tpnc,style:"animation-duration: "+t.loadAnimationDuration(c)+"s",attrs:{product:n,hasCheckBox:"true"}})}),1)])],1)},s=[],i=e("6073"),o=e("ae54"),a={functional:!0,render(t,n){const{_c:e,_v:c,data:s,children:i=[]}=n,{class:o,staticClass:a,style:r,staticStyle:u,attrs:d={},...l}=s;return e("svg",{class:["icon",o,a],style:[r,u],attrs:Object.assign({"aria-hidden":"true",class:"icon",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 576 512"},d),...l},i.concat([e("path",{attrs:{fill:"currentColor",d:"M576 216v16c0 13.255-10.745 24-24 24h-8l-26.113 182.788C514.509 462.435 494.257 480 470.37 480H105.63c-23.887 0-44.139-17.565-47.518-41.212L32 256h-8c-13.255 0-24-10.745-24-24v-16c0-13.255 10.745-24 24-24h67.341l106.78-146.821c10.395-14.292 30.407-17.453 44.701-7.058 14.293 10.395 17.453 30.408 7.058 44.701L170.477 192h235.046L326.12 82.821c-10.395-14.292-7.234-34.306 7.059-44.701 14.291-10.395 34.306-7.235 44.701 7.058L484.659 192H552c13.255 0 24 10.745 24 24zM312 392V280c0-13.255-10.745-24-24-24s-24 10.745-24 24v112c0 13.255 10.745 24 24 24s24-10.745 24-24zm112 0V280c0-13.255-10.745-24-24-24s-24 10.745-24 24v112c0 13.255 10.745 24 24 24s24-10.745 24-24zm-224 0V280c0-13.255-10.745-24-24-24s-24 10.745-24 24v112c0 13.255 10.745 24 24 24s24-10.745 24-24z"}})]))}},r={name:"ShoppingListView",components:{HeaderComponent:i["a"],ProductItemComponent:o["a"],BasketIcon:a},data:function(){return{initialShoppingList:{},shoppingListOrder:[]}},computed:{shoppingList:function(){var t=this;return this.shoppingListOrder.map(function(n){return t.initialShoppingList[n]})},uncheckedProducts:function(){return this.shoppingList.filter(function(t){return!t.isChecked})},checkedProducts:function(){return this.shoppingList.filter(function(t){return t.isChecked})},loadAnimationDuration:function(){return function(t){return t>20?3:.15*(t+1)}},totalPrice:function(){if(0===this.uncheckedProducts.length)return"Empty!";var t=this.uncheckedProducts.map(function(t){return t.price*t.quantity}).reduce(function(t,n){return t+n}).toFixed(2);return"£".concat(t)}},created:function(){this.$emit("viewChange","shopping_list"),this.initialShoppingList=this.$root.$data.getShoppingList(),this.shoppingListOrder=this.$root.$data.getShoppingListOrder()},watch:{uncheckedProducts:function(t,n){this.$emit("viewChange","shopping_list"),console.log("change")}}},u=r,d=(e("04b9"),e("2877")),l=Object(d["a"])(u,c,s,!1,null,null,null);n["default"]=l.exports},"6df6":function(t,n,e){},"8e31":function(t,n,e){},ae54:function(t,n,e){"use strict";var c=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"product-item-component",attrs:{"data-product-id":t.product.tpnc},on:{click:function(n){return n.target!==n.currentTarget?null:t.onClick(n)}}},[t.hasCheckBox?e("div",{staticClass:"is-checked-container"},[e("CheckBoxComponent",{attrs:{id:t.product.tpnc+"-checkbox"},model:{value:t.product.isChecked,callback:function(n){t.$set(t.product,"isChecked",n)},expression:"product.isChecked"}})],1):t._e(),e("div",{staticClass:"image-container"},[t.showPlaceholderImage?e("div",{staticClass:"placeholder-image-container"},[e("FoodIcon")],1):e("img",{staticClass:"product-image",attrs:{src:t.product.image}})]),e("div",{staticClass:"product-name"},[e("span",[t._v(t._s(t.product.name))])]),e("div",{staticClass:"product-price"},[e("span",[t._v("£"+t._s(t.product.price.toFixed(2)))]),t.product.quantity>1?e("div",{staticClass:"quantity-container"},[e("strong",[t._v("×"+t._s(t.product.quantity))])]):t._e()])])},s=[],i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"checkbox-component"},[e("input",{ref:"checkboxInput",attrs:{id:t.id,type:"checkbox"},domProps:{checked:t.value},on:{change:t.update}}),e("label",{staticClass:"checkbox-label",attrs:{for:t.id}},[t._v(t._s(t.label))]),e("span",{staticClass:"check"})])},o=[],a={name:"CheckBoxComponent",props:["id","label","value"],methods:{update:function(t){this.$emit("input",t.target.checked)}}},r=a,u=(e("2770"),e("2877")),d=Object(u["a"])(r,i,o,!1,null,null,null),l=d.exports,p={functional:!0,render(t,n){const{_c:e,_v:c,data:s,children:i=[]}=n,{class:o,staticClass:a,style:r,staticStyle:u,attrs:d={},...l}=s;return e("svg",{class:["icon",o,a],style:[r,u],attrs:Object.assign({"aria-hidden":"true",class:"icon",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 416 512"},d),...l},i.concat([e("path",{attrs:{fill:"currentColor",d:"M207.9 15.2c.8 4.7 16.1 94.5 16.1 128.8 0 52.3-27.8 89.6-68.9 104.6L168 486.7c.7 13.7-10.2 25.3-24 25.3H80c-13.7 0-24.7-11.5-24-25.3l12.9-238.1C27.7 233.6 0 196.2 0 144 0 109.6 15.3 19.9 16.1 15.2 19.3-5.1 61.4-5.4 64 16.3v141.2c1.3 3.4 15.1 3.2 16 0 1.4-25.3 7.9-139.2 8-141.8 3.3-20.8 44.7-20.8 47.9 0 .2 2.7 6.6 116.5 8 141.8.9 3.2 14.8 3.4 16 0V16.3c2.6-21.6 44.8-21.4 48-1.1zm119.2 285.7l-15 185.1c-1.2 14 9.9 26 23.9 26h56c13.3 0 24-10.7 24-24V24c0-13.2-10.7-24-24-24-82.5 0-221.4 178.5-64.9 300.9z"}})]))}},h={name:"ProductItemComponent",props:["product","hasCheckBox"],components:{CheckBoxComponent:l,FoodIcon:p},computed:{showPlaceholderImage:function(){return null===this.product.image||""===this.product.image}},methods:{onClick:function(){this.$router.push({name:"product-route",params:{product:this.product}})}}},m=h,g=(e("29a8"),Object(u["a"])(m,c,s,!1,null,null,null));n["a"]=g.exports},d903:function(t,n,e){}}]);
//# sourceMappingURL=chunk-0446d6f1.4f44b769.js.map