(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[13],{g6BS:function(r,e,n){r.exports={trigger:"antd-pro-pages-factory-exception-style-trigger"}},k3Yi:function(r,e,n){"use strict";n.r(e);n("IzEo");var t,a,i,o=n("bx4M"),c=(n("T2oS"),n("W9HT")),g=(n("+L6B"),n("2/Rp")),u=n("2Taf"),l=n.n(u),s=n("vZ4D"),p=n.n(s),d=n("l4Ni"),f=n.n(d),y=n("ujKo"),E=n.n(y),h=n("MhPg"),k=n.n(h),m=n("q1tI"),w=n.n(m),v=n("MuoO"),C=n("g6BS"),b=n.n(C),S=(t=Object(v["connect"])(function(r){return{isloading:r.error.isloading}}),t((i=function(r){function e(){var r,n;l()(this,e);for(var t=arguments.length,a=new Array(t),i=0;i<t;i++)a[i]=arguments[i];return n=f()(this,(r=E()(e)).call.apply(r,[this].concat(a))),n.state={isloading:!1},n.triggerError=function(r){n.setState({isloading:!0});var e=n.props.dispatch;e({type:"error/query",payload:{code:r}})},n}return k()(e,r),p()(e,[{key:"render",value:function(){var r=this,e=this.state.isloading;return w.a.createElement(o["a"],null,w.a.createElement(c["a"],{spinning:e,wrapperClassName:b.a.trigger},w.a.createElement(g["a"],{type:"danger",onClick:function(){return r.triggerError(401)}},"\u89e6\u53d1401"),w.a.createElement(g["a"],{type:"danger",onClick:function(){return r.triggerError(403)}},"\u89e6\u53d1403"),w.a.createElement(g["a"],{type:"danger",onClick:function(){return r.triggerError(500)}},"\u89e6\u53d1500"),w.a.createElement(g["a"],{type:"danger",onClick:function(){return r.triggerError(404)}},"\u89e6\u53d1404")))}}]),e}(m["PureComponent"]),a=i))||a);e["default"]=S}}]);