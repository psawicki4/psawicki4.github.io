import{a as Se,e as Ce,f as ke}from"./chunk-D72X7CZZ.js";import{a as fe}from"./chunk-YELY4PQJ.js";import{M as _e,_ as ge,da as he,ea as xe}from"./chunk-CHOH6AKT.js";import{h as E,i as ue}from"./chunk-6WSPWO2O.js";import{Ab as C,Cb as x,D as U,Fa as X,Ga as F,Gb as P,Gc as k,Ha as N,Hc as de,Jb as ne,Kb as oe,Lb as c,Mb as a,Nb as re,Qb as se,R as q,Rb as y,Ub as S,Wb as u,_ as G,a as l,ab as Y,b as L,ba as J,cc as ae,db as s,dc as le,ec as H,gb as Z,gc as m,ha as M,hc as g,ic as ce,jc as j,ma as V,nc as me,oa as W,oc as D,qc as pe,rb as ee,rc as p,sb as w,sc as d,tb as te,u as K,ub as ie,xa as f,ya as _}from"./chunk-QHYXH3OY.js";var I=(()=>{let t=class t{constructor(){this.templateRef=M(Z)}};t.\u0275fac=function(n){return new(n||t)},t.\u0275dir=W({type:t,selectors:[["","listItemTemplate",""]],standalone:!0});let i=t;return i})();var Ve=["viewport"],Pe=i=>({$implicit:i});function De(i,t){if(i&1){let o=y();c(0,"li",4),S("click",function(){let n=f(o).$implicit,r=u();return _(r.selectItem(n))})("keyup.enter",function(){let n=f(o).$implicit,r=u();return _(r.selectItem(n))})("keydown.arrowDown",function(){let n=f(o).index,r=u();return _(r.changeFocus(n+1))})("keydown.arrowUp",function(){let n=f(o).index,r=u();return _(r.changeFocus(n-1))}),se(1,5),a()}if(i&2){let o=t.$implicit,e=t.index,n=u();x("id",e)("ngClass",n.selectedItem===o?"card__selected":"card")("tabindex",n.focusableIndex===e?0:-1),s(),x("ngTemplateOutlet",n.listItemTemplateRef().templateRef)("ngTemplateOutletContext",pe(5,Pe,o))}}var be=(()=>{let t=class t{constructor(){this.focusableIndex=0,this.data=N([]),this.itemHeight=N(0),this.fetchMore=F(),this.selected=F(),this.listItemTemplateRef=ie(I),this.viewport=te.required("viewport")}ngAfterViewInit(){this.subscription=this.viewport().elementScrolled().pipe(K(()=>this.viewport().measureScrollOffset("bottom")),q(),U(([e,n])=>n<e&&n<this.itemHeight()*2),G(50)).subscribe(()=>{console.log("tick"),this.fetchMore.emit()})}selectItem(e){this.selectedItem=e,this.selected.emit(e)}changeFocus(e){let n=document.getElementById(e.toString());n&&(n.focus(),this.focusableIndex=e)}trackBy(e){return e}ngOnDestroy(){this.subscription?.unsubscribe()}};t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=V({type:t,selectors:[["psa-list"]],contentQueries:function(n,r,v){n&1&&ae(v,r.listItemTemplateRef,I,5),n&2&&H()},viewQuery:function(n,r){n&1&&le(r.viewport,Ve,5),n&2&&H()},inputs:{data:[1,"data"],itemHeight:[1,"itemHeight"]},outputs:{fetchMore:"fetchMore",selected:"selected"},standalone:!0,features:[D],decls:4,vars:3,consts:[["viewport",""],[1,"list",3,"itemSize"],["role","listbox"],["role","option","matRipple","",3,"id","ngClass","tabindex","click","keyup.enter","keydown.arrowDown","keydown.arrowUp",4,"cdkVirtualFor","cdkVirtualForOf","cdkVirtualForTrackBy"],["role","option","matRipple","",3,"click","keyup.enter","keydown.arrowDown","keydown.arrowUp","id","ngClass","tabindex"],[3,"ngTemplateOutlet","ngTemplateOutletContext"]],template:function(n,r){n&1&&(c(0,"cdk-virtual-scroll-viewport",1,0)(2,"ul",2),C(3,De,2,7,"li",3),a()()),n&2&&(x("itemSize",r.itemHeight()),s(3),x("cdkVirtualForOf",r.data())("cdkVirtualForTrackBy",r.trackBy))},dependencies:[Ce,Se,ke,E,ue,_e],styles:[".list[_ngcontent-%COMP%]{width:100%;height:100%;display:flex;flex-direction:column;gap:8px;scrollbar-width:thin}.card[_ngcontent-%COMP%], .card__selected[_ngcontent-%COMP%]{padding:32px;border-radius:4px;border-right:solid 1px rgba(255,255,255,.12);background-color:#282828;margin:8px;cursor:pointer}.card__selected[_ngcontent-%COMP%]{background-color:#343434}"],changeDetection:0});let i=t;return i})();var T=Symbol("STATE_SIGNAL");function ve(i){let t=de(()=>i());return Ee(t)?new Proxy(i,{get(o,e){return e in t?(ee(o[e])||Object.defineProperty(o,e,{value:k(()=>o()[e]),configurable:!0}),ve(o[e])):o[e]}}):i}function Ee(i){return i?.constructor===Object}function we(...i){let t=[...i],o="providedIn"in t[0]?t.shift():{},e=t;return(()=>{class r{constructor(){let h=e.reduce((R,Me)=>Me(R),Oe()),{stateSignals:b,computedSignals:B,methods:Re,hooks:Le}=h,$=l(l(l({},b),B),Re);this[T]=h[T];for(let R in $)this[R]=$[R];let{onInit:Q,onDestroy:z}=Le;Q&&Q(),z&&M(X).onDestroy(z)}static \u0275fac=function(b){return new(b||r)};static \u0275prov=J({token:r,factory:r.\u0275fac,providedIn:o.providedIn||null})}return r})()}function Oe(){return{[T]:w({}),stateSignals:{},computedSignals:{},methods:{},hooks:{}}}function O(i,t){return Object.keys(i).reduce((o,e)=>(t.includes(e)||(o[e]=i[e]),o),{})}function ye(i){return t=>{let o=i(l(l({},t.stateSignals),t.computedSignals)),e=Object.keys(o),n=O(t.stateSignals,e),r=O(t.methods,e);return L(l({},t),{stateSignals:n,computedSignals:l(l({},t.computedSignals),o),methods:r})}}function Ie(i){return t=>{let o=typeof i=="function"?i():i,e=Object.keys(o);t[T].update(h=>l(l({},h),o));let n=e.reduce((h,b)=>{let B=k(()=>t[T]()[b]);return L(l({},h),{[b]:ve(B)})},{}),r=O(t.computedSignals,e),v=O(t.methods,e);return L(l({},t),{stateSignals:l(l({},t.stateSignals),n),computedSignals:r,methods:v})}}var Be={rooms:{total:0,data:[]},selectedRoom:{roomNumber:0,booked:!1}},Te=we(Ie(Be),ye(({rooms:i})=>({bookedRooms:k(()=>i().data.filter(t=>t.booked))})));var Fe=(i,t)=>t.roomNumber;function Ne(i,t){i&1&&(c(0,"p",12),m(1),p(2,"translate"),a()),i&2&&(s(),g(d(2,1,"LIST.reservation")))}function He(i,t){if(i&1&&(c(0,"span",10)(1,"p",11),m(2),p(3,"translate"),a(),C(4,Ne,3,3,"p",12),a()),i&2){let o=t.$implicit;s(),x("ngClass",o.roomNumber===666?"hell":""),s(),j("",d(3,4,"LIST.room-number")," ",o.roomNumber,""),s(2),P(o.booked?4:-1)}}function je(i,t){if(i&1){let o=y();c(0,"button",14),S("click",function(){f(o);let n=u(2);return _(n.cancel())}),m(1),p(2,"translate"),a(),c(3,"button",15),S("click",function(){f(o);let n=u(2);return _(n.book())}),m(4),p(5,"translate"),a()}i&2&&(s(),g(d(2,2,"LIST.cancel")),s(3),g(d(5,4,"LIST.reserve")))}function Ae(i,t){if(i&1){let o=y();c(0,"button",14),S("click",function(){f(o);let n=u(2);return _(n.cancel())}),m(1),p(2,"translate"),a(),c(3,"button",15),S("click",function(){f(o);let n=u(2);return _(n.deleteReservation())}),m(4),p(5,"translate"),a()}i&2&&(s(),g(d(2,2,"LIST.cancel")),s(3),g(d(5,4,"LIST.delete-reservation")))}function $e(i,t){if(i&1&&(c(0,"p"),m(1),a(),c(2,"span",13),C(3,je,6,6)(4,Ae,6,6),a()),i&2){let o=u();s(),ce("Pok\xF3j nr. ",o.selectedRoom().roomNumber,""),s(2),P(o.rooms().data[o.selectedRoom().roomNumber-1].booked?4:3)}}function Qe(i,t){if(i&1&&(c(0,"p"),m(1),p(2,"translate"),a()),i&2){let o=t.$implicit;s(),j("",d(2,2,"LIST.room-nr")," ",o.roomNumber,"")}}var bt=(()=>{let t=class t{constructor(){this.rooms=w({total:0,data:[]}),this.bookedRooms=k(()=>this.rooms().data.filter(e=>e.booked)),this.selectedRoom=w({roomNumber:0,booked:!1}),this.skip=0,this.allRooms=Array.from({length:1e4},(e,n)=>({roomNumber:n+1,booked:!1}))}ngOnInit(){this.getFirstRooms()}getFirstRooms(){this.skip=0;let e=this.allRooms.slice(this.skip,this.skip+50);this.rooms.set({total:1e4,data:e})}fetchMoreRooms(){if(this.rooms().data.length===this.rooms().total)return;this.skip+=50;let e=this.allRooms.slice(this.skip,this.skip+50),n={total:1e4,data:[...this.rooms().data,...e]};this.rooms.set(n)}selectRoom(e){e&&this.selectedRoom.set(e)}cancel(){this.selectedRoom.set({roomNumber:0,booked:!1})}book(){let e=l({},this.rooms());e.data[this.selectedRoom()?.roomNumber-1].booked=!0,this.rooms.set(e),this.cancel()}deleteReservation(){let e=l({},this.rooms());e.data[this.selectedRoom()?.roomNumber-1].booked=!1,this.rooms.set(e),this.cancel()}};t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=V({type:t,selectors:[["psa-list-page"]],standalone:!0,features:[me([Te]),D],decls:26,vars:18,consts:[[1,"text-2xl","mb-4"],[1,"flex","flex-col","gap-4"],[1,"divider"],[1,"ml-2",3,"innerHTML"],[1,"flex","flex-row","gap-8"],[1,"psa-list"],[3,"fetchMore","selected","data","itemHeight"],["listItemTemplate",""],[1,"flex","flex-col","gap-8","w-48"],[1,"mb-4"],[1,"flex","flex-row","justify-between","items-center"],[3,"ngClass"],[1,"booked"],[1,"flex","flex-row","self-end","gap-4"],["mat-button","",3,"click"],["mat-flat-button","",3,"click"]],template:function(n,r){n&1&&(c(0,"psa-card")(1,"h1",0),m(2),p(3,"translate"),a(),c(4,"div",1)(5,"p"),m(6),p(7,"translate"),a(),re(8,"div",2)(9,"p",3),p(10,"translate"),c(11,"div",4)(12,"div",5)(13,"psa-list",6),S("fetchMore",function(){return r.fetchMoreRooms()})("selected",function(h){return r.selectRoom(h)}),C(14,He,5,6,"ng-template",7),a()(),c(15,"div",8)(16,"p"),m(17),p(18,"translate"),a(),C(19,$e,5,2),a(),c(20,"div")(21,"p",9),m(22),p(23,"translate"),a(),ne(24,Qe,3,4,"p",null,Fe),a()()()()),n&2&&(s(2),g(d(3,8,"LIST.header")),s(4),g(d(7,10,"LIST.component-desc")),s(3),x("innerHTML",d(10,12,"LIST.hello"),Y),s(4),x("data",r.rooms().data)("itemHeight",88),s(4),g(d(18,14,"LIST.selected-room")),s(2),P(r.selectedRoom().roomNumber>0?19:-1),s(3),g(d(23,16,"LIST.your-reservations")),s(2),oe(r.bookedRooms()))},dependencies:[fe,be,I,xe,he,E,ge],styles:[".psa-list[_ngcontent-%COMP%]{height:580px;width:300px}.hell[_ngcontent-%COMP%]{color:red}.divider[_ngcontent-%COMP%]{height:1px;background-color:#818181}.booked[_ngcontent-%COMP%]{font-size:12px;color:#0dd}"],changeDetection:0});let i=t;return i})();export{bt as ListPageComponent};
