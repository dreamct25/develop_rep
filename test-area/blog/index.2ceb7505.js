function e(e,r,t,n){Object.defineProperty(e,r,{get:t,set:n,enumerable:!0,configurable:!0})}function r(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},i=t.parcelRequire35b1;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in o){var r=o[e];delete o[e];var t={id:e,exports:{}};return n[e]=t,r.call(t.exports,t,t.exports),t.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,r){o[e]=r},t.parcelRequire35b1=i),i.register("4k5nK",(function(r,t){var n,o;e(r.exports,"register",(function(){return n}),(function(e){return n=e})),e(r.exports,"resolve",(function(){return o}),(function(e){return o=e}));var i={};n=function(e){for(var r=Object.keys(e),t=0;t<r.length;t++)i[r[t]]=e[r[t]]},o=function(e){var r=i[e];if(null==r)throw new Error("Could not resolve bundle with id "+e);return r}})),i.register("6hxAW",(function(r,t){var n;e(r.exports,"getBundleURL",(function(){return n}),(function(e){return n=e}));var o={};function i(e){return(""+e).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/,"$1")+"/"}n=function(e){var r=o[e];return r||(r=function(){try{throw new Error}catch(r){var e=(""+r.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);if(e)return i(e[2])}return"/"}(),o[e]=r),r}})),i("4k5nK").register(JSON.parse('{"lcDix":"index.2ceb7505.js","dNyRu":"bg.5013efc6.jpg","dmACX":"index.b8510d90.css","g3aZe":"index.e1de92d6.js","bKh4W":"index.9947ae52.js"}'));var a,u=i("e0rqH"),l=i("3gPEt");a=l.createRoot,l.hydrateRoot;var c,f=i("4PLf1"),d=i("hgPFG"),s=i("b9ZNc");c=i("6hxAW").getBundleURL("lcDix")+i("4k5nK").resolve("dNyRu");let b;var p=(0,s.createGlobalStyle)(b||(b=(e=>e)`
    html{
        min-height: 100vh;

        &:before{
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -1;
            backdrop-filter: blur(10px) brightness(65%);
        }
        
        &:after{
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -2;
            background-image: url(${0});
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
        }

        body{
            background-color: transparent;
        }
    }
`),r(c)),g=i("stS02"),h=i("fWYWz");a(document.querySelector(".app")).render(r(u).createElement(u.StrictMode,null,r(u).createElement(d.Provider,{store:h.default},r(u).createElement(f.BrowserRouter,{basename:"develop_rep/test-area/blog"},r(u).createElement(p,null),r(u).createElement(g.default,null)))));