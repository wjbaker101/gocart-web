(function(t){function e(e){for(var r,a,o=e[0],c=e[1],u=e[2],p=0,l=[];p<o.length;p++)a=o[p],i[a]&&l.push(i[a][0]),i[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);h&&h(e);while(l.length)l.shift()();return s.push.apply(s,u||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],r=!0,a=1;a<n.length;a++){var o=n[a];0!==i[o]&&(r=!1)}r&&(s.splice(e--,1),t=c(c.s=n[0]))}return t}var r={},a={app:0},i={app:0},s=[];function o(t){return c.p+"static/js/"+({}[t]||t)+"."+{"chunk-0446d6f1":"4f44b769","chunk-14cc2bb2":"b1ebe305","chunk-2e36e0ea":"304ed825","chunk-e0bc530a":"e10c0e1b","chunk-1da08462":"85305c3e","chunk-6a749646":"61af10af"}[t]+".js"}function c(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(t){var e=[],n={"chunk-0446d6f1":1,"chunk-14cc2bb2":1,"chunk-2e36e0ea":1,"chunk-e0bc530a":1,"chunk-1da08462":1,"chunk-6a749646":1};a[t]?e.push(a[t]):0!==a[t]&&n[t]&&e.push(a[t]=new Promise(function(e,n){for(var r="static/css/"+({}[t]||t)+"."+{"chunk-0446d6f1":"dffd233a","chunk-14cc2bb2":"4a1c2184","chunk-2e36e0ea":"21539b85","chunk-e0bc530a":"42c38fba","chunk-1da08462":"94da0f7f","chunk-6a749646":"7823a284"}[t]+".css",i=c.p+r,s=document.getElementsByTagName("link"),o=0;o<s.length;o++){var u=s[o],p=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(p===r||p===i))return e()}var l=document.getElementsByTagName("style");for(o=0;o<l.length;o++){u=l[o],p=u.getAttribute("data-href");if(p===r||p===i)return e()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=e,h.onerror=function(e){var r=e&&e.target&&e.target.src||i,s=new Error("Loading CSS chunk "+t+" failed.\n("+r+")");s.code="CSS_CHUNK_LOAD_FAILED",s.request=r,delete a[t],h.parentNode.removeChild(h),n(s)},h.href=i;var d=document.getElementsByTagName("head")[0];d.appendChild(h)}).then(function(){a[t]=0}));var r=i[t];if(0!==r)if(r)e.push(r[2]);else{var s=new Promise(function(e,n){r=i[t]=[e,n]});e.push(r[2]=s);var u,p=document.createElement("script");p.charset="utf-8",p.timeout=120,c.nc&&p.setAttribute("nonce",c.nc),p.src=o(t),u=function(e){p.onerror=p.onload=null,clearTimeout(l);var n=i[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),a=e&&e.target&&e.target.src,s=new Error("Loading chunk "+t+" failed.\n("+r+": "+a+")");s.type=r,s.request=a,n[1](s)}i[t]=void 0}};var l=setTimeout(function(){u({type:"timeout",target:p})},12e4);p.onerror=p.onload=u,document.head.appendChild(p)}return Promise.all(e)},c.m=t,c.c=r,c.d=function(t,e,n){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)c.d(n,r,function(e){return t[e]}.bind(null,r));return n},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/",c.oe=function(t){throw console.error(t),t};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],p=u.push.bind(u);u.push=e,u=u.slice();for(var l=0;l<u.length;l++)e(u[l]);var h=p;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"02a9":function(t,e,n){},"048b":function(t,e,n){"use strict";var r=n("acdc"),a=n.n(r);a.a},"1cee":function(t,e,n){"use strict";var r=n("f6ef"),a=n.n(r);a.a},"40e7":function(t,e,n){"use strict";n("96cf");var r=n("3b8d"),a=n("d225"),i=n("b0b4"),s=n("8665"),o=function(){function t(){Object(a["a"])(this,t)}return Object(i["a"])(t,[{key:"storeData",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e,n){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,s["a"].set(e,JSON.stringify(n));case 2:case"end":return t.stop()}},t)}));function e(e,n){return t.apply(this,arguments)}return e}()},{key:"getData",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e){var n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,s["a"].get(e,null);case 2:if(n=t.sent,null!==n){t.next=5;break}return t.abrupt("return",null);case 5:return t.abrupt("return",JSON.parse(n));case 6:case"end":return t.stop()}},t)}));function e(e){return t.apply(this,arguments)}return e}()}]),t}();e["a"]=new o},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("ProductComponent",{attrs:{product:t.expandedProduct,isVisible:t.isProductExpanded}}),n("router-view",{on:{expandProduct:t.onExpandProduct,viewChange:t.onViewChange}}),n("DashboardComponent")],1)},i=[],s=(n("96cf"),n("3b8d")),o=n("6073"),c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"dashboard-component"},[n("router-link",{attrs:{to:"/"}},[n("div",{staticClass:"dashboard-item"},[n("ListIcon"),n("br"),n("small",[t._v("List")])],1)]),n("router-link",{attrs:{to:"/search"}},[n("div",{staticClass:"dashboard-item"},[n("SearchIcon"),n("br"),n("small",[t._v("Search")])],1)]),n("router-link",{attrs:{to:"/shop"}},[n("div",{staticClass:"dashboard-item"},[n("ShopIcon"),n("br"),n("small",[t._v("Shops")])],1)])],1)},u=[],p={functional:!0,render(t,e){const{_c:n,_v:r,data:a,children:i=[]}=e,{class:s,staticClass:o,style:c,staticStyle:u,attrs:p={},...l}=a;return n("svg",{class:["icon",s,o],style:[c,u],attrs:Object.assign({"aria-hidden":"true",class:"icon",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},p),...l},i.concat([n("path",{attrs:{fill:"currentColor",d:"M48 48a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm448 16H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"}})]))}},l={functional:!0,render(t,e){const{_c:n,_v:r,data:a,children:i=[]}=e,{class:s,staticClass:o,style:c,staticStyle:u,attrs:p={},...l}=a;return n("svg",{class:["icon",s,o],style:[c,u],attrs:Object.assign({"aria-hidden":"true",class:"icon",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},p),...l},i.concat([n("path",{attrs:{fill:"currentColor",d:"M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"}})]))}},h={functional:!0,render(t,e){const{_c:n,_v:r,data:a,children:i=[]}=e,{class:s,staticClass:o,style:c,staticStyle:u,attrs:p={},...l}=a;return n("svg",{class:["icon",s,o],style:[c,u],attrs:Object.assign({"aria-hidden":"true",class:"icon",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 640 512"},p),...l},i.concat([n("path",{attrs:{fill:"currentColor",d:"M320 384H128V224H64v256c0 17.7 14.3 32 32 32h256c17.7 0 32-14.3 32-32V224h-64v160zm314.6-241.8l-85.3-128c-6-8.9-16-14.2-26.7-14.2H117.4c-10.7 0-20.7 5.3-26.6 14.2l-85.3 128c-14.2 21.3 1 49.8 26.6 49.8H608c25.5 0 40.7-28.5 26.6-49.8zM512 496c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V224h-64v272z"}})]))}},d={name:"DashboardComponent",components:{ListIcon:p,SearchIcon:l,ShopIcon:h}},f=d,g=(n("de22"),n("2877")),v=Object(g["a"])(f,c,u,!1,null,null,null),m=v.exports,b=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.isVisible?n("div",{staticClass:"product-component"},[n("div",{staticClass:"image-container"},[n("img",{staticClass:"product-image",attrs:{src:t.product.image}})]),n("div",{staticClass:"product-title"},[n("h2",[t._v(t._s(t.product.name))])]),n("div",{staticClass:"product-price"},[n("span",[t._v("£"+t._s(t.product.price.toFixed(2)))])])]):t._e()},w=[],y={name:"ProductComponent",props:["product","isVisible"]},k=y,x=(n("048b"),Object(g["a"])(k,b,w,!1,null,null,null)),O=x.exports,C=n("d225"),L=n("b0b4"),S=n("40e7"),_=function(){function t(){Object(C["a"])(this,t),this.shoppingListKey="shopping-list",this.shoppingListOrderKey="shopping-list-order"}return Object(L["a"])(t,[{key:"saveShoppingList",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(e){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,S["a"].storeData(this.shoppingListKey,e);case 2:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()},{key:"loadShoppingList",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,S["a"].getData(this.shoppingListKey);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},{key:"saveShoppingListOrder",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(e){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,S["a"].storeData(this.shoppingListOrderKey,e);case 2:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()},{key:"loadShoppingListOrder",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,S["a"].getData(this.shoppingListOrderKey);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()}]),t}(),j=new _,P={name:"App",components:{HeaderComponent:o["a"],DashboardComponent:m,ProductComponent:O},data:function(){return{expandedProduct:null,isProductExpanded:!1,currentView:null}},methods:{onExpandProduct:function(t){this.expandedProduct=t,this.isProductExpanded=!0},hideProduct:function(){this.expandedProduct=null,this.isProductExpanded=!1},loadCache:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,j.loadShoppingList();case 2:if(e=t.sent,null!==e){t.next=5;break}return t.abrupt("return");case 5:console.log("Loading cached shopping list:"),console.log(e),this.$root.$data.addToShoppingList(e);case 8:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),onViewChange:function(t){this.currentView=t}},created:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.loadCache();case 2:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},R=P,E=(n("5c0b"),Object(g["a"])(R,a,i,!1,null,null,null)),V=E.exports,T=n("8c4f");r["a"].use(T["a"]);var z=new T["a"]({mode:"history",routes:[{path:"/",component:function(){return n.e("chunk-0446d6f1").then(n.bind(null,"52b9"))}},{path:"/search",component:function(){return Promise.all([n.e("chunk-e0bc530a"),n.e("chunk-1da08462")]).then(n.bind(null,"f9b5"))}},{name:"product-route",path:"/product",props:!0,component:function(){return n.e("chunk-2e36e0ea").then(n.bind(null,"9986"))}},{path:"/shop/search",component:function(){return Promise.all([n.e("chunk-e0bc530a"),n.e("chunk-6a749646")]).then(n.bind(null,"953d"))}},{path:"/shop",component:function(){return n.e("chunk-14cc2bb2").then(n.bind(null,"f3ae"))}}]}),D=z,H=n("cebc"),M=(n("ac6a"),n("456d"),n("386d"),{debug:!1,state:{search:null,shoppingList:{},shoppingListOrder:[]},log:function(t){this.debug&&console.log(t)},setSearchResult:function(t){this.state.search=t},getSearchResult:function(){return this.state.search},addToShoppingList:function(t){var e=this;this.log("Adding ".concat(Object.keys(t).length," product(s) to shopping list:")),this.log(t),this.state.shoppingList=Object(H["a"])({},this.state.shoppingList,t),this.state.shoppingListOrder=this.state.shoppingListOrder.concat(Object.keys(t)),Object(s["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,j.saveShoppingList(e.state.shoppingList);case 2:case"end":return t.stop()}},t)}))()},removeFromShoppingList:function(t){this.log("Removing item from shopping list with tpnc=".concat(t)),delete this.state.shoppingList[t],this.state.shoppingListOrder=this.state.shoppingListOrder.filter(function(e){return e!==String(t)})},getShoppingList:function(){return this.state.shoppingList},getShoppingListOrder:function(){return this.state.shoppingListOrder}});r["a"].config.productionTip=!1,new r["a"]({router:D,render:function(t){return t(V)},data:M}).$mount("#app")},"5c0b":function(t,e,n){"use strict";var r=n("5e27"),a=n.n(r);a.a},"5e27":function(t,e,n){},6073:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",{staticClass:"header-component"},[n("div",{staticClass:"top-row"},[n("h1",[t._v("GoCart")]),n("div",{staticClass:"right-side"},[t._t("right-side")],2)]),n("div",{staticClass:"below"},[t._t("below")],2)])},a=[],i=(n("ac6a"),n("8615"),{name:"HeaderComponent",props:["currentView"],data:function(){return{shoppingListTotalPrice:null}},methods:{onViewChange:function(t){if("shopping_list"===t){var e=this.$root.$data.getShoppingList(),n=Object.values(e).map(function(t){return t.price*t.quantity}).reduce(function(t,e){return t+e});this.shoppingListTotalPrice=n.toFixed(2)}}},watch:{currentView:function(t,e){this.onViewChange(t)}}}),s=i,o=(n("1cee"),n("2877")),c=Object(o["a"])(s,r,a,!1,null,null,null);e["a"]=c.exports},acdc:function(t,e,n){},de22:function(t,e,n){"use strict";var r=n("02a9"),a=n.n(r);a.a},f6ef:function(t,e,n){}});
//# sourceMappingURL=app.46943c70.js.map