(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-af8a6d28"],{"0a5b":function(t,e,s){"use strict";var n=s("0c7a"),a=s.n(n);a.a},"0c7a":function(t,e,s){},2770:function(t,e,s){"use strict";var n=s("6df6"),a=s.n(n);a.a},"29a8":function(t,e,s){"use strict";var n=s("d903"),a=s.n(n);a.a},"6df6":function(t,e,s){},ae54:function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"product-item-component",attrs:{"data-product-id":t.product.tpnc},on:{click:function(e){return e.target!==e.currentTarget?null:t.onClick(e)}}},[t.hasCheckBox?s("div",{staticClass:"is-checked-container"},[s("CheckBoxComponent",{attrs:{id:t.product.tpnc+"-checkbox"},model:{value:t.product.isChecked,callback:function(e){t.$set(t.product,"isChecked",e)},expression:"product.isChecked"}})],1):t._e(),s("div",{staticClass:"image-container"},[t.showPlaceholderImage?s("div",{staticClass:"placeholder-image-container"},[s("FoodIcon")],1):s("img",{staticClass:"product-image",attrs:{src:t.product.image}})]),s("div",{staticClass:"product-name"},[s("span",[t._v(t._s(t.product.name))])]),s("div",{staticClass:"product-price"},[s("span",[t._v("£"+t._s(t.product.price.toFixed(2)))]),t.product.quantity>1?s("div",{staticClass:"quantity-container"},[s("strong",[t._v("×"+t._s(t.product.quantity))])]):t._e()])])},a=[],r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"checkbox-component"},[s("input",{ref:"checkboxInput",attrs:{id:t.id,type:"checkbox"},domProps:{checked:t.value},on:{change:t.update}}),s("label",{staticClass:"checkbox-label",attrs:{for:t.id}},[t._v(t._s(t.label))]),s("span",{staticClass:"check"})])},c=[],i={name:"CheckBoxComponent",props:["id","label","value"],methods:{update:function(t){this.$emit("input",t.target.checked)}}},o=i,u=(s("2770"),s("2877")),l=Object(u["a"])(o,r,c,!1,null,null,null),d=l.exports,h={functional:!0,render(t,e){const{_c:s,_v:n,data:a,children:r=[]}=e,{class:c,staticClass:i,style:o,staticStyle:u,attrs:l={},...d}=a;return s("svg",{class:["icon",c,i],style:[o,u],attrs:Object.assign({"aria-hidden":"true",class:"icon",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 416 512"},l),...d},r.concat([s("path",{attrs:{fill:"currentColor",d:"M207.9 15.2c.8 4.7 16.1 94.5 16.1 128.8 0 52.3-27.8 89.6-68.9 104.6L168 486.7c.7 13.7-10.2 25.3-24 25.3H80c-13.7 0-24.7-11.5-24-25.3l12.9-238.1C27.7 233.6 0 196.2 0 144 0 109.6 15.3 19.9 16.1 15.2 19.3-5.1 61.4-5.4 64 16.3v141.2c1.3 3.4 15.1 3.2 16 0 1.4-25.3 7.9-139.2 8-141.8 3.3-20.8 44.7-20.8 47.9 0 .2 2.7 6.6 116.5 8 141.8.9 3.2 14.8 3.4 16 0V16.3c2.6-21.6 44.8-21.4 48-1.1zm119.2 285.7l-15 185.1c-1.2 14 9.9 26 23.9 26h56c13.3 0 24-10.7 24-24V24c0-13.2-10.7-24-24-24-82.5 0-221.4 178.5-64.9 300.9z"}})]))}},p={name:"ProductItemComponent",props:["product","hasCheckBox"],components:{CheckBoxComponent:d,FoodIcon:h},computed:{showPlaceholderImage:function(){return null===this.product.image||""===this.product.image}},methods:{onClick:function(){this.$router.push({name:"product-route",params:{product:this.product}})}}},m=p,v=(s("29a8"),Object(u["a"])(m,n,a,!1,null,null,null));e["a"]=v.exports},d903:function(t,e,s){},f9b5:function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"product-search-view"},[s("HeaderComponent",{scopedSlots:t._u([{key:"below",fn:function(){return[s("div",{staticClass:"search-input-container"},[s("InputComponent",{attrs:{placeholder:"Apple Pie"},on:{enter:t.onSearch},model:{value:t.searchTerm,callback:function(e){t.searchTerm=e},expression:"searchTerm"}})],1)]},proxy:!0},{key:"right-side",fn:function(){return[s("div",{staticClass:"sort-container",on:{click:function(e){t.isSortOptionsVisible=!t.isSortOptionsVisible}}},[t._v("\n                Sort Results\n                "),s("SortIcon"),s("div",{staticClass:"sort-options-container",class:{"is-visible":t.isSortOptionsVisible}},[s("ul",[s("li",[t._v("Alphabetical")]),s("li",[t._v("Price")]),s("li",[t._v("Health")])])])],1)]},proxy:!0}])}),s("div",{staticClass:"search-container"},[s("p",{directives:[{name:"show",rawName:"v-show",value:!t.isLoaded&&!t.isLoading,expression:"!isLoaded && !isLoading"}],staticClass:"text-centered"},[t._v("No results yet!")]),s("p",{directives:[{name:"show",rawName:"v-show",value:t.isLoading,expression:"isLoading"}],staticClass:"text-centered"},[t._v("Searching...")]),s("div",{directives:[{name:"show",rawName:"v-show",value:t.isLoaded&&null!==t.searchResult,expression:"isLoaded && searchResult !== null"}],staticClass:"search-results"},t._l(t.searchResult,function(e,n){return s("ProductItemComponent",{key:n,style:"animation-duration: "+t.loadAnimationDuration(n)+"s",attrs:{product:e,hasCheckBox:"true"},on:{expandProduct:t.onExpandProduct}})}),1)])],1)},a=[],r=s("cebc"),c=(s("96cf"),s("3b8d")),i=s("19e3"),o=s("6073"),u=s("d784"),l=s("ae54"),d={functional:!0,render(t,e){const{_c:s,_v:n,data:a,children:r=[]}=e,{class:c,staticClass:i,style:o,staticStyle:u,attrs:l={},...d}=a;return s("svg",{class:["icon",c,i],style:[o,u],attrs:Object.assign({"aria-hidden":"true",class:"icon",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 320 512"},l),...d},r.concat([s("path",{attrs:{fill:"currentColor",d:"M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"}})]))}},h=s("d225"),p=s("b0b4"),m=s("40e7"),v=function(){function t(){Object(h["a"])(this,t),this.productsKey="search-result"}return Object(p["a"])(t,[{key:"saveSearchResult",value:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(e){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,m["a"].storeData(this.productsKey,e);case 2:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()},{key:"getSearchResult",value:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,m["a"].getData(this.productsKey);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()}]),t}(),f=(new v,{name:"ProductSearchView",components:{HeaderComponent:o["a"],InputComponent:u["a"],ProductItemComponent:l["a"],SortIcon:d},data:function(){return{searchTerm:"",isLoaded:!1,isLoading:!1,searchResult:null,isSortOptionsVisible:!1}},computed:{loadAnimationDuration:function(){return function(t){return t>20?3:.15*(t+1)}}},methods:{onSearch:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(0!==this.searchTerm.length){t.next=2;break}return t.abrupt("return");case 2:return this.isLoaded=!1,this.isLoading=!0,t.next=6,i["a"].searchProduct(this.searchTerm);case 6:e=t.sent,this.searchResult=e.data.result.map(function(t){return Object(r["a"])({},t,{quantity:1,isChecked:!1})}),console.log(this.searchResult),this.$root.$data.setSearchResult({searchTerm:this.searchTerm,searchResult:this.searchResult}),this.isLoaded=!0,this.isLoading=!1;case 12:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),onExpandProduct:function(t){this.$emit("expandProduct",t)},getCachedSearchResult:function(){if(null===this.searchResult){var t=this.$root.$data.getSearchResult();null!==t&&(this.searchResult=t.searchResult,this.searchTerm=t.searchTerm,this.isLoaded=!0,this.isLoading=!1)}}},created:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:this.$emit("viewChange","product_search"),this.getCachedSearchResult();case 2:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()}),C=f,g=(s("0a5b"),s("2877")),w=Object(g["a"])(C,n,a,!1,null,null,null);e["default"]=w.exports}}]);
//# sourceMappingURL=chunk-af8a6d28.647b6003.js.map