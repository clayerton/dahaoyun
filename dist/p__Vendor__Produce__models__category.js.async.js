(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[36],{"Lw+v":function(e,t,a){"use strict";a.r(t);var r=a("p0pE"),n=a.n(r),c=a("d6i3"),u=a.n(c),o=a("1l/V"),p=a.n(o),i=a("Qyje"),s=a("k6bj");function l(e){return d.apply(this,arguments)}function d(){return d=p()(u.a.mark(function e(t){return u.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(s["a"])("/lic/api/v1/productType",{method:"POST",data:t,headers:{Authorization:"Bearer ".concat(localStorage.getItem("token"))}}));case 1:case"end":return e.stop()}},e)})),d.apply(this,arguments)}function h(e){return f.apply(this,arguments)}function f(){return f=p()(u.a.mark(function e(t){return u.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(s["a"])("/lic/api/v1/productType?".concat(Object(i["stringify"])(t)),{headers:{Authorization:"Bearer ".concat(localStorage.getItem("token"))}}));case 1:case"end":return e.stop()}},e)})),f.apply(this,arguments)}function y(e){return w.apply(this,arguments)}function w(){return w=p()(u.a.mark(function e(t){return u.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(s["a"])("/lic/api/v1/productType/".concat(t.id),{method:"DELETE",headers:{Authorization:"Bearer ".concat(localStorage.getItem("token"))}}));case 1:case"end":return e.stop()}},e)})),w.apply(this,arguments)}function v(e){return g.apply(this,arguments)}function g(){return g=p()(u.a.mark(function e(t){return u.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(s["a"])("/lic/api/v1/productType",{method:"PUT",data:t,headers:{Authorization:"Bearer ".concat(localStorage.getItem("token"))}}));case 1:case"end":return e.stop()}},e)})),g.apply(this,arguments)}var m=a("+n12");t["default"]={namespace:"vdrCategory",state:{typeList:[]},effects:{fetchCategory:u.a.mark(function e(t,a){var r,n,c,o;return u.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,n=a.call,c=a.put,e.next=4,n(h,r);case 4:return o=e.sent,e.next=7,c({type:"save",payload:o});case 7:case"end":return e.stop()}},e)}),submitCategory:u.a.mark(function e(t,a){var r,n,c,o;return u.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,n=a.call,c=a.put,e.next=4,n(l,r.add);case 4:return o=e.sent,Object(m["a"])(o),e.next=8,c({type:"fetchCategory",payload:r.fetch});case 8:case"end":return e.stop()}},e)}),delCategory:u.a.mark(function e(t,a){var r,n,c,o;return u.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,n=a.call,c=a.put,e.next=4,n(y,r.del);case 4:return o=e.sent,Object(m["a"])(o),e.next=8,c({type:"fetchCategory",payload:r.fetch});case 8:case"end":return e.stop()}},e)}),updateCategory:u.a.mark(function e(t,a){var r,n,c,o;return u.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,n=a.call,c=a.put,e.next=4,n(v,r.upd);case 4:return o=e.sent,Object(m["a"])(o),e.next=8,c({type:"fetchCategory",payload:r.fetch});case 8:case"end":return e.stop()}},e)})},reducers:{save:function(e,t){return n()({},e,{typeList:t.payload})}}}}}]);