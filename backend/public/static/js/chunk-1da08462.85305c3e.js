(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1da08462"],{"0a5b":function(e,t,s){"use strict";var a=s("0c7a"),n=s.n(a);n.a},"0c7a":function(e,t,s){},f9b5:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"product-search-view"},[s("HeaderComponent",{scopedSlots:e._u([{key:"below",fn:function(){return[s("div",{staticClass:"search-input-container"},[s("InputComponent",{attrs:{placeholder:"Apple Pie"},on:{enter:e.onSearch},model:{value:e.searchTerm,callback:function(t){e.searchTerm=t},expression:"searchTerm"}})],1)]},proxy:!0},{key:"right-side",fn:function(){return[s("div",{staticClass:"sort-container",on:{click:function(t){e.isSortOptionsVisible=!e.isSortOptionsVisible}}},[e._v("\n                Sort Results\n                "),s("SortIcon"),s("div",{staticClass:"sort-options-container",class:{"is-visible":e.isSortOptionsVisible}},[s("ul",[s("li",[e._v("Alphabetical")]),s("li",[e._v("Price")]),s("li",[e._v("Health")])])])],1)]},proxy:!0}])}),s("div",{staticClass:"search-container"},[s("p",{directives:[{name:"show",rawName:"v-show",value:!e.isLoaded&&!e.isLoading,expression:"!isLoaded && !isLoading"}],staticClass:"text-centered"},[e._v("No results yet!")]),s("p",{directives:[{name:"show",rawName:"v-show",value:e.isLoading,expression:"isLoading"}],staticClass:"text-centered"},[e._v("Searching...")]),s("div",{directives:[{name:"show",rawName:"v-show",value:e.isLoaded&&null!==e.searchResult,expression:"isLoaded && searchResult !== null"}],staticClass:"search-results"},e._l(e.searchResult,function(t,a){return s("ProductItemComponent",{key:a,style:"animation-duration: "+e.loadAnimationDuration(a)+"s",attrs:{product:t,hasCheckBox:"true"},on:{expandProduct:e.onExpandProduct}})}),1)])],1)},n=[],r=s("cebc"),i=(s("96cf"),s("3b8d")),c=s("19e3"),o=s("6073"),u=s("d784"),l=s("ae54"),h={functional:!0,render(e,t){const{_c:s,_v:a,data:n,children:r=[]}=t,{class:i,staticClass:c,style:o,staticStyle:u,attrs:l={},...h}=n;return s("svg",{class:["icon",i,c],style:[o,u],attrs:Object.assign({"aria-hidden":"true",class:"icon",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 320 512"},l),...h},r.concat([s("path",{attrs:{fill:"currentColor",d:"M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"}})]))}},d=(s("af6b"),{name:"ProductSearchView",components:{HeaderComponent:o["a"],InputComponent:u["a"],ProductItemComponent:l["a"],SortIcon:h},data:function(){return{searchTerm:"",isLoaded:!1,isLoading:!1,searchResult:null,isSortOptionsVisible:!1}},computed:{loadAnimationDuration:function(){return function(e){return e>20?3:.15*(e+1)}}},methods:{onSearch:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(0!==this.searchTerm.length){e.next=2;break}return e.abrupt("return");case 2:return this.isLoaded=!1,this.isLoading=!0,e.next=6,c["a"].searchProduct(this.searchTerm);case 6:t=e.sent,this.searchResult=t.data.result.map(function(e){return Object(r["a"])({},e,{quantity:1,isChecked:!1})}),console.log(this.searchResult),this.$root.$data.setSearchResult({searchTerm:this.searchTerm,searchResult:this.searchResult}),this.isLoaded=!0,this.isLoading=!1;case 12:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),onExpandProduct:function(e){this.$emit("expandProduct",e)},getCachedSearchResult:function(){if(null===this.searchResult){var e=this.$root.$data.getSearchResult();null!==e&&(this.searchResult=e.searchResult,this.searchTerm=e.searchTerm,this.isLoaded=!0,this.isLoading=!1)}}},created:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:this.$emit("viewChange","product_search"),this.getCachedSearchResult();case 2:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()}),p=d,m=(s("0a5b"),s("2877")),v=Object(m["a"])(p,a,n,!1,null,null,null);t["default"]=v.exports}}]);
//# sourceMappingURL=chunk-1da08462.85305c3e.js.map