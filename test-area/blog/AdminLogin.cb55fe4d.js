!function(){function e(e){return e&&e.__esModule?e.default:e}var t=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequire35b1;t.register("63IY9",(function(n,a){var r,o,u,c,i;r=n.exports,Object.defineProperty(r,"__esModule",{value:!0,configurable:!0}),o=n.exports,u="default",c=function(){return y},i=function(e){return y=e},Object.defineProperty(o,u,{get:c,set:i,enumerable:!0,configurable:!0});var l=t("8CHzG"),s=t("75JRK"),d=t("4Fae7"),f=t("jvydq"),p=t("diPDO"),m=t("cYcEi"),v=t("5OXzf"),g=t("dR8pc"),w=t("05gWr"),b=void 0,y=function(){var t,n=(0,p.useContext)(v.NewContext),a=n.$,r=n.Fetch,o=n.setReducer,u=(0,m.useNavigate)(),c=(0,d.default)((0,p.useState)({acName:"",pwdTemp:"",pwd:""}),2),i=c[0],y=i.acName,N=i.pwdTemp,h=i.pwd,k=c[1],E=(0,p.useRef)(y),C=(0,p.useRef)(h),x=(t=(0,l.default)(e(f).mark((function t(n,r){var o,u,c;return e(f).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o=r.target,u={},"pwdTemp"!==n){e.next=10;break}return u[n]=o.value,e.next=6,a.useSHA("SHA-256",o.value);case 6:c=e.sent,u.pwd=c,e.next=11;break;case 10:u[n]=o.value;case 11:k((function(e){return(0,s.default)({},e,u)}));case 12:case"end":return e.stop()}}),t)}))),function(e,n){return t.apply(this,arguments)}),I=function(){r.post("/login",{data:{acName:E.current,pwd:C.current}}).then((function(e){var t=e.data;o(w.actionCreator,"setAuthInfo",{ac:null==t?void 0:t.ac,token:null==t?void 0:t.token}),sessionStorage.setItem("temp",JSON.stringify({ac:null==t?void 0:t.ac,token:null==t?void 0:t.token})),u({pathname:"/admin/article_all"})})).catch((function(e){return alert("error")}))},S=function(e){return 13===e.keyCode&&I()};return(0,p.useEffect)((function(){E.current=y,C.current=h}),[y,h]),(0,p.useEffect)((function(){if(sessionStorage.getItem("temp")){var e=JSON.parse(sessionStorage.getItem("temp"));o(w.actionCreator,"setAuthInfo",e)}return a(window).listener("keypress",S),function(){return a(window).removeListener("keypress",S)}}),[]),e(p).createElement(w.Container,null,e(p).createElement("div",{className:"login-layout"},e(p).createElement("div",{className:"header"},"登入系統"),e(p).createElement("div",{className:"input-group"},e(p).createElement(g.CustomInput,{label:"帳號",type:"text",bindVal:y,changeEvent:x.bind(b,"acName"),className:y?"lock":""}),e(p).createElement(g.CustomInput,{label:"密碼",type:"password",bindVal:N,changeEvent:x.bind(b,"pwdTemp"),className:N?"lock":""})),e(p).createElement("div",{onClick:I,className:"login-btn"},"登入")))}}))}();