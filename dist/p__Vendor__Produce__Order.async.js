(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[34],{"4Ph+":function(e,t,a){"use strict";a.r(t),a.d(t,"default",function(){return h});var n=a("2Taf"),r=a.n(n),l=a("vZ4D"),i=a.n(l),o=a("l4Ni"),d=a.n(o),c=a("ujKo"),u=a.n(c),s=a("MhPg"),m=a.n(s),p=a("q1tI"),f=a.n(p),h=function(e){function t(){return r()(this,t),d()(this,u()(t).apply(this,arguments))}return m()(t,e),i()(t,[{key:"render",value:function(){var e=this.props.children;return f.a.createElement("div",null,e)}}]),t}(p["PureComponent"])},"4jYO":function(e,t,a){"use strict";a.r(t);a("IzEo");var n,r,l,i,o,d,c,u,s,m,p=a("bx4M"),f=(a("14J3"),a("BMrR")),h=(a("jCWc"),a("kPKH")),y=(a("+L6B"),a("2/Rp")),v=a("p0pE"),g=a.n(v),E=(a("/zsF"),a("PArb")),b=(a("Q9mQ"),a("diRs")),O=(a("2qtc"),a("kLXV")),C=a("2Taf"),w=a.n(C),k=a("vZ4D"),I=a.n(k),V=a("l4Ni"),x=a.n(V),S=a("ujKo"),P=a.n(S),L=a("MhPg"),D=a.n(L),M=(a("5NDa"),a("5rEg")),F=a("q1tI"),T=a.n(F),q=a("MuoO"),N=a("zHco"),j=a("Y2fQ"),Q=a("wd/R"),A=a.n(Q),H=a("yKxD"),R=a("3a4m"),_=a.n(R),z=(a("giR+"),a("fyUT")),Y=a("d6i3"),B=a.n(Y),K=a("1l/V"),Z=a.n(K),J=(a("7Kak"),a("9yH6")),U=(a("iQDF"),a("+eQT")),W=a("jehZ"),G=a.n(W),X=(a("y8nQ"),a("Vl3Y")),$=(a("OaEy"),a("2fM7")),ee=(M["a"].TextArea,$["a"].Option),te=[{key:1,name:"1\u4e2a\u6708"},{key:2,name:"2\u4e2a\u6708"},{key:3,name:"3\u4e2a\u6708"},{key:6,name:"6\u4e2a\u6708"}],ae=(n=X["a"].create(),r=Object(q["connect"])(function(e){var t=e.vdrClient,a=e.loading;return{client:t.client,loading:a.models.list}}),n(l=r((i=function(e){function t(e){var a;return w()(this,t),a=x()(this,P()(t).call(this,e)),a.formLayout={labelCol:{span:7},wrapperCol:{span:13}},a._cancel=function(){var e=a.props.cancel;e&&e()},a._submit=function(){var e=a.props,t=e.submit,n=e.form,r=e.client,l=e.current,i=r&&r.items||[];n.validateFields(function(e,a){if(!e){var n,r;a&&a.customerId&&"string"===typeof a.customerId&&(n=i&&i.filter(function(e){if(e.name===a.customerId)return e}),r=n&&n[0]&&n[0].id||null,r||(r=!r&&l&&l.customerid));var o=!!r&&{customerId:r},d=g()({},a,o);t&&t(d)}})},a.onChange=function(e){a.setState({paytypeValue:e.target.value})},a.onInterFilter=function(e){var t=te.filter(function(t,a){if(t.key===e)return t.name}),a=t&&t[0]&&t[0].key||null;return a},a.disabledEndDate=function(e){if(!e)return!1;var t=new Date(e).getDate(),a=1===t||5===t||10===t||15===t||20===t||25===t;return e.valueOf()<=new Date||!a},a.state={paytypeValue:null,endValue:null},a}return D()(t,e),I()(t,[{key:"componentDidMount",value:function(){var e=this.props.dispatch;e({type:"vdrClient/getClientList",payload:{count:100,type:0}})}},{key:"render",value:function(){var e=this.props,t=e.visible,a=e.current,n=e.value,r=e.form,l=r.getFieldDecorator,i=(r.setFieldsValue,r.getFieldValue,e.client),o=this.state,d=o.paytypeValue,c=o.endValue;return T.a.createElement(O["a"],{destroyOnClose:!0,title:"",visible:t,onOk:this._submit,onCancel:this._cancel,width:800},T.a.createElement(f["a"],{gutter:24,style:{marginTop:20}},T.a.createElement(h["a"],{span:12},T.a.createElement(X["a"].Item,G()({label:"\u8ba2\u5355\u53f7"},this.formLayout),l("no",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u8ba2\u5355\u53f7"}],initialValue:a&&a.no})(T.a.createElement(M["a"],{readOnly:!0,placeholder:"\u8bf7\u8f93\u5165"})))),T.a.createElement(h["a"],{span:12},T.a.createElement(X["a"].Item,G()({label:"\u8ba2\u5355\u6807\u9898"},this.formLayout),l("name",{rules:[{required:!1,message:"\u8bf7\u8f93\u5165\u8ba2\u5355\u6807\u9898"}],initialValue:a&&a.name})(T.a.createElement(M["a"],{placeholder:"\u8bf7\u8f93\u5165"})))),T.a.createElement(h["a"],{span:12},T.a.createElement(X["a"].Item,G()({label:"\u5ba2\u6237\u540d\u79f0"},this.formLayout),l("customerId",{rules:[{required:!1,message:"\u8bf7\u9009\u62e9\u5ba2\u6237\u540d\u79f0"}],initialValue:a&&a.customerName})(T.a.createElement($["a"],{style:{width:"100%"},showSearch:!0,placeholder:"\u8bf7\u9009\u62e9"},i&&i.items?i.items.map(function(e){return T.a.createElement(ee,{key:e.id,value:e.id},e.name)}):null)))),T.a.createElement(h["a"],{span:12},T.a.createElement(X["a"].Item,G()({label:"\u4e0b\u5355\u65e5\u671f"},this.formLayout),l("order",{rules:[{required:!1,message:"\u8bf7\u9009\u62e9\u4e0b\u5355\u65e5\u671f"}],initialValue:a&&a.order&&A()(a.order)})(T.a.createElement(U["a"],{placeholder:"\u8bf7\u9009\u62e9\u4e0b\u5355\u65e5\u671f",style:{width:"100%"}})))),T.a.createElement(h["a"],{span:12},T.a.createElement(X["a"].Item,G()({label:"\u4ea4\u8d27\u65e5\u671f"},this.formLayout),l("deliver",{rules:[{required:!1,message:"\u8bf7\u9009\u62e9\u4ea4\u8d27\u65e5\u671f"}],initialValue:a&&a.deliver&&A()(a.deliver)})(T.a.createElement(U["a"],{placeholder:"\u8bf7\u9009\u62e9\u4ea4\u8d27\u65e5\u671f",style:{width:"100%"}})))),a&&"installment"!==a.paytypeValue&&T.a.createElement(h["a"],{span:12},T.a.createElement(X["a"].Item,G()({label:"\u662f\u5426\u5206\u671f"},this.formLayout),T.a.createElement(J["a"].Group,{onChange:this.onChange,value:d||n},T.a.createElement(J["a"],{value:1},"\u662f"),T.a.createElement(J["a"],{value:2},"\u5426")))),(a&&1===n||a&&2===n&&1===d)&&T.a.createElement(F["Fragment"],null,T.a.createElement(h["a"],{span:12},T.a.createElement(X["a"].Item,G()({label:"\u8d77\u59cb\u65e5\u671f"},this.formLayout),l("instalment.start",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u8d77\u59cb\u65e5\u671f"}],initialValue:a&&a.start&&A()(a.start)})(T.a.createElement(U["a"],{value:c,disabledDate:this.disabledEndDate,placeholder:"\u8bf7\u9009\u62e9\u8d77\u59cb\u65e5\u671f",style:{width:"100%"}})))),T.a.createElement(h["a"],{span:12},T.a.createElement(X["a"].Item,G()({label:"\u5206\u671f\u95f4\u9694"},this.formLayout),l("instalment.interval",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u5206\u671f\u95f4\u9694"}],initialValue:a&&a.interval&&this.onInterFilter(a.interval)})(T.a.createElement($["a"],{style:{width:"100%"},placeholder:"\u8bf7\u9009\u62e9"},te&&te.map(function(e){return T.a.createElement(ee,{key:e.key,value:e.key},e.name)}))))),T.a.createElement(h["a"],{span:12},T.a.createElement(X["a"].Item,G()({label:"\u5206\u671f\u671f\u6570"},this.formLayout),l("instalment.periodNm",{rules:[{required:!0,message:" "},{validator:function(){var e=Z()(B.a.mark(function e(t,a){var n;return B.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(n=/^[1-9]\d*$/,a){e.next=3;break}throw new Error("\u8bf7\u8f93\u5165\u5206\u671f\u671f\u6570");case 3:if(n.test(a)&&!(a>32)){e.next=5;break}throw new Error("\u5206\u671f\u671f\u6570\u4e0d\u8d85\u8fc732\u671f");case 5:case"end":return e.stop()}},e)}));function t(t,a){return e.apply(this,arguments)}return t}()}],initialValue:a&&a.totalIndex})(T.a.createElement(z["a"],{placeholder:"\u8bf7\u8f93\u5165\u5206\u671f\u671f\u6570",onChange:this.fillOrderNum,style:{width:"100%"},maxLength:15,autoComplete:"off"})))),T.a.createElement(h["a"],{span:12},T.a.createElement(X["a"].Item,G()({label:"\u6bcf\u671f\u8fd8\u6b3e\u91d1\u989d"},this.formLayout),l("instalment.amount",{rules:[{required:!1,message:"\u8bf7\u8f93\u5165\u6bcf\u671f\u8fd8\u6b3e\u91d1\u989d"}],initialValue:a&&a.amount})(T.a.createElement(z["a"],{placeholder:"\u8bf7\u8f93\u5165\u6bcf\u671f\u8fd8\u6b3e\u91d1\u989d",onChange:this.fillOrderNum,style:{width:"100%"},maxLength:15,autoComplete:"off"})))))))}}]),t}(F["PureComponent"]),l=i))||l)||l),ne=M["a"].TextArea,re=(o=X["a"].create(),o((c=function(e){function t(){var e,a;w()(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return a=x()(this,(e=P()(t)).call.apply(e,[this].concat(r))),a.formLayout={labelCol:{span:7},wrapperCol:{span:13}},a._cancel=function(){var e=a.props.cancel;e&&e()},a._submit=function(){var e=a.props,t=e.submit,n=e.form,r=e.client;r&&r.items;n.validateFields(function(e,a){e||t&&t(a)})},a}return D()(t,e),I()(t,[{key:"render",value:function(){var e=this.props,t=e.visible,a=e.current,n=(e.value,e.form),r=n.getFieldDecorator;n.setFieldsValue,n.getFieldValue;return T.a.createElement(O["a"],{destroyOnClose:!0,title:"",visible:t,onOk:this._submit,onCancel:this._cancel,width:500},T.a.createElement(X["a"].Item,G()({style:{marginTop:30},label:"\u6570\u91cf"},this.formLayout),r("productQuantity",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u6570\u91cf"}],initialValue:a&&a.productQuantity})(T.a.createElement(z["a"],{style:{width:"100%"},placeholder:"\u8bf7\u8f93\u5165"}))),T.a.createElement(X["a"].Item,G()({label:"\u5907\u6ce8"},this.formLayout),r("remark",{rules:[{required:!1,message:"\u8bf7\u8f93\u5165\u5907\u6ce8"}],initialValue:a&&a.remark})(T.a.createElement(ne,{style:{width:"100%"},placeholder:"\u8bf7\u8f93\u5165"}))))}}]),t}(F["PureComponent"]),d=c))||d),le=M["a"].Search,ie=(u=Object(q["connect"])(function(e){var t=e.vdrOrder,a=e.loading;return{vdrOrder:t,loading:a.effects["vdrOrder/fetchList"]}}),u((m=function(e){function t(){var e,a;w()(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return a=x()(this,(e=P()(t)).call.apply(e,[this].concat(r))),a.state={visible:!1,current:void 0,type:null,page:1,count:10,modifyOrderVisible:!1,modifyPlanVisible:!1,orderCurrent:null,planCurrent:null,planId:null},a.installShow=function(e){return T.a.createElement("div",null,T.a.createElement("p",null,"\u8d77\u59cb\u65e5\u671f:",e&&e.start),T.a.createElement("p",null,"\u5206\u671f\u95f4\u9694:",e&&e.interval?"".concat(e.interval,"\u4e2a\u6708"):e.interval),T.a.createElement("p",null,"\u5206\u671f\u671f\u6570:",e&&e.totalIndex),T.a.createElement("p",null,"\u6bcf\u671f\u8fd8\u6b3e:",e&&e.amount?"".concat(e.amount,"\u5143"):e.amount))},a.handleDelete=function(e,t,n,r){var l=1===t?"\u8ba2\u5355":"\u4ea7\u54c1";O["a"].confirm({title:"\u5220\u9664".concat(l),content:"\u786e\u5b9a\u5220\u9664\u8be5".concat(l,"\u5417\uff1f"),okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88",onOk:function(){return a.deleteHandler(e,t,n)}})},a.deleteHandler=function(e,t,n){var r=a.state,l=r.page,i=r.count,o=a.props.dispatch;o(1===t?{type:"vdrOrder/delOrder",payload:{del:{id:e.id},fetch:{page:l-1,count:i}}}:{type:"vdrOrder/delOrderProduct",payload:{del:{id:e.id},fetch:{id:n.id}}})},a.orderScheduling=function(e,t){O["a"].confirm({title:"\u51fa\u5e93",content:"\u786e\u5b9a\u4ea7\u54c1\u51fa\u5e93\u5417\uff1f",okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88",onOk:function(){return a.orderSchedulingHandler(e,t)}})},a.orderSchedulingHandler=function(e,t){var n=a.props.dispatch;n({type:"vdrOrder/orderScheduling",payload:{upd:{id:e.id},fetch:{id:t.id}}})},a.columns=[{title:"\u521b\u5efa\u65f6\u95f4",dataIndex:"createTime",align:"left"},{title:"\u8ba2\u5355\u53f7",dataIndex:"no",align:"left"},{title:"\u8ba2\u5355\u6807\u9898",dataIndex:"name",align:"left"},{title:"\u5ba2\u6237\u540d\u79f0",dataIndex:"customerName",align:"left"},{title:"\u4e0b\u5355\u65e5\u671f",dataIndex:"order",align:"left"},{title:"\u4ea4\u8d27\u65e5\u671f",dataIndex:"deliver",align:"left"},{title:"\u603b\u6570\u91cf",dataIndex:"totalCount",align:"right"},{title:"\u5206\u671f",dataIndex:"paytypeValue",align:"left",render:function(e,t){return T.a.createElement(b["a"],{content:a.installShow(t)},"installment"===e?"\u662f":"\u5426")}},{title:"\u64cd\u4f5c",align:"center",render:function(e){return T.a.createElement(F["Fragment"],null,T.a.createElement("a",{onClick:function(t){t.stopPropagation(),a.newSheet(e)}},"\u65b0\u589e"),T.a.createElement(E["a"],{type:"vertical"}),T.a.createElement("a",{onClick:function(t){t.stopPropagation(),a.handleModalVisible(e,1)}},"\u4fee\u6539"),T.a.createElement(E["a"],{type:"vertical"}),T.a.createElement("a",{onClick:function(t){t.stopPropagation(),a.handleDelete(e,1)}},"\u5220\u9664"))}}],a.newSheet=function(e){_.a.push({pathname:"/vendor/produce/order/addPlan",query:{id:e.id}})},a.handleSearch=function(e){var t=a.props.dispatch;t({type:"vdrOrder/getOrderMenu",payload:{key:e}}),a.setState({page:1})},a.onExpand=function(e,t){var n=a.props.dispatch;n({type:"vdrOrder/orderProduct",payload:{id:t.id}})},a._handleTableChangeForSchedule=function(){},a.handleStandardTableChange=function(e,t,n){var r=a.props.dispatch,l=a.state.formValues,i=g()({orderId:n,page:e.current-1,count:e.pageSize},l);a.setState({page:e.current,count:e.pageSize}),r({type:"vdrOrder/getOrderMenu",payload:i})},a.handleModalVisible=function(e,t,n){if(1===t){var r=e&&"installment"===e.paytypeValue?1:2;a.setState({modifyOrderVisible:!0,orderCurrent:e,value:r})}else a.setState({modifyPlanVisible:!0,planCurrent:e,planId:n&&n.id})},a.modifyOrderCancel=function(){a.setState({modifyOrderVisible:!1})},a.modifyOrderSubmit=function(e){var t=a.props.dispatch,n=a.state,r=n.orderCurrent,l=n.page,i=n.count;t({type:"vdrOrder/updateOrder",payload:{upd:g()({id:r.id},e),fetch:{page:l-1,count:i}},callback:function(){a.setState({modifyOrderVisible:!1})}})},a.modifyPlanCancel=function(){a.setState({modifyPlanVisible:!1})},a.modifyPlanSubmit=function(e){var t=a.props.dispatch,n=a.state,r=n.planId,l=n.planCurrent;t({type:"vdrOrder/updateOrderProduct",payload:{upd:g()({id:l.id},e),fetch:{id:r}},callback:function(){a.setState({modifyPlanVisible:!1})}})},a}return D()(t,e),I()(t,[{key:"componentDidMount",value:function(){var e=this.props.dispatch;e({type:"vdrOrder/getOrderMenu",payload:{}})}},{key:"addNewOrder",value:function(){_.a.push("/vendor/produce/order/newOrder")}},{key:"render",value:function(){var e=this,t=this.state,a=(t.dataSource,t.visible,t.current,t.type,t.page),n=t.count,r=t.modifyOrderVisible,l=t.modifyPlanVisible,i=t.orderCurrent,o=t.planCurrent,d=t.value,c=this.props,u=c.vdrOrder,s=u.orderList,m=u.orderProductList,v=(c.loading,{list:s&&s.items,pagination:{total:s&&s.total,pageSize:n,current:a}}),g={visible:r,cancel:this.modifyOrderCancel,submit:this.modifyOrderSubmit,current:i,value:d},b={visible:l,cancel:this.modifyPlanCancel,submit:this.modifyPlanSubmit,current:o},O=function(t){var a={};m&&m.filter(function(e){return e.orderid===t.id}).length>0&&(a=m.filter(function(e){return e.orderid===t.id})[0].value);var n={list:a&&a.items||[],pagination:{position:"none"}},r=[{title:"\u5de5\u827a\u5355\u53f7",dataIndex:"craftNm",align:"left"},{title:"\u54c1\u540d",dataIndex:"name",align:"left"},{title:"\u5206\u7ec4",dataIndex:"typeName",align:"left"},{title:"\u7535\u63a7",dataIndex:"electrCtrl",align:"left"},{title:"\u6570\u91cf",dataIndex:"productQuantity",align:"right"},{title:"\u5355\u4ef7\uff08\u5143\uff09",dataIndex:"price",align:"right"},{title:"\u603b\u4ef7\uff08\u5143\uff09",dataIndex:"totalPrice",align:"right"},{title:"\u5907\u6ce8",dataIndex:"remark",align:"left"},{title:"\u64cd\u4f5c",align:"center",width:"20%",render:function(a){return T.a.createElement(F["Fragment"],null,T.a.createElement("a",{onClick:function(n){n.stopPropagation(),e.orderScheduling(a,t)},disabled:"out"==a.outStatus},"noOut"==a.outStatus?"\u51fa\u5e93":"\u5df2\u51fa\u5e93"),T.a.createElement(E["a"],{type:"vertical"}),T.a.createElement("a",{onClick:function(n){n.stopPropagation(),e.handleModalVisible(a,2,t)}},"\u4fee\u6539"),T.a.createElement(E["a"],{type:"vertical"}),T.a.createElement("a",{onClick:function(n){n.stopPropagation(),e.handleDelete(a,2,t)}},"\u5220\u9664"))}}];return T.a.createElement(H["a"],{loading:!1,style:{cursor:"pointer"},data:n,columns:r,onChange:function(a,n){return e._handleTableChangeForSchedule(a,n,t.id)}})};return T.a.createElement(N["a"],{title:Object(j["formatMessage"])({id:"vendor.menu.produce.order"})},T.a.createElement(p["a"],{bordered:!1},T.a.createElement(f["a"],{gutter:{md:8,lg:24,xl:48},style:{marginBottom:20},type:"flex",justify:"space-between"},T.a.createElement(h["a"],{md:8,sm:24},T.a.createElement(y["a"],{onClick:function(){return e.addNewOrder()},type:"primary"},"\u65b0\u589e\u8ba2\u5355")),T.a.createElement(h["a"],{md:8,sm:24},T.a.createElement(le,{enterButton:"\u67e5\u8be2",placeholder:"\u8bf7\u8f93\u5165\u8ba2\u5355\u53f7\\\u8ba2\u5355\u6807\u9898\\\u5ba2\u6237",onSearch:this.handleSearch,allowClear:!0}))),T.a.createElement(H["a"],{loading:!1,data:v,columns:this.columns,onChange:this.handleStandardTableChange,expandedRowRender:O,onExpand:this.onExpand,expandRowByClick:!0,rowClassName:!0})),T.a.createElement(ae,g),T.a.createElement(re,b))}}]),t}(F["PureComponent"]),s=m))||s);t["default"]=ie},"6Aqw":function(e,t,a){"use strict";a.r(t),a.d(t,"default",function(){return F});a("IzEo");var n,r,l,i,o=a("bx4M"),d=(a("+L6B"),a("2/Rp")),c=a("p0pE"),u=a.n(c),s=a("2Taf"),m=a.n(s),p=a("vZ4D"),f=a.n(p),h=a("l4Ni"),y=a.n(h),v=a("ujKo"),g=a.n(v),E=a("MhPg"),b=a.n(E),O=(a("y8nQ"),a("Vl3Y")),C=(a("5NDa"),a("5rEg")),w=a("q1tI"),k=a.n(w),I=a("zHco"),V=a("Y2fQ"),x=a("yD+a"),S=a("WnAZ"),P=a("3YQU"),L=a("ArA+"),D=a("MuoO"),M=(C["a"].TextArea,1),F=(n=O["a"].create(),r=Object(D["connect"])(function(e){var t=e.vdrOrder,a=e.loading;return{vdrOrder:t,loading:a.effects["order/fetchList"]}}),n(l=r((i=function(e){function t(){var e,a;m()(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return a=y()(this,(e=g()(t)).call.apply(e,[this].concat(r))),a.state={value:1,productVisible:!1,itemList:[{index:0,key:0}]},a.formLayout={labelCol:{span:7},wrapperCol:{span:13}},a.productShowModal=function(e){a.setState({productVisible:!0,selectIndex:e})},a.validate=function(){var e=a.props,t=e.form.validateFieldsAndScroll,n=e.dispatch,r=e.location;t(function(e,t){if(e);else{var a=r&&r.query&&r.query.id||null;n({type:"vdrOrder/addOrderProduct",payload:{add:u()({orderId:a},t)},callback:function(){L["router"].push("/vendor/produce/order")}})}})},a.newMember=function(){var e=a.state.itemList,t=e.map(function(e){return e});t.push({index:M,key:M}),M+=1,a.setState({itemList:t})},a.cancel=function(){L["router"].goBack()},a.productHandleCancel=function(e){var t=a.state,n=t.selectIndex,r=t.itemList;if(a.setState({productVisible:!1,selectIndex:void 0}),e){var l=r.map(function(t){if(t.index===n){var a=u()({},t,{product:e});return a}return t});a.setState({itemList:l})}},a.delOrderDetail=function(e){var t=a.state.itemList,n=t.map(function(e){return e.index}).indexOf(e),r=t.map(function(e){return e});r.splice(n,1),a.setState({itemList:r})},a}return b()(t,e),f()(t,[{key:"render",value:function(){var e=this.props,t=(e.visible,e.current,e.value,e.form),a=t.getFieldDecorator,n=t.setFieldsValue,r=t.getFieldValue,l=this.state,i=l.productVisible,c=l.itemList,u={getFieldDecorator:a,setFieldsValue:n,getFieldValue:r,newMember:this.newMember,itemList:c,delOrderDetail:this.delOrderDetail,productShowModal:this.productShowModal,baseInfoShow:!0},s={prodVisible:i,prodHandleCancel:this.productHandleCancel,fromToVdr:!0};return k.a.createElement(I["a"],{title:Object(V["formatMessage"])({id:"vendor.menu.produce.order.addPlan"})},k.a.createElement(o["a"],{bordered:!1},k.a.createElement(O["a"],null,k.a.createElement(x["a"],u),k.a.createElement(S["a"],{style:{width:"100%"}},k.a.createElement(d["a"],{type:"primary",onClick:this.validate},"\u63d0\u4ea4"),k.a.createElement(d["a"],{onClick:this.cancel},"\u53d6\u6d88")))),k.a.createElement(P["a"],s))}}]),t}(w["PureComponent"]),l=i))||l)||l)},hOno:function(e,t,a){"use strict";a.r(t);var n,r,l,i,o=a("p0pE"),d=a.n(o),c=a("2Taf"),u=a.n(c),s=a("vZ4D"),m=a.n(s),p=a("l4Ni"),f=a.n(p),h=a("ujKo"),y=a.n(h),v=a("MhPg"),g=a.n(v),E=(a("y8nQ"),a("Vl3Y")),b=a("zHco"),O=a("q1tI"),C=a.n(O),w=a("Y2fQ"),k=a("EP7a"),I=a("MuoO"),V=a("3a4m"),x=a.n(V),S=(a("wd/R"),n=E["a"].create(),r=Object(I["connect"])(function(e){var t=e.vdrOrder,a=e.loading;return{vdrOrder:t,loading:a.models.list}}),n(l=r((i=function(e){function t(){var e,a;u()(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return a=f()(this,(e=y()(t)).call.apply(e,[this].concat(r))),a.sourceDate=function(e){var t=a.props.dispatch;t({type:"vdrOrder/addOrder",payload:{add:d()({},e),fetch:{}},callback:function(){x.a.push("/vendor/produce/order")}})},a}return g()(t,e),m()(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return C.a.createElement(b["a"],{title:Object(w["formatMessage"])({id:"vendor.menu.produce.order.newOrder"})},C.a.createElement(k["a"],{sourceDate:this.sourceDate}))}}]),t}(O["Component"]),l=i))||l)||l);t["default"]=S}}]);