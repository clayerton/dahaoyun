(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[1],{II3U:function(e,t,n){"use strict";n.r(t);var a=n("jehZ"),r=n.n(a),o=n("p0pE"),i=n.n(o),l=n("2Taf"),u=n.n(l),c=n("vZ4D"),s=n.n(c),p=n("l4Ni"),m=n.n(p),d=n("ujKo"),h=n.n(d),y=n("MhPg"),b=n.n(y),f=(n("B9cy"),n("Ol7k")),g=n("q1tI"),x=n.n(g),v=n("ZFw/"),M=n.n(v),w=n("MuoO"),E=n("E6Dt"),W=n("TSYQ"),D=n.n(W),C=n("lU33"),N=(n("zwU1"),Object(g["createContext"])()),S=(n("IamK"),n("tGQQ")),k=n("acx/"),j=n.n(k),O=(x.a.lazy(function(){return n.e(0).then(n.bind(null,"PceP"))}),f["a"].Content),I={"screen-xs":{maxWidth:575},"screen-sm":{minWidth:576,maxWidth:767},"screen-md":{minWidth:768,maxWidth:991},"screen-lg":{minWidth:992,maxWidth:1199},"screen-xl":{minWidth:1200,maxWidth:1599},"screen-xxl":{minWidth:1600}},L=function(e){function t(){var e,n;u()(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return n=m()(this,(e=h()(t)).call.apply(e,[this].concat(r))),n.getLayoutStyle=function(){var e=n.props,t=e.fixSiderbar,a=e.isMobile,r=e.collapsed,o=e.layout;return t&&"topmenu"!==o&&!a?{paddingLeft:r?"80px":"256px"}:null},n.handleMenuCollapse=function(e){var t=n.props.dispatch;t({type:"global/changeLayoutCollapsed",payload:e})},n.renderSettingDrawer=function(){return null},n}return b()(t,e),s()(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.dispatch,n=e.route,a=n.routes,r=n.path,o=n.authority;t({type:"setting/getSetting"}),t({type:"menu/getMenuData",payload:{routes:a,path:r,authority:o}})}},{key:"getContext",value:function(){var e=this.props,t=e.location,n=e.breadcrumbNameMap;return{location:t,breadcrumbNameMap:n}}},{key:"render",value:function(){var e=this,t=this.props,n=(t.navTheme,t.layout,t.children),a=t.location.pathname,r=(t.isMobile,t.menuData,t.breadcrumbNameMap),o=t.fixedHeader,l=o?{}:{paddingTop:0},u=x.a.createElement(f["a"],{style:i()({},this.getLayoutStyle(),{minHeight:"100vh",minWidth:1483})},x.a.createElement(O,{className:j.a.content,style:l},n));return x.a.createElement(x.a.Fragment,null,x.a.createElement(M.a,{title:Object(S["a"])(a,r)},x.a.createElement(E["ContainerQuery"],{query:I},function(t){return x.a.createElement(N.Provider,{value:e.getContext()},x.a.createElement("div",{className:D()(t)},u))})),x.a.createElement(g["Suspense"],{fallback:null},this.renderSettingDrawer()))}}]),t}(x.a.Component);t["default"]=Object(w["connect"])(function(e){var t=e.global,n=e.setting,a=e.menu;return i()({collapsed:t.collapsed,layout:n.layout,menuData:a.menuData,breadcrumbNameMap:a.breadcrumbNameMap},n)})(function(e){return x.a.createElement(C["a"],{query:"(max-width: 599px)"},function(t){return x.a.createElement(L,r()({},e,{isMobile:t}))})})},"acx/":function(e,t,n){e.exports={content:"antd-pro-layouts-dashboard-basic-layout-content"}}}]);