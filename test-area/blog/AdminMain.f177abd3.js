!function(){function e(e){return e&&e.__esModule?e.default:e}function t(e,t,n,a){Object.defineProperty(e,t,{get:n,set:a,enumerable:!0,configurable:!0})}var n=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequire35b1;n.register("607MJ",(function(a,i){var l;l=a.exports,Object.defineProperty(l,"__esModule",{value:!0,configurable:!0}),t(a.exports,"default",(function(){return f}),(function(e){return f=e}));var o=n("4Fae7"),r=n("diPDO"),c=n("4W25a"),s=n("cYcEi"),u=n("5OXzf"),d=n("3U4rE"),m=n("2ccns"),f=function(){var t=(0,r.useContext)(u.NewContext),n=t.Fetch,a=t.setReducer,i=(0,s.useNavigate)(),l=(0,s.useLocation)().pathname,f=JSON.parse(sessionStorage.getItem("temp"))||void 0;(0,r.useEffect)((function(){if(f){var e=f.token,t=(0,d.parseJwt)(e).timesTemp;(+new Date-t)/1e3/60/60>2?p(e):(a(m.actionCreator,"setAuthInfo",f),"/admin"===l||"/admin/login"===l?i({pathname:"/admin/article_all"}):i({pathname:location.pathname},{replace:!0}))}else i({pathname:"/admin/login"})}),[]);var p=function(e){n.get("/logout",{token:e}).then((function(e){var t=e.data;console.log(null==t?void 0:t.message),a(m.actionCreator,"setAuthInfo",{ac:"",token:""}),sessionStorage.removeItem("temp"),i({pathname:"/admin/login"})}))};return e(r).createElement("div",{className:"container-fluid"},e(r).createElement(m.Container,null,e(r).createElement("div",{className:"header"},e(r).createElement("h1",null,"後台","/admin/login"===l?"":"/admin/article_all"===l?"文章":"留言","管理")),e(r).createElement("div",{className:"main"},e(r).createElement(c.Outlet,null)),f?e(r).createElement("div",{className:"right-top-group"},e(r).createElement("div",{onClick:function(){var e=(0,o.default)(l.split("/"),3)[2];i({pathname:"article_all"===e?"/admin/msg_all":"/admin/article_all"})},className:"dashboard-switch-btn"},"/admin/article_all"===l?"留言管理":"文章管理"),e(r).createElement("div",{onClick:p.bind(undefined,f.token),className:"logout-btn"},"登出")):null))}})),n.register("3U4rE",(function(e,n){t(e.exports,"parseJwt",(function(){return a}));var a=function(e){var t=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/");return JSON.parse(decodeURIComponent(window.atob(t).split("").map((function(e){return"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)})).join("")))}}))}();