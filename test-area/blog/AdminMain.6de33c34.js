function e(e){return e&&e.__esModule?e.default:e}function t(e,t,n,a){Object.defineProperty(e,t,{get:n,set:a,enumerable:!0,configurable:!0})}var n=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequire35b1;n.register("5Fj7c",(function(a,l){var o;o=a.exports,Object.defineProperty(o,"__esModule",{value:!0,configurable:!0}),t(a.exports,"default",(function(){return u}),(function(e){return u=e}));var i=n("e0rqH"),r=n("ff1p0"),s=n("4PLf1"),c=n("stS02"),d=n("5NJK7"),m=n("jjUrw");var u=()=>{const{Fetch:t,setReducer:n}=(0,i.useContext)(c.NewContext),a=(0,s.useNavigate)(),{pathname:l}=(0,s.useLocation)(),o=JSON.parse(sessionStorage.getItem("temp"))||void 0;(0,i.useEffect)((()=>{if(o){const{token:e}=o,{timesTemp:t}=(0,d.parseJwt)(e);(+new Date-t)/1e3/60/60>2?u(e):(n(m.actionCreator,"setAuthInfo",o),"/admin"===l||"/admin/login"===l?a({pathname:"/admin/article_all"}):a({pathname:location.pathname},{replace:!0}))}else a({pathname:"/admin/login"})}),[]);const u=e=>{t.get("/logout",{token:e}).then((({data:e})=>{console.log(null==e?void 0:e.message),n(m.actionCreator,"setAuthInfo",{ac:"",token:""}),sessionStorage.removeItem("temp"),a({pathname:"/admin/login"})}))};return e(i).createElement("div",{className:"container-fluid"},e(i).createElement(m.Container,null,e(i).createElement("div",{className:"header"},e(i).createElement("h1",null,"後台","/admin/login"===l?"":"/admin/article_all"===l?"文章":"留言","管理")),e(i).createElement("div",{className:"main"},e(i).createElement(r.Outlet,null)),o?e(i).createElement("div",{className:"right-top-group"},e(i).createElement("div",{onClick:()=>{const[,,e]=l.split("/");a({pathname:"article_all"===e?"/admin/msg_all":"/admin/article_all"})},className:"dashboard-switch-btn"},"/admin/article_all"===l?"留言管理":"文章管理"),e(i).createElement("div",{onClick:u.bind(void 0,o.token),className:"logout-btn"},"登出")):null))}})),n.register("5NJK7",(function(e,n){t(e.exports,"parseJwt",(function(){return a}));const a=e=>{const t=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/");return JSON.parse(decodeURIComponent(window.atob(t).split("").map((e=>"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2))).join("")))}}));