(this["webpackJsonpglintstest-frontend"]=this["webpackJsonpglintstest-frontend"]||[]).push([[0],{100:function(e,t,a){e.exports=a(168)},105:function(e,t,a){},157:function(e,t){},168:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),l=a(11),c=a.n(l),i=(a(105),a(12)),r=a(13),s=a(18),d=a(14),u=a(17),m=a(176),h=a(173),p=(a(106),a(171)),f=a(172),g=a(94),y=a(177),E=a(178),b=a(30),C=a(31),O=a(7),v=a.n(O),I=a(22),k=a(91),R={baseUrl:"http://glints-luke.herokuapp.com",socketUrl:"https://glints-luke.herokuapp.com"},j=R,w=a.n(k)()(j.socketUrl,{transports:["websocket"]}),M=function(e){return function(t){v.a.get("".concat(j.baseUrl,"/api/GetRestaurantCollections"),{params:{collectionIds:e}}).then((function(e){var a=e.data;t({type:"FETCH_COLLECTIONS",payload:{collections:a}})})).catch((function(e){console.log(e)}))}},x=a(25),S=a(174),T=a(175),N=a(170),L=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,o=new Array(n),l=0;l<n;l++)o[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).state={emailRecipients:[""]},a.addEmailRecipient=function(){a.setState({emailRecipients:[].concat(Object(x.a)(a.state.emailRecipients),[""])})},a.handleEmailChange=function(e){var t=a.state.emailRecipients,n=e.target.dataset.index,o=e.target.value;t[n]=o,a.setState({emailRecipients:t})},a.shareCollection=function(){var e=a.state.emailRecipients,t=a.props.collection;v.a.post("".concat(j.baseUrl,"/api/InviteFriends"),{emails:e,collection:t}).then((function(e){})).catch((function(e){console.log(e)})),a.props.closeModal()},a}return Object(u.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement(S.a,{show:this.props.showModal,onHide:this.props.closeModal},o.a.createElement(S.a.Header,{closeButton:!0},o.a.createElement(S.a.Title,null,"Share")),o.a.createElement(S.a.Body,{style:{textAlign:"center"}},this.state.emailRecipients.map((function(t,a){return o.a.createElement(T.a.Control,{key:"share-email-input-".concat(a),onChange:e.handleEmailChange,value:t,id:"share-email-input-".concat(a),"data-index":a,style:{marginBottom:"1rem"},placeholder:"johndoe@gmail.com"})})),o.a.createElement(N.a,{variant:"primary",onClick:this.addEmailRecipient},"Add")),o.a.createElement(S.a.Footer,null,o.a.createElement(N.a,{variant:"primary",onClick:this.shareCollection},"Share")))}}]),t}(n.Component),_=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,o=new Array(n),l=0;l<n;l++)o[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).state={name:""},a.handleNameChange=function(e){a.setState({name:e.target.value})},a.setName=function(){var e=a.props.collection.name;a.setState({name:e})},a.renameCollection=function(){var e=a.state.name,t=a.props.collection._id;console.log(t),console.log(e),v.a.post("".concat(j.baseUrl,"/api/RenameRestaurantCollection"),{collectionId:t,name:e}).then((function(e){})).catch((function(e){console.log(e)})),a.props.closeModal()},a}return Object(u.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return o.a.createElement(S.a,{onEnter:this.setName,show:this.props.showModal,onHide:this.props.closeModal},o.a.createElement(S.a.Header,{closeButton:!0},o.a.createElement(S.a.Title,null,"Rename collection")),o.a.createElement(S.a.Body,{style:{textAlign:"center"}},o.a.createElement(T.a.Control,{onChange:this.handleNameChange,value:this.state.name,style:{marginBottom:"1rem"}})),o.a.createElement(S.a.Footer,null,o.a.createElement(N.a,{variant:"primary",onClick:this.renameCollection},"Rename")))}}]),t}(n.Component),D=function(e){function t(e){var a;Object(i.a)(this,t),(a=Object(s.a)(this,Object(d.a)(t).call(this,e))).state={name:"",editingName:{},shareModalCollection:{},renameModalCollection:{},showShareModal:!1,showRenameModal:!1},a.removeFromCollection=function(e,t){v.a.post("".concat(j.baseUrl,"/api/RemoveFromRestaurantCollection"),{collectionId:e,restaurantId:t}).then((function(e){})).catch((function(e){console.log(e)}))},a.deleteCollection=function(e){v.a.post("".concat(j.baseUrl,"/api/DeleteRestaurantCollection"),{collectionId:e}).then((function(e){})).catch((function(e){console.log(e)}))},a.renameCollection=function(e){a.state.name;v.a.post("".concat(j.baseUrl,"/api/RenameRestaurantCollection"),{collectionId:e,name:"lols"}).then((function(e){})).catch((function(e){console.log(e)}))},a.showShareModal=function(e){a.setState({shareModalCollection:e,showShareModal:!0})},a.closeShareModal=function(){a.setState({showShareModal:!1})},a.showRenameModal=function(e){a.setState({renameModalCollection:e,showRenameModal:!0})},a.closeRenameModal=function(){a.setState({showRenameModal:!1})};var n=new URLSearchParams(window.location.search).get("invitedCollection"),o=localStorage.getItem("collectionIds")||"[]";return n&&((o=JSON.parse(o)).includes(n)||o.push(n),o=JSON.stringify(o),localStorage.setItem("collectionIds",o)),w.emit("initialSubscription",JSON.parse(localStorage.getItem("collectionIds"))),a.props.fetchCollections(o),a}return Object(u.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("div",null,o.a.createElement(p.a,null,o.a.createElement(f.a,null,this.props.collections.map((function(t,a){return o.a.createElement(g.a,{key:"restaurant-collection-".concat(a),sm:4},o.a.createElement(y.a,{style:{margin:"25px"}},o.a.createElement(y.a.Header,{style:{wordBreak:"break-all",display:"flex",alignItems:"center"}},t.name,o.a.createElement(b.a,{onClick:function(){e.showRenameModal(t)},style:{color:"grey",cursor:"pointer",display:"block",marginRight:"auto",marginLeft:"8px"},icon:C.a}),o.a.createElement(b.a,{onClick:function(){e.deleteCollection(t._id)},style:{color:"red",cursor:"pointer",display:"block",marginLeft:"auto"},icon:C.e})),o.a.createElement(E.a,{variant:"flush"},t.restaurants.map((function(n,l){return o.a.createElement(E.a.Item,{style:{wordBreak:"break-all",display:"flex",alignItems:"center"},key:"restaurant-collection-".concat(a,"-").concat(l)},n.name,o.a.createElement(b.a,{onClick:function(){e.removeFromCollection(t._id,n._id)},style:{color:"red",cursor:"pointer",display:"block",marginLeft:"auto"},icon:C.c}))}))),o.a.createElement(y.a.Footer,{onClick:function(){e.showShareModal(t)},style:{display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",backgroundColor:"rgb(91, 168, 251)",color:"white",textAlign:"center",borderTop:"0px"}},o.a.createElement(b.a,{style:{color:"white",marginRight:"10px"},icon:C.b}),"Share")))})))),o.a.createElement(L,{showModal:this.state.showShareModal,collection:this.state.shareModalCollection,closeModal:this.closeShareModal}),o.a.createElement(_,{showModal:this.state.showRenameModal,collection:this.state.renameModalCollection,closeModal:this.closeRenameModal}))}}]),t}(n.Component),A=Object(I.b)((function(e){return{collections:e.collectionReducer.collections}}),(function(e){return{fetchCollections:function(t){e(M(t))}}}))(D),B=a(34),F=a(20),H=a(97),U=a.n(H),J=a(98),z=a.n(J),G=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,o=new Array(n),l=0;l<n;l++)o[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).state={checkboxes:{}},a.closeAddRestaurantModal=function(){a.setState({checkboxes:{}})},a.handleChange=function(e){var t=a.state.checkboxes,n=e.target.dataset.id,o=e.target.checked;a.setState({checkboxes:Object(F.a)({},t,Object(B.a)({},n,o))})},a.addToCollections=function(){var e=a.state.checkboxes,t=a.props.id,n=document.getElementById("new-collection-input").value,o=[];for(var l in e)e[l]&&o.push(l);v.a.post("".concat(j.baseUrl,"/api/AddToRestaurantCollections"),{collectionIds:JSON.stringify(o),restaurantId:t}).then((function(e){})).catch((function(e){console.log(e)})),n&&a.props.createCollection(n,t),a.props.closeModal()},a}return Object(u.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement(S.a,{onEnter:this.setCheckboxes,show:this.props.showModal,onHide:this.props.closeModal},o.a.createElement(S.a.Header,{closeButton:!0},o.a.createElement(S.a.Title,null,this.props.title)),o.a.createElement(S.a.Body,null,o.a.createElement(T.a.Control,{id:"new-collection-input",placeholder:"New collection"}),this.props.collections.map((function(t,a){var n=t._id,l=t.name;return o.a.createElement(E.a,{key:"collection-".concat(n),horizontal:!0,style:{height:"38px",flex:1,marginTop:"10px"}},o.a.createElement(E.a.Item,{style:{flex:1,padding:"0.4rem 0.75rem"}},l),o.a.createElement(E.a.Item,{style:{display:"flex",alignItems:"center",justifyContent:"center",width:"38px"}},o.a.createElement(T.a.Check,{style:{padding:0},checked:e.state.checkboxes[n],onChange:e.handleChange,"data-id":n,type:"checkbox",id:"checkbox-".concat(n)})))}))),o.a.createElement(S.a.Footer,null,o.a.createElement(N.a,{variant:"secondary",onClick:this.closeAddRestaurantModal},"Close"),o.a.createElement(N.a,{variant:"primary",onClick:this.addToCollections},"Add")))}}]),t}(n.Component),K=Object(I.b)((function(e){return{collections:e.collectionReducer.collections}}),(function(e){return{createCollection:function(t,a){e(function(e,t){return function(a){v.a.post("".concat(j.baseUrl,"/api/CreateRestaurantCollection"),{name:e,restaurantId:t}).then((function(e){var t=e.data,n=JSON.parse(localStorage.getItem("collectionIds"))||[];n.push(t._id),localStorage.setItem("collectionIds",JSON.stringify(n)),w.emit("subscription",t._id),a({type:"CREATE_COLLECTION",payload:{collection:t}})})).catch((function(e){console.log(e)}))}}(t,a))}}}))(G),W=86400,V=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],P=36e3,$=function(e){function t(e){var a;Object(i.a)(this,t),(a=Object(s.a)(this,Object(d.a)(t).call(this,e))).state={time:P,toggleTime:!1,searchedName:"",selectedDays:{},items:[],filteredRestaurants:[],showModal:!1,modalTitle:"",modalId:"",modalCheckboxes:{}},a.filterName=function(e){var t=e.target.value;clearTimeout(a.timer),a.timer=setTimeout((function(){var e=t;a.setState({searchedName:e},(function(){a.filterRestaurants()}))}),300)},a.filterTime=function(e){a.setState({time:e},(function(){a.filterRestaurants()}))},a.filterDay=function(e){var t=a.state.selectedDays,n=e.target.dataset.day,o=e.target.checked;a.setState({selectedDays:Object(F.a)({},t,Object(B.a)({},n,o))},(function(){a.filterRestaurants()}))},a.filterRestaurants=function(){for(var e=[],t=a.state,n=t.items,o=t.searchedName,l=t.time,c=t.selectedDays,i=t.toggleTime,r=0;r<n.length;r++){var s=n[r].name.toLowerCase(),d=!1;for(var u in c)if(c[u]){var m=n[r].time[u.toLowerCase()],h=m.start,p=m.end;if(p<h&&(p+=W),d=h<=l&&p>=l||h<=l+W&&p>=l+W||!i)break}-1!==s.indexOf(o)&&d&&e.push(n[r])}a.setState({filteredRestaurants:e})},a.toggleTime=function(e){var t=e.target.checked;a.setState({toggleTime:t},(function(){a.filterRestaurants()}))},a.showModal=function(e){var t=e._id,n=e.name,o={};a.props.collections.forEach((function(e){return o[e._id]=!1})),a.setState({showModal:!0,modalTitle:n,modalId:t,modalCheckboxes:o})},a.closeModal=function(){a.setState({showModal:!1})},a.MyList=function(e){var t=e.virtual,n=e.itemHeight;return o.a.createElement(E.a,{style:t.style},t.items.map((function(e,t){return o.a.createElement("div",{key:t,style:{height:n,display:"flex",flexDirection:"row"}},o.a.createElement(E.a,{horizontal:!0,style:{flex:1,marginBottom:"10px"}},o.a.createElement(E.a.Item,{className:"list-item"},e.name),o.a.createElement(E.a.Item,{className:"list-item"},e.openingHours),o.a.createElement(E.a.Item,{variant:"primary",style:{cursor:"pointer",display:"flex",justifyContent:"center",alignItems:"center",width:n},onClick:function(){a.showModal(e)}},o.a.createElement(b.a,{style:{fontSize:"30px"},icon:C.d}))))})))};var n={};return V.forEach((function(e){return n[e]=!0})),a.state.selectedDays=n,v.a.get("".concat(j.baseUrl,"/api/GetData")).then((function(e){var t=e.data;console.log(t),a.setState({items:t,filteredRestaurants:t})})).catch((function(e){console.log(e)})),a}return Object(u.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this,t=U()()(this.MyList);return o.a.createElement("div",null,o.a.createElement(p.a,{style:{paddingTop:"20px",paddingBottom:"20px"}},o.a.createElement("div",null,o.a.createElement(T.a.Group,{controlId:"formBasicName"},o.a.createElement(T.a.Label,null,"Search"),o.a.createElement(T.a.Control,{onChange:this.filterName,placeholder:"Restaurant Name"})),o.a.createElement(T.a,null,o.a.createElement("div",{className:"mb-3"},V.map((function(t,a){return o.a.createElement(T.a.Check,{checked:e.state.selectedDays[t],onChange:e.filterDay,key:"checkbox-".concat(t),"data-day":t,inline:!0,label:t,type:"checkbox",id:"checkbox-".concat(t)})})))),o.a.createElement(T.a.Check,{checked:this.state.toggleTime,onChange:this.toggleTime,inline:!0,label:"Time",type:"checkbox"}),o.a.createElement(z.a,{disabled:!this.state.toggleTime,style:{display:"inline-block",width:"90%"},onChange:this.filterTime,value:this.state.time,start:"00:00",end:"23:59",step:30})),o.a.createElement("h3",{style:{marginTop:"20px",marginBottom:"20px",textAlign:"center"}}," ","Restaurants"," "),o.a.createElement(t,{items:this.state.filteredRestaurants,itemHeight:85})),o.a.createElement(K,{showModal:this.state.showModal,title:this.state.modalTitle,id:this.state.modalId,closeModal:this.closeModal}))}}]),t}(n.Component),q=Object(I.b)((function(e){return{collections:e.collectionReducer.collections}}),(function(e){return{}}))($),Q=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement(m.a,{style:{paddingTop:"10px"},transition:!1,defaultActiveKey:"home"},o.a.createElement(h.a,{title:o.a.createElement("h3",null,"Is it open?"),disabled:!0}),o.a.createElement(h.a,{eventKey:"home",title:"Home"},o.a.createElement(q,null)),o.a.createElement(h.a,{eventKey:"collections",title:"Collections"},o.a.createElement(A,null))))}}]),t}(n.Component),X=Object(I.b)((function(e){return{}}),(function(e){return{fetchCollections:function(t){e(M(t))}}}))(Q);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Y=a(28),Z=a(99),ee={collections:[]},te=Object(Y.c)({collectionReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ee,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"RENAMED_COLLECTION":var a=t.payload,n=a.collectionId,o=a.name,l=Object(x.a)(e.collections),c=l.findIndex((function(e){return e._id===n}));return l[c].name=o,Object(F.a)({},e,{collections:l});case"REMOVED_FROM_COLLECTION":var i=t.payload,r=i.collectionId,s=i.restaurantId,d=Object(x.a)(e.collections),u=d.findIndex((function(e){return e._id===r})),m=Object(x.a)(d[u].restaurants),h=m.findIndex((function(e){return e._id===s}));return m.splice(h,1),d[u].restaurants=m,Object(F.a)({},e,{collections:d});case"ADDED_TO_COLLECTION":var p=t.payload,f=p.restaurant,g=p.collectionId,y=Object(x.a)(e.collections),E=!0,b=!1,C=void 0;try{for(var O,v=y[Symbol.iterator]();!(E=(O=v.next()).done);E=!0){var I=O.value;if(I._id===g){I.restaurants.push(f);break}}}catch(S){b=!0,C=S}finally{try{E||null==v.return||v.return()}finally{if(b)throw C}}return Object(F.a)({},e,{collections:y});case"DELETED_COLLECTION":var k=t.payload.collectionId,R=Object(x.a)(e.collections),j=R.findIndex((function(e){return e._id===k}));return R.splice(j,1),Object(F.a)({},e,{collections:R});case"FETCH_COLLECTIONS":var w=t.payload.collections;return Object(F.a)({},e,{collections:w});case"CREATE_COLLECTION":var M=t.payload.collection;return Object(F.a)({},e,{collections:[].concat(Object(x.a)(e.collections),[M])});default:return e}}}),ae=Object(Y.d)(te,Object(Y.a)(Z.a));w.on("restaurantRemoved",(function(e){ae.dispatch(function(e){return{type:"REMOVED_FROM_COLLECTION",payload:{collectionId:e.collectionId,restaurantId:e.restaurantId}}}(e))})),w.on("restaurantAdded",(function(e){ae.dispatch(function(e){return{type:"ADDED_TO_COLLECTION",payload:{restaurant:e.restaurant,collectionId:e.collectionId}}}(e))})),w.on("collectionDeleted",(function(e){ae.dispatch(function(e){var t=e.collectionId,a=JSON.parse(localStorage.getItem("collectionIds"))||[],n=a.findIndex((function(e){return e._id===t}));return a.splice(n,1),localStorage.setItem("collectionIds",JSON.stringify(a)),{type:"DELETED_COLLECTION",payload:{collectionId:t}}}(e))})),w.on("collectionRenamed",(function(e){ae.dispatch(function(e){return function(t){t({type:"RENAMED_COLLECTION",payload:{collectionId:e.collectionId,name:e.name}})}}(e))}));var ne=ae;c.a.render(o.a.createElement(I.a,{store:ne},o.a.createElement(X,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[100,1,2]]]);
//# sourceMappingURL=main.86cc0f9a.chunk.js.map