(function(t){function e(e){for(var r,a,s=e[0],i=e[1],u=e[2],l=0,d=[];l<s.length;l++)a=s[l],c[a]&&d.push(c[a][0]),c[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(t[r]=i[r]);p&&p(e);while(d.length)d.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],r=!0,a=1;a<n.length;a++){var s=n[a];0!==c[s]&&(r=!1)}r&&(o.splice(e--,1),t=i(i.s=n[0]))}return t}var r={},a={app:0},c={app:0},o=[];function s(t){return i.p+"static/js/"+({}[t]||t)+"."+{"chunk-202d5adb":"e5f8245e","chunk-53742cba":"0564a442","chunk-77114dce":"b2da00e5","chunk-2e36e0ea":"522fd91d"}[t]+".js"}function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(t){var e=[],n={"chunk-202d5adb":1,"chunk-53742cba":1,"chunk-77114dce":1,"chunk-2e36e0ea":1};a[t]?e.push(a[t]):0!==a[t]&&n[t]&&e.push(a[t]=new Promise(function(e,n){for(var r="static/css/"+({}[t]||t)+"."+{"chunk-202d5adb":"02973b8e","chunk-53742cba":"95b4198a","chunk-77114dce":"65e4020c","chunk-2e36e0ea":"e7048662"}[t]+".css",c=i.p+r,o=document.getElementsByTagName("link"),s=0;s<o.length;s++){var u=o[s],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===r||l===c))return e()}var d=document.getElementsByTagName("style");for(s=0;s<d.length;s++){u=d[s],l=u.getAttribute("data-href");if(l===r||l===c)return e()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=e,p.onerror=function(e){var r=e&&e.target&&e.target.src||c,o=new Error("Loading CSS chunk "+t+" failed.\n("+r+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=r,delete a[t],p.parentNode.removeChild(p),n(o)},p.href=c;var h=document.getElementsByTagName("head")[0];h.appendChild(p)}).then(function(){a[t]=0}));var r=c[t];if(0!==r)if(r)e.push(r[2]);else{var o=new Promise(function(e,n){r=c[t]=[e,n]});e.push(r[2]=o);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=s(t),u=function(e){l.onerror=l.onload=null,clearTimeout(d);var n=c[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),a=e&&e.target&&e.target.src,o=new Error("Loading chunk "+t+" failed.\n("+r+": "+a+")");o.type=r,o.request=a,n[1](o)}c[t]=void 0}};var d=setTimeout(function(){u({type:"timeout",target:l})},12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(e)},i.m=t,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/",i.oe=function(t){throw console.error(t),t};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=e,u=u.slice();for(var d=0;d<u.length;d++)e(u[d]);var p=l;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"02a9":function(t,e,n){},"048b":function(t,e,n){"use strict";var r=n("acdc"),a=n.n(r);a.a},"1cee":function(t,e,n){"use strict";var r=n("f6ef"),a=n.n(r);a.a},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("ProductComponent",{attrs:{product:t.expandedProduct,isVisible:t.isProductExpanded}}),n("HeaderComponent"),n("router-view",{on:{expandProduct:t.onExpandProduct}}),n("DashboardComponent")],1)},c=[],o=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},s=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",[n("h1",[t._v("GoCart")])])}],i={name:"HeaderComponent"},u=i,l=(n("1cee"),n("2877")),d=Object(l["a"])(u,o,s,!1,null,null,null),p=d.exports,h=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"dashboard-component"},[n("router-link",{attrs:{to:"/"}},[n("div",{staticClass:"dashboard-item"},[n("ListIcon"),n("br"),n("small",[t._v("List")])],1)]),n("router-link",{attrs:{to:"/search"}},[n("div",{staticClass:"dashboard-item"},[n("SearchIcon"),n("br"),n("small",[t._v("Search")])],1)]),n("router-link",{attrs:{to:"/shops"}},[n("div",{staticClass:"dashboard-item"},[n("ShopIcon"),n("br"),n("small",[t._v("Shops")])],1)])],1)},f=[],m={functional:!0,render(t,e){const{_c:n,_v:r,data:a,children:c=[]}=e,{class:o,staticClass:s,style:i,staticStyle:u,attrs:l={},...d}=a;return n("svg",{class:["icon",o,s],style:[i,u],attrs:Object.assign({"aria-hidden":"true",class:"icon",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},l),...d},c.concat([n("path",{attrs:{fill:"currentColor",d:"M48 48a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm448 16H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"}})]))}},v={functional:!0,render(t,e){const{_c:n,_v:r,data:a,children:c=[]}=e,{class:o,staticClass:s,style:i,staticStyle:u,attrs:l={},...d}=a;return n("svg",{class:["icon",o,s],style:[i,u],attrs:Object.assign({"aria-hidden":"true",class:"icon",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},l),...d},c.concat([n("path",{attrs:{fill:"currentColor",d:"M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"}})]))}},b={functional:!0,render(t,e){const{_c:n,_v:r,data:a,children:c=[]}=e,{class:o,staticClass:s,style:i,staticStyle:u,attrs:l={},...d}=a;return n("svg",{class:["icon",o,s],style:[i,u],attrs:Object.assign({"aria-hidden":"true",class:"icon",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 640 512"},l),...d},c.concat([n("path",{attrs:{fill:"currentColor",d:"M320 384H128V224H64v256c0 17.7 14.3 32 32 32h256c17.7 0 32-14.3 32-32V224h-64v160zm314.6-241.8l-85.3-128c-6-8.9-16-14.2-26.7-14.2H117.4c-10.7 0-20.7 5.3-26.6 14.2l-85.3 128c-14.2 21.3 1 49.8 26.6 49.8H608c25.5 0 40.7-28.5 26.6-49.8zM512 496c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V224h-64v272z"}})]))}},g={name:"DashboardComponent",components:{ListIcon:m,SearchIcon:v,ShopIcon:b}},y=g,_=(n("de22"),Object(l["a"])(y,h,f,!1,null,null,null)),w=_.exports,C=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.isVisible?n("div",{staticClass:"product-component"},[n("div",{staticClass:"image-container"},[n("img",{staticClass:"product-image",attrs:{src:t.product.image}})]),n("div",{staticClass:"product-title"},[n("h2",[t._v(t._s(t.product.name))])]),n("div",{staticClass:"product-price"},[n("span",[t._v("£"+t._s(t.product.price.toFixed(2)))])])]):t._e()},x=[],k={name:"ProductComponent",props:["product","isVisible"]},P=k,S=(n("048b"),Object(l["a"])(P,C,x,!1,null,null,null)),E=S.exports,j={name:"App",components:{HeaderComponent:p,DashboardComponent:w,ProductComponent:E},data:function(){return{expandedProduct:null,isProductExpanded:!1}},methods:{onExpandProduct:function(t){this.expandedProduct=t,this.isProductExpanded=!0},hideProduct:function(){this.expandedProduct=null,this.isProductExpanded=!1}}},O=j,H=(n("5c0b"),Object(l["a"])(O,a,c,!1,null,null,null)),z=H.exports,M=n("8c4f");r["a"].use(M["a"]);var L=new M["a"]({mode:"history",routes:[{path:"/",component:function(){return Promise.all([n.e("chunk-202d5adb"),n.e("chunk-77114dce")]).then(n.bind(null,"52b9"))}},{path:"/search",component:function(){return Promise.all([n.e("chunk-202d5adb"),n.e("chunk-53742cba")]).then(n.bind(null,"f9b5"))}},{name:"product-route",path:"/product",props:!0,component:function(){return n.e("chunk-2e36e0ea").then(n.bind(null,"9986"))}}]}),T=(n("386d"),{debug:!0,state:{search:null},setSearchResult:function(t){this.state.search=t},getSearchResult:function(){return this.state.search}});r["a"].config.productionTip=!1,new r["a"]({router:L,render:function(t){return t(z)},data:T}).$mount("#app")},"5c0b":function(t,e,n){"use strict";var r=n("5e27"),a=n.n(r);a.a},"5e27":function(t,e,n){},acdc:function(t,e,n){},de22:function(t,e,n){"use strict";var r=n("02a9"),a=n.n(r);a.a},f6ef:function(t,e,n){}});
//# sourceMappingURL=app.71d78e91.js.map