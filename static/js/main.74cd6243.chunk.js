(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{195:function(e,t,n){e.exports={checkbox:"create-exp-form_checkbox__2U6Nv",error:"create-exp-form_error__W-yZF",fieldError:"create-exp-form_fieldError__Q_t2q"}},280:function(e,t,n){},281:function(e,t,n){},380:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(35),o=n.n(c),s=(n(280),n(95)),i=(n(281),n(92)),d=n(30),l=n(195),u=n.n(l),b=n(399),j=n(402),p=n(396),h=n(400);function x(e){for(var t="";t.length<e;)t+=Math.random().toString(16).substring(2);return t.substring(0,e)}console.log("40-bit:"+x(10)),console.log("104-bit:"+x(26)),console.log("256-bit:"+x(58));var O=n(123),f=n(243).create({baseURL:"https://my-expenses-table-app.herokuapp.com/api/",headers:{}}),m=function(){return f.get("expensesData").then((function(e){return e.data}))},v=function(e){return f.post("expensesData",e).then((function(e){return e.data}))},g=function(e){return f.patch("expensesData",e).then((function(e){return e.data}))},S=function(e){return f.delete("expensesData/".concat(e)).then((function(e){return e.data}))},C="expenses-app/tableData/GET_ALL_EXPENSES",E="expenses-app/tableData/SET_DATA_IS_LOADING",y={dataSource:[],dataSourceIsLoading:!1},D=function(e){return{type:E,isLoading:e}},w=function(){return function(e){return e(D(!0)),m().then((function(t){var n;"successfull"===t.resultCode&&e((n=t.expenses,{type:C,dataSource:n})),e(D(!1))}))}},I=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case C:return Object(d.a)(Object(d.a)({},e),{},{dataSource:t.dataSource});case E:return Object(d.a)(Object(d.a)({},e),{},{dataSourceIsLoading:t.isLoading});default:return e}},F=n(15);function k(e){var t={discription:"",cost:0,inThisMounth:!0,date:""},n=Object(a.useState)(t),r=Object(s.a)(n,2),c=r[0],o=r[1],l=Object(a.useState)({discription:!1,cost:!1}),f=Object(s.a)(l,2),m=f[0],g=f[1],S=Object(O.c)(),C=function(e){var t=e.target.name,n="checkbox"===e.target.type?e.target.checked:e.target.value;o(Object(d.a)(Object(d.a)({},c),{},Object(i.a)({},t,n))),g(n?Object(d.a)(Object(d.a)({},m),{},Object(i.a)({},t,!1)):Object(d.a)(Object(d.a)({},m),{},Object(i.a)({},t,!0)))};return Object(F.jsxs)(b.a,{open:e.showCreateExpenseForm,closeIcon:!0,onClose:function(){return e.setShowCreateExpenseForm(!1)},onOpen:function(){return e.setShowCreateExpenseForm(!0)},children:[Object(F.jsx)(j.a,{content:"Create new Expense"}),Object(F.jsx)(b.a.Content,{children:Object(F.jsxs)(p.a,{onSubmit:function(n){var a,r={key:x(26),discription:c.discription,cost:c.cost,date:c.date};S((a=r,function(e){return v(a).then((function(t){"successfull"===t.resultCode&&e(w())}))})),e.setShowCreateExpenseForm(!1),o(t),n.preventDefault()},children:[Object(F.jsxs)(p.a.Field,{required:!0,children:[Object(F.jsx)("label",{children:"Discription:"}),Object(F.jsx)("textarea",{required:!0,placeholder:"Expense name",name:"discription",value:c.discription,onChange:C}),m.discription&&Object(F.jsx)("div",{className:u.a.error,children:"Require field"})]}),Object(F.jsxs)(p.a.Field,{required:!0,children:[Object(F.jsx)("label",{children:"Cost:"}),Object(F.jsx)("input",{type:"number",placeholder:"Expense cost",name:"cost",value:c.cost,onChange:C,required:!0}),m.cost&&Object(F.jsx)("div",{className:u.a.error,children:"Require field"})]}),!c.inThisMounth&&Object(F.jsxs)(p.a.Field,{children:[Object(F.jsx)("label",{children:"Date:"}),Object(F.jsx)("input",{placeholder:"Expense date",name:"date",value:c.date,onChange:C})]}),Object(F.jsx)(p.a.Field,{children:Object(F.jsxs)("label",{className:u.a.checkbox,children:["In this mounth:",Object(F.jsx)("input",{type:"checkbox",name:"inThisMounth",checked:c.inThisMounth,onChange:C})]})}),Object(F.jsx)(h.a,{primary:!0,type:"submit",children:"Create"})]})})]})}var _=n(260),L=n(245),A=n(246),T=n(264),q=n(258),N=n(205),M=n.n(N),P=n(247),R=n(210),B=n(397),z=n(398),G=n(403),J=n(57),U=n(395),Q=n(104);function V(e){return Object(F.jsxs)("div",{children:[Object(F.jsx)(Q.a,{style:{fontSize:e.fontSize},spin:!0}),";"]})}var W=["index"],X=["title","editable","children","dataIndex","record","handleSave"],Z=r.a.createContext(null),H=function(e){e.index;var t=Object(R.a)(e,W),n=B.a.useForm(),a=Object(s.a)(n,1)[0];return Object(F.jsx)(B.a,{form:a,component:!1,children:Object(F.jsx)(Z.Provider,{value:a,children:Object(F.jsx)("tr",Object(d.a)({},t))})})},K=function(e){var t=e.title,n=e.editable,r=e.children,c=e.dataIndex,o=e.record,l=e.handleSave,u=Object(R.a)(e,X),b=Object(a.useState)(!1),j=Object(s.a)(b,2),p=j[0],h=j[1],x=Object(a.useRef)(null),O=Object(a.useContext)(Z);Object(a.useEffect)((function(){p&&x.current.focus()}),[p]);var f=function(){h(!p),O.setFieldsValue(Object(i.a)({},c,o[c]))},m=function(){var e=Object(P.a)(M.a.mark((function e(){var t;return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,O.validateFields();case 3:t=e.sent,f(),l(Object(d.a)(Object(d.a)({},o),t)),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log("Save failed:",e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),v=r;return n&&(v=p?Object(F.jsx)(B.a.Item,{style:{margin:0},name:c,rules:[{required:!0,message:"".concat(t," is required.")}],children:Object(F.jsx)(z.a,{ref:x,onPressEnter:m,onBlur:m})}):Object(F.jsx)("div",{className:"editable-cell-value-wrap",style:{paddingRight:24},onClick:f,children:r})),Object(F.jsx)("td",Object(d.a)(Object(d.a)({},u),{},{children:v}))},Y=function(e){Object(T.a)(n,e);var t=Object(q.a)(n);function n(e){var a;return Object(L.a)(this,n),(a=t.call(this,e)).handleDelete=function(e){S(e).then((function(){return a.props.getAllExpensesData()}))},a.handleAdd=function(){a.props.setShowCreateExpenseForm(!0)},a.handleSave=function(e){var t=Object(_.a)(a.props.dataSource),n=t.findIndex((function(t){return e.key===t.key})),r=t[n];t.splice(n,1,Object(d.a)(Object(d.a)({},r),e)),g(t).then((function(){return a.props.getAllExpensesData()}))},a.componentDidMount=function(){a.props.getAllExpensesData()},a.columns=[{title:"Expenses",dataIndex:"discription",editable:!0},{title:"Cost",dataIndex:"cost",editable:!0,width:"12%"},{title:"Date",dataIndex:"date",editable:!0,width:"12%"},{title:"operation",dataIndex:"operation",render:function(e,t){return a.props.dataSource.length>=1?Object(F.jsx)(G.a,{title:"Sure to delete?",onConfirm:function(){return a.handleDelete(t.key)},children:Object(F.jsx)("a",{children:"Delete"})}):null},width:"15%"}],a.state={count:null},a}return Object(A.a)(n,[{key:"render",value:function(){var e=this,t=this.props.dataSource,n={body:{row:H,cell:K}},a=this.columns.map((function(t){return t.editable?Object(d.a)(Object(d.a)({},t),{},{onCell:function(n){return{record:n,editable:t.editable,dataIndex:t.dataIndex,title:t.title,handleSave:e.handleSave}}}):t}));return Object(F.jsxs)("div",{children:[Object(F.jsx)(J.a,{onClick:this.handleAdd,type:"primary",style:{marginBottom:16},disabled:this.state.startDataLoading,children:"Add a row"}),this.props.dataSourceIsLoading?Object(F.jsx)(V,{fontSize:54}):Object(F.jsx)(U.a,{components:n,rowClassName:function(){return"editable-row"},bordered:!0,dataSource:t,columns:a})]})}}]),n}(r.a.Component),$=Object(O.b)((function(e){return{dataSource:e.tableData.dataSource,dataSourceIsLoading:e.tableData.dataSourceIsLoading}}),{getAllExpensesData:w})(Y);n(377);var ee=function(){var e=Object(a.useState)(!1),t=Object(s.a)(e,2),n=t[0],r=t[1];return Object(F.jsxs)("div",{className:"App",children:[Object(F.jsx)("h1",{style:{marginTop:"25px"},children:"Expenses Table App"}),Object(F.jsx)($,{setShowCreateExpenseForm:r}),Object(F.jsx)(k,{setShowCreateExpenseForm:r,showCreateExpenseForm:n})]})},te=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,405)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,o=t.getTTFB;n(e),a(e),r(e),c(e),o(e)}))},ne=n(257),ae=n(197),re=n(254),ce=Object(ae.b)({tableData:I}),oe=Object(ae.c)(ce,Object(ae.a)(re.a));window.store=oe;var se=oe;n(378);o.a.render(Object(F.jsx)(r.a.StrictMode,{children:Object(F.jsx)(ne.a,{children:Object(F.jsx)(O.a,{store:se,children:Object(F.jsx)(ee,{})})})}),document.getElementById("root")),te()}},[[380,1,2]]]);
//# sourceMappingURL=main.74cd6243.chunk.js.map