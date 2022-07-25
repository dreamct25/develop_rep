const Sn=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerpolicy&&(a.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?a.credentials="include":r.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}};Sn();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ht=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,It=Symbol(),to=new WeakMap;class zo{constructor(e,t,n){if(this._$cssResult$=!0,n!==It)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Ht&&e===void 0){const n=t!==void 0&&t.length===1;n&&(e=to.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&to.set(t,e))}return e}toString(){return this.cssText}}const _n=o=>new zo(typeof o=="string"?o:o+"",void 0,It),Go=(o,...e)=>{const t=o.length===1?o[0]:e.reduce((n,r,a)=>n+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+o[a+1],o[0]);return new zo(t,o,It)},kn=(o,e)=>{Ht?o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const n=document.createElement("style"),r=window.litNonce;r!==void 0&&n.setAttribute("nonce",r),n.textContent=t.cssText,o.appendChild(n)})},oo=Ht?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(const n of e.cssRules)t+=n.cssText;return _n(t)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var pt;const no=window.trustedTypes,On=no?no.emptyScript:"",ro=window.reactiveElementPolyfillSupport,At={toAttribute(o,e){switch(e){case Boolean:o=o?On:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},qo=(o,e)=>e!==o&&(e==e||o==o),bt={attribute:!0,type:String,converter:At,reflect:!1,hasChanged:qo};class Se extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(e){var t;(t=this.h)!==null&&t!==void 0||(this.h=[]),this.h.push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,n)=>{const r=this._$Ep(n,t);r!==void 0&&(this._$Ev.set(r,n),e.push(r))}),e}static createProperty(e,t=bt){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const n=typeof e=="symbol"?Symbol():"__"+e,r=this.getPropertyDescriptor(e,n,t);r!==void 0&&Object.defineProperty(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){return{get(){return this[t]},set(r){const a=this[e];this[t]=r,this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||bt}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,n=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const r of n)this.createProperty(r,t[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const r of n)t.unshift(oo(r))}else e!==void 0&&t.push(oo(e));return t}static _$Ep(e,t){const n=t.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}u(){var e;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,n;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((n=e.hostConnected)===null||n===void 0||n.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return kn(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach(t=>{var n;return(n=t.hostConnected)===null||n===void 0?void 0:n.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach(t=>{var n;return(n=t.hostDisconnected)===null||n===void 0?void 0:n.call(t)})}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$EO(e,t,n=bt){var r,a;const i=this.constructor._$Ep(e,n);if(i!==void 0&&n.reflect===!0){const f=((a=(r=n.converter)===null||r===void 0?void 0:r.toAttribute)!==null&&a!==void 0?a:At.toAttribute)(t,n.type);this._$El=e,f==null?this.removeAttribute(i):this.setAttribute(i,f),this._$El=null}}_$AK(e,t){var n,r;const a=this.constructor,i=a._$Ev.get(e);if(i!==void 0&&this._$El!==i){const f=a.getPropertyOptions(i),s=f.converter,u=(r=(n=s==null?void 0:s.fromAttribute)!==null&&n!==void 0?n:typeof s=="function"?s:null)!==null&&r!==void 0?r:At.fromAttribute;this._$El=i,this[i]=u(t,f.type),this._$El=null}}requestUpdate(e,t,n){let r=!0;e!==void 0&&(((n=n||this.constructor.getPropertyOptions(e)).hasChanged||qo)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),n.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,n))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((r,a)=>this[a]=r),this._$Ei=void 0);let t=!1;const n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),(e=this._$ES)===null||e===void 0||e.forEach(r=>{var a;return(a=r.hostUpdate)===null||a===void 0?void 0:a.call(r)}),this.update(n)):this._$Ek()}catch(r){throw t=!1,this._$Ek(),r}t&&this._$AE(n)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach(n=>{var r;return(r=n.hostUpdated)===null||r===void 0?void 0:r.call(n)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,n)=>this._$EO(n,this[n],t)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}Se.finalized=!0,Se.elementProperties=new Map,Se.elementStyles=[],Se.shadowRootOptions={mode:"open"},ro==null||ro({ReactiveElement:Se}),((pt=globalThis.reactiveElementVersions)!==null&&pt!==void 0?pt:globalThis.reactiveElementVersions=[]).push("1.3.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ht;const Oe=globalThis.trustedTypes,ao=Oe?Oe.createPolicy("lit-html",{createHTML:o=>o}):void 0,ie=`lit$${(Math.random()+"").slice(9)}$`,Ko="?"+ie,$n=`<${Ko}>`,$e=document,Ie=(o="")=>$e.createComment(o),Ue=o=>o===null||typeof o!="object"&&typeof o!="function",Wo=Array.isArray,Cn=o=>Wo(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",Le=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,io=/-->/g,fo=/>/g,be=RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),so=/'/g,co=/"/g,Jo=/^(?:script|style|textarea|title)$/i,An=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),j=An(1),G=Symbol.for("lit-noChange"),R=Symbol.for("lit-nothing"),uo=new WeakMap,Pn=(o,e,t)=>{var n,r;const a=(n=t==null?void 0:t.renderBefore)!==null&&n!==void 0?n:e;let i=a._$litPart$;if(i===void 0){const f=(r=t==null?void 0:t.renderBefore)!==null&&r!==void 0?r:null;a._$litPart$=i=new Ge(e.insertBefore(Ie(),f),f,void 0,t!=null?t:{})}return i._$AI(o),i},ke=$e.createTreeWalker($e,129,null,!1),Rn=(o,e)=>{const t=o.length-1,n=[];let r,a=e===2?"<svg>":"",i=Le;for(let s=0;s<t;s++){const u=o[s];let d,c,l=-1,b=0;for(;b<u.length&&(i.lastIndex=b,c=i.exec(u),c!==null);)b=i.lastIndex,i===Le?c[1]==="!--"?i=io:c[1]!==void 0?i=fo:c[2]!==void 0?(Jo.test(c[2])&&(r=RegExp("</"+c[2],"g")),i=be):c[3]!==void 0&&(i=be):i===be?c[0]===">"?(i=r!=null?r:Le,l=-1):c[1]===void 0?l=-2:(l=i.lastIndex-c[2].length,d=c[1],i=c[3]===void 0?be:c[3]==='"'?co:so):i===co||i===so?i=be:i===io||i===fo?i=Le:(i=be,r=void 0);const v=i===be&&o[s+1].startsWith("/>")?" ":"";a+=i===Le?u+$n:l>=0?(n.push(d),u.slice(0,l)+"$lit$"+u.slice(l)+ie+v):u+ie+(l===-2?(n.push(void 0),s):v)}const f=a+(o[t]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return[ao!==void 0?ao.createHTML(f):f,n]};class Me{constructor({strings:e,_$litType$:t},n){let r;this.parts=[];let a=0,i=0;const f=e.length-1,s=this.parts,[u,d]=Rn(e,t);if(this.el=Me.createElement(u,n),ke.currentNode=this.el.content,t===2){const c=this.el.content,l=c.firstChild;l.remove(),c.append(...l.childNodes)}for(;(r=ke.nextNode())!==null&&s.length<f;){if(r.nodeType===1){if(r.hasAttributes()){const c=[];for(const l of r.getAttributeNames())if(l.endsWith("$lit$")||l.startsWith(ie)){const b=d[i++];if(c.push(l),b!==void 0){const v=r.getAttribute(b.toLowerCase()+"$lit$").split(ie),m=/([.?@])?(.*)/.exec(b);s.push({type:1,index:a,name:m[2],strings:v,ctor:m[1]==="."?Fn:m[1]==="?"?Ln:m[1]==="@"?Nn:ft})}else s.push({type:6,index:a})}for(const l of c)r.removeAttribute(l)}if(Jo.test(r.tagName)){const c=r.textContent.split(ie),l=c.length-1;if(l>0){r.textContent=Oe?Oe.emptyScript:"";for(let b=0;b<l;b++)r.append(c[b],Ie()),ke.nextNode(),s.push({type:2,index:++a});r.append(c[l],Ie())}}}else if(r.nodeType===8)if(r.data===Ko)s.push({type:2,index:a});else{let c=-1;for(;(c=r.data.indexOf(ie,c+1))!==-1;)s.push({type:7,index:a}),c+=ie.length-1}a++}}static createElement(e,t){const n=$e.createElement("template");return n.innerHTML=e,n}}function Ce(o,e,t=o,n){var r,a,i,f;if(e===G)return e;let s=n!==void 0?(r=t._$Cl)===null||r===void 0?void 0:r[n]:t._$Cu;const u=Ue(e)?void 0:e._$litDirective$;return(s==null?void 0:s.constructor)!==u&&((a=s==null?void 0:s._$AO)===null||a===void 0||a.call(s,!1),u===void 0?s=void 0:(s=new u(o),s._$AT(o,t,n)),n!==void 0?((i=(f=t)._$Cl)!==null&&i!==void 0?i:f._$Cl=[])[n]=s:t._$Cu=s),s!==void 0&&(e=Ce(o,s._$AS(o,e.values),s,n)),e}class En{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;const{el:{content:n},parts:r}=this._$AD,a=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:$e).importNode(n,!0);ke.currentNode=a;let i=ke.nextNode(),f=0,s=0,u=r[0];for(;u!==void 0;){if(f===u.index){let d;u.type===2?d=new Ge(i,i.nextSibling,this,e):u.type===1?d=new u.ctor(i,u.name,u.strings,this,e):u.type===6&&(d=new jn(i,this,e)),this.v.push(d),u=r[++s]}f!==(u==null?void 0:u.index)&&(i=ke.nextNode(),f++)}return a}m(e){let t=0;for(const n of this.v)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class Ge{constructor(e,t,n,r){var a;this.type=2,this._$AH=R,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$C_=(a=r==null?void 0:r.isConnected)===null||a===void 0||a}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$C_}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Ce(this,e,t),Ue(e)?e===R||e==null||e===""?(this._$AH!==R&&this._$AR(),this._$AH=R):e!==this._$AH&&e!==G&&this.T(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.k(e):Cn(e)?this.S(e):this.T(e)}j(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}k(e){this._$AH!==e&&(this._$AR(),this._$AH=this.j(e))}T(e){this._$AH!==R&&Ue(this._$AH)?this._$AA.nextSibling.data=e:this.k($e.createTextNode(e)),this._$AH=e}$(e){var t;const{values:n,_$litType$:r}=e,a=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=Me.createElement(r.h,this.options)),r);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===a)this._$AH.m(n);else{const i=new En(a,this),f=i.p(this.options);i.m(n),this.k(f),this._$AH=i}}_$AC(e){let t=uo.get(e.strings);return t===void 0&&uo.set(e.strings,t=new Me(e)),t}S(e){Wo(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,r=0;for(const a of e)r===t.length?t.push(n=new Ge(this.j(Ie()),this.j(Ie()),this,this.options)):n=t[r],n._$AI(a),r++;r<t.length&&(this._$AR(n&&n._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var n;for((n=this._$AP)===null||n===void 0||n.call(this,!1,!0,t);e&&e!==this._$AB;){const r=e.nextSibling;e.remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$C_=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class ft{constructor(e,t,n,r,a){this.type=1,this._$AH=R,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=a,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=R}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,n,r){const a=this.strings;let i=!1;if(a===void 0)e=Ce(this,e,t,0),i=!Ue(e)||e!==this._$AH&&e!==G,i&&(this._$AH=e);else{const f=e;let s,u;for(e=a[0],s=0;s<a.length-1;s++)u=Ce(this,f[n+s],t,s),u===G&&(u=this._$AH[s]),i||(i=!Ue(u)||u!==this._$AH[s]),u===R?e=R:e!==R&&(e+=(u!=null?u:"")+a[s+1]),this._$AH[s]=u}i&&!r&&this.P(e)}P(e){e===R?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e!=null?e:"")}}class Fn extends ft{constructor(){super(...arguments),this.type=3}P(e){this.element[this.name]=e===R?void 0:e}}const Tn=Oe?Oe.emptyScript:"";class Ln extends ft{constructor(){super(...arguments),this.type=4}P(e){e&&e!==R?this.element.setAttribute(this.name,Tn):this.element.removeAttribute(this.name)}}class Nn extends ft{constructor(e,t,n,r,a){super(e,t,n,r,a),this.type=5}_$AI(e,t=this){var n;if((e=(n=Ce(this,e,t,0))!==null&&n!==void 0?n:R)===G)return;const r=this._$AH,a=e===R&&r!==R||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,i=e!==R&&(r===R||a);a&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,n;typeof this._$AH=="function"?this._$AH.call((n=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&n!==void 0?n:this.element,e):this._$AH.handleEvent(e)}}class jn{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Ce(this,e)}}const lo=window.litHtmlPolyfillSupport;lo==null||lo(Me,Ge),((ht=globalThis.litHtmlVersions)!==null&&ht!==void 0?ht:globalThis.litHtmlVersions=[]).push("2.2.7");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var gt,mt;class W extends Se{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const n=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=n.firstChild),n}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Pn(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return G}}W.finalized=!0,W._$litElement$=!0,(gt=globalThis.litElementHydrateSupport)===null||gt===void 0||gt.call(globalThis,{LitElement:W});const po=globalThis.litElementPolyfillSupport;po==null||po({LitElement:W});((mt=globalThis.litElementVersions)!==null&&mt!==void 0?mt:globalThis.litElementVersions=[]).push("3.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Pe=o=>e=>typeof e=="function"?((t,n)=>(window.customElements.define(t,n),n))(o,e):((t,n)=>{const{kind:r,elements:a}=n;return{kind:r,elements:a,finisher(i){window.customElements.define(t,i)}}})(o,e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Bn=(o,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,o)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,o)}};function Dn(o){return(e,t)=>t!==void 0?((n,r,a)=>{r.constructor.createProperty(a,n)})(o,e,t):Bn(o,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function P(o){return Dn({...o,state:!0})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var vt;((vt=window.HTMLSlotElement)===null||vt===void 0?void 0:vt.prototype.assignedElements)!=null;function se(o){return se=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},se(o)}function Y(o,e){if(!(o instanceof e))throw new TypeError("Cannot call a class as a function")}function bo(o,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(o,n.key,n)}}function X(o,e,t){return e&&bo(o.prototype,e),t&&bo(o,t),Object.defineProperty(o,"prototype",{writable:!1}),o}function ce(o){if(o===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return o}function Pt(o,e){return Pt=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n,r){return n.__proto__=r,n},Pt(o,e)}function st(o,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");o.prototype=Object.create(e&&e.prototype,{constructor:{value:o,writable:!0,configurable:!0}}),Object.defineProperty(o,"prototype",{writable:!1}),e&&Pt(o,e)}function qe(o,e){if(e&&(se(e)==="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return ce(o)}function J(o){return J=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},J(o)}function le(o,e,t){return e in o?Object.defineProperty(o,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):o[e]=t,o}function Hn(o){if(Array.isArray(o))return o}function In(o){if(typeof Symbol!="undefined"&&o[Symbol.iterator]!=null||o["@@iterator"]!=null)return Array.from(o)}function ho(o,e){(e==null||e>o.length)&&(e=o.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=o[t];return n}function Un(o,e){if(!!o){if(typeof o=="string")return ho(o,e);var t=Object.prototype.toString.call(o).slice(8,-1);if(t==="Object"&&o.constructor&&(t=o.constructor.name),t==="Map"||t==="Set")return Array.from(o);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return ho(o,e)}}function Mn(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Vn(o){return Hn(o)||In(o)||Un(o)||Mn()}function go(o,e){var t=Object.keys(o);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(o);e&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(o,r).enumerable})),t.push.apply(t,n)}return t}function mo(o){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?go(Object(t),!0).forEach(function(n){le(o,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(o,Object.getOwnPropertyDescriptors(t)):go(Object(t)).forEach(function(n){Object.defineProperty(o,n,Object.getOwnPropertyDescriptor(t,n))})}return o}var zn={type:"logger",log:function(e){this.output("log",e)},warn:function(e){this.output("warn",e)},error:function(e){this.output("error",e)},output:function(e,t){console&&console[e]&&console[e].apply(console,t)}},Gn=function(){function o(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};Y(this,o),this.init(e,t)}return X(o,[{key:"init",value:function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};this.prefix=n.prefix||"i18next:",this.logger=t||zn,this.options=n,this.debug=n.debug}},{key:"setDebug",value:function(t){this.debug=t}},{key:"log",value:function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return this.forward(n,"log","",!0)}},{key:"warn",value:function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return this.forward(n,"warn","",!0)}},{key:"error",value:function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return this.forward(n,"error","")}},{key:"deprecate",value:function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return this.forward(n,"warn","WARNING DEPRECATED: ",!0)}},{key:"forward",value:function(t,n,r,a){return a&&!this.debug?null:(typeof t[0]=="string"&&(t[0]="".concat(r).concat(this.prefix," ").concat(t[0])),this.logger[n](t))}},{key:"create",value:function(t){return new o(this.logger,mo(mo({},{prefix:"".concat(this.prefix,":").concat(t,":")}),this.options))}}]),o}(),q=new Gn,ue=function(){function o(){Y(this,o),this.observers={}}return X(o,[{key:"on",value:function(t,n){var r=this;return t.split(" ").forEach(function(a){r.observers[a]=r.observers[a]||[],r.observers[a].push(n)}),this}},{key:"off",value:function(t,n){if(!!this.observers[t]){if(!n){delete this.observers[t];return}this.observers[t]=this.observers[t].filter(function(r){return r!==n})}}},{key:"emit",value:function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),a=1;a<n;a++)r[a-1]=arguments[a];if(this.observers[t]){var i=[].concat(this.observers[t]);i.forEach(function(s){s.apply(void 0,r)})}if(this.observers["*"]){var f=[].concat(this.observers["*"]);f.forEach(function(s){s.apply(s,[t].concat(r))})}}}]),o}();function Ne(){var o,e,t=new Promise(function(n,r){o=n,e=r});return t.resolve=o,t.reject=e,t}function vo(o){return o==null?"":""+o}function qn(o,e,t){o.forEach(function(n){e[n]&&(t[n]=e[n])})}function Ut(o,e,t){function n(f){return f&&f.indexOf("###")>-1?f.replace(/###/g,"."):f}function r(){return!o||typeof o=="string"}for(var a=typeof e!="string"?[].concat(e):e.split(".");a.length>1;){if(r())return{};var i=n(a.shift());!o[i]&&t&&(o[i]=new t),Object.prototype.hasOwnProperty.call(o,i)?o=o[i]:o={}}return r()?{}:{obj:o,k:n(a.shift())}}function yo(o,e,t){var n=Ut(o,e,Object),r=n.obj,a=n.k;r[a]=t}function Kn(o,e,t,n){var r=Ut(o,e,Object),a=r.obj,i=r.k;a[i]=a[i]||[],n&&(a[i]=a[i].concat(t)),n||a[i].push(t)}function et(o,e){var t=Ut(o,e),n=t.obj,r=t.k;if(!!n)return n[r]}function xo(o,e,t){var n=et(o,t);return n!==void 0?n:et(e,t)}function Yo(o,e,t){for(var n in e)n!=="__proto__"&&n!=="constructor"&&(n in o?typeof o[n]=="string"||o[n]instanceof String||typeof e[n]=="string"||e[n]instanceof String?t&&(o[n]=e[n]):Yo(o[n],e[n],t):o[n]=e[n]);return o}function we(o){return o.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}var Wn={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};function Jn(o){return typeof o=="string"?o.replace(/[&<>"'\/]/g,function(e){return Wn[e]}):o}var ct=typeof window!="undefined"&&window.navigator&&typeof window.navigator.userAgentData=="undefined"&&window.navigator.userAgent&&window.navigator.userAgent.indexOf("MSIE")>-1,Yn=[" ",",","?","!",";"];function Xn(o,e,t){e=e||"",t=t||"";var n=Yn.filter(function(f){return e.indexOf(f)<0&&t.indexOf(f)<0});if(n.length===0)return!0;var r=new RegExp("(".concat(n.map(function(f){return f==="?"?"\\?":f}).join("|"),")")),a=!r.test(o);if(!a){var i=o.indexOf(t);i>0&&!r.test(o.substring(0,i))&&(a=!0)}return a}function wo(o,e){var t=Object.keys(o);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(o);e&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(o,r).enumerable})),t.push.apply(t,n)}return t}function Je(o){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?wo(Object(t),!0).forEach(function(n){le(o,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(o,Object.getOwnPropertyDescriptors(t)):wo(Object(t)).forEach(function(n){Object.defineProperty(o,n,Object.getOwnPropertyDescriptor(t,n))})}return o}function Qn(o){var e=Zn();return function(){var n=J(o),r;if(e){var a=J(this).constructor;r=Reflect.construct(n,arguments,a)}else r=n.apply(this,arguments);return qe(this,r)}}function Zn(){if(typeof Reflect=="undefined"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Xo(o,e){var t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:".";if(!!o){if(o[e])return o[e];for(var n=e.split(t),r=o,a=0;a<n.length;++a){if(!r||typeof r[n[a]]=="string"&&a+1<n.length)return;if(r[n[a]]===void 0){for(var i=2,f=n.slice(a,a+i).join(t),s=r[f];s===void 0&&n.length>a+i;)i++,f=n.slice(a,a+i).join(t),s=r[f];if(s===void 0)return;if(s===null)return null;if(e.endsWith(f)){if(typeof s=="string")return s;if(f&&typeof s[f]=="string")return s[f]}var u=n.slice(a+i).join(t);return u?Xo(s,u,t):void 0}r=r[n[a]]}return r}}var er=function(o){st(t,o);var e=Qn(t);function t(n){var r,a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{ns:["translation"],defaultNS:"translation"};return Y(this,t),r=e.call(this),ct&&ue.call(ce(r)),r.data=n||{},r.options=a,r.options.keySeparator===void 0&&(r.options.keySeparator="."),r.options.ignoreJSONStructure===void 0&&(r.options.ignoreJSONStructure=!0),r}return X(t,[{key:"addNamespaces",value:function(r){this.options.ns.indexOf(r)<0&&this.options.ns.push(r)}},{key:"removeNamespaces",value:function(r){var a=this.options.ns.indexOf(r);a>-1&&this.options.ns.splice(a,1)}},{key:"getResource",value:function(r,a,i){var f=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},s=f.keySeparator!==void 0?f.keySeparator:this.options.keySeparator,u=f.ignoreJSONStructure!==void 0?f.ignoreJSONStructure:this.options.ignoreJSONStructure,d=[r,a];i&&typeof i!="string"&&(d=d.concat(i)),i&&typeof i=="string"&&(d=d.concat(s?i.split(s):i)),r.indexOf(".")>-1&&(d=r.split("."));var c=et(this.data,d);return c||!u||typeof i!="string"?c:Xo(this.data&&this.data[r]&&this.data[r][a],i,s)}},{key:"addResource",value:function(r,a,i,f){var s=arguments.length>4&&arguments[4]!==void 0?arguments[4]:{silent:!1},u=this.options.keySeparator;u===void 0&&(u=".");var d=[r,a];i&&(d=d.concat(u?i.split(u):i)),r.indexOf(".")>-1&&(d=r.split("."),f=a,a=d[1]),this.addNamespaces(a),yo(this.data,d,f),s.silent||this.emit("added",r,a,i,f)}},{key:"addResources",value:function(r,a,i){var f=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{silent:!1};for(var s in i)(typeof i[s]=="string"||Object.prototype.toString.apply(i[s])==="[object Array]")&&this.addResource(r,a,s,i[s],{silent:!0});f.silent||this.emit("added",r,a,i)}},{key:"addResourceBundle",value:function(r,a,i,f,s){var u=arguments.length>5&&arguments[5]!==void 0?arguments[5]:{silent:!1},d=[r,a];r.indexOf(".")>-1&&(d=r.split("."),f=i,i=a,a=d[1]),this.addNamespaces(a);var c=et(this.data,d)||{};f?Yo(c,i,s):c=Je(Je({},c),i),yo(this.data,d,c),u.silent||this.emit("added",r,a,i)}},{key:"removeResourceBundle",value:function(r,a){this.hasResourceBundle(r,a)&&delete this.data[r][a],this.removeNamespaces(a),this.emit("removed",r,a)}},{key:"hasResourceBundle",value:function(r,a){return this.getResource(r,a)!==void 0}},{key:"getResourceBundle",value:function(r,a){return a||(a=this.options.defaultNS),this.options.compatibilityAPI==="v1"?Je(Je({},{}),this.getResource(r,a)):this.getResource(r,a)}},{key:"getDataByLanguage",value:function(r){return this.data[r]}},{key:"hasLanguageSomeTranslations",value:function(r){var a=this.getDataByLanguage(r),i=a&&Object.keys(a)||[];return!!i.find(function(f){return a[f]&&Object.keys(a[f]).length>0})}},{key:"toJSON",value:function(){return this.data}}]),t}(ue),Qo={processors:{},addPostProcessor:function(e){this.processors[e.name]=e},handle:function(e,t,n,r,a){var i=this;return e.forEach(function(f){i.processors[f]&&(t=i.processors[f].process(t,n,r,a))}),t}};function So(o,e){var t=Object.keys(o);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(o);e&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(o,r).enumerable})),t.push.apply(t,n)}return t}function F(o){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?So(Object(t),!0).forEach(function(n){le(o,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(o,Object.getOwnPropertyDescriptors(t)):So(Object(t)).forEach(function(n){Object.defineProperty(o,n,Object.getOwnPropertyDescriptor(t,n))})}return o}function tr(o){var e=or();return function(){var n=J(o),r;if(e){var a=J(this).constructor;r=Reflect.construct(n,arguments,a)}else r=n.apply(this,arguments);return qe(this,r)}}function or(){if(typeof Reflect=="undefined"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}var _o={},ko=function(o){st(t,o);var e=tr(t);function t(n){var r,a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return Y(this,t),r=e.call(this),ct&&ue.call(ce(r)),qn(["resourceStore","languageUtils","pluralResolver","interpolator","backendConnector","i18nFormat","utils"],n,ce(r)),r.options=a,r.options.keySeparator===void 0&&(r.options.keySeparator="."),r.logger=q.create("translator"),r}return X(t,[{key:"changeLanguage",value:function(r){r&&(this.language=r)}},{key:"exists",value:function(r){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{interpolation:{}};if(r==null)return!1;var i=this.resolve(r,a);return i&&i.res!==void 0}},{key:"extractFromKey",value:function(r,a){var i=a.nsSeparator!==void 0?a.nsSeparator:this.options.nsSeparator;i===void 0&&(i=":");var f=a.keySeparator!==void 0?a.keySeparator:this.options.keySeparator,s=a.ns||this.options.defaultNS||[],u=i&&r.indexOf(i)>-1,d=!this.options.userDefinedKeySeparator&&!a.keySeparator&&!this.options.userDefinedNsSeparator&&!a.nsSeparator&&!Xn(r,i,f);if(u&&!d){var c=r.match(this.interpolator.nestingRegexp);if(c&&c.length>0)return{key:r,namespaces:s};var l=r.split(i);(i!==f||i===f&&this.options.ns.indexOf(l[0])>-1)&&(s=l.shift()),r=l.join(f)}return typeof s=="string"&&(s=[s]),{key:r,namespaces:s}}},{key:"translate",value:function(r,a,i){var f=this;if(se(a)!=="object"&&this.options.overloadTranslationOptionHandler&&(a=this.options.overloadTranslationOptionHandler(arguments)),a||(a={}),r==null)return"";Array.isArray(r)||(r=[String(r)]);var s=a.returnDetails!==void 0?a.returnDetails:this.options.returnDetails,u=a.keySeparator!==void 0?a.keySeparator:this.options.keySeparator,d=this.extractFromKey(r[r.length-1],a),c=d.key,l=d.namespaces,b=l[l.length-1],v=a.lng||this.language,m=a.appendNamespaceToCIMode||this.options.appendNamespaceToCIMode;if(v&&v.toLowerCase()==="cimode"){if(m){var x=a.nsSeparator||this.options.nsSeparator;return s?(g.res="".concat(b).concat(x).concat(c),g):"".concat(b).concat(x).concat(c)}return s?(g.res=c,g):c}var g=this.resolve(r,a),p=g&&g.res,w=g&&g.usedKey||c,S=g&&g.exactUsedKey||c,E=Object.prototype.toString.apply(p),N=["[object Number]","[object Function]","[object RegExp]"],Q=a.joinArrays!==void 0?a.joinArrays:this.options.joinArrays,de=!this.i18nFormat||this.i18nFormat.handleAsObject,pe=typeof p!="string"&&typeof p!="boolean"&&typeof p!="number";if(de&&p&&pe&&N.indexOf(E)<0&&!(typeof Q=="string"&&E==="[object Array]")){if(!a.returnObjects&&!this.options.returnObjects){this.options.returnedObjectHandler||this.logger.warn("accessing an object - but returnObjects options is not enabled!");var ne=this.options.returnedObjectHandler?this.options.returnedObjectHandler(w,p,F(F({},a),{},{ns:l})):"key '".concat(c," (").concat(this.language,")' returned an object instead of string.");return s?(g.res=ne,g):ne}if(u){var Re=E==="[object Array]",me=Re?[]:{},Ke=Re?S:w;for(var re in p)if(Object.prototype.hasOwnProperty.call(p,re)){var We="".concat(Ke).concat(u).concat(re);me[re]=this.translate(We,F(F({},a),{joinArrays:!1,ns:l})),me[re]===We&&(me[re]=p[re])}p=me}}else if(de&&typeof Q=="string"&&E==="[object Array]")p=p.join(Q),p&&(p=this.extendTranslation(p,r,a,i));else{var ve=!1,V=!1,Ee=a.count!==void 0&&typeof a.count!="string",Fe=t.hasDefaultValue(a),h=Ee?this.pluralResolver.getSuffix(v,a.count,a):"",y=a["defaultValue".concat(h)]||a.defaultValue;!this.isValidLookup(p)&&Fe&&(ve=!0,p=y),this.isValidLookup(p)||(V=!0,p=c);var k=a.missingKeyNoValueFallbackToKey||this.options.missingKeyNoValueFallbackToKey,$=k&&V?void 0:p,O=Fe&&y!==p&&this.options.updateMissing;if(V||ve||O){if(this.logger.log(O?"updateKey":"missingKey",v,b,c,O?y:p),u){var L=this.resolve(c,F(F({},a),{},{keySeparator:!1}));L&&L.res&&this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.")}var H=[],ye=this.languageUtils.getFallbackCodes(this.options.fallbackLng,a.lng||this.language);if(this.options.saveMissingTo==="fallback"&&ye&&ye[0])for(var Te=0;Te<ye.length;Te++)H.push(ye[Te]);else this.options.saveMissingTo==="all"?H=this.languageUtils.toResolveHierarchy(a.lng||this.language):H.push(a.lng||this.language);var Qt=function(xe,dt,Zt){var eo=Fe&&Zt!==p?Zt:$;f.options.missingKeyHandler?f.options.missingKeyHandler(xe,b,dt,eo,O,a):f.backendConnector&&f.backendConnector.saveMissing&&f.backendConnector.saveMissing(xe,b,dt,eo,O,a),f.emit("missingKey",xe,b,dt,p)};this.options.saveMissing&&(this.options.saveMissingPlurals&&Ee?H.forEach(function(lt){f.pluralResolver.getSuffixes(lt,a).forEach(function(xe){Qt([lt],c+xe,a["defaultValue".concat(xe)]||y)})}):Qt(H,c,y))}p=this.extendTranslation(p,r,a,g,i),V&&p===c&&this.options.appendNamespaceToMissingKey&&(p="".concat(b,":").concat(c)),(V||ve)&&this.options.parseMissingKeyHandler&&(this.options.compatibilityAPI!=="v1"?p=this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey?"".concat(b,":").concat(c):c,ve?p:void 0):p=this.options.parseMissingKeyHandler(p))}return s?(g.res=p,g):p}},{key:"extendTranslation",value:function(r,a,i,f,s){var u=this;if(this.i18nFormat&&this.i18nFormat.parse)r=this.i18nFormat.parse(r,F(F({},this.options.interpolation.defaultVariables),i),f.usedLng,f.usedNS,f.usedKey,{resolved:f});else if(!i.skipInterpolation){i.interpolation&&this.interpolator.init(F(F({},i),{interpolation:F(F({},this.options.interpolation),i.interpolation)}));var d=typeof r=="string"&&(i&&i.interpolation&&i.interpolation.skipOnVariables!==void 0?i.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables),c;if(d){var l=r.match(this.interpolator.nestingRegexp);c=l&&l.length}var b=i.replace&&typeof i.replace!="string"?i.replace:i;if(this.options.interpolation.defaultVariables&&(b=F(F({},this.options.interpolation.defaultVariables),b)),r=this.interpolator.interpolate(r,b,i.lng||this.language,i),d){var v=r.match(this.interpolator.nestingRegexp),m=v&&v.length;c<m&&(i.nest=!1)}i.nest!==!1&&(r=this.interpolator.nest(r,function(){for(var p=arguments.length,w=new Array(p),S=0;S<p;S++)w[S]=arguments[S];return s&&s[0]===w[0]&&!i.context?(u.logger.warn("It seems you are nesting recursively key: ".concat(w[0]," in key: ").concat(a[0])),null):u.translate.apply(u,w.concat([a]))},i)),i.interpolation&&this.interpolator.reset()}var x=i.postProcess||this.options.postProcess,g=typeof x=="string"?[x]:x;return r!=null&&g&&g.length&&i.applyPostProcessor!==!1&&(r=Qo.handle(g,r,a,this.options&&this.options.postProcessPassResolved?F({i18nResolved:f},i):i,this)),r}},{key:"resolve",value:function(r){var a=this,i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},f,s,u,d,c;return typeof r=="string"&&(r=[r]),r.forEach(function(l){if(!a.isValidLookup(f)){var b=a.extractFromKey(l,i),v=b.key;s=v;var m=b.namespaces;a.options.fallbackNS&&(m=m.concat(a.options.fallbackNS));var x=i.count!==void 0&&typeof i.count!="string",g=x&&!i.ordinal&&i.count===0&&a.pluralResolver.shouldUseIntlApi(),p=i.context!==void 0&&(typeof i.context=="string"||typeof i.context=="number")&&i.context!=="",w=i.lngs?i.lngs:a.languageUtils.toResolveHierarchy(i.lng||a.language,i.fallbackLng);m.forEach(function(S){a.isValidLookup(f)||(c=S,!_o["".concat(w[0],"-").concat(S)]&&a.utils&&a.utils.hasLoadedNamespace&&!a.utils.hasLoadedNamespace(c)&&(_o["".concat(w[0],"-").concat(S)]=!0,a.logger.warn('key "'.concat(s,'" for languages "').concat(w.join(", "),`" won't get resolved as namespace "`).concat(c,'" was not yet loaded'),"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")),w.forEach(function(E){if(!a.isValidLookup(f)){d=E;var N=[v];if(a.i18nFormat&&a.i18nFormat.addLookupKeys)a.i18nFormat.addLookupKeys(N,v,E,S,i);else{var Q;x&&(Q=a.pluralResolver.getSuffix(E,i.count,i));var de="".concat(a.options.pluralSeparator,"zero");if(x&&(N.push(v+Q),g&&N.push(v+de)),p){var pe="".concat(v).concat(a.options.contextSeparator).concat(i.context);N.push(pe),x&&(N.push(pe+Q),g&&N.push(pe+de))}}for(var ne;ne=N.pop();)a.isValidLookup(f)||(u=ne,f=a.getResource(E,S,ne,i))}}))})}}),{res:f,usedKey:s,exactUsedKey:u,usedLng:d,usedNS:c}}},{key:"isValidLookup",value:function(r){return r!==void 0&&!(!this.options.returnNull&&r===null)&&!(!this.options.returnEmptyString&&r==="")}},{key:"getResource",value:function(r,a,i){var f=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};return this.i18nFormat&&this.i18nFormat.getResource?this.i18nFormat.getResource(r,a,i,f):this.resourceStore.getResource(r,a,i,f)}}],[{key:"hasDefaultValue",value:function(r){var a="defaultValue";for(var i in r)if(Object.prototype.hasOwnProperty.call(r,i)&&a===i.substring(0,a.length)&&r[i]!==void 0)return!0;return!1}}]),t}(ue);function yt(o){return o.charAt(0).toUpperCase()+o.slice(1)}var nr=function(){function o(e){Y(this,o),this.options=e,this.supportedLngs=this.options.supportedLngs||!1,this.logger=q.create("languageUtils")}return X(o,[{key:"getScriptPartFromCode",value:function(t){if(!t||t.indexOf("-")<0)return null;var n=t.split("-");return n.length===2||(n.pop(),n[n.length-1].toLowerCase()==="x")?null:this.formatLanguageCode(n.join("-"))}},{key:"getLanguagePartFromCode",value:function(t){if(!t||t.indexOf("-")<0)return t;var n=t.split("-");return this.formatLanguageCode(n[0])}},{key:"formatLanguageCode",value:function(t){if(typeof t=="string"&&t.indexOf("-")>-1){var n=["hans","hant","latn","cyrl","cans","mong","arab"],r=t.split("-");return this.options.lowerCaseLng?r=r.map(function(a){return a.toLowerCase()}):r.length===2?(r[0]=r[0].toLowerCase(),r[1]=r[1].toUpperCase(),n.indexOf(r[1].toLowerCase())>-1&&(r[1]=yt(r[1].toLowerCase()))):r.length===3&&(r[0]=r[0].toLowerCase(),r[1].length===2&&(r[1]=r[1].toUpperCase()),r[0]!=="sgn"&&r[2].length===2&&(r[2]=r[2].toUpperCase()),n.indexOf(r[1].toLowerCase())>-1&&(r[1]=yt(r[1].toLowerCase())),n.indexOf(r[2].toLowerCase())>-1&&(r[2]=yt(r[2].toLowerCase()))),r.join("-")}return this.options.cleanCode||this.options.lowerCaseLng?t.toLowerCase():t}},{key:"isSupportedCode",value:function(t){return(this.options.load==="languageOnly"||this.options.nonExplicitSupportedLngs)&&(t=this.getLanguagePartFromCode(t)),!this.supportedLngs||!this.supportedLngs.length||this.supportedLngs.indexOf(t)>-1}},{key:"getBestMatchFromCodes",value:function(t){var n=this;if(!t)return null;var r;return t.forEach(function(a){if(!r){var i=n.formatLanguageCode(a);(!n.options.supportedLngs||n.isSupportedCode(i))&&(r=i)}}),!r&&this.options.supportedLngs&&t.forEach(function(a){if(!r){var i=n.getLanguagePartFromCode(a);if(n.isSupportedCode(i))return r=i;r=n.options.supportedLngs.find(function(f){if(f.indexOf(i)===0)return f})}}),r||(r=this.getFallbackCodes(this.options.fallbackLng)[0]),r}},{key:"getFallbackCodes",value:function(t,n){if(!t)return[];if(typeof t=="function"&&(t=t(n)),typeof t=="string"&&(t=[t]),Object.prototype.toString.apply(t)==="[object Array]")return t;if(!n)return t.default||[];var r=t[n];return r||(r=t[this.getScriptPartFromCode(n)]),r||(r=t[this.formatLanguageCode(n)]),r||(r=t[this.getLanguagePartFromCode(n)]),r||(r=t.default),r||[]}},{key:"toResolveHierarchy",value:function(t,n){var r=this,a=this.getFallbackCodes(n||this.options.fallbackLng||[],t),i=[],f=function(u){!u||(r.isSupportedCode(u)?i.push(u):r.logger.warn("rejecting language code not found in supportedLngs: ".concat(u)))};return typeof t=="string"&&t.indexOf("-")>-1?(this.options.load!=="languageOnly"&&f(this.formatLanguageCode(t)),this.options.load!=="languageOnly"&&this.options.load!=="currentOnly"&&f(this.getScriptPartFromCode(t)),this.options.load!=="currentOnly"&&f(this.getLanguagePartFromCode(t))):typeof t=="string"&&f(this.formatLanguageCode(t)),a.forEach(function(s){i.indexOf(s)<0&&f(r.formatLanguageCode(s))}),i}}]),o}(),rr=[{lngs:["ach","ak","am","arn","br","fil","gun","ln","mfe","mg","mi","oc","pt","pt-BR","tg","tl","ti","tr","uz","wa"],nr:[1,2],fc:1},{lngs:["af","an","ast","az","bg","bn","ca","da","de","dev","el","en","eo","es","et","eu","fi","fo","fur","fy","gl","gu","ha","hi","hu","hy","ia","it","kk","kn","ku","lb","mai","ml","mn","mr","nah","nap","nb","ne","nl","nn","no","nso","pa","pap","pms","ps","pt-PT","rm","sco","se","si","so","son","sq","sv","sw","ta","te","tk","ur","yo"],nr:[1,2],fc:2},{lngs:["ay","bo","cgg","fa","ht","id","ja","jbo","ka","km","ko","ky","lo","ms","sah","su","th","tt","ug","vi","wo","zh"],nr:[1],fc:3},{lngs:["be","bs","cnr","dz","hr","ru","sr","uk"],nr:[1,2,5],fc:4},{lngs:["ar"],nr:[0,1,2,3,11,100],fc:5},{lngs:["cs","sk"],nr:[1,2,5],fc:6},{lngs:["csb","pl"],nr:[1,2,5],fc:7},{lngs:["cy"],nr:[1,2,3,8],fc:8},{lngs:["fr"],nr:[1,2],fc:9},{lngs:["ga"],nr:[1,2,3,7,11],fc:10},{lngs:["gd"],nr:[1,2,3,20],fc:11},{lngs:["is"],nr:[1,2],fc:12},{lngs:["jv"],nr:[0,1],fc:13},{lngs:["kw"],nr:[1,2,3,4],fc:14},{lngs:["lt"],nr:[1,2,10],fc:15},{lngs:["lv"],nr:[1,2,0],fc:16},{lngs:["mk"],nr:[1,2],fc:17},{lngs:["mnk"],nr:[0,1,2],fc:18},{lngs:["mt"],nr:[1,2,11,20],fc:19},{lngs:["or"],nr:[2,1],fc:2},{lngs:["ro"],nr:[1,2,20],fc:20},{lngs:["sl"],nr:[5,1,2,3],fc:21},{lngs:["he","iw"],nr:[1,2,20,21],fc:22}],ar={1:function(e){return Number(e>1)},2:function(e){return Number(e!=1)},3:function(e){return 0},4:function(e){return Number(e%10==1&&e%100!=11?0:e%10>=2&&e%10<=4&&(e%100<10||e%100>=20)?1:2)},5:function(e){return Number(e==0?0:e==1?1:e==2?2:e%100>=3&&e%100<=10?3:e%100>=11?4:5)},6:function(e){return Number(e==1?0:e>=2&&e<=4?1:2)},7:function(e){return Number(e==1?0:e%10>=2&&e%10<=4&&(e%100<10||e%100>=20)?1:2)},8:function(e){return Number(e==1?0:e==2?1:e!=8&&e!=11?2:3)},9:function(e){return Number(e>=2)},10:function(e){return Number(e==1?0:e==2?1:e<7?2:e<11?3:4)},11:function(e){return Number(e==1||e==11?0:e==2||e==12?1:e>2&&e<20?2:3)},12:function(e){return Number(e%10!=1||e%100==11)},13:function(e){return Number(e!==0)},14:function(e){return Number(e==1?0:e==2?1:e==3?2:3)},15:function(e){return Number(e%10==1&&e%100!=11?0:e%10>=2&&(e%100<10||e%100>=20)?1:2)},16:function(e){return Number(e%10==1&&e%100!=11?0:e!==0?1:2)},17:function(e){return Number(e==1||e%10==1&&e%100!=11?0:1)},18:function(e){return Number(e==0?0:e==1?1:2)},19:function(e){return Number(e==1?0:e==0||e%100>1&&e%100<11?1:e%100>10&&e%100<20?2:3)},20:function(e){return Number(e==1?0:e==0||e%100>0&&e%100<20?1:2)},21:function(e){return Number(e%100==1?1:e%100==2?2:e%100==3||e%100==4?3:0)},22:function(e){return Number(e==1?0:e==2?1:(e<0||e>10)&&e%10==0?2:3)}},ir=["v1","v2","v3"],Oo={zero:0,one:1,two:2,few:3,many:4,other:5};function fr(){var o={};return rr.forEach(function(e){e.lngs.forEach(function(t){o[t]={numbers:e.nr,plurals:ar[e.fc]}})}),o}var sr=function(){function o(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};Y(this,o),this.languageUtils=e,this.options=t,this.logger=q.create("pluralResolver"),(!this.options.compatibilityJSON||this.options.compatibilityJSON==="v4")&&(typeof Intl=="undefined"||!Intl.PluralRules)&&(this.options.compatibilityJSON="v3",this.logger.error("Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.")),this.rules=fr()}return X(o,[{key:"addRule",value:function(t,n){this.rules[t]=n}},{key:"getRule",value:function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(this.shouldUseIntlApi())try{return new Intl.PluralRules(t,{type:n.ordinal?"ordinal":"cardinal"})}catch{return}return this.rules[t]||this.rules[this.languageUtils.getLanguagePartFromCode(t)]}},{key:"needsPlural",value:function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=this.getRule(t,n);return this.shouldUseIntlApi()?r&&r.resolvedOptions().pluralCategories.length>1:r&&r.numbers.length>1}},{key:"getPluralFormsOfKey",value:function(t,n){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return this.getSuffixes(t,r).map(function(a){return"".concat(n).concat(a)})}},{key:"getSuffixes",value:function(t){var n=this,r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=this.getRule(t,r);return a?this.shouldUseIntlApi()?a.resolvedOptions().pluralCategories.sort(function(i,f){return Oo[i]-Oo[f]}).map(function(i){return"".concat(n.options.prepend).concat(i)}):a.numbers.map(function(i){return n.getSuffix(t,i,r)}):[]}},{key:"getSuffix",value:function(t,n){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},a=this.getRule(t,r);return a?this.shouldUseIntlApi()?"".concat(this.options.prepend).concat(a.select(n)):this.getSuffixRetroCompatible(a,n):(this.logger.warn("no plural rule found for: ".concat(t)),"")}},{key:"getSuffixRetroCompatible",value:function(t,n){var r=this,a=t.noAbs?t.plurals(n):t.plurals(Math.abs(n)),i=t.numbers[a];this.options.simplifyPluralSuffix&&t.numbers.length===2&&t.numbers[0]===1&&(i===2?i="plural":i===1&&(i=""));var f=function(){return r.options.prepend&&i.toString()?r.options.prepend+i.toString():i.toString()};return this.options.compatibilityJSON==="v1"?i===1?"":typeof i=="number"?"_plural_".concat(i.toString()):f():this.options.compatibilityJSON==="v2"||this.options.simplifyPluralSuffix&&t.numbers.length===2&&t.numbers[0]===1?f():this.options.prepend&&a.toString()?this.options.prepend+a.toString():a.toString()}},{key:"shouldUseIntlApi",value:function(){return!ir.includes(this.options.compatibilityJSON)}}]),o}();function $o(o,e){var t=Object.keys(o);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(o);e&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(o,r).enumerable})),t.push.apply(t,n)}return t}function I(o){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?$o(Object(t),!0).forEach(function(n){le(o,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(o,Object.getOwnPropertyDescriptors(t)):$o(Object(t)).forEach(function(n){Object.defineProperty(o,n,Object.getOwnPropertyDescriptor(t,n))})}return o}var cr=function(){function o(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Y(this,o),this.logger=q.create("interpolator"),this.options=e,this.format=e.interpolation&&e.interpolation.format||function(t){return t},this.init(e)}return X(o,[{key:"init",value:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};t.interpolation||(t.interpolation={escapeValue:!0});var n=t.interpolation;this.escape=n.escape!==void 0?n.escape:Jn,this.escapeValue=n.escapeValue!==void 0?n.escapeValue:!0,this.useRawValueToEscape=n.useRawValueToEscape!==void 0?n.useRawValueToEscape:!1,this.prefix=n.prefix?we(n.prefix):n.prefixEscaped||"{{",this.suffix=n.suffix?we(n.suffix):n.suffixEscaped||"}}",this.formatSeparator=n.formatSeparator?n.formatSeparator:n.formatSeparator||",",this.unescapePrefix=n.unescapeSuffix?"":n.unescapePrefix||"-",this.unescapeSuffix=this.unescapePrefix?"":n.unescapeSuffix||"",this.nestingPrefix=n.nestingPrefix?we(n.nestingPrefix):n.nestingPrefixEscaped||we("$t("),this.nestingSuffix=n.nestingSuffix?we(n.nestingSuffix):n.nestingSuffixEscaped||we(")"),this.nestingOptionsSeparator=n.nestingOptionsSeparator?n.nestingOptionsSeparator:n.nestingOptionsSeparator||",",this.maxReplaces=n.maxReplaces?n.maxReplaces:1e3,this.alwaysFormat=n.alwaysFormat!==void 0?n.alwaysFormat:!1,this.resetRegExp()}},{key:"reset",value:function(){this.options&&this.init(this.options)}},{key:"resetRegExp",value:function(){var t="".concat(this.prefix,"(.+?)").concat(this.suffix);this.regexp=new RegExp(t,"g");var n="".concat(this.prefix).concat(this.unescapePrefix,"(.+?)").concat(this.unescapeSuffix).concat(this.suffix);this.regexpUnescape=new RegExp(n,"g");var r="".concat(this.nestingPrefix,"(.+?)").concat(this.nestingSuffix);this.nestingRegexp=new RegExp(r,"g")}},{key:"interpolate",value:function(t,n,r,a){var i=this,f,s,u,d=this.options&&this.options.interpolation&&this.options.interpolation.defaultVariables||{};function c(x){return x.replace(/\$/g,"$$$$")}var l=function(g){if(g.indexOf(i.formatSeparator)<0){var p=xo(n,d,g);return i.alwaysFormat?i.format(p,void 0,r,I(I(I({},a),n),{},{interpolationkey:g})):p}var w=g.split(i.formatSeparator),S=w.shift().trim(),E=w.join(i.formatSeparator).trim();return i.format(xo(n,d,S),E,r,I(I(I({},a),n),{},{interpolationkey:S}))};this.resetRegExp();var b=a&&a.missingInterpolationHandler||this.options.missingInterpolationHandler,v=a&&a.interpolation&&a.interpolation.skipOnVariables!==void 0?a.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables,m=[{regex:this.regexpUnescape,safeValue:function(g){return c(g)}},{regex:this.regexp,safeValue:function(g){return i.escapeValue?c(i.escape(g)):c(g)}}];return m.forEach(function(x){for(u=0;f=x.regex.exec(t);){var g=f[1].trim();if(s=l(g),s===void 0)if(typeof b=="function"){var p=b(t,f,a);s=typeof p=="string"?p:""}else if(a&&a.hasOwnProperty(g))s="";else if(v){s=f[0];continue}else i.logger.warn("missed to pass in variable ".concat(g," for interpolating ").concat(t)),s="";else typeof s!="string"&&!i.useRawValueToEscape&&(s=vo(s));var w=x.safeValue(s);if(t=t.replace(f[0],w),v?(x.regex.lastIndex+=s.length,x.regex.lastIndex-=f[0].length):x.regex.lastIndex=0,u++,u>=i.maxReplaces)break}}),t}},{key:"nest",value:function(t,n){var r=this,a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},i,f,s=I({},a);s.applyPostProcessor=!1,delete s.defaultValue;function u(b,v){var m=this.nestingOptionsSeparator;if(b.indexOf(m)<0)return b;var x=b.split(new RegExp("".concat(m,"[ ]*{"))),g="{".concat(x[1]);b=x[0],g=this.interpolate(g,s),g=g.replace(/'/g,'"');try{s=JSON.parse(g),v&&(s=I(I({},v),s))}catch(p){return this.logger.warn("failed parsing options string in nesting for key ".concat(b),p),"".concat(b).concat(m).concat(g)}return delete s.defaultValue,b}for(;i=this.nestingRegexp.exec(t);){var d=[],c=!1;if(i[0].indexOf(this.formatSeparator)!==-1&&!/{.*}/.test(i[1])){var l=i[1].split(this.formatSeparator).map(function(b){return b.trim()});i[1]=l.shift(),d=l,c=!0}if(f=n(u.call(this,i[1].trim(),s),s),f&&i[0]===t&&typeof f!="string")return f;typeof f!="string"&&(f=vo(f)),f||(this.logger.warn("missed to resolve ".concat(i[1]," for nesting ").concat(t)),f=""),c&&(f=d.reduce(function(b,v){return r.format(b,v,a.lng,I(I({},a),{},{interpolationkey:i[1].trim()}))},f.trim())),t=t.replace(i[0],f),this.regexp.lastIndex=0}return t}}]),o}();function Co(o,e){var t=Object.keys(o);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(o);e&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(o,r).enumerable})),t.push.apply(t,n)}return t}function ae(o){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?Co(Object(t),!0).forEach(function(n){le(o,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(o,Object.getOwnPropertyDescriptors(t)):Co(Object(t)).forEach(function(n){Object.defineProperty(o,n,Object.getOwnPropertyDescriptor(t,n))})}return o}function ur(o){var e=o.toLowerCase().trim(),t={};if(o.indexOf("(")>-1){var n=o.split("(");e=n[0].toLowerCase().trim();var r=n[1].substring(0,n[1].length-1);if(e==="currency"&&r.indexOf(":")<0)t.currency||(t.currency=r.trim());else if(e==="relativetime"&&r.indexOf(":")<0)t.range||(t.range=r.trim());else{var a=r.split(";");a.forEach(function(i){if(!!i){var f=i.split(":"),s=Vn(f),u=s[0],d=s.slice(1),c=d.join(":").trim().replace(/^'+|'+$/g,"");t[u.trim()]||(t[u.trim()]=c),c==="false"&&(t[u.trim()]=!1),c==="true"&&(t[u.trim()]=!0),isNaN(c)||(t[u.trim()]=parseInt(c,10))}})}}return{formatName:e,formatOptions:t}}var lr=function(){function o(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Y(this,o),this.logger=q.create("formatter"),this.options=e,this.formats={number:function(n,r,a){return new Intl.NumberFormat(r,a).format(n)},currency:function(n,r,a){return new Intl.NumberFormat(r,ae(ae({},a),{},{style:"currency"})).format(n)},datetime:function(n,r,a){return new Intl.DateTimeFormat(r,ae({},a)).format(n)},relativetime:function(n,r,a){return new Intl.RelativeTimeFormat(r,ae({},a)).format(n,a.range||"day")},list:function(n,r,a){return new Intl.ListFormat(r,ae({},a)).format(n)}},this.init(e)}return X(o,[{key:"init",value:function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{interpolation:{}},r=n.interpolation;this.formatSeparator=r.formatSeparator?r.formatSeparator:r.formatSeparator||","}},{key:"add",value:function(t,n){this.formats[t.toLowerCase().trim()]=n}},{key:"format",value:function(t,n,r,a){var i=this,f=n.split(this.formatSeparator),s=f.reduce(function(u,d){var c=ur(d),l=c.formatName,b=c.formatOptions;if(i.formats[l]){var v=u;try{var m=a&&a.formatParams&&a.formatParams[a.interpolationkey]||{},x=m.locale||m.lng||a.locale||a.lng||r;v=i.formats[l](u,x,ae(ae(ae({},b),a),m))}catch(g){i.logger.warn(g)}return v}else i.logger.warn("there was no format function for ".concat(l));return u},t);return s}}]),o}();function Ao(o,e){var t=Object.keys(o);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(o);e&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(o,r).enumerable})),t.push.apply(t,n)}return t}function Po(o){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?Ao(Object(t),!0).forEach(function(n){le(o,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(o,Object.getOwnPropertyDescriptors(t)):Ao(Object(t)).forEach(function(n){Object.defineProperty(o,n,Object.getOwnPropertyDescriptor(t,n))})}return o}function dr(o){var e=pr();return function(){var n=J(o),r;if(e){var a=J(this).constructor;r=Reflect.construct(n,arguments,a)}else r=n.apply(this,arguments);return qe(this,r)}}function pr(){if(typeof Reflect=="undefined"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function br(o,e){o.pending[e]!==void 0&&(delete o.pending[e],o.pendingCount--)}var hr=function(o){st(t,o);var e=dr(t);function t(n,r,a){var i,f=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};return Y(this,t),i=e.call(this),ct&&ue.call(ce(i)),i.backend=n,i.store=r,i.services=a,i.languageUtils=a.languageUtils,i.options=f,i.logger=q.create("backendConnector"),i.waitingReads=[],i.maxParallelReads=f.maxParallelReads||10,i.readingCalls=0,i.state={},i.queue=[],i.backend&&i.backend.init&&i.backend.init(a,f.backend,f),i}return X(t,[{key:"queueLoad",value:function(r,a,i,f){var s=this,u={},d={},c={},l={};return r.forEach(function(b){var v=!0;a.forEach(function(m){var x="".concat(b,"|").concat(m);!i.reload&&s.store.hasResourceBundle(b,m)?s.state[x]=2:s.state[x]<0||(s.state[x]===1?d[x]===void 0&&(d[x]=!0):(s.state[x]=1,v=!1,d[x]===void 0&&(d[x]=!0),u[x]===void 0&&(u[x]=!0),l[m]===void 0&&(l[m]=!0)))}),v||(c[b]=!0)}),(Object.keys(u).length||Object.keys(d).length)&&this.queue.push({pending:d,pendingCount:Object.keys(d).length,loaded:{},errors:[],callback:f}),{toLoad:Object.keys(u),pending:Object.keys(d),toLoadLanguages:Object.keys(c),toLoadNamespaces:Object.keys(l)}}},{key:"loaded",value:function(r,a,i){var f=r.split("|"),s=f[0],u=f[1];a&&this.emit("failedLoading",s,u,a),i&&this.store.addResourceBundle(s,u,i),this.state[r]=a?-1:2;var d={};this.queue.forEach(function(c){Kn(c.loaded,[s],u),br(c,r),a&&c.errors.push(a),c.pendingCount===0&&!c.done&&(Object.keys(c.loaded).forEach(function(l){d[l]||(d[l]={});var b=c.loaded[l];b.length&&b.forEach(function(v){d[l][v]===void 0&&(d[l][v]=!0)})}),c.done=!0,c.errors.length?c.callback(c.errors):c.callback())}),this.emit("loaded",d),this.queue=this.queue.filter(function(c){return!c.done})}},{key:"read",value:function(r,a,i){var f=this,s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:0,u=arguments.length>4&&arguments[4]!==void 0?arguments[4]:350,d=arguments.length>5?arguments[5]:void 0;if(!r.length)return d(null,{});if(this.readingCalls>=this.maxParallelReads){this.waitingReads.push({lng:r,ns:a,fcName:i,tried:s,wait:u,callback:d});return}return this.readingCalls++,this.backend[i](r,a,function(c,l){if(c&&l&&s<5){setTimeout(function(){f.read.call(f,r,a,i,s+1,u*2,d)},u);return}if(f.readingCalls--,f.waitingReads.length>0){var b=f.waitingReads.shift();f.read(b.lng,b.ns,b.fcName,b.tried,b.wait,b.callback)}d(c,l)})}},{key:"prepareLoading",value:function(r,a){var i=this,f=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},s=arguments.length>3?arguments[3]:void 0;if(!this.backend)return this.logger.warn("No backend was added via i18next.use. Will not load resources."),s&&s();typeof r=="string"&&(r=this.languageUtils.toResolveHierarchy(r)),typeof a=="string"&&(a=[a]);var u=this.queueLoad(r,a,f,s);if(!u.toLoad.length)return u.pending.length||s(),null;u.toLoad.forEach(function(d){i.loadOne(d)})}},{key:"load",value:function(r,a,i){this.prepareLoading(r,a,{},i)}},{key:"reload",value:function(r,a,i){this.prepareLoading(r,a,{reload:!0},i)}},{key:"loadOne",value:function(r){var a=this,i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"",f=r.split("|"),s=f[0],u=f[1];this.read(s,u,"read",void 0,void 0,function(d,c){d&&a.logger.warn("".concat(i,"loading namespace ").concat(u," for language ").concat(s," failed"),d),!d&&c&&a.logger.log("".concat(i,"loaded namespace ").concat(u," for language ").concat(s),c),a.loaded(r,d,c)})}},{key:"saveMissing",value:function(r,a,i,f,s){var u=arguments.length>5&&arguments[5]!==void 0?arguments[5]:{};if(this.services.utils&&this.services.utils.hasLoadedNamespace&&!this.services.utils.hasLoadedNamespace(a)){this.logger.warn('did not save key "'.concat(i,'" as the namespace "').concat(a,'" was not yet loaded'),"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");return}i==null||i===""||(this.backend&&this.backend.create&&this.backend.create(r,a,i,f,null,Po(Po({},u),{},{isUpdate:s})),!(!r||!r[0])&&this.store.addResource(r[0],a,i,f))}}]),t}(ue);function gr(){return{debug:!1,initImmediate:!0,ns:["translation"],defaultNS:["translation"],fallbackLng:["dev"],fallbackNS:!1,supportedLngs:!1,nonExplicitSupportedLngs:!1,load:"all",preload:!1,simplifyPluralSuffix:!0,keySeparator:".",nsSeparator:":",pluralSeparator:"_",contextSeparator:"_",partialBundledLanguages:!1,saveMissing:!1,updateMissing:!1,saveMissingTo:"fallback",saveMissingPlurals:!0,missingKeyHandler:!1,missingInterpolationHandler:!1,postProcess:!1,postProcessPassResolved:!1,returnNull:!0,returnEmptyString:!0,returnObjects:!1,joinArrays:!1,returnedObjectHandler:!1,parseMissingKeyHandler:!1,appendNamespaceToMissingKey:!1,appendNamespaceToCIMode:!1,overloadTranslationOptionHandler:function(e){var t={};if(se(e[1])==="object"&&(t=e[1]),typeof e[1]=="string"&&(t.defaultValue=e[1]),typeof e[2]=="string"&&(t.tDescription=e[2]),se(e[2])==="object"||se(e[3])==="object"){var n=e[3]||e[2];Object.keys(n).forEach(function(r){t[r]=n[r]})}return t},interpolation:{escapeValue:!0,format:function(e,t,n,r){return e},prefix:"{{",suffix:"}}",formatSeparator:",",unescapePrefix:"-",nestingPrefix:"$t(",nestingSuffix:")",nestingOptionsSeparator:",",maxReplaces:1e3,skipOnVariables:!0}}}function Ro(o){return typeof o.ns=="string"&&(o.ns=[o.ns]),typeof o.fallbackLng=="string"&&(o.fallbackLng=[o.fallbackLng]),typeof o.fallbackNS=="string"&&(o.fallbackNS=[o.fallbackNS]),o.supportedLngs&&o.supportedLngs.indexOf("cimode")<0&&(o.supportedLngs=o.supportedLngs.concat(["cimode"])),o}function Eo(o,e){var t=Object.keys(o);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(o);e&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(o,r).enumerable})),t.push.apply(t,n)}return t}function z(o){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?Eo(Object(t),!0).forEach(function(n){le(o,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(o,Object.getOwnPropertyDescriptors(t)):Eo(Object(t)).forEach(function(n){Object.defineProperty(o,n,Object.getOwnPropertyDescriptor(t,n))})}return o}function mr(o){var e=vr();return function(){var n=J(o),r;if(e){var a=J(this).constructor;r=Reflect.construct(n,arguments,a)}else r=n.apply(this,arguments);return qe(this,r)}}function vr(){if(typeof Reflect=="undefined"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Ye(){}function yr(o){var e=Object.getOwnPropertyNames(Object.getPrototypeOf(o));e.forEach(function(t){typeof o[t]=="function"&&(o[t]=o[t].bind(o))})}var tt=function(o){st(t,o);var e=mr(t);function t(){var n,r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},a=arguments.length>1?arguments[1]:void 0;if(Y(this,t),n=e.call(this),ct&&ue.call(ce(n)),n.options=Ro(r),n.services={},n.logger=q,n.modules={external:[]},yr(ce(n)),a&&!n.isInitialized&&!r.isClone){if(!n.options.initImmediate)return n.init(r,a),qe(n,ce(n));setTimeout(function(){n.init(r,a)},0)}return n}return X(t,[{key:"init",value:function(){var r=this,a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},i=arguments.length>1?arguments[1]:void 0;typeof a=="function"&&(i=a,a={}),!a.defaultNS&&a.ns&&(typeof a.ns=="string"?a.defaultNS=a.ns:a.ns.indexOf("translation")<0&&(a.defaultNS=a.ns[0]));var f=gr();this.options=z(z(z({},f),this.options),Ro(a)),this.options.compatibilityAPI!=="v1"&&(this.options.interpolation=z(z({},f.interpolation),this.options.interpolation)),a.keySeparator!==void 0&&(this.options.userDefinedKeySeparator=a.keySeparator),a.nsSeparator!==void 0&&(this.options.userDefinedNsSeparator=a.nsSeparator);function s(g){return g?typeof g=="function"?new g:g:null}if(!this.options.isClone){this.modules.logger?q.init(s(this.modules.logger),this.options):q.init(null,this.options);var u;this.modules.formatter?u=this.modules.formatter:typeof Intl!="undefined"&&(u=lr);var d=new nr(this.options);this.store=new er(this.options.resources,this.options);var c=this.services;c.logger=q,c.resourceStore=this.store,c.languageUtils=d,c.pluralResolver=new sr(d,{prepend:this.options.pluralSeparator,compatibilityJSON:this.options.compatibilityJSON,simplifyPluralSuffix:this.options.simplifyPluralSuffix}),u&&(!this.options.interpolation.format||this.options.interpolation.format===f.interpolation.format)&&(c.formatter=s(u),c.formatter.init(c,this.options),this.options.interpolation.format=c.formatter.format.bind(c.formatter)),c.interpolator=new cr(this.options),c.utils={hasLoadedNamespace:this.hasLoadedNamespace.bind(this)},c.backendConnector=new hr(s(this.modules.backend),c.resourceStore,c,this.options),c.backendConnector.on("*",function(g){for(var p=arguments.length,w=new Array(p>1?p-1:0),S=1;S<p;S++)w[S-1]=arguments[S];r.emit.apply(r,[g].concat(w))}),this.modules.languageDetector&&(c.languageDetector=s(this.modules.languageDetector),c.languageDetector.init(c,this.options.detection,this.options)),this.modules.i18nFormat&&(c.i18nFormat=s(this.modules.i18nFormat),c.i18nFormat.init&&c.i18nFormat.init(this)),this.translator=new ko(this.services,this.options),this.translator.on("*",function(g){for(var p=arguments.length,w=new Array(p>1?p-1:0),S=1;S<p;S++)w[S-1]=arguments[S];r.emit.apply(r,[g].concat(w))}),this.modules.external.forEach(function(g){g.init&&g.init(r)})}if(this.format=this.options.interpolation.format,i||(i=Ye),this.options.fallbackLng&&!this.services.languageDetector&&!this.options.lng){var l=this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);l.length>0&&l[0]!=="dev"&&(this.options.lng=l[0])}!this.services.languageDetector&&!this.options.lng&&this.logger.warn("init: no languageDetector is used and no lng is defined");var b=["getResource","hasResourceBundle","getResourceBundle","getDataByLanguage"];b.forEach(function(g){r[g]=function(){var p;return(p=r.store)[g].apply(p,arguments)}});var v=["addResource","addResources","addResourceBundle","removeResourceBundle"];v.forEach(function(g){r[g]=function(){var p;return(p=r.store)[g].apply(p,arguments),r}});var m=Ne(),x=function(){var p=function(S,E){r.isInitialized&&!r.initializedStoreOnce&&r.logger.warn("init: i18next is already initialized. You should call init just once!"),r.isInitialized=!0,r.options.isClone||r.logger.log("initialized",r.options),r.emit("initialized",r.options),m.resolve(E),i(S,E)};if(r.languages&&r.options.compatibilityAPI!=="v1"&&!r.isInitialized)return p(null,r.t.bind(r));r.changeLanguage(r.options.lng,p)};return this.options.resources||!this.options.initImmediate?x():setTimeout(x,0),m}},{key:"loadResources",value:function(r){var a=this,i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:Ye,f=i,s=typeof r=="string"?r:this.language;if(typeof r=="function"&&(f=r),!this.options.resources||this.options.partialBundledLanguages){if(s&&s.toLowerCase()==="cimode")return f();var u=[],d=function(b){if(!!b){var v=a.services.languageUtils.toResolveHierarchy(b);v.forEach(function(m){u.indexOf(m)<0&&u.push(m)})}};if(s)d(s);else{var c=this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);c.forEach(function(l){return d(l)})}this.options.preload&&this.options.preload.forEach(function(l){return d(l)}),this.services.backendConnector.load(u,this.options.ns,function(l){!l&&!a.resolvedLanguage&&a.language&&a.setResolvedLanguage(a.language),f(l)})}else f(null)}},{key:"reloadResources",value:function(r,a,i){var f=Ne();return r||(r=this.languages),a||(a=this.options.ns),i||(i=Ye),this.services.backendConnector.reload(r,a,function(s){f.resolve(),i(s)}),f}},{key:"use",value:function(r){if(!r)throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");if(!r.type)throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");return r.type==="backend"&&(this.modules.backend=r),(r.type==="logger"||r.log&&r.warn&&r.error)&&(this.modules.logger=r),r.type==="languageDetector"&&(this.modules.languageDetector=r),r.type==="i18nFormat"&&(this.modules.i18nFormat=r),r.type==="postProcessor"&&Qo.addPostProcessor(r),r.type==="formatter"&&(this.modules.formatter=r),r.type==="3rdParty"&&this.modules.external.push(r),this}},{key:"setResolvedLanguage",value:function(r){if(!(!r||!this.languages)&&!(["cimode","dev"].indexOf(r)>-1))for(var a=0;a<this.languages.length;a++){var i=this.languages[a];if(!(["cimode","dev"].indexOf(i)>-1)&&this.store.hasLanguageSomeTranslations(i)){this.resolvedLanguage=i;break}}}},{key:"changeLanguage",value:function(r,a){var i=this;this.isLanguageChangingTo=r;var f=Ne();this.emit("languageChanging",r);var s=function(l){i.language=l,i.languages=i.services.languageUtils.toResolveHierarchy(l),i.resolvedLanguage=void 0,i.setResolvedLanguage(l)},u=function(l,b){b?(s(b),i.translator.changeLanguage(b),i.isLanguageChangingTo=void 0,i.emit("languageChanged",b),i.logger.log("languageChanged",b)):i.isLanguageChangingTo=void 0,f.resolve(function(){return i.t.apply(i,arguments)}),a&&a(l,function(){return i.t.apply(i,arguments)})},d=function(l){!r&&!l&&i.services.languageDetector&&(l=[]);var b=typeof l=="string"?l:i.services.languageUtils.getBestMatchFromCodes(l);b&&(i.language||s(b),i.translator.language||i.translator.changeLanguage(b),i.services.languageDetector&&i.services.languageDetector.cacheUserLanguage(b)),i.loadResources(b,function(v){u(v,b)})};return!r&&this.services.languageDetector&&!this.services.languageDetector.async?d(this.services.languageDetector.detect()):!r&&this.services.languageDetector&&this.services.languageDetector.async?this.services.languageDetector.detect(d):d(r),f}},{key:"getFixedT",value:function(r,a,i){var f=this,s=function u(d,c){var l;if(se(c)!=="object"){for(var b=arguments.length,v=new Array(b>2?b-2:0),m=2;m<b;m++)v[m-2]=arguments[m];l=f.options.overloadTranslationOptionHandler([d,c].concat(v))}else l=z({},c);l.lng=l.lng||u.lng,l.lngs=l.lngs||u.lngs,l.ns=l.ns||u.ns,l.keyPrefix=l.keyPrefix||i||u.keyPrefix;var x=f.options.keySeparator||".",g=l.keyPrefix?"".concat(l.keyPrefix).concat(x).concat(d):d;return f.t(g,l)};return typeof r=="string"?s.lng=r:s.lngs=r,s.ns=a,s.keyPrefix=i,s}},{key:"t",value:function(){var r;return this.translator&&(r=this.translator).translate.apply(r,arguments)}},{key:"exists",value:function(){var r;return this.translator&&(r=this.translator).exists.apply(r,arguments)}},{key:"setDefaultNamespace",value:function(r){this.options.defaultNS=r}},{key:"hasLoadedNamespace",value:function(r){var a=this,i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(!this.isInitialized)return this.logger.warn("hasLoadedNamespace: i18next was not initialized",this.languages),!1;if(!this.languages||!this.languages.length)return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty",this.languages),!1;var f=this.resolvedLanguage||this.languages[0],s=this.options?this.options.fallbackLng:!1,u=this.languages[this.languages.length-1];if(f.toLowerCase()==="cimode")return!0;var d=function(b,v){var m=a.services.backendConnector.state["".concat(b,"|").concat(v)];return m===-1||m===2};if(i.precheck){var c=i.precheck(this,d);if(c!==void 0)return c}return!!(this.hasResourceBundle(f,r)||!this.services.backendConnector.backend||this.options.resources&&!this.options.partialBundledLanguages||d(f,r)&&(!s||d(u,r)))}},{key:"loadNamespaces",value:function(r,a){var i=this,f=Ne();return this.options.ns?(typeof r=="string"&&(r=[r]),r.forEach(function(s){i.options.ns.indexOf(s)<0&&i.options.ns.push(s)}),this.loadResources(function(s){f.resolve(),a&&a(s)}),f):(a&&a(),Promise.resolve())}},{key:"loadLanguages",value:function(r,a){var i=Ne();typeof r=="string"&&(r=[r]);var f=this.options.preload||[],s=r.filter(function(u){return f.indexOf(u)<0});return s.length?(this.options.preload=f.concat(s),this.loadResources(function(u){i.resolve(),a&&a(u)}),i):(a&&a(),Promise.resolve())}},{key:"dir",value:function(r){if(r||(r=this.resolvedLanguage||(this.languages&&this.languages.length>0?this.languages[0]:this.language)),!r)return"rtl";var a=["ar","shu","sqr","ssh","xaa","yhd","yud","aao","abh","abv","acm","acq","acw","acx","acy","adf","ads","aeb","aec","afb","ajp","apc","apd","arb","arq","ars","ary","arz","auz","avl","ayh","ayl","ayn","ayp","bbz","pga","he","iw","ps","pbt","pbu","pst","prp","prd","ug","ur","ydd","yds","yih","ji","yi","hbo","men","xmn","fa","jpr","peo","pes","prs","dv","sam","ckb"];return a.indexOf(this.services.languageUtils.getLanguagePartFromCode(r))>-1||r.toLowerCase().indexOf("-arab")>1?"rtl":"ltr"}},{key:"cloneInstance",value:function(){var r=this,a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:Ye,f=z(z(z({},this.options),a),{isClone:!0}),s=new t(f),u=["store","services","language"];return u.forEach(function(d){s[d]=r[d]}),s.services=z({},this.services),s.services.utils={hasLoadedNamespace:s.hasLoadedNamespace.bind(s)},s.translator=new ko(s.services,s.options),s.translator.on("*",function(d){for(var c=arguments.length,l=new Array(c>1?c-1:0),b=1;b<c;b++)l[b-1]=arguments[b];s.emit.apply(s,[d].concat(l))}),s.init(f,i),s.translator.options=s.options,s.translator.backendConnector.services.utils={hasLoadedNamespace:s.hasLoadedNamespace.bind(s)},s}},{key:"toJSON",value:function(){return{options:this.options,store:this.store,language:this.language,languages:this.languages,resolvedLanguage:this.resolvedLanguage}}}]),t}(ue);le(tt,"createInstance",function(){var o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=arguments.length>1?arguments[1]:void 0;return new tt(o,e)});var T=tt.createInstance();T.createInstance=tt.createInstance;T.createInstance;T.init;T.loadResources;T.reloadResources;T.use;T.changeLanguage;T.getFixedT;T.t;T.exists;T.setDefaultNamespace;T.hasLoadedNamespace;T.loadNamespaces;T.loadLanguages;window.i18next=window.i18next||T;const B=window.i18next,A=B.t.bind(B);/**
 * @license
 * Copyright 2021 Weave B.V.
 * SPDX-License-Identifier: MIT License
 */class xr{constructor(e){this.localizeEventHandler=()=>this.host.requestUpdate(),this.host=e}hostConnected(){B.isInitialized||B.on("initialized",this.localizeEventHandler),B.on("languageChanged",this.localizeEventHandler)}hostDisconnected(){B.off("initialized",this.localizeEventHandler),B.off("languageChanged",this.localizeEventHandler)}}const wr=o=>o.addController(new xr(o)),Zo=wr;/**
 * @license
 * Copyright 2021 Weave B.V.
 * SPDX-License-Identifier: MIT License
 */const Sr=()=>o=>typeof o=="function"?kr(o):_r(o),Mt=Sr,_r=({kind:o,elements:e})=>({kind:o,elements:e,finisher(t){t.addInitializer(Zo)}}),kr=o=>(o.addInitializer(Zo),o),Or="Chinese",$r="English",Cr={converter:"Color Converter",picker:"Color Picker",card:"Color Card",imagePicker:"Image Color Picker"},Ar={converter:{rgbToHex:"Rgb To Hex",toHex:"To Hex",previewColor:"Preview Color",toggleConverter:"Toggle Converter",hexToRGB:"Hex To RGB",toRGB:"To RGB",copy:"Copy",copied:"Copied",operateDescTitle:"Operate Description",operateDescContent:"You can click right top of corner's button to toggle converter,converter have RGB to HEX and Hex to RGB respectively then you can click convert column's where is the bottom of button copy converted css code."},imagePicker:{dragImgContent:"Drag image into the frame",cathColorTitle:"Get Color Info",cathMsg:"No color information"}};var Pr={zh:Or,en:$r,nav:Cr,pages:Ar};const Rr="\u7E41\u9AD4\u4E2D\u6587",Er="\u82F1\u6587",Fr={converter:"\u8272\u78BC\u8F49\u63DB",picker:"\u8272\u76E4\u6AA2\u8996",card:"\u8272\u5361",imagePicker:"\u5716\u7247\u8272\u76E4\u6AA2\u8996"},Tr={converter:{rgbToHex:"Rgb \u8F49 Hex",toHex:"\u8F49\u63DB\u70BA Hex",previewColor:"\u9810\u89BD\u984F\u8272",toggleConverter:"\u5207\u63DB\u8F49\u63DB\u5668",hexToRGB:"Hex \u8F49 RGB",toRGB:"\u8F49\u63DB\u70BA RGB",copy:"\u8907\u88FD",copied:"\u5DF2\u8907\u88FD",operateDescTitle:"\u64CD\u4F5C\u8AAA\u660E",operateDescContent:"\u53EF\u900F\u904E\u53F3\u4E0A\u89D2\u6309\u9215\u5207\u63DB\u8F49\u63DB\u5668\uFF0C\u8F49\u63DB\u5668\u5206\u5225\u70BA RGB \u8F49 HEX \u8207 HEX \u8F49 RGB\uFF0C\u4E26\u53EF\u9EDE\u64CA\u8F49\u63DB\u6B04\u4E0B\u65B9\u7684\u6309\u9215\u8907\u88FD\u8F49\u63DB\u5B8C\u7684 css \u8272\u865F\u4EE3\u78BC\u3002"},imagePicker:{dragImgContent:"\u62D6\u66F3\u5716\u7247\u81F3\u6846\u4E2D",cathColorTitle:"\u53D6\u5F97\u984F\u8272\u8CC7\u8A0A",cathMsg:"\u5C1A\u672A\u53D6\u5F97\u984F\u8272\u8CC7\u8A0A"}};var Lr={zh:Rr,en:Er,nav:Fr,pages:Tr};const Nr={en:{translation:Pr},zh:{translation:Lr}};var Qa=Go``,Za=Go``,jr=/([:*])(\w+)/g,Br="([^/]+)",Dr=/\*/g,Hr="?(?:.*)",Ir=/\/\?/g,Ur="/?([^/]+|)",Mr="(?:/^|^)",Vr="";function en(o){return o===void 0&&(o="/"),zt()?location.pathname+location.search+location.hash:o}function C(o){return o.replace(/\/+$/,"").replace(/^\/+/,"")}function ot(o){return typeof o=="string"}function zr(o){return typeof o=="function"}function nt(o){return o&&o.indexOf("#")>=0&&o.split("#").pop()||""}function Gr(o,e){return e.length===0||!o?null:o.slice(1,o.length).reduce(function(t,n,r){return t===null&&(t={}),t[e[r]]=decodeURIComponent(n),t},null)}function rt(o){var e=C(o).split(/\?(.*)?$/);return[C(e[0]),e.slice(1).join("")]}function Vt(o){for(var e={},t=o.split("&"),n=0;n<t.length;n++){var r=t[n].split("=");if(r[0]!==""){var a=decodeURIComponent(r[0]);e[a]?(Array.isArray(e[a])||(e[a]=[e[a]]),e[a].push(decodeURIComponent(r[1]||""))):e[a]=decodeURIComponent(r[1]||"")}}return e}function tn(o,e){var t=rt(C(o.currentLocationPath)),n=t[0],r=t[1],a=r===""?null:Vt(r),i=[],f;if(ot(e.path)){if(f=Mr+C(e.path).replace(jr,function(c,l,b){return i.push(b),Br}).replace(Dr,Hr).replace(Ir,Ur)+"$",C(e.path)===""&&C(n)==="")return{url:n,queryString:r,hashString:nt(o.to),route:e,data:null,params:a}}else f=e.path;var s=new RegExp(f,Vr),u=n.match(s);if(u){var d=ot(e.path)?Gr(u,i):u.groups?u.groups:u.slice(1);return{url:C(n.replace(new RegExp("^"+o.instance.root),"")),queryString:r,hashString:nt(o.to),route:e,data:d,params:a}}return!1}function on(){return!!(typeof window!="undefined"&&window.history&&window.history.pushState)}function ge(o,e){return typeof o[e]=="undefined"||o[e]===!0}function qr(o){if(!o)return{};var e=o.split(","),t={},n;return e.forEach(function(r){var a=r.split(":").map(function(i){return i.replace(/(^ +| +$)/g,"")});switch(a[0]){case"historyAPIMethod":t.historyAPIMethod=a[1];break;case"resolveOptionsStrategy":n||(n={}),n.strategy=a[1];break;case"resolveOptionsHash":n||(n={}),n.hash=a[1]==="true";break;case"updateBrowserURL":case"callHandler":case"updateState":case"force":t[a[0]]=a[1]==="true";break}}),n&&(t.resolveOptions=n),t}function zt(){return typeof window!="undefined"}function Kr(o,e){return o===void 0&&(o=[]),e===void 0&&(e={}),o.filter(function(t){return t}).forEach(function(t){["before","after","already","leave"].forEach(function(n){t[n]&&(e[n]||(e[n]=[]),e[n].push(t[n]))})}),e}function K(o,e,t){var n=e||{},r=0;(function a(){if(!o[r]){t&&t(n);return}Array.isArray(o[r])?(o.splice.apply(o,[r,1].concat(o[r][0](n)?o[r][1]:o[r][2])),a()):o[r](n,function(i){typeof i=="undefined"||i===!0?(r+=1,a()):t&&t(n)})})()}K.if=function(o,e,t){return Array.isArray(e)||(e=[e]),Array.isArray(t)||(t=[t]),[o,e,t]};function Fo(o,e){typeof o.currentLocationPath=="undefined"&&(o.currentLocationPath=o.to=en(o.instance.root)),o.currentLocationPath=o.instance._checkForAHash(o.currentLocationPath),e()}function xt(o,e){for(var t=0;t<o.instance.routes.length;t++){var n=o.instance.routes[t],r=tn(o,n);if(r&&(o.matches||(o.matches=[]),o.matches.push(r),o.resolveOptions.strategy==="ONE")){e();return}}e()}function Wr(o,e){o.navigateOptions&&(typeof o.navigateOptions.shouldResolve!="undefined"&&console.warn('"shouldResolve" is deprecated. Please check the documentation.'),typeof o.navigateOptions.silent!="undefined"&&console.warn('"silent" is deprecated. Please check the documentation.')),e()}function Jr(o,e){o.navigateOptions.force===!0?(o.instance._setCurrent([o.instance._pathToMatchObject(o.to)]),e(!1)):e()}var To=zt(),Yr=on();function Xr(o,e){if(ge(o.navigateOptions,"updateBrowserURL")){var t=("/"+o.to).replace(/\/\//g,"/"),n=To&&o.resolveOptions&&o.resolveOptions.hash===!0;Yr?(history[o.navigateOptions.historyAPIMethod||"pushState"](o.navigateOptions.stateObj||{},o.navigateOptions.title||"",n?"#"+t:t),location&&location.hash&&(o.instance.__freezeListening=!0,setTimeout(function(){if(!n){var r=location.hash;location.hash="",location.hash=r}o.instance.__freezeListening=!1},1))):To&&(window.location.href=o.to)}e()}function nn(o,e){var t=o.instance;if(!t.lastResolved()){e();return}K(t.lastResolved().map(function(n){return function(r,a){if(!n.route.hooks||!n.route.hooks.leave){a();return}var i=!1,f=o.instance.matchLocation(n.route.path,o.currentLocationPath,!1);if(n.route.path!=="*")i=!f;else{var s=o.matches?o.matches.find(function(u){return n.route.path===u.route.path}):!1;i=!s}if(ge(o.navigateOptions,"callHooks")&&i){K(n.route.hooks.leave.map(function(u){return function(d,c){return u(function(l){l===!1?o.instance.__markAsClean(o):c()},o.matches&&o.matches.length>0?o.matches.length===1?o.matches[0]:o.matches:void 0)}}).concat([function(){return a()}]));return}else a()}}),{},function(){return e()})}function Qr(o,e){o.match.route.hooks&&o.match.route.hooks.before&&ge(o.navigateOptions,"callHooks")?K(o.match.route.hooks.before.map(function(t){return function(r,a){return t(function(i){i===!1?o.instance.__markAsClean(o):a()},o.match)}}).concat([function(){return e()}])):e()}function Zr(o,e){ge(o.navigateOptions,"callHandler")&&o.match.route.handler(o.match),o.instance.updatePageLinks(),e()}function ea(o,e){o.match.route.hooks&&o.match.route.hooks.after&&ge(o.navigateOptions,"callHooks")&&o.match.route.hooks.after.forEach(function(t){return t(o.match)}),e()}function ta(o,e){var t=o.instance.lastResolved();if(t&&t[0]&&t[0].route===o.match.route&&t[0].url===o.match.url&&t[0].queryString===o.match.queryString){t.forEach(function(n){n.route.hooks&&n.route.hooks.already&&ge(o.navigateOptions,"callHooks")&&n.route.hooks.already.forEach(function(r){return r(o.match)})}),e(!1);return}e()}function oa(o,e){var t=o.instance._notFoundRoute;if(t){o.notFoundHandled=!0;var n=rt(o.currentLocationPath),r=n[0],a=n[1],i=nt(o.to);t.path=C(r);var f={url:t.path,queryString:a,hashString:i,data:null,route:t,params:a!==""?Vt(a):null};o.matches=[f],o.match=f}e()}function na(o,e){(!o.resolveOptions||o.resolveOptions.noMatchWarning===!1||typeof o.resolveOptions.noMatchWarning=="undefined")&&console.warn('Navigo: "'+o.currentLocationPath+`" didn't match any of the registered routes.`),e()}function ra(o,e){o.instance._setCurrent(null),e()}function rn(o,e){ge(o.navigateOptions,"updateState")&&o.instance._setCurrent(o.matches),e()}var an=[ta,Qr,Zr,ea],Lo=[nn,oa,K.if(function(o){var e=o.notFoundHandled;return e},an.concat([rn]),[na,ra])];function Rt(){return Rt=Object.assign||function(o){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(o[n]=t[n])}return o},Rt.apply(this,arguments)}function No(o,e){var t=0;function n(){if(t===o.matches.length){rn(o,e);return}K(an,Rt({},o,{match:o.matches[t]}),function(){t+=1,n()})}nn(o,n)}function wt(o){o.instance.__markAsClean(o)}function Et(){return Et=Object.assign||function(o){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(o[n]=t[n])}return o},Et.apply(this,arguments)}var jo="[data-navigo]";function aa(o,e){var t=e||{strategy:"ONE",hash:!1,noMatchWarning:!1,linksSelector:jo},n=this,r="/",a=null,i=[],f=!1,s,u=on(),d=zt();o?r=C(o):console.warn('Navigo requires a root path in its constructor. If not provided will use "/" as default.');function c(h){return h.indexOf("#")>=0&&(t.hash===!0?h=h.split("#")[1]||"/":h=h.split("#")[0]),h}function l(h){return C(r+"/"+C(h))}function b(h,y,k,$){return h=ot(h)?l(h):h,{name:$||C(String(h)),path:h,handler:y,hooks:Kr(k)}}function v(h,y,k){var $=this;return typeof h=="object"&&!(h instanceof RegExp)?(Object.keys(h).forEach(function(O){if(typeof h[O]=="function")$.on(O,h[O]);else{var L=h[O],H=L.uses,ye=L.as,Te=L.hooks;i.push(b(O,H,[s,Te],ye))}}),this):(typeof h=="function"&&(k=y,y=h,h=r),i.push(b(h,y,[s,k])),this)}function m(h,y){if(n.__dirty){n.__waiting.push(function(){return n.resolve(h,y)});return}else n.__dirty=!0;h=h?C(r)+"/"+C(h):void 0;var k={instance:n,to:h,currentLocationPath:h,navigateOptions:{},resolveOptions:Et({},t,y)};return K([Fo,xt,K.if(function($){var O=$.matches;return O&&O.length>0},No,Lo)],k,wt),k.matches?k.matches:!1}function x(h,y){if(n.__dirty){n.__waiting.push(function(){return n.navigate(h,y)});return}else n.__dirty=!0;h=C(r)+"/"+C(h);var k={instance:n,to:h,navigateOptions:y||{},resolveOptions:y&&y.resolveOptions?y.resolveOptions:t,currentLocationPath:c(h)};K([Wr,Jr,xt,K.if(function($){var O=$.matches;return O&&O.length>0},No,Lo),Xr,wt],k,wt)}function g(h,y,k){var $=Re(h,y);return $!==null?(x($.replace(new RegExp("^/?"+r),""),k),!0):!1}function p(h){return this.routes=i=i.filter(function(y){return ot(h)?C(y.path)!==C(h):zr(h)?h!==y.handler:String(y.path)!==String(h)}),this}function w(){u&&(this.__popstateListener=function(){n.__freezeListening||m()},window.addEventListener("popstate",this.__popstateListener))}function S(){this.routes=i=[],u&&window.removeEventListener("popstate",this.__popstateListener),this.destroyed=f=!0}function E(h,y){return n._notFoundRoute=b("*",h,[s,y],"__NOT_FOUND__"),this}function N(){if(!!d)return Q().forEach(function(h){if(h.getAttribute("data-navigo")==="false"||h.getAttribute("target")==="_blank"){h.hasListenerAttached&&h.removeEventListener("click",h.navigoHandler);return}h.hasListenerAttached||(h.hasListenerAttached=!0,h.navigoHandler=function(y){if((y.ctrlKey||y.metaKey)&&y.target.tagName.toLowerCase()==="a")return!1;var k=h.getAttribute("href");if(typeof k=="undefined"||k===null)return!1;if(k.match(/^(http|https)/)&&typeof URL!="undefined")try{var $=new URL(k);k=$.pathname+$.search}catch{}var O=qr(h.getAttribute("data-navigo-options"));f||(y.preventDefault(),y.stopPropagation(),n.navigate(C(k),O))},h.addEventListener("click",h.navigoHandler))}),n}function Q(){return d?[].slice.call(document.querySelectorAll(t.linksSelector||jo)):[]}function de(h){return"/"+r+"/"+C(h)}function pe(h){return s=h,this}function ne(){return a}function Re(h,y,k){var $=i.find(function(H){return H.name===h}),O=null;if($){if(O=$.path,y)for(var L in y)O=O.replace(":"+L,y[L]);O=O.match(/^\//)?O:"/"+O}return O&&k&&!k.includeRoot&&(O=O.replace(new RegExp("^/"+r),"")),O}function me(h){return h.getAttribute("href")}function Ke(h){var y=rt(C(h)),k=y[0],$=y[1],O=$===""?null:Vt($),L=nt(h),H=b(k,function(){},[s],k);return{url:k,queryString:$,hashString:L,route:H,data:null,params:O}}function re(){return Ke(C(en(r)).replace(new RegExp("^"+r),""))}function We(h){var y={instance:n,currentLocationPath:h,to:h,navigateOptions:{},resolveOptions:t};return xt(y,function(){}),y.matches?y.matches:!1}function ve(h,y,k){typeof y!="undefined"&&(typeof k=="undefined"||k)&&(y=l(y));var $={instance:n,to:y,currentLocationPath:y};Fo($,function(){}),typeof h=="string"&&(h=typeof k=="undefined"||k?l(h):h);var O=tn($,{name:String(h),path:h,handler:function(){},hooks:{}});return O||!1}function V(h,y,k){return typeof y=="string"&&(y=Ee(y)),y?(y.hooks[h]||(y.hooks[h]=[]),y.hooks[h].push(k),function(){y.hooks[h]=y.hooks[h].filter(function($){return $!==k})}):(console.warn("Route doesn't exists: "+y),function(){})}function Ee(h){return typeof h=="string"?i.find(function(y){return y.name===l(h)}):i.find(function(y){return y.handler===h})}function Fe(h){h.instance.__dirty=!1,h.instance.__waiting.length>0&&h.instance.__waiting.shift()()}this.root=r,this.routes=i,this.destroyed=f,this.current=a,this.__freezeListening=!1,this.__waiting=[],this.__dirty=!1,this.__markAsClean=Fe,this.on=v,this.off=p,this.resolve=m,this.navigate=x,this.navigateByName=g,this.destroy=S,this.notFound=E,this.updatePageLinks=N,this.link=de,this.hooks=pe,this.extractGETParameters=function(h){return rt(c(h))},this.lastResolved=ne,this.generate=Re,this.getLinkPath=me,this.match=We,this.matchLocation=ve,this.getCurrentLocation=re,this.addBeforeHook=V.bind(this,"before"),this.addAfterHook=V.bind(this,"after"),this.addAlreadyHook=V.bind(this,"already"),this.addLeaveHook=V.bind(this,"leave"),this.getRoute=Ee,this._pathToMatchObject=Ke,this._clean=C,this._checkForAHash=c,this._setCurrent=function(h){return a=n.current=h},w.call(this),N.call(this)}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const fn=o=>o.strings===void 0,ia={},fa=(o,e=ia)=>o._$AH=e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const he={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},sn=o=>(...e)=>({_$litDirective$:o,values:e});class cn{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Be=(o,e)=>{var t,n;const r=o._$AN;if(r===void 0)return!1;for(const a of r)(n=(t=a)._$AO)===null||n===void 0||n.call(t,e,!1),Be(a,e);return!0},at=o=>{let e,t;do{if((e=o._$AM)===void 0)break;t=e._$AN,t.delete(o),o=e}while((t==null?void 0:t.size)===0)},un=o=>{for(let e;e=o._$AM;o=e){let t=e._$AN;if(t===void 0)e._$AN=t=new Set;else if(t.has(o))break;t.add(o),ua(e)}};function sa(o){this._$AN!==void 0?(at(this),this._$AM=o,un(this)):this._$AM=o}function ca(o,e=!1,t=0){const n=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(e)if(Array.isArray(n))for(let a=t;a<n.length;a++)Be(n[a],!1),at(n[a]);else n!=null&&(Be(n,!1),at(n));else Be(this,o)}const ua=o=>{var e,t,n,r;o.type==he.CHILD&&((e=(n=o)._$AP)!==null&&e!==void 0||(n._$AP=ca),(t=(r=o)._$AQ)!==null&&t!==void 0||(r._$AQ=sa))};class la extends cn{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,n){super._$AT(e,t,n),un(this),this.isConnected=e._$AU}_$AO(e,t=!0){var n,r;e!==this.isConnected&&(this.isConnected=e,e?(n=this.reconnected)===null||n===void 0||n.call(this):(r=this.disconnected)===null||r===void 0||r.call(this)),t&&(Be(this,e),at(this))}setValue(e){if(fn(this._$Ct))this._$Ct._$AI(e,this);else{const t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qe=()=>new da;class da{}const St=new WeakMap,Ze=sn(class extends la{render(o){return R}update(o,[e]){var t;const n=e!==this.Y;return n&&this.Y!==void 0&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.Y=e,this.dt=(t=o.options)===null||t===void 0?void 0:t.host,this.rt(this.ct=o.element)),R}rt(o){var e;if(typeof this.Y=="function"){const t=(e=this.dt)!==null&&e!==void 0?e:globalThis;let n=St.get(t);n===void 0&&(n=new WeakMap,St.set(t,n)),n.get(this.Y)!==void 0&&this.Y.call(this.dt,void 0),n.set(this.Y,o),o!==void 0&&this.Y.call(this.dt,o)}else this.Y.value=o}get lt(){var o,e,t;return typeof this.Y=="function"?(e=St.get((o=this.dt)!==null&&o!==void 0?o:globalThis))===null||e===void 0?void 0:e.get(this.Y):(t=this.Y)===null||t===void 0?void 0:t.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});var pa=`.picker{width:600px;height:600px}.picker canvas{position:absolute}.board-info{position:fixed;top:0px;left:0px;background-color:#000000b3;color:#fff;font-size:20px;padding:5px 15px 10px 14px;line-height:30px;border-radius:5px;margin:5px}.board-info div:nth-of-type(3){display:flex}
`;const He=class{};let D=He;(()=>{He.rgbToHsl=(e,t,n)=>{const r=e/=255,a=t/=255,i=n/=255,f=Math.max(r,a,i),s=Math.min(r,a,i);let u,d,c=(f+s)/2;if(f==s)u=d=0;else{const l=f-s;switch(d=c>.5?l/(2-f-s):l/(f+s),f){case r:u=(a-i)/l+(a<i?6:0);break;case a:u=(i-r)/l+2;break;case i:u=(r-a)/l+4;break}u/=6}return{fomat:l=>({toElement:`<div>hsl(${(u*360).toFixed(0)}&deg;,${d.toFixed(0)},${c.toFixed(1)})<div>`,toArray:[u,d,c]})[l]}},He.rgbToHex=(e,t,n)=>`#${((1<<24)+(e<<16)+(t<<8)+n).toString(16).slice(1)}`,He.hexToRgb=e=>{const t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e),[,n,r,a]=t;return t?`${parseInt(n,16)},${parseInt(r,16)},${parseInt(a,16)}`:null}})();const _=(o=>{const e=a=>{const i=o.call(o,a)||a;return i.texts=f=>f?i.textContent=f:i.textContent,i.html=f=>f?i.innerHTML=f:i.innerHTML,i.addClass=f=>(i.classList.add(f),i),i.removeClass=f=>(i.classList.remove(f),i),i.toggleClass=f=>i.classList.toggle(f),i.on=(f,s)=>{i[["on",f].join("")]=u=>s.call(s,i,u)},i.listener=(f,s)=>i.addEventListener(f,s),i.removeListener=(f,s)=>i.removeEventListener(f,s),i.val=f=>f?i.value=f:i.value,i.attr=(f,s)=>s?i.setAttribute(f,s):i.getAttribute(f),i.props=(f,s)=>s?i[f]=s:i[f],i.sibling=f=>i[f],i.child=f=>i.children[f],i.childFirst=()=>i.firstElementChild,i.childLast=()=>i.lastElementChild,i.parent=()=>i.parentNode,i.appendDom=f=>i.append(f),i.removeDom=()=>i.remove(),i.removeChildDom=()=>i.replaceChildren(),i.appendDomText=f=>i.appendChild(f),i.easyAppendDom=(f,s)=>i.insertAdjacentHTML(f!=="afterDom"?"afterbegin":"beforeend",s),i.styles=(f,s,u)=>{if(!e.includes(["set","remove"],f)){e.console("error","First parameter method must use string and keyword is 'set' or 'remove'.");return}return f==="set"?i.style.setProperty(s,u):i.style.removeProperty(s),i},i.getDomStyles=f=>{const s={};if(typeof f!="object")e.console("error","Parameter must use array.");else if(f.length===0)e.console("error","Parameter must use array,and css property must in array with string.");else return e.each(f,u=>s[u]=getComputedStyle(i).getPropertyValue(u)),s;return s},i.getDomPos=()=>({x:i.props("offsetLeft"),y:i.props("offsetTop")-window.scrollY,top:i.props("offsetTop")-window.scrollY,left:i.props("offsetLeft"),right:i.props("offsetLeft")+i.props("offsetWidth"),bottom:i.props("offsetTop")+i.props("offsetHeight")-window.scrollY,width:i.props("offsetWidth"),height:i.props("offsetHeight")}),i.scrollToTop=(f={scrollTop:0,duration:0})=>{let s;const[u,d]=Object.keys(f),c=i[u],l=f[u]-c,b=+new Date,v=m=>{const{currentTime:x,startVal:g,changeVal:p,animateDuration:w}=m;let S=x;return S/=w/2,S<1?p/2*S*S+g:(S-=1,-p/2*(S*(S-2)-1)+g)};(s=()=>{const m=+new Date-b;i.scrollTop=Number(v({currentTime:m,startVal:c,changeVal:l,animateDuration:f[d]})),m<f[d]?requestAnimationFrame(s):i.scrollTop=f[u]})()},i.useWillMount=f=>{typeof i=="object"&&e.typeOf(i,"HTMLDocument")?i.listener("readystatechange",({target:s})=>s.readyState==="interactive"&&f.call(f,s)):e.console("error","UseWillMount hook just use when selector document.")},i.useMounted=f=>{typeof i=="object"&&e.typeOf(i,"HTMLDocument")?i.listener("readystatechange",({target:s})=>s.readyState==="complete"&&f.call(f,s)):e.console("error","UseMounted Hook just use when selector document.")},i};e.each=(a,i)=>a.forEach((f,s)=>i.call(i,f,s)),e.maps=(a,i)=>a.map((f,s)=>i.call(i,f,s)),e.filter=(a,i)=>a.filter(f=>i.call(i,f)),e.find=(a,i)=>a.find(f=>i.call(i,f)),e.sort=(a,i)=>a.sort((f,s)=>i.call(i,f,s)),e.sum=(a,i,f)=>f?a.reduce((s,u)=>i.call(i,s,u),f):a.reduce((s,u)=>i.call(i,s,u)),e.indexOf=(a,i)=>a.indexOf(i),e.includes=(a,i)=>a.includes(i),e.findIndexOfObj=(a,i)=>a.findIndex(f=>i.call(i,f)),e.findObjProperty=(a,i)=>a.hasOwnProperty(i),e.mergeArray=(a,i,f)=>f?a.concat(i):f.call(f,a.concat(i)),e.typeOf=(a,i)=>i?a.constructor.name===i:a.constructor.name,e.console=(a,...i)=>console[a](...i),e.localData=(a,i,f)=>a==="get"?e.convert(localStorage.getItem(i),"json")||[]:localStorage.setItem(i,e.convert(f,"stringify")),e.createCustomEvent=(a,i)=>i?new CustomEvent(a,{detail:i}):new CustomEvent(a),e.registerCustomEvent=(a,i)=>window.addEventListener(a,i),e.useCustomEvent=a=>window.dispatchEvent(a),e.removeCustomEvent=(a,i)=>window.removeEventListener(a,i),e.createPromise=a=>new Promise((i,f)=>a.call(a,i,f)),e.createPromiseAll=(...a)=>Promise.all(a),e.createDomText=a=>document.createTextNode(a),e.objDetails=(a,i)=>i===void 0||!e.includes(["keys","values","entries"],i)?e.console("error","please enter secode prameter 'keys' or 'values' or 'entries' in type string"):Object[i](a),e.createArray=({type:a,item:i},f)=>{if(a==="fake"){if("random"in i&&e.typeOf(i.random,"Number")&&f!==void 0&&e.typeOf(f,"Function"))return Array.from({length:i.random},(s,u)=>f.call(f,u));e.console("error","item property must have random in object and radom type must be number,with call back function in secode parameters.")}else if(a==="new"&&!("random"in i))return Array.from(i)},e.convert=(a,i)=>{if(a===void 0||i===void 0){e.console("error","Please enter first parameters value who want to convert and seconde paramters value is convert type 'string' or 'number' or 'float' or 'boolean' or 'json' or 'stringify'.");return}else if(typeof a=="object"&&e.includes(["string","number","float","boolean"],i)){e.console("error",`Convert value can't be object when use convert type ${i}.`);return}return{string:String(a),number:parseInt(a),float:parseFloat(a),boolean:Boolean(a),json:i==="json"&&JSON.parse(a),stringify:i==="stringify"&&JSON.stringify(a)}[i]},e.createDom=(a,i)=>{const f=document.createElement(a),s=Object.entries(i);return e.each(s,u=>{const[d,c]=u;if(e.typeOf(c,"Object")){const[l,b]=u,[[v,m]]=Object.entries(b);f[l][v]=m}else f[d]=e.typeOf(c,"String")?c.trim():c}),f},e.currencyTranser=(a,i)=>{if(a!==void 0){const f=a===""?{}:{style:"currency",currency:a};return new Intl.NumberFormat(a===""?"TWN":a,f).format(i)}else e.console("error","First argument currency type is must.")},e.formatDateTime=a=>{if(!("formatDate"in a||"formatType"in a)){e.console("error","Please enter an object and use formatType property in the object.");return}const i=("localCountryTime"in a?a.localCountryTime||0:8)*60*60*1e3,s=new Date(+new Date(a.formatDate)+i).toJSON().replace(/T/g,"-").replace(/:/g,"-").split(".")[0].split("-"),[u,d,c,l,b,v]=s;if("toDateFullNumber"in a)return e.convert(s.join(""),"number");if(a.formatType.match("tt")){const m=e.convert(l,"number")>11?"PM":"AM",x=e.convert(l,"number")-12<10?`0${e.convert(l,"number")-12}`:e.convert(e.convert(l,"number")-12,"string");return a.formatType.replace(/yyyy/g,u).replace(/MM/g,d).replace(/dd/g,c).replace(/HH/g,x).replace(/mm/g,b).replace(/ss/g,v).replace(/tt/g,m)}else return a.formatType.replace(/yyyy/g,u).replace(/MM/g,d).replace(/dd/g,c).replace(/HH/g,l).replace(/mm/g,b).replace(/ss/g,v)};class t{static async fetchSetting(i,f){const s={},{method:u,headers:d,contentType:c,data:l,routeParams:b,beforePost:v,successFn:m,excuteDone:x,errorFn:g}=i;if(s.method=u,i.url=this.baseUrl?`${this.baseUrl}${i.url}`:i.url,u){if(!e.includes(["get","post","patch","put","delete"],u.toLocaleLowerCase())){e.console("error","Method value must use valid request method,like get\u3001post ...");return}}else{e.console("error","Property name method is required in obejct parameters.");return}if(b){const[w]=Object.keys(b);i.url=`${i.url}/${b[w]}`}if((Object.keys(this.baseHeaders).length>0||d)&&(s.headers=Object.keys(this.baseHeaders).length>0?this.baseHeaders:{"Content-Type":"application/json",...d}),d||(s.headers={"Content-Type":c||"application/json"}),l&&(s.headers=this.baseHeaders||{"Content-Type":c||"application/json"},s.body=e.convert(l,"stringify")),(this.baseHeaders||d)&&l&&(s.headers=this.baseHeaders||{...d},s.body=e.convert(l,"stringify")),!f){if(v&&v.call(v),!m){e.console("error","Function Name successFn is required in obejct parameters.");return}if(!g){e.console("error","Function Name errorFn is required in obejct parameters.");return}}const p=await fetch(i.url,s).then(w=>w);if(f)return new Promise((w,S)=>{p.status>=200&&p.status<300?p[s.headers["Content-Type"].split("/")[1]]().then(E=>w({bodyUsed:p.bodyUsed,headers:p.headers,ok:p.ok,redirected:p.redirected,status:p.status,statusText:p.statusText,type:p.type,url:p.url,data:E})):S({bodyUsed:p.bodyUsed,headers:p.headers,ok:p.ok,redirected:p.redirected,status:p.status,statusText:p.statusText,type:p.type,url:p.url})});try{if(p.status>=200&&p.status<300)p[s.headers["Content-Type"].split("/")[1]]().then(w=>m==null?void 0:m.call(m,{bodyUsed:p.bodyUsed,headers:p.headers,ok:p.ok,redirected:p.redirected,status:p.status,statusText:p.statusText,type:p.type,url:p.url,data:w})).then(()=>x&&x.call(x));else throw new Error(JSON.stringify({bodyUsed:p.bodyUsed,headers:p.headers,ok:p.ok,redirected:p.redirected,status:p.status,statusText:p.statusText,type:p.type,url:p.url}))}catch(w){g==null||g.call(g,JSON.parse(w.message))}}static createBase({baseUrl:i,baseHeaders:f}){this.baseUrl=i,this.baseHeaders=f}}t.baseUrl="",t.baseHeaders={};const r=class extends t{};let n=r;return(()=>{r.get=(i,f)=>r.fetchSetting({method:"get",url:i,...f},!0),r.post=(i,f)=>r.fetchSetting({method:"post",url:i,...f},!0),r.patch=(i,f)=>r.fetchSetting({method:"patch",url:i,...f},!0),r.put=(i,f)=>r.fetchSetting({method:"put",url:i,...f},!0),r.delete=(i,f)=>r.fetchSetting({method:"delete",url:i,...f},!0)})(),e.fetch=a=>t.fetchSetting(a,!1),e.fetch.get=(a,i={headers:{}})=>n.get(a,i),e.fetch.post=(a,i={headers:{},data:{}})=>n.post(a,i),e.fetch.patch=(a,i={headers:{},data:{}})=>n.patch(a,i),e.fetch.put=(a,i={headers:{},data:{}})=>n.put(a,i),e.fetch.delete=(a,i={headers:{},data:{}})=>n.delete(a,i),e.fetch.createBase=a=>t.createBase(a),e})(o=>typeof o=="object"?o:document.querySelectorAll(o).length>1?document.querySelectorAll(o):document.querySelector(o));String.prototype.appendText=function(o){return this.toString()+o};String.prototype.format=function(o,...e){if(_.typeOf(o,"String")&&_.includes(o,"{")&&_.includes(o,"}"))if(o.split("{").join("").split("}").length-1===e.length){let t=o;const n=_.maps(e,(a,i)=>({replaceKey:`{${i}}`,replaceValue:a}));return _.maps(n,({replaceKey:a,replaceValue:i})=>(t=t.replace(a,i),t)).slice(n.length-1,n.length).join("")}else _.console("error","Can't not find else aguments.");else _.console("error","First paramter must use type string,if use string must like this ex\uFF1Aabc {0} efg {1}.")};Date.prototype.calculateDay=function(o){if(o===void 0||!("day"in o&&"method"in o)){_.console("error","Please enter an object and use day and method property in the object.");return}else if(typeof o.day!="number"){_.console("error","day property must use type number.");return}else if(!_.includes(["addDay","reduceDay"],o.method)){_.console("error","Please enter method type 'addDay' or 'reduceDay'.");return}return{addDay:new Date(+this+o.day*24*60*60*1e3),reduceDay:new Date(+this-o.day*24*60*60*1e3)}[o.method]};Date.prototype.toOptionTimeZoneForISO=function(o){return new Date(+this+(o===void 0?8:o)*60*60*1e3).toISOString()};Array.prototype.append=function(o){this.push(o)};Array.prototype.appendFirst=function(...o){return this.unshift(...o),this};Array.prototype.remove=function(o){return this.splice(o,1),this};Array.prototype.range=function(o,e){return this.slice(o,e)};Array.prototype.removeFirst=function(){return this.shift(),this};Array.prototype.removeLast=function(){return this.pop(),this};var ba=Object.defineProperty,ha=Object.getOwnPropertyDescriptor,te=(o,e,t,n)=>{for(var r=n>1?void 0:n?ha(e,t):e,a=o.length-1,i;a>=0;a--)(i=o[a])&&(r=(n?i(e,t,r):i(r))||r);return n&&r&&ba(e,t,r),r};let U=class extends W{constructor(){super(...arguments),this.initState={width:0,height:0,radLarge:0,radSmall:0,cx:0,cy:0,active:!1,tri:[],ang:0,dotCol:"",points:40,angle:360/40,arc:Math.PI*2/40,rgbVal:"",hexVal:"",hslVal:""},this.parent=Qe()}init(){this.outer=this.dot=_.createDom("canvas",{width:this.initState.width,height:this.initState.height}),this.ctxA=this.outer.getContext("2d"),this.inner=_.createDom("canvas",{width:this.initState.width,height:this.initState.height}),this.ctxB=this.inner.getContext("2d"),this.ctxB.globalCompositeOperation="hard-light",this.dot=_.createDom("canvas",{width:this.initState.width,height:this.initState.height,onmouseup:()=>this.initState.active=!1,onmousemove:o=>this.initState.active&&this.updateCanvas(o,this),onmousedown:o=>{this.initState.active=!0,this.initState.active&&this.updateCanvas(o,this)}}),this.ctxC=this.dot.getContext("2d"),_(this.parent.value).appendDom(this.outer),_(this.parent.value).appendDom(this.inner),_(this.parent.value).appendDom(this.dot),this.spectrum(),this.draw(298,25,!1)}circle(o,...e){const[t,n,r,a,i,f]=e;o.beginPath(),o.arc(t,n,r,i||0,f||Math.PI*2),a.fill&&(o.fillStyle=a.fill,o.fill()),a.stroke&&(o.strokeStyle=a.stroke,o.stroke()),a.lineWidth&&(o.lineWidth=a.lineWidth)}triangle(o,e,t){o.beginPath(),o.moveTo(e[0].x,e[0].y);for(let n=e.length-2;n>=0;n--)o.lineTo(e[n].x,e[n].y);o.fillStyle=t,o.fill()}spectrum(){for(let o=1;o<=this.initState.points;o++){const e=o*this.initState.angle,t=(o-1)*this.initState.angle,n=this.initState.radSmall+(this.initState.radLarge-this.initState.radSmall)/2,r=Math.cos(this.toRadians(e))*n+this.initState.cx,a=Math.sin(this.toRadians(e))*n+this.initState.cy,i=Math.cos(this.toRadians(t))*n+this.initState.cx,f=Math.sin(this.toRadians(t))*n+this.initState.cy,s=this.ctxA.createLinearGradient(r,a,i,f);s.addColorStop(0,`hsl(${e}, 100%, 50%)`),s.addColorStop(1,`hsl(${t}, 100%, 50%)`),this.ctxA.beginPath(),this.ctxA.arc(this.initState.cx,this.initState.cy,this.initState.radLarge,this.toRadians(t)-.001,this.toRadians(e)+.001,!1),this.ctxA.arc(this.initState.cx,this.initState.cy,this.initState.radSmall,this.toRadians(e)+.001,this.toRadians(t)-.001,!0),this.ctxA.fillStyle=s,this.ctxA.fill()}}toRadians(o){return o*(Math.PI/180)}inCircle(o,e,t,n,r){return Math.sqrt((t-o)*(t-o)+(n-e)*(n-e))<r}inTriangle(o,e,t,n){const r=.5*(-t.y*n.x+e.y*(-t.x+n.x)+e.x*(t.y-n.y)+t.x*n.y),a=r<0?-1:1,i=(e.y*n.x-e.x*n.y+(n.y-e.y)*o.x+(e.x-n.x)*o.y)*a,f=(e.x*t.y-e.y*t.x+(e.y-t.y)*o.x+(t.x-e.x)*o.y)*a;return i>0&&f>0&&i+f<2*r*a}updateCanvas(o,e){let t;const n=o.clientX-e.inner.offsetLeft,r=o.clientY-e.inner.offsetTop,a={x:n,y:r},i=e.inCircle(e.initState.cx,e.initState.cy,n,r,e.initState.radLarge),f=e.inCircle(e.initState.cx,e.initState.cy,n,r,e.initState.radSmall);this.initState.tri&&(t=this.inTriangle(a,this.initState.tri[0],this.initState.tri[1],this.initState.tri[2])),i&&!f?e.draw(n,r,!1):t&&e.draw(n,r,!0)}draw(o,e,t){const n=Array.from(this.ctxA.getImageData(o,e,1,1).data),r=Array.from(this.ctxB.getImageData(o,e,1,1).data);if(!t){this.ctxB.clearRect(0,0,this.inner.width,this.inner.height);const u=Math.atan2(e-this.initState.cy,o-this.initState.cx)*(180/Math.PI),d=`rgb(${n[0]},${n[1]},${n[2]})`,c=[0,120,240,180];let l=this.initState.tri=[];_.each(c,x=>{l.push({x:Math.cos(this.toRadians(u+x))*this.initState.radSmall+this.initState.cx,y:Math.sin(this.toRadians(u+x))*this.initState.radSmall+this.initState.cy})});const b=this.ctxB.createLinearGradient(l[1].x,l[1].y,l[2].x,l[2].y),v=D.rgbToHsl(n[0],n[1],n[2]).fomat("toArray");b.addColorStop(0,"hsl("+v[0]*360+",0%,100%)"),b.addColorStop(1,"hsl("+v[0]*360+",0%,0%)");const m=this.ctxB.createLinearGradient(l[0].x,l[0].y,l[3].x,l[3].y);m.addColorStop(0,d),m.addColorStop(1,`rgb(${n[0]},${n[1]},${n[2]})`),this.triangle(this.ctxB,l,m),this.triangle(this.ctxB,l,b)}this.ctxC.clearRect(0,0,this.dot.width,this.dot.height);const[a,i,f]=t?r:n,s=`rgb(${a},${i},${f})`;this.initState.rgbVal=s,this.initState.hexVal=D.rgbToHex(a,i,f),this.initState.hslVal=`HSL\uFF1A${D.rgbToHsl(a,i,f).fomat("toElement")}`,this.initState={...this.initState},_("body").styles("set","background-color",s),this.circle(this.ctxC,o,e,10,{stroke:"#fff",lineWidth:3,fill:s})}render(){return j`
            <div class="picker" ${Ze(this.parent)}></div>
            <div class="board-info">
              <div>RGB：${this.initState.rgbVal}</div>
              <div>Hex：${this.initState.hexVal}</div>
              <div .innerHTML=${this.initState.hslVal}></div>
            </div>
        `}firstUpdated(o){this.initState.radLarge=_(this.parent.value).props("offsetWidth")/2-5,this.initState.radSmall=_(this.parent.value).props("offsetHeight")/2-5-40,this.initState.width=_(this.parent.value).props("offsetWidth"),this.initState.height=_(this.parent.value).props("offsetHeight"),this.initState.cx=_(this.parent.value).props("offsetWidth")/2,this.initState.cy=_(this.parent.value).props("offsetHeight")/2,this.init()}disconnectedCallback(){_("body").styles("remove","background-color","")}};U.styles=pa;te([P()],U.prototype,"initState",2);te([P()],U.prototype,"parent",2);te([P()],U.prototype,"outer",2);te([P()],U.prototype,"ctxA",2);te([P()],U.prototype,"inner",2);te([P()],U.prototype,"ctxB",2);te([P()],U.prototype,"dot",2);te([P()],U.prototype,"ctxC",2);U=te([Pe("color-picker-element")],U);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Xe=sn(class extends cn{constructor(o){if(super(o),o.type!==he.PROPERTY&&o.type!==he.ATTRIBUTE&&o.type!==he.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!fn(o))throw Error("`live` bindings can only contain a single expression")}render(o){return o}update(o,[e]){if(e===G||e===R)return e;const t=o.element,n=o.name;if(o.type===he.PROPERTY){if(e===t[n])return G}else if(o.type===he.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(n))return G}else if(o.type===he.ATTRIBUTE&&t.getAttribute(n)===e+"")return G;return fa(o),e}});/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const Bo=typeof window!="undefined"&&window.customElements!=null&&window.customElements.polyfillWrapFlushCallback!==void 0,Gt=(o,e,t=null)=>{for(;e!==t;){const n=e.nextSibling;o.removeChild(e),e=n}};/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const Z=`{{lit-${String(Math.random()).slice(2)}}}`,ln=`<!--${Z}-->`,Do=new RegExp(`${Z}|${ln}`),je="$lit$";class dn{constructor(e,t){this.parts=[],this.element=t;const n=[],r=[],a=document.createTreeWalker(t.content,133,null,!1);let i=0,f=-1,s=0;const{strings:u,values:{length:d}}=e;for(;s<d;){const c=a.nextNode();if(c===null){a.currentNode=r.pop();continue}if(f++,c.nodeType===1){if(c.hasAttributes()){const l=c.attributes,{length:b}=l;let v=0;for(let m=0;m<b;m++)Ho(l[m].name,je)&&v++;for(;v-- >0;){const m=u[s],x=Ft.exec(m)[2],g=x.toLowerCase()+je,p=c.getAttribute(g);c.removeAttribute(g);const w=p.split(Do);this.parts.push({type:"attribute",index:f,name:x,strings:w}),s+=w.length-1}}c.tagName==="TEMPLATE"&&(r.push(c),a.currentNode=c.content)}else if(c.nodeType===3){const l=c.data;if(l.indexOf(Z)>=0){const b=c.parentNode,v=l.split(Do),m=v.length-1;for(let x=0;x<m;x++){let g,p=v[x];if(p==="")g=fe();else{const w=Ft.exec(p);w!==null&&Ho(w[2],je)&&(p=p.slice(0,w.index)+w[1]+w[2].slice(0,-je.length)+w[3]),g=document.createTextNode(p)}b.insertBefore(g,c),this.parts.push({type:"node",index:++f})}v[m]===""?(b.insertBefore(fe(),c),n.push(c)):c.data=v[m],s+=m}}else if(c.nodeType===8)if(c.data===Z){const l=c.parentNode;(c.previousSibling===null||f===i)&&(f++,l.insertBefore(fe(),c)),i=f,this.parts.push({type:"node",index:f}),c.nextSibling===null?c.data="":(n.push(c),f--),s++}else{let l=-1;for(;(l=c.data.indexOf(Z,l+1))!==-1;)this.parts.push({type:"node",index:-1}),s++}}for(const c of n)c.parentNode.removeChild(c)}}const Ho=(o,e)=>{const t=o.length-e.length;return t>=0&&o.slice(t)===e},pn=o=>o.index!==-1,fe=()=>document.createComment(""),Ft=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const qt=133;function bn(o,e){const{element:{content:t},parts:n}=o,r=document.createTreeWalker(t,qt,null,!1);let a=De(n),i=n[a],f=-1,s=0;const u=[];let d=null;for(;r.nextNode();){f++;const c=r.currentNode;for(c.previousSibling===d&&(d=null),e.has(c)&&(u.push(c),d===null&&(d=c)),d!==null&&s++;i!==void 0&&i.index===f;)i.index=d!==null?-1:i.index-s,a=De(n,a),i=n[a]}u.forEach(c=>c.parentNode.removeChild(c))}const ga=o=>{let e=o.nodeType===11?0:1;const t=document.createTreeWalker(o,qt,null,!1);for(;t.nextNode();)e++;return e},De=(o,e=-1)=>{for(let t=e+1;t<o.length;t++){const n=o[t];if(pn(n))return t}return-1};function ma(o,e,t=null){const{element:{content:n},parts:r}=o;if(t==null){n.appendChild(e);return}const a=document.createTreeWalker(n,qt,null,!1);let i=De(r),f=0,s=-1;for(;a.nextNode();)for(s++,a.currentNode===t&&(f=ga(e),t.parentNode.insertBefore(e,t));i!==-1&&r[i].index===s;){if(f>0){for(;i!==-1;)r[i].index+=f,i=De(r,i);return}i=De(r,i)}}/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const va=new WeakMap,ya=o=>typeof o=="function"&&va.has(o);/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const Io={},Uo={};/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */class Tt{constructor(e,t,n){this.__parts=[],this.template=e,this.processor=t,this.options=n}update(e){let t=0;for(const n of this.__parts)n!==void 0&&n.setValue(e[t]),t++;for(const n of this.__parts)n!==void 0&&n.commit()}_clone(){const e=Bo?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],n=this.template.parts,r=document.createTreeWalker(e,133,null,!1);let a=0,i=0,f,s=r.nextNode();for(;a<n.length;){if(f=n[a],!pn(f)){this.__parts.push(void 0),a++;continue}for(;i<f.index;)i++,s.nodeName==="TEMPLATE"&&(t.push(s),r.currentNode=s.content),(s=r.nextNode())===null&&(r.currentNode=t.pop(),s=r.nextNode());if(f.type==="node"){const u=this.processor.handleTextExpression(this.options);u.insertAfterNode(s.previousSibling),this.__parts.push(u)}else this.__parts.push(...this.processor.handleAttributeExpressions(s,f.name,f.strings,this.options));a++}return Bo&&(document.adoptNode(e),customElements.upgrade(e)),e}}/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const Mo=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:o=>o}),xa=` ${Z} `;class wa{constructor(e,t,n,r){this.strings=e,this.values=t,this.type=n,this.processor=r}getHTML(){const e=this.strings.length-1;let t="",n=!1;for(let r=0;r<e;r++){const a=this.strings[r],i=a.lastIndexOf("<!--");n=(i>-1||n)&&a.indexOf("-->",i+1)===-1;const f=Ft.exec(a);f===null?t+=a+(n?xa:ln):t+=a.substr(0,f.index)+f[1]+f[2]+je+f[3]+Z}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return Mo!==void 0&&(t=Mo.createHTML(t)),e.innerHTML=t,e}}/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const Sa=o=>o===null||!(typeof o=="object"||typeof o=="function"),_a=o=>Array.isArray(o)||!!(o&&o[Symbol.iterator]);class Kt{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(fe()),this.endNode=e.appendChild(fe())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=fe()),e.__insert(this.endNode=fe())}insertAfterPart(e){e.__insert(this.startNode=fe()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(this.startNode.parentNode===null)return;for(;ya(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=Io,t(this)}const e=this.__pendingValue;e!==Io&&(Sa(e)?e!==this.value&&this.__commitText(e):e instanceof wa?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):_a(e)?this.__commitIterable(e):e===Uo?(this.value=Uo,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling;e=e==null?"":e;const n=typeof e=="string"?e:String(e);t===this.endNode.previousSibling&&t.nodeType===3?t.data=n:this.__commitNode(document.createTextNode(n)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof Tt&&this.value.template===t)this.value.update(e.values);else{const n=new Tt(t,e.processor,this.options),r=n._clone();n.update(e.values),this.__commitNode(r),this.value=n}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let n=0,r;for(const a of e)r=t[n],r===void 0&&(r=new Kt(this.options),t.push(r),n===0?r.appendIntoPart(this):r.insertAfterPart(t[n-1])),r.setValue(a),r.commit(),n++;n<t.length&&(t.length=n,this.clear(r&&r.endNode))}clear(e=this.startNode){Gt(this.startNode.parentNode,e.nextSibling,this.endNode)}}let ka=!1;(()=>{try{const o={get capture(){return ka=!0,!1}};window.addEventListener("test",o,o),window.removeEventListener("test",o,o)}catch{}})();/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function Oa(o){let e=Ve.get(o.type);e===void 0&&(e={stringsArray:new WeakMap,keyString:new Map},Ve.set(o.type,e));let t=e.stringsArray.get(o.strings);if(t!==void 0)return t;const n=o.strings.join(Z);return t=e.keyString.get(n),t===void 0&&(t=new dn(o,o.getTemplateElement()),e.keyString.set(n,t)),e.stringsArray.set(o.strings,t),t}const Ve=new Map;/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const _e=new WeakMap,$a=(o,e,t)=>{let n=_e.get(e);n===void 0&&(Gt(e,e.firstChild),_e.set(e,n=new Kt(Object.assign({templateFactory:Oa},t))),n.appendInto(e)),n.setValue(o),n.commit()};/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */typeof window!="undefined"&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const hn=(o,e)=>`${o}--${e}`;let it=!0;typeof window.ShadyCSS=="undefined"?it=!1:typeof window.ShadyCSS.prepareTemplateDom=="undefined"&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),it=!1);const Ca=o=>e=>{const t=hn(e.type,o);let n=Ve.get(t);n===void 0&&(n={stringsArray:new WeakMap,keyString:new Map},Ve.set(t,n));let r=n.stringsArray.get(e.strings);if(r!==void 0)return r;const a=e.strings.join(Z);if(r=n.keyString.get(a),r===void 0){const i=e.getTemplateElement();it&&window.ShadyCSS.prepareTemplateDom(i,o),r=new dn(e,i),n.keyString.set(a,r)}return n.stringsArray.set(e.strings,r),r},Aa=["html","svg"],Pa=o=>{Aa.forEach(e=>{const t=Ve.get(hn(e,o));t!==void 0&&t.keyString.forEach(n=>{const{element:{content:r}}=n,a=new Set;Array.from(r.querySelectorAll("style")).forEach(i=>{a.add(i)}),bn(n,a)})})},gn=new Set,Ra=(o,e,t)=>{gn.add(o);const n=t?t.element:document.createElement("template"),r=e.querySelectorAll("style"),{length:a}=r;if(a===0){window.ShadyCSS.prepareTemplateStyles(n,o);return}const i=document.createElement("style");for(let u=0;u<a;u++){const d=r[u];d.parentNode.removeChild(d),i.textContent+=d.textContent}Pa(o);const f=n.content;t?ma(t,i,f.firstChild):f.insertBefore(i,f.firstChild),window.ShadyCSS.prepareTemplateStyles(n,o);const s=f.querySelector("style");if(window.ShadyCSS.nativeShadow&&s!==null)e.insertBefore(s.cloneNode(!0),e.firstChild);else if(t){f.insertBefore(i,f.firstChild);const u=new Set;u.add(i),bn(t,u)}},Ea=(o,e,t)=>{if(!t||typeof t!="object"||!t.scopeName)throw new Error("The `scopeName` option is required.");const n=t.scopeName,r=_e.has(e),a=it&&e.nodeType===11&&!!e.host,i=a&&!gn.has(n),f=i?document.createDocumentFragment():e;if($a(o,f,Object.assign({templateFactory:Ca(n)},t)),i){const s=_e.get(f);_e.delete(f);const u=s.value instanceof Tt?s.value.template:void 0;Ra(n,f,u),Gt(e,e.firstChild),e.appendChild(f),_e.set(e,s)}!r&&a&&window.ShadyCSS.styleElement(e.host)};/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */var mn;window.JSCompiler_renameProperty=(o,e)=>o;const Lt={toAttribute(o,e){switch(e){case Boolean:return o?"":null;case Object:case Array:return o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){switch(e){case Boolean:return o!==null;case Number:return o===null?null:Number(o);case Object:case Array:return JSON.parse(o)}return o}},vn=(o,e)=>e!==o&&(e===e||o===o),_t={attribute:!0,type:String,converter:Lt,reflect:!1,hasChanged:vn},kt=1,Ot=1<<2,$t=1<<3,Ct=1<<4,Nt="finalized";class yn extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,n)=>{const r=this._attributeNameForProperty(n,t);r!==void 0&&(this._attributeToPropertyMap.set(r,n),e.push(r))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;e!==void 0&&e.forEach((t,n)=>this._classProperties.set(n,t))}}static createProperty(e,t=_t){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const n=typeof e=="symbol"?Symbol():`__${e}`,r=this.getPropertyDescriptor(e,n,t);r!==void 0&&Object.defineProperty(this.prototype,e,r)}static getPropertyDescriptor(e,t,n){return{get(){return this[t]},set(r){const a=this[e];this[t]=r,this.requestUpdateInternal(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||_t}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty(Nt)||e.finalize(),this[Nt]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,n=[...Object.getOwnPropertyNames(t),...typeof Object.getOwnPropertySymbols=="function"?Object.getOwnPropertySymbols(t):[]];for(const r of n)this.createProperty(r,t[r])}}static _attributeNameForProperty(e,t){const n=t.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}static _valueHasChanged(e,t,n=vn){return n(e,t)}static _propertyValueFromAttribute(e,t){const n=t.type,r=t.converter||Lt,a=typeof r=="function"?r:r.fromAttribute;return a?a(e,n):e}static _propertyValueToAttribute(e,t){if(t.reflect===void 0)return;const n=t.type,r=t.converter;return(r&&r.toAttribute||Lt.toAttribute)(e,n)}initialize(){this._updateState=0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const n=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,n)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){this._enableUpdatingResolver!==void 0&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,n){t!==n&&this._attributeToProperty(e,n)}_propertyToAttribute(e,t,n=_t){const r=this.constructor,a=r._attributeNameForProperty(e,n);if(a!==void 0){const i=r._propertyValueToAttribute(t,n);if(i===void 0)return;this._updateState=this._updateState|$t,i==null?this.removeAttribute(a):this.setAttribute(a,i),this._updateState=this._updateState&~$t}}_attributeToProperty(e,t){if(this._updateState&$t)return;const n=this.constructor,r=n._attributeToPropertyMap.get(e);if(r!==void 0){const a=n.getPropertyOptions(r);this._updateState=this._updateState|Ct,this[r]=n._propertyValueFromAttribute(t,a),this._updateState=this._updateState&~Ct}}requestUpdateInternal(e,t,n){let r=!0;if(e!==void 0){const a=this.constructor;n=n||a.getPropertyOptions(e),a._valueHasChanged(this[e],t,n.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),n.reflect===!0&&!(this._updateState&Ct)&&(this._reflectingProperties===void 0&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,n))):r=!1}!this._hasRequestedUpdate&&r&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=this._updateState|Ot;try{await this._updatePromise}catch{}const e=this.performUpdate();return e!=null&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return this._updateState&Ot}get hasUpdated(){return this._updateState&kt}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(n){throw e=!1,this._markUpdated(),n}e&&(this._updateState&kt||(this._updateState=this._updateState|kt,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~Ot}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){this._reflectingProperties!==void 0&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,n)=>this._propertyToAttribute(n,this[n],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}mn=Nt;yn[mn]=!0;/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const jt=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Wt=Symbol();class Jt{constructor(e,t){if(t!==Wt)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return this._styleSheet===void 0&&(jt?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const Fa=o=>new Jt(String(o),Wt),Ta=o=>{if(o instanceof Jt)return o.cssText;if(typeof o=="number")return o;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${o}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`)},La=(o,...e)=>{const t=e.reduce((n,r,a)=>n+Ta(r)+o[a+1],o[0]);return new Jt(t,Wt)};/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */(window.litElementVersions||(window.litElementVersions=[])).push("2.5.1");const Vo={};class Yt extends yn{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(a,i)=>a.reduceRight((f,s)=>Array.isArray(s)?t(s,f):(f.add(s),f),i),n=t(e,new Set),r=[];n.forEach(a=>r.unshift(a)),this._styles=r}else this._styles=e===void 0?[]:[e];this._styles=this._styles.map(t=>{if(t instanceof CSSStyleSheet&&!jt){const n=Array.prototype.slice.call(t.cssRules).reduce((r,a)=>r+a.cssText,"");return Fa(n)}return t})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow(this.constructor.shadowRootOptions)}adoptStyles(){const e=this.constructor._styles;e.length!==0&&(window.ShadyCSS!==void 0&&!window.ShadyCSS.nativeShadow?window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(t=>t.cssText),this.localName):jt?this.renderRoot.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):this._needsShimAdoptedStyleSheets=!0)}connectedCallback(){super.connectedCallback(),this.hasUpdated&&window.ShadyCSS!==void 0&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==Vo&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(n=>{const r=document.createElement("style");r.textContent=n.cssText,this.renderRoot.appendChild(r)}))}render(){return Vo}}Yt.finalized=!0;Yt.render=Ea;Yt.shadowRootOptions={mode:"open"};var xn=La`
  /*!
 * Font Awesome Free 5.11.2 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 */
  .fa,
  .fas,
  .far,
  .fal,
  .fad,
  .fab {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    line-height: 1;
  }

  .fa-lg {
    font-size: 1.33333em;
    line-height: 0.75em;
    vertical-align: -0.0667em;
  }

  .fa-xs {
    font-size: 0.75em;
  }

  .fa-sm {
    font-size: 0.875em;
  }

  .fa-1x {
    font-size: 1em;
  }

  .fa-2x {
    font-size: 2em;
  }

  .fa-3x {
    font-size: 3em;
  }

  .fa-4x {
    font-size: 4em;
  }

  .fa-5x {
    font-size: 5em;
  }

  .fa-6x {
    font-size: 6em;
  }

  .fa-7x {
    font-size: 7em;
  }

  .fa-8x {
    font-size: 8em;
  }

  .fa-9x {
    font-size: 9em;
  }

  .fa-10x {
    font-size: 10em;
  }

  .fa-fw {
    text-align: center;
    width: 1.25em;
  }

  .fa-ul {
    list-style-type: none;
    margin-left: 2.5em;
    padding-left: 0;
  }
  .fa-ul > li {
    position: relative;
  }

  .fa-li {
    left: -2em;
    position: absolute;
    text-align: center;
    width: 2em;
    line-height: inherit;
  }

  .fa-border {
    border: solid 0.08em #eee;
    border-radius: 0.1em;
    padding: 0.2em 0.25em 0.15em;
  }

  .fa-pull-left {
    float: left;
  }

  .fa-pull-right {
    float: right;
  }

  .fa.fa-pull-left,
  .fas.fa-pull-left,
  .far.fa-pull-left,
  .fal.fa-pull-left,
  .fab.fa-pull-left {
    margin-right: 0.3em;
  }

  .fa.fa-pull-right,
  .fas.fa-pull-right,
  .far.fa-pull-right,
  .fal.fa-pull-right,
  .fab.fa-pull-right {
    margin-left: 0.3em;
  }

  .fa-spin {
    -webkit-animation: fa-spin 2s infinite linear;
    animation: fa-spin 2s infinite linear;
  }

  .fa-pulse {
    -webkit-animation: fa-spin 1s infinite steps(8);
    animation: fa-spin 1s infinite steps(8);
  }

  @-webkit-keyframes fa-spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes fa-spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  .fa-rotate-90 {
    -ms-filter: 'progid:DXImageTransform.Microsoft.BasicImage(rotation=1)';
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
  }

  .fa-rotate-180 {
    -ms-filter: 'progid:DXImageTransform.Microsoft.BasicImage(rotation=2)';
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  .fa-rotate-270 {
    -ms-filter: 'progid:DXImageTransform.Microsoft.BasicImage(rotation=3)';
    -webkit-transform: rotate(270deg);
    transform: rotate(270deg);
  }

  .fa-flip-horizontal {
    -ms-filter: 'progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)';
    -webkit-transform: scale(-1, 1);
    transform: scale(-1, 1);
  }

  .fa-flip-vertical {
    -ms-filter: 'progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)';
    -webkit-transform: scale(1, -1);
    transform: scale(1, -1);
  }

  .fa-flip-both,
  .fa-flip-horizontal.fa-flip-vertical {
    -ms-filter: 'progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)';
    -webkit-transform: scale(-1, -1);
    transform: scale(-1, -1);
  }

  :root .fa-rotate-90,
  :root .fa-rotate-180,
  :root .fa-rotate-270,
  :root .fa-flip-horizontal,
  :root .fa-flip-vertical,
  :root .fa-flip-both {
    -webkit-filter: none;
    filter: none;
  }

  .fa-stack {
    display: inline-block;
    height: 2em;
    line-height: 2em;
    position: relative;
    vertical-align: middle;
    width: 2.5em;
  }

  .fa-stack-1x,
  .fa-stack-2x {
    left: 0;
    position: absolute;
    text-align: center;
    width: 100%;
  }

  .fa-stack-1x {
    line-height: inherit;
  }

  .fa-stack-2x {
    font-size: 2em;
  }

  .fa-inverse {
    color: #fff;
  }

  /* Font Awesome uses the Unicode Private Use Area (PUA) to ensure screen
readers do not read off random characters that represent icons */
  .fa-500px:before {
    content: '\\f26e';
  }

  .fa-accessible-icon:before {
    content: '\\f368';
  }

  .fa-accusoft:before {
    content: '\\f369';
  }

  .fa-acquisitions-incorporated:before {
    content: '\\f6af';
  }

  .fa-ad:before {
    content: '\\f641';
  }

  .fa-address-book:before {
    content: '\\f2b9';
  }

  .fa-address-card:before {
    content: '\\f2bb';
  }

  .fa-adjust:before {
    content: '\\f042';
  }

  .fa-adn:before {
    content: '\\f170';
  }

  .fa-adobe:before {
    content: '\\f778';
  }

  .fa-adversal:before {
    content: '\\f36a';
  }

  .fa-affiliatetheme:before {
    content: '\\f36b';
  }

  .fa-air-freshener:before {
    content: '\\f5d0';
  }

  .fa-airbnb:before {
    content: '\\f834';
  }

  .fa-algolia:before {
    content: '\\f36c';
  }

  .fa-align-center:before {
    content: '\\f037';
  }

  .fa-align-justify:before {
    content: '\\f039';
  }

  .fa-align-left:before {
    content: '\\f036';
  }

  .fa-align-right:before {
    content: '\\f038';
  }

  .fa-alipay:before {
    content: '\\f642';
  }

  .fa-allergies:before {
    content: '\\f461';
  }

  .fa-amazon:before {
    content: '\\f270';
  }

  .fa-amazon-pay:before {
    content: '\\f42c';
  }

  .fa-ambulance:before {
    content: '\\f0f9';
  }

  .fa-american-sign-language-interpreting:before {
    content: '\\f2a3';
  }

  .fa-amilia:before {
    content: '\\f36d';
  }

  .fa-anchor:before {
    content: '\\f13d';
  }

  .fa-android:before {
    content: '\\f17b';
  }

  .fa-angellist:before {
    content: '\\f209';
  }

  .fa-angle-double-down:before {
    content: '\\f103';
  }

  .fa-angle-double-left:before {
    content: '\\f100';
  }

  .fa-angle-double-right:before {
    content: '\\f101';
  }

  .fa-angle-double-up:before {
    content: '\\f102';
  }

  .fa-angle-down:before {
    content: '\\f107';
  }

  .fa-angle-left:before {
    content: '\\f104';
  }

  .fa-angle-right:before {
    content: '\\f105';
  }

  .fa-angle-up:before {
    content: '\\f106';
  }

  .fa-angry:before {
    content: '\\f556';
  }

  .fa-angrycreative:before {
    content: '\\f36e';
  }

  .fa-angular:before {
    content: '\\f420';
  }

  .fa-ankh:before {
    content: '\\f644';
  }

  .fa-app-store:before {
    content: '\\f36f';
  }

  .fa-app-store-ios:before {
    content: '\\f370';
  }

  .fa-apper:before {
    content: '\\f371';
  }

  .fa-apple:before {
    content: '\\f179';
  }

  .fa-apple-alt:before {
    content: '\\f5d1';
  }

  .fa-apple-pay:before {
    content: '\\f415';
  }

  .fa-archive:before {
    content: '\\f187';
  }

  .fa-archway:before {
    content: '\\f557';
  }

  .fa-arrow-alt-circle-down:before {
    content: '\\f358';
  }

  .fa-arrow-alt-circle-left:before {
    content: '\\f359';
  }

  .fa-arrow-alt-circle-right:before {
    content: '\\f35a';
  }

  .fa-arrow-alt-circle-up:before {
    content: '\\f35b';
  }

  .fa-arrow-circle-down:before {
    content: '\\f0ab';
  }

  .fa-arrow-circle-left:before {
    content: '\\f0a8';
  }

  .fa-arrow-circle-right:before {
    content: '\\f0a9';
  }

  .fa-arrow-circle-up:before {
    content: '\\f0aa';
  }

  .fa-arrow-down:before {
    content: '\\f063';
  }

  .fa-arrow-left:before {
    content: '\\f060';
  }

  .fa-arrow-right:before {
    content: '\\f061';
  }

  .fa-arrow-up:before {
    content: '\\f062';
  }

  .fa-arrows-alt:before {
    content: '\\f0b2';
  }

  .fa-arrows-alt-h:before {
    content: '\\f337';
  }

  .fa-arrows-alt-v:before {
    content: '\\f338';
  }

  .fa-artstation:before {
    content: '\\f77a';
  }

  .fa-assistive-listening-systems:before {
    content: '\\f2a2';
  }

  .fa-asterisk:before {
    content: '\\f069';
  }

  .fa-asymmetrik:before {
    content: '\\f372';
  }

  .fa-at:before {
    content: '\\f1fa';
  }

  .fa-atlas:before {
    content: '\\f558';
  }

  .fa-atlassian:before {
    content: '\\f77b';
  }

  .fa-atom:before {
    content: '\\f5d2';
  }

  .fa-audible:before {
    content: '\\f373';
  }

  .fa-audio-description:before {
    content: '\\f29e';
  }

  .fa-autoprefixer:before {
    content: '\\f41c';
  }

  .fa-avianex:before {
    content: '\\f374';
  }

  .fa-aviato:before {
    content: '\\f421';
  }

  .fa-award:before {
    content: '\\f559';
  }

  .fa-aws:before {
    content: '\\f375';
  }

  .fa-baby:before {
    content: '\\f77c';
  }

  .fa-baby-carriage:before {
    content: '\\f77d';
  }

  .fa-backspace:before {
    content: '\\f55a';
  }

  .fa-backward:before {
    content: '\\f04a';
  }

  .fa-bacon:before {
    content: '\\f7e5';
  }

  .fa-balance-scale:before {
    content: '\\f24e';
  }

  .fa-balance-scale-left:before {
    content: '\\f515';
  }

  .fa-balance-scale-right:before {
    content: '\\f516';
  }

  .fa-ban:before {
    content: '\\f05e';
  }

  .fa-band-aid:before {
    content: '\\f462';
  }

  .fa-bandcamp:before {
    content: '\\f2d5';
  }

  .fa-barcode:before {
    content: '\\f02a';
  }

  .fa-bars:before {
    content: '\\f0c9';
  }

  .fa-baseball-ball:before {
    content: '\\f433';
  }

  .fa-basketball-ball:before {
    content: '\\f434';
  }

  .fa-bath:before {
    content: '\\f2cd';
  }

  .fa-battery-empty:before {
    content: '\\f244';
  }

  .fa-battery-full:before {
    content: '\\f240';
  }

  .fa-battery-half:before {
    content: '\\f242';
  }

  .fa-battery-quarter:before {
    content: '\\f243';
  }

  .fa-battery-three-quarters:before {
    content: '\\f241';
  }

  .fa-battle-net:before {
    content: '\\f835';
  }

  .fa-bed:before {
    content: '\\f236';
  }

  .fa-beer:before {
    content: '\\f0fc';
  }

  .fa-behance:before {
    content: '\\f1b4';
  }

  .fa-behance-square:before {
    content: '\\f1b5';
  }

  .fa-bell:before {
    content: '\\f0f3';
  }

  .fa-bell-slash:before {
    content: '\\f1f6';
  }

  .fa-bezier-curve:before {
    content: '\\f55b';
  }

  .fa-bible:before {
    content: '\\f647';
  }

  .fa-bicycle:before {
    content: '\\f206';
  }

  .fa-biking:before {
    content: '\\f84a';
  }

  .fa-bimobject:before {
    content: '\\f378';
  }

  .fa-binoculars:before {
    content: '\\f1e5';
  }

  .fa-biohazard:before {
    content: '\\f780';
  }

  .fa-birthday-cake:before {
    content: '\\f1fd';
  }

  .fa-bitbucket:before {
    content: '\\f171';
  }

  .fa-bitcoin:before {
    content: '\\f379';
  }

  .fa-bity:before {
    content: '\\f37a';
  }

  .fa-black-tie:before {
    content: '\\f27e';
  }

  .fa-blackberry:before {
    content: '\\f37b';
  }

  .fa-blender:before {
    content: '\\f517';
  }

  .fa-blender-phone:before {
    content: '\\f6b6';
  }

  .fa-blind:before {
    content: '\\f29d';
  }

  .fa-blog:before {
    content: '\\f781';
  }

  .fa-blogger:before {
    content: '\\f37c';
  }

  .fa-blogger-b:before {
    content: '\\f37d';
  }

  .fa-bluetooth:before {
    content: '\\f293';
  }

  .fa-bluetooth-b:before {
    content: '\\f294';
  }

  .fa-bold:before {
    content: '\\f032';
  }

  .fa-bolt:before {
    content: '\\f0e7';
  }

  .fa-bomb:before {
    content: '\\f1e2';
  }

  .fa-bone:before {
    content: '\\f5d7';
  }

  .fa-bong:before {
    content: '\\f55c';
  }

  .fa-book:before {
    content: '\\f02d';
  }

  .fa-book-dead:before {
    content: '\\f6b7';
  }

  .fa-book-medical:before {
    content: '\\f7e6';
  }

  .fa-book-open:before {
    content: '\\f518';
  }

  .fa-book-reader:before {
    content: '\\f5da';
  }

  .fa-bookmark:before {
    content: '\\f02e';
  }

  .fa-bootstrap:before {
    content: '\\f836';
  }

  .fa-border-all:before {
    content: '\\f84c';
  }

  .fa-border-none:before {
    content: '\\f850';
  }

  .fa-border-style:before {
    content: '\\f853';
  }

  .fa-bowling-ball:before {
    content: '\\f436';
  }

  .fa-box:before {
    content: '\\f466';
  }

  .fa-box-open:before {
    content: '\\f49e';
  }

  .fa-boxes:before {
    content: '\\f468';
  }

  .fa-braille:before {
    content: '\\f2a1';
  }

  .fa-brain:before {
    content: '\\f5dc';
  }

  .fa-bread-slice:before {
    content: '\\f7ec';
  }

  .fa-briefcase:before {
    content: '\\f0b1';
  }

  .fa-briefcase-medical:before {
    content: '\\f469';
  }

  .fa-broadcast-tower:before {
    content: '\\f519';
  }

  .fa-broom:before {
    content: '\\f51a';
  }

  .fa-brush:before {
    content: '\\f55d';
  }

  .fa-btc:before {
    content: '\\f15a';
  }

  .fa-buffer:before {
    content: '\\f837';
  }

  .fa-bug:before {
    content: '\\f188';
  }

  .fa-building:before {
    content: '\\f1ad';
  }

  .fa-bullhorn:before {
    content: '\\f0a1';
  }

  .fa-bullseye:before {
    content: '\\f140';
  }

  .fa-burn:before {
    content: '\\f46a';
  }

  .fa-buromobelexperte:before {
    content: '\\f37f';
  }

  .fa-bus:before {
    content: '\\f207';
  }

  .fa-bus-alt:before {
    content: '\\f55e';
  }

  .fa-business-time:before {
    content: '\\f64a';
  }

  .fa-buy-n-large:before {
    content: '\\f8a6';
  }

  .fa-buysellads:before {
    content: '\\f20d';
  }

  .fa-calculator:before {
    content: '\\f1ec';
  }

  .fa-calendar:before {
    content: '\\f133';
  }

  .fa-calendar-alt:before {
    content: '\\f073';
  }

  .fa-calendar-check:before {
    content: '\\f274';
  }

  .fa-calendar-day:before {
    content: '\\f783';
  }

  .fa-calendar-minus:before {
    content: '\\f272';
  }

  .fa-calendar-plus:before {
    content: '\\f271';
  }

  .fa-calendar-times:before {
    content: '\\f273';
  }

  .fa-calendar-week:before {
    content: '\\f784';
  }

  .fa-camera:before {
    content: '\\f030';
  }

  .fa-camera-retro:before {
    content: '\\f083';
  }

  .fa-campground:before {
    content: '\\f6bb';
  }

  .fa-canadian-maple-leaf:before {
    content: '\\f785';
  }

  .fa-candy-cane:before {
    content: '\\f786';
  }

  .fa-cannabis:before {
    content: '\\f55f';
  }

  .fa-capsules:before {
    content: '\\f46b';
  }

  .fa-car:before {
    content: '\\f1b9';
  }

  .fa-car-alt:before {
    content: '\\f5de';
  }

  .fa-car-battery:before {
    content: '\\f5df';
  }

  .fa-car-crash:before {
    content: '\\f5e1';
  }

  .fa-car-side:before {
    content: '\\f5e4';
  }

  .fa-caret-down:before {
    content: '\\f0d7';
  }

  .fa-caret-left:before {
    content: '\\f0d9';
  }

  .fa-caret-right:before {
    content: '\\f0da';
  }

  .fa-caret-square-down:before {
    content: '\\f150';
  }

  .fa-caret-square-left:before {
    content: '\\f191';
  }

  .fa-caret-square-right:before {
    content: '\\f152';
  }

  .fa-caret-square-up:before {
    content: '\\f151';
  }

  .fa-caret-up:before {
    content: '\\f0d8';
  }

  .fa-carrot:before {
    content: '\\f787';
  }

  .fa-cart-arrow-down:before {
    content: '\\f218';
  }

  .fa-cart-plus:before {
    content: '\\f217';
  }

  .fa-cash-register:before {
    content: '\\f788';
  }

  .fa-cat:before {
    content: '\\f6be';
  }

  .fa-cc-amazon-pay:before {
    content: '\\f42d';
  }

  .fa-cc-amex:before {
    content: '\\f1f3';
  }

  .fa-cc-apple-pay:before {
    content: '\\f416';
  }

  .fa-cc-diners-club:before {
    content: '\\f24c';
  }

  .fa-cc-discover:before {
    content: '\\f1f2';
  }

  .fa-cc-jcb:before {
    content: '\\f24b';
  }

  .fa-cc-mastercard:before {
    content: '\\f1f1';
  }

  .fa-cc-paypal:before {
    content: '\\f1f4';
  }

  .fa-cc-stripe:before {
    content: '\\f1f5';
  }

  .fa-cc-visa:before {
    content: '\\f1f0';
  }

  .fa-centercode:before {
    content: '\\f380';
  }

  .fa-centos:before {
    content: '\\f789';
  }

  .fa-certificate:before {
    content: '\\f0a3';
  }

  .fa-chair:before {
    content: '\\f6c0';
  }

  .fa-chalkboard:before {
    content: '\\f51b';
  }

  .fa-chalkboard-teacher:before {
    content: '\\f51c';
  }

  .fa-charging-station:before {
    content: '\\f5e7';
  }

  .fa-chart-area:before {
    content: '\\f1fe';
  }

  .fa-chart-bar:before {
    content: '\\f080';
  }

  .fa-chart-line:before {
    content: '\\f201';
  }

  .fa-chart-pie:before {
    content: '\\f200';
  }

  .fa-check:before {
    content: '\\f00c';
  }

  .fa-check-circle:before {
    content: '\\f058';
  }

  .fa-check-double:before {
    content: '\\f560';
  }

  .fa-check-square:before {
    content: '\\f14a';
  }

  .fa-cheese:before {
    content: '\\f7ef';
  }

  .fa-chess:before {
    content: '\\f439';
  }

  .fa-chess-bishop:before {
    content: '\\f43a';
  }

  .fa-chess-board:before {
    content: '\\f43c';
  }

  .fa-chess-king:before {
    content: '\\f43f';
  }

  .fa-chess-knight:before {
    content: '\\f441';
  }

  .fa-chess-pawn:before {
    content: '\\f443';
  }

  .fa-chess-queen:before {
    content: '\\f445';
  }

  .fa-chess-rook:before {
    content: '\\f447';
  }

  .fa-chevron-circle-down:before {
    content: '\\f13a';
  }

  .fa-chevron-circle-left:before {
    content: '\\f137';
  }

  .fa-chevron-circle-right:before {
    content: '\\f138';
  }

  .fa-chevron-circle-up:before {
    content: '\\f139';
  }

  .fa-chevron-down:before {
    content: '\\f078';
  }

  .fa-chevron-left:before {
    content: '\\f053';
  }

  .fa-chevron-right:before {
    content: '\\f054';
  }

  .fa-chevron-up:before {
    content: '\\f077';
  }

  .fa-child:before {
    content: '\\f1ae';
  }

  .fa-chrome:before {
    content: '\\f268';
  }

  .fa-chromecast:before {
    content: '\\f838';
  }

  .fa-church:before {
    content: '\\f51d';
  }

  .fa-circle:before {
    content: '\\f111';
  }

  .fa-circle-notch:before {
    content: '\\f1ce';
  }

  .fa-city:before {
    content: '\\f64f';
  }

  .fa-clinic-medical:before {
    content: '\\f7f2';
  }

  .fa-clipboard:before {
    content: '\\f328';
  }

  .fa-clipboard-check:before {
    content: '\\f46c';
  }

  .fa-clipboard-list:before {
    content: '\\f46d';
  }

  .fa-clock:before {
    content: '\\f017';
  }

  .fa-clone:before {
    content: '\\f24d';
  }

  .fa-closed-captioning:before {
    content: '\\f20a';
  }

  .fa-cloud:before {
    content: '\\f0c2';
  }

  .fa-cloud-download-alt:before {
    content: '\\f381';
  }

  .fa-cloud-meatball:before {
    content: '\\f73b';
  }

  .fa-cloud-moon:before {
    content: '\\f6c3';
  }

  .fa-cloud-moon-rain:before {
    content: '\\f73c';
  }

  .fa-cloud-rain:before {
    content: '\\f73d';
  }

  .fa-cloud-showers-heavy:before {
    content: '\\f740';
  }

  .fa-cloud-sun:before {
    content: '\\f6c4';
  }

  .fa-cloud-sun-rain:before {
    content: '\\f743';
  }

  .fa-cloud-upload-alt:before {
    content: '\\f382';
  }

  .fa-cloudscale:before {
    content: '\\f383';
  }

  .fa-cloudsmith:before {
    content: '\\f384';
  }

  .fa-cloudversify:before {
    content: '\\f385';
  }

  .fa-cocktail:before {
    content: '\\f561';
  }

  .fa-code:before {
    content: '\\f121';
  }

  .fa-code-branch:before {
    content: '\\f126';
  }

  .fa-codepen:before {
    content: '\\f1cb';
  }

  .fa-codiepie:before {
    content: '\\f284';
  }

  .fa-coffee:before {
    content: '\\f0f4';
  }

  .fa-cog:before {
    content: '\\f013';
  }

  .fa-cogs:before {
    content: '\\f085';
  }

  .fa-coins:before {
    content: '\\f51e';
  }

  .fa-columns:before {
    content: '\\f0db';
  }

  .fa-comment:before {
    content: '\\f075';
  }

  .fa-comment-alt:before {
    content: '\\f27a';
  }

  .fa-comment-dollar:before {
    content: '\\f651';
  }

  .fa-comment-dots:before {
    content: '\\f4ad';
  }

  .fa-comment-medical:before {
    content: '\\f7f5';
  }

  .fa-comment-slash:before {
    content: '\\f4b3';
  }

  .fa-comments:before {
    content: '\\f086';
  }

  .fa-comments-dollar:before {
    content: '\\f653';
  }

  .fa-compact-disc:before {
    content: '\\f51f';
  }

  .fa-compass:before {
    content: '\\f14e';
  }

  .fa-compress:before {
    content: '\\f066';
  }

  .fa-compress-arrows-alt:before {
    content: '\\f78c';
  }

  .fa-concierge-bell:before {
    content: '\\f562';
  }

  .fa-confluence:before {
    content: '\\f78d';
  }

  .fa-connectdevelop:before {
    content: '\\f20e';
  }

  .fa-contao:before {
    content: '\\f26d';
  }

  .fa-cookie:before {
    content: '\\f563';
  }

  .fa-cookie-bite:before {
    content: '\\f564';
  }

  .fa-copy:before {
    content: '\\f0c5';
  }

  .fa-copyright:before {
    content: '\\f1f9';
  }

  .fa-cotton-bureau:before {
    content: '\\f89e';
  }

  .fa-couch:before {
    content: '\\f4b8';
  }

  .fa-cpanel:before {
    content: '\\f388';
  }

  .fa-creative-commons:before {
    content: '\\f25e';
  }

  .fa-creative-commons-by:before {
    content: '\\f4e7';
  }

  .fa-creative-commons-nc:before {
    content: '\\f4e8';
  }

  .fa-creative-commons-nc-eu:before {
    content: '\\f4e9';
  }

  .fa-creative-commons-nc-jp:before {
    content: '\\f4ea';
  }

  .fa-creative-commons-nd:before {
    content: '\\f4eb';
  }

  .fa-creative-commons-pd:before {
    content: '\\f4ec';
  }

  .fa-creative-commons-pd-alt:before {
    content: '\\f4ed';
  }

  .fa-creative-commons-remix:before {
    content: '\\f4ee';
  }

  .fa-creative-commons-sa:before {
    content: '\\f4ef';
  }

  .fa-creative-commons-sampling:before {
    content: '\\f4f0';
  }

  .fa-creative-commons-sampling-plus:before {
    content: '\\f4f1';
  }

  .fa-creative-commons-share:before {
    content: '\\f4f2';
  }

  .fa-creative-commons-zero:before {
    content: '\\f4f3';
  }

  .fa-credit-card:before {
    content: '\\f09d';
  }

  .fa-critical-role:before {
    content: '\\f6c9';
  }

  .fa-crop:before {
    content: '\\f125';
  }

  .fa-crop-alt:before {
    content: '\\f565';
  }

  .fa-cross:before {
    content: '\\f654';
  }

  .fa-crosshairs:before {
    content: '\\f05b';
  }

  .fa-crow:before {
    content: '\\f520';
  }

  .fa-crown:before {
    content: '\\f521';
  }

  .fa-crutch:before {
    content: '\\f7f7';
  }

  .fa-css3:before {
    content: '\\f13c';
  }

  .fa-css3-alt:before {
    content: '\\f38b';
  }

  .fa-cube:before {
    content: '\\f1b2';
  }

  .fa-cubes:before {
    content: '\\f1b3';
  }

  .fa-cut:before {
    content: '\\f0c4';
  }

  .fa-cuttlefish:before {
    content: '\\f38c';
  }

  .fa-d-and-d:before {
    content: '\\f38d';
  }

  .fa-d-and-d-beyond:before {
    content: '\\f6ca';
  }

  .fa-dashcube:before {
    content: '\\f210';
  }

  .fa-database:before {
    content: '\\f1c0';
  }

  .fa-deaf:before {
    content: '\\f2a4';
  }

  .fa-delicious:before {
    content: '\\f1a5';
  }

  .fa-democrat:before {
    content: '\\f747';
  }

  .fa-deploydog:before {
    content: '\\f38e';
  }

  .fa-deskpro:before {
    content: '\\f38f';
  }

  .fa-desktop:before {
    content: '\\f108';
  }

  .fa-dev:before {
    content: '\\f6cc';
  }

  .fa-deviantart:before {
    content: '\\f1bd';
  }

  .fa-dharmachakra:before {
    content: '\\f655';
  }

  .fa-dhl:before {
    content: '\\f790';
  }

  .fa-diagnoses:before {
    content: '\\f470';
  }

  .fa-diaspora:before {
    content: '\\f791';
  }

  .fa-dice:before {
    content: '\\f522';
  }

  .fa-dice-d20:before {
    content: '\\f6cf';
  }

  .fa-dice-d6:before {
    content: '\\f6d1';
  }

  .fa-dice-five:before {
    content: '\\f523';
  }

  .fa-dice-four:before {
    content: '\\f524';
  }

  .fa-dice-one:before {
    content: '\\f525';
  }

  .fa-dice-six:before {
    content: '\\f526';
  }

  .fa-dice-three:before {
    content: '\\f527';
  }

  .fa-dice-two:before {
    content: '\\f528';
  }

  .fa-digg:before {
    content: '\\f1a6';
  }

  .fa-digital-ocean:before {
    content: '\\f391';
  }

  .fa-digital-tachograph:before {
    content: '\\f566';
  }

  .fa-directions:before {
    content: '\\f5eb';
  }

  .fa-discord:before {
    content: '\\f392';
  }

  .fa-discourse:before {
    content: '\\f393';
  }

  .fa-divide:before {
    content: '\\f529';
  }

  .fa-dizzy:before {
    content: '\\f567';
  }

  .fa-dna:before {
    content: '\\f471';
  }

  .fa-dochub:before {
    content: '\\f394';
  }

  .fa-docker:before {
    content: '\\f395';
  }

  .fa-dog:before {
    content: '\\f6d3';
  }

  .fa-dollar-sign:before {
    content: '\\f155';
  }

  .fa-dolly:before {
    content: '\\f472';
  }

  .fa-dolly-flatbed:before {
    content: '\\f474';
  }

  .fa-donate:before {
    content: '\\f4b9';
  }

  .fa-door-closed:before {
    content: '\\f52a';
  }

  .fa-door-open:before {
    content: '\\f52b';
  }

  .fa-dot-circle:before {
    content: '\\f192';
  }

  .fa-dove:before {
    content: '\\f4ba';
  }

  .fa-download:before {
    content: '\\f019';
  }

  .fa-draft2digital:before {
    content: '\\f396';
  }

  .fa-drafting-compass:before {
    content: '\\f568';
  }

  .fa-dragon:before {
    content: '\\f6d5';
  }

  .fa-draw-polygon:before {
    content: '\\f5ee';
  }

  .fa-dribbble:before {
    content: '\\f17d';
  }

  .fa-dribbble-square:before {
    content: '\\f397';
  }

  .fa-dropbox:before {
    content: '\\f16b';
  }

  .fa-drum:before {
    content: '\\f569';
  }

  .fa-drum-steelpan:before {
    content: '\\f56a';
  }

  .fa-drumstick-bite:before {
    content: '\\f6d7';
  }

  .fa-drupal:before {
    content: '\\f1a9';
  }

  .fa-dumbbell:before {
    content: '\\f44b';
  }

  .fa-dumpster:before {
    content: '\\f793';
  }

  .fa-dumpster-fire:before {
    content: '\\f794';
  }

  .fa-dungeon:before {
    content: '\\f6d9';
  }

  .fa-dyalog:before {
    content: '\\f399';
  }

  .fa-earlybirds:before {
    content: '\\f39a';
  }

  .fa-ebay:before {
    content: '\\f4f4';
  }

  .fa-edge:before {
    content: '\\f282';
  }

  .fa-edit:before {
    content: '\\f044';
  }

  .fa-egg:before {
    content: '\\f7fb';
  }

  .fa-eject:before {
    content: '\\f052';
  }

  .fa-elementor:before {
    content: '\\f430';
  }

  .fa-ellipsis-h:before {
    content: '\\f141';
  }

  .fa-ellipsis-v:before {
    content: '\\f142';
  }

  .fa-ello:before {
    content: '\\f5f1';
  }

  .fa-ember:before {
    content: '\\f423';
  }

  .fa-empire:before {
    content: '\\f1d1';
  }

  .fa-envelope:before {
    content: '\\f0e0';
  }

  .fa-envelope-open:before {
    content: '\\f2b6';
  }

  .fa-envelope-open-text:before {
    content: '\\f658';
  }

  .fa-envelope-square:before {
    content: '\\f199';
  }

  .fa-envira:before {
    content: '\\f299';
  }

  .fa-equals:before {
    content: '\\f52c';
  }

  .fa-eraser:before {
    content: '\\f12d';
  }

  .fa-erlang:before {
    content: '\\f39d';
  }

  .fa-ethereum:before {
    content: '\\f42e';
  }

  .fa-ethernet:before {
    content: '\\f796';
  }

  .fa-etsy:before {
    content: '\\f2d7';
  }

  .fa-euro-sign:before {
    content: '\\f153';
  }

  .fa-evernote:before {
    content: '\\f839';
  }

  .fa-exchange-alt:before {
    content: '\\f362';
  }

  .fa-exclamation:before {
    content: '\\f12a';
  }

  .fa-exclamation-circle:before {
    content: '\\f06a';
  }

  .fa-exclamation-triangle:before {
    content: '\\f071';
  }

  .fa-expand:before {
    content: '\\f065';
  }

  .fa-expand-arrows-alt:before {
    content: '\\f31e';
  }

  .fa-expeditedssl:before {
    content: '\\f23e';
  }

  .fa-external-link-alt:before {
    content: '\\f35d';
  }

  .fa-external-link-square-alt:before {
    content: '\\f360';
  }

  .fa-eye:before {
    content: '\\f06e';
  }

  .fa-eye-dropper:before {
    content: '\\f1fb';
  }

  .fa-eye-slash:before {
    content: '\\f070';
  }

  .fa-facebook:before {
    content: '\\f09a';
  }

  .fa-facebook-f:before {
    content: '\\f39e';
  }

  .fa-facebook-messenger:before {
    content: '\\f39f';
  }

  .fa-facebook-square:before {
    content: '\\f082';
  }

  .fa-fan:before {
    content: '\\f863';
  }

  .fa-fantasy-flight-games:before {
    content: '\\f6dc';
  }

  .fa-fast-backward:before {
    content: '\\f049';
  }

  .fa-fast-forward:before {
    content: '\\f050';
  }

  .fa-fax:before {
    content: '\\f1ac';
  }

  .fa-feather:before {
    content: '\\f52d';
  }

  .fa-feather-alt:before {
    content: '\\f56b';
  }

  .fa-fedex:before {
    content: '\\f797';
  }

  .fa-fedora:before {
    content: '\\f798';
  }

  .fa-female:before {
    content: '\\f182';
  }

  .fa-fighter-jet:before {
    content: '\\f0fb';
  }

  .fa-figma:before {
    content: '\\f799';
  }

  .fa-file:before {
    content: '\\f15b';
  }

  .fa-file-alt:before {
    content: '\\f15c';
  }

  .fa-file-archive:before {
    content: '\\f1c6';
  }

  .fa-file-audio:before {
    content: '\\f1c7';
  }

  .fa-file-code:before {
    content: '\\f1c9';
  }

  .fa-file-contract:before {
    content: '\\f56c';
  }

  .fa-file-csv:before {
    content: '\\f6dd';
  }

  .fa-file-download:before {
    content: '\\f56d';
  }

  .fa-file-excel:before {
    content: '\\f1c3';
  }

  .fa-file-export:before {
    content: '\\f56e';
  }

  .fa-file-image:before {
    content: '\\f1c5';
  }

  .fa-file-import:before {
    content: '\\f56f';
  }

  .fa-file-invoice:before {
    content: '\\f570';
  }

  .fa-file-invoice-dollar:before {
    content: '\\f571';
  }

  .fa-file-medical:before {
    content: '\\f477';
  }

  .fa-file-medical-alt:before {
    content: '\\f478';
  }

  .fa-file-pdf:before {
    content: '\\f1c1';
  }

  .fa-file-powerpoint:before {
    content: '\\f1c4';
  }

  .fa-file-prescription:before {
    content: '\\f572';
  }

  .fa-file-signature:before {
    content: '\\f573';
  }

  .fa-file-upload:before {
    content: '\\f574';
  }

  .fa-file-video:before {
    content: '\\f1c8';
  }

  .fa-file-word:before {
    content: '\\f1c2';
  }

  .fa-fill:before {
    content: '\\f575';
  }

  .fa-fill-drip:before {
    content: '\\f576';
  }

  .fa-film:before {
    content: '\\f008';
  }

  .fa-filter:before {
    content: '\\f0b0';
  }

  .fa-fingerprint:before {
    content: '\\f577';
  }

  .fa-fire:before {
    content: '\\f06d';
  }

  .fa-fire-alt:before {
    content: '\\f7e4';
  }

  .fa-fire-extinguisher:before {
    content: '\\f134';
  }

  .fa-firefox:before {
    content: '\\f269';
  }

  .fa-first-aid:before {
    content: '\\f479';
  }

  .fa-first-order:before {
    content: '\\f2b0';
  }

  .fa-first-order-alt:before {
    content: '\\f50a';
  }

  .fa-firstdraft:before {
    content: '\\f3a1';
  }

  .fa-fish:before {
    content: '\\f578';
  }

  .fa-fist-raised:before {
    content: '\\f6de';
  }

  .fa-flag:before {
    content: '\\f024';
  }

  .fa-flag-checkered:before {
    content: '\\f11e';
  }

  .fa-flag-usa:before {
    content: '\\f74d';
  }

  .fa-flask:before {
    content: '\\f0c3';
  }

  .fa-flickr:before {
    content: '\\f16e';
  }

  .fa-flipboard:before {
    content: '\\f44d';
  }

  .fa-flushed:before {
    content: '\\f579';
  }

  .fa-fly:before {
    content: '\\f417';
  }

  .fa-folder:before {
    content: '\\f07b';
  }

  .fa-folder-minus:before {
    content: '\\f65d';
  }

  .fa-folder-open:before {
    content: '\\f07c';
  }

  .fa-folder-plus:before {
    content: '\\f65e';
  }

  .fa-font:before {
    content: '\\f031';
  }

  .fa-font-awesome:before {
    content: '\\f2b4';
  }

  .fa-font-awesome-alt:before {
    content: '\\f35c';
  }

  .fa-font-awesome-flag:before {
    content: '\\f425';
  }

  .fa-font-awesome-logo-full:before {
    content: '\\f4e6';
  }

  .fa-fonticons:before {
    content: '\\f280';
  }

  .fa-fonticons-fi:before {
    content: '\\f3a2';
  }

  .fa-football-ball:before {
    content: '\\f44e';
  }

  .fa-fort-awesome:before {
    content: '\\f286';
  }

  .fa-fort-awesome-alt:before {
    content: '\\f3a3';
  }

  .fa-forumbee:before {
    content: '\\f211';
  }

  .fa-forward:before {
    content: '\\f04e';
  }

  .fa-foursquare:before {
    content: '\\f180';
  }

  .fa-free-code-camp:before {
    content: '\\f2c5';
  }

  .fa-freebsd:before {
    content: '\\f3a4';
  }

  .fa-frog:before {
    content: '\\f52e';
  }

  .fa-frown:before {
    content: '\\f119';
  }

  .fa-frown-open:before {
    content: '\\f57a';
  }

  .fa-fulcrum:before {
    content: '\\f50b';
  }

  .fa-funnel-dollar:before {
    content: '\\f662';
  }

  .fa-futbol:before {
    content: '\\f1e3';
  }

  .fa-galactic-republic:before {
    content: '\\f50c';
  }

  .fa-galactic-senate:before {
    content: '\\f50d';
  }

  .fa-gamepad:before {
    content: '\\f11b';
  }

  .fa-gas-pump:before {
    content: '\\f52f';
  }

  .fa-gavel:before {
    content: '\\f0e3';
  }

  .fa-gem:before {
    content: '\\f3a5';
  }

  .fa-genderless:before {
    content: '\\f22d';
  }

  .fa-get-pocket:before {
    content: '\\f265';
  }

  .fa-gg:before {
    content: '\\f260';
  }

  .fa-gg-circle:before {
    content: '\\f261';
  }

  .fa-ghost:before {
    content: '\\f6e2';
  }

  .fa-gift:before {
    content: '\\f06b';
  }

  .fa-gifts:before {
    content: '\\f79c';
  }

  .fa-git:before {
    content: '\\f1d3';
  }

  .fa-git-alt:before {
    content: '\\f841';
  }

  .fa-git-square:before {
    content: '\\f1d2';
  }

  .fa-github:before {
    content: '\\f09b';
  }

  .fa-github-alt:before {
    content: '\\f113';
  }

  .fa-github-square:before {
    content: '\\f092';
  }

  .fa-gitkraken:before {
    content: '\\f3a6';
  }

  .fa-gitlab:before {
    content: '\\f296';
  }

  .fa-gitter:before {
    content: '\\f426';
  }

  .fa-glass-cheers:before {
    content: '\\f79f';
  }

  .fa-glass-martini:before {
    content: '\\f000';
  }

  .fa-glass-martini-alt:before {
    content: '\\f57b';
  }

  .fa-glass-whiskey:before {
    content: '\\f7a0';
  }

  .fa-glasses:before {
    content: '\\f530';
  }

  .fa-glide:before {
    content: '\\f2a5';
  }

  .fa-glide-g:before {
    content: '\\f2a6';
  }

  .fa-globe:before {
    content: '\\f0ac';
  }

  .fa-globe-africa:before {
    content: '\\f57c';
  }

  .fa-globe-americas:before {
    content: '\\f57d';
  }

  .fa-globe-asia:before {
    content: '\\f57e';
  }

  .fa-globe-europe:before {
    content: '\\f7a2';
  }

  .fa-gofore:before {
    content: '\\f3a7';
  }

  .fa-golf-ball:before {
    content: '\\f450';
  }

  .fa-goodreads:before {
    content: '\\f3a8';
  }

  .fa-goodreads-g:before {
    content: '\\f3a9';
  }

  .fa-google:before {
    content: '\\f1a0';
  }

  .fa-google-drive:before {
    content: '\\f3aa';
  }

  .fa-google-play:before {
    content: '\\f3ab';
  }

  .fa-google-plus:before {
    content: '\\f2b3';
  }

  .fa-google-plus-g:before {
    content: '\\f0d5';
  }

  .fa-google-plus-square:before {
    content: '\\f0d4';
  }

  .fa-google-wallet:before {
    content: '\\f1ee';
  }

  .fa-gopuram:before {
    content: '\\f664';
  }

  .fa-graduation-cap:before {
    content: '\\f19d';
  }

  .fa-gratipay:before {
    content: '\\f184';
  }

  .fa-grav:before {
    content: '\\f2d6';
  }

  .fa-greater-than:before {
    content: '\\f531';
  }

  .fa-greater-than-equal:before {
    content: '\\f532';
  }

  .fa-grimace:before {
    content: '\\f57f';
  }

  .fa-grin:before {
    content: '\\f580';
  }

  .fa-grin-alt:before {
    content: '\\f581';
  }

  .fa-grin-beam:before {
    content: '\\f582';
  }

  .fa-grin-beam-sweat:before {
    content: '\\f583';
  }

  .fa-grin-hearts:before {
    content: '\\f584';
  }

  .fa-grin-squint:before {
    content: '\\f585';
  }

  .fa-grin-squint-tears:before {
    content: '\\f586';
  }

  .fa-grin-stars:before {
    content: '\\f587';
  }

  .fa-grin-tears:before {
    content: '\\f588';
  }

  .fa-grin-tongue:before {
    content: '\\f589';
  }

  .fa-grin-tongue-squint:before {
    content: '\\f58a';
  }

  .fa-grin-tongue-wink:before {
    content: '\\f58b';
  }

  .fa-grin-wink:before {
    content: '\\f58c';
  }

  .fa-grip-horizontal:before {
    content: '\\f58d';
  }

  .fa-grip-lines:before {
    content: '\\f7a4';
  }

  .fa-grip-lines-vertical:before {
    content: '\\f7a5';
  }

  .fa-grip-vertical:before {
    content: '\\f58e';
  }

  .fa-gripfire:before {
    content: '\\f3ac';
  }

  .fa-grunt:before {
    content: '\\f3ad';
  }

  .fa-guitar:before {
    content: '\\f7a6';
  }

  .fa-gulp:before {
    content: '\\f3ae';
  }

  .fa-h-square:before {
    content: '\\f0fd';
  }

  .fa-hacker-news:before {
    content: '\\f1d4';
  }

  .fa-hacker-news-square:before {
    content: '\\f3af';
  }

  .fa-hackerrank:before {
    content: '\\f5f7';
  }

  .fa-hamburger:before {
    content: '\\f805';
  }

  .fa-hammer:before {
    content: '\\f6e3';
  }

  .fa-hamsa:before {
    content: '\\f665';
  }

  .fa-hand-holding:before {
    content: '\\f4bd';
  }

  .fa-hand-holding-heart:before {
    content: '\\f4be';
  }

  .fa-hand-holding-usd:before {
    content: '\\f4c0';
  }

  .fa-hand-lizard:before {
    content: '\\f258';
  }

  .fa-hand-middle-finger:before {
    content: '\\f806';
  }

  .fa-hand-paper:before {
    content: '\\f256';
  }

  .fa-hand-peace:before {
    content: '\\f25b';
  }

  .fa-hand-point-down:before {
    content: '\\f0a7';
  }

  .fa-hand-point-left:before {
    content: '\\f0a5';
  }

  .fa-hand-point-right:before {
    content: '\\f0a4';
  }

  .fa-hand-point-up:before {
    content: '\\f0a6';
  }

  .fa-hand-pointer:before {
    content: '\\f25a';
  }

  .fa-hand-rock:before {
    content: '\\f255';
  }

  .fa-hand-scissors:before {
    content: '\\f257';
  }

  .fa-hand-spock:before {
    content: '\\f259';
  }

  .fa-hands:before {
    content: '\\f4c2';
  }

  .fa-hands-helping:before {
    content: '\\f4c4';
  }

  .fa-handshake:before {
    content: '\\f2b5';
  }

  .fa-hanukiah:before {
    content: '\\f6e6';
  }

  .fa-hard-hat:before {
    content: '\\f807';
  }

  .fa-hashtag:before {
    content: '\\f292';
  }

  .fa-hat-cowboy:before {
    content: '\\f8c0';
  }

  .fa-hat-cowboy-side:before {
    content: '\\f8c1';
  }

  .fa-hat-wizard:before {
    content: '\\f6e8';
  }

  .fa-haykal:before {
    content: '\\f666';
  }

  .fa-hdd:before {
    content: '\\f0a0';
  }

  .fa-heading:before {
    content: '\\f1dc';
  }

  .fa-headphones:before {
    content: '\\f025';
  }

  .fa-headphones-alt:before {
    content: '\\f58f';
  }

  .fa-headset:before {
    content: '\\f590';
  }

  .fa-heart:before {
    content: '\\f004';
  }

  .fa-heart-broken:before {
    content: '\\f7a9';
  }

  .fa-heartbeat:before {
    content: '\\f21e';
  }

  .fa-helicopter:before {
    content: '\\f533';
  }

  .fa-highlighter:before {
    content: '\\f591';
  }

  .fa-hiking:before {
    content: '\\f6ec';
  }

  .fa-hippo:before {
    content: '\\f6ed';
  }

  .fa-hips:before {
    content: '\\f452';
  }

  .fa-hire-a-helper:before {
    content: '\\f3b0';
  }

  .fa-history:before {
    content: '\\f1da';
  }

  .fa-hockey-puck:before {
    content: '\\f453';
  }

  .fa-holly-berry:before {
    content: '\\f7aa';
  }

  .fa-home:before {
    content: '\\f015';
  }

  .fa-hooli:before {
    content: '\\f427';
  }

  .fa-hornbill:before {
    content: '\\f592';
  }

  .fa-horse:before {
    content: '\\f6f0';
  }

  .fa-horse-head:before {
    content: '\\f7ab';
  }

  .fa-hospital:before {
    content: '\\f0f8';
  }

  .fa-hospital-alt:before {
    content: '\\f47d';
  }

  .fa-hospital-symbol:before {
    content: '\\f47e';
  }

  .fa-hot-tub:before {
    content: '\\f593';
  }

  .fa-hotdog:before {
    content: '\\f80f';
  }

  .fa-hotel:before {
    content: '\\f594';
  }

  .fa-hotjar:before {
    content: '\\f3b1';
  }

  .fa-hourglass:before {
    content: '\\f254';
  }

  .fa-hourglass-end:before {
    content: '\\f253';
  }

  .fa-hourglass-half:before {
    content: '\\f252';
  }

  .fa-hourglass-start:before {
    content: '\\f251';
  }

  .fa-house-damage:before {
    content: '\\f6f1';
  }

  .fa-houzz:before {
    content: '\\f27c';
  }

  .fa-hryvnia:before {
    content: '\\f6f2';
  }

  .fa-html5:before {
    content: '\\f13b';
  }

  .fa-hubspot:before {
    content: '\\f3b2';
  }

  .fa-i-cursor:before {
    content: '\\f246';
  }

  .fa-ice-cream:before {
    content: '\\f810';
  }

  .fa-icicles:before {
    content: '\\f7ad';
  }

  .fa-icons:before {
    content: '\\f86d';
  }

  .fa-id-badge:before {
    content: '\\f2c1';
  }

  .fa-id-card:before {
    content: '\\f2c2';
  }

  .fa-id-card-alt:before {
    content: '\\f47f';
  }

  .fa-igloo:before {
    content: '\\f7ae';
  }

  .fa-image:before {
    content: '\\f03e';
  }

  .fa-images:before {
    content: '\\f302';
  }

  .fa-imdb:before {
    content: '\\f2d8';
  }

  .fa-inbox:before {
    content: '\\f01c';
  }

  .fa-indent:before {
    content: '\\f03c';
  }

  .fa-industry:before {
    content: '\\f275';
  }

  .fa-infinity:before {
    content: '\\f534';
  }

  .fa-info:before {
    content: '\\f129';
  }

  .fa-info-circle:before {
    content: '\\f05a';
  }

  .fa-instagram:before {
    content: '\\f16d';
  }

  .fa-intercom:before {
    content: '\\f7af';
  }

  .fa-internet-explorer:before {
    content: '\\f26b';
  }

  .fa-invision:before {
    content: '\\f7b0';
  }

  .fa-ioxhost:before {
    content: '\\f208';
  }

  .fa-italic:before {
    content: '\\f033';
  }

  .fa-itch-io:before {
    content: '\\f83a';
  }

  .fa-itunes:before {
    content: '\\f3b4';
  }

  .fa-itunes-note:before {
    content: '\\f3b5';
  }

  .fa-java:before {
    content: '\\f4e4';
  }

  .fa-jedi:before {
    content: '\\f669';
  }

  .fa-jedi-order:before {
    content: '\\f50e';
  }

  .fa-jenkins:before {
    content: '\\f3b6';
  }

  .fa-jira:before {
    content: '\\f7b1';
  }

  .fa-joget:before {
    content: '\\f3b7';
  }

  .fa-joint:before {
    content: '\\f595';
  }

  .fa-joomla:before {
    content: '\\f1aa';
  }

  .fa-journal-whills:before {
    content: '\\f66a';
  }

  .fa-js:before {
    content: '\\f3b8';
  }

  .fa-js-square:before {
    content: '\\f3b9';
  }

  .fa-jsfiddle:before {
    content: '\\f1cc';
  }

  .fa-kaaba:before {
    content: '\\f66b';
  }

  .fa-kaggle:before {
    content: '\\f5fa';
  }

  .fa-key:before {
    content: '\\f084';
  }

  .fa-keybase:before {
    content: '\\f4f5';
  }

  .fa-keyboard:before {
    content: '\\f11c';
  }

  .fa-keycdn:before {
    content: '\\f3ba';
  }

  .fa-khanda:before {
    content: '\\f66d';
  }

  .fa-kickstarter:before {
    content: '\\f3bb';
  }

  .fa-kickstarter-k:before {
    content: '\\f3bc';
  }

  .fa-kiss:before {
    content: '\\f596';
  }

  .fa-kiss-beam:before {
    content: '\\f597';
  }

  .fa-kiss-wink-heart:before {
    content: '\\f598';
  }

  .fa-kiwi-bird:before {
    content: '\\f535';
  }

  .fa-korvue:before {
    content: '\\f42f';
  }

  .fa-landmark:before {
    content: '\\f66f';
  }

  .fa-language:before {
    content: '\\f1ab';
  }

  .fa-laptop:before {
    content: '\\f109';
  }

  .fa-laptop-code:before {
    content: '\\f5fc';
  }

  .fa-laptop-medical:before {
    content: '\\f812';
  }

  .fa-laravel:before {
    content: '\\f3bd';
  }

  .fa-lastfm:before {
    content: '\\f202';
  }

  .fa-lastfm-square:before {
    content: '\\f203';
  }

  .fa-laugh:before {
    content: '\\f599';
  }

  .fa-laugh-beam:before {
    content: '\\f59a';
  }

  .fa-laugh-squint:before {
    content: '\\f59b';
  }

  .fa-laugh-wink:before {
    content: '\\f59c';
  }

  .fa-layer-group:before {
    content: '\\f5fd';
  }

  .fa-leaf:before {
    content: '\\f06c';
  }

  .fa-leanpub:before {
    content: '\\f212';
  }

  .fa-lemon:before {
    content: '\\f094';
  }

  .fa-less:before {
    content: '\\f41d';
  }

  .fa-less-than:before {
    content: '\\f536';
  }

  .fa-less-than-equal:before {
    content: '\\f537';
  }

  .fa-level-down-alt:before {
    content: '\\f3be';
  }

  .fa-level-up-alt:before {
    content: '\\f3bf';
  }

  .fa-life-ring:before {
    content: '\\f1cd';
  }

  .fa-lightbulb:before {
    content: '\\f0eb';
  }

  .fa-line:before {
    content: '\\f3c0';
  }

  .fa-link:before {
    content: '\\f0c1';
  }

  .fa-linkedin:before {
    content: '\\f08c';
  }

  .fa-linkedin-in:before {
    content: '\\f0e1';
  }

  .fa-linode:before {
    content: '\\f2b8';
  }

  .fa-linux:before {
    content: '\\f17c';
  }

  .fa-lira-sign:before {
    content: '\\f195';
  }

  .fa-list:before {
    content: '\\f03a';
  }

  .fa-list-alt:before {
    content: '\\f022';
  }

  .fa-list-ol:before {
    content: '\\f0cb';
  }

  .fa-list-ul:before {
    content: '\\f0ca';
  }

  .fa-location-arrow:before {
    content: '\\f124';
  }

  .fa-lock:before {
    content: '\\f023';
  }

  .fa-lock-open:before {
    content: '\\f3c1';
  }

  .fa-long-arrow-alt-down:before {
    content: '\\f309';
  }

  .fa-long-arrow-alt-left:before {
    content: '\\f30a';
  }

  .fa-long-arrow-alt-right:before {
    content: '\\f30b';
  }

  .fa-long-arrow-alt-up:before {
    content: '\\f30c';
  }

  .fa-low-vision:before {
    content: '\\f2a8';
  }

  .fa-luggage-cart:before {
    content: '\\f59d';
  }

  .fa-lyft:before {
    content: '\\f3c3';
  }

  .fa-magento:before {
    content: '\\f3c4';
  }

  .fa-magic:before {
    content: '\\f0d0';
  }

  .fa-magnet:before {
    content: '\\f076';
  }

  .fa-mail-bulk:before {
    content: '\\f674';
  }

  .fa-mailchimp:before {
    content: '\\f59e';
  }

  .fa-male:before {
    content: '\\f183';
  }

  .fa-mandalorian:before {
    content: '\\f50f';
  }

  .fa-map:before {
    content: '\\f279';
  }

  .fa-map-marked:before {
    content: '\\f59f';
  }

  .fa-map-marked-alt:before {
    content: '\\f5a0';
  }

  .fa-map-marker:before {
    content: '\\f041';
  }

  .fa-map-marker-alt:before {
    content: '\\f3c5';
  }

  .fa-map-pin:before {
    content: '\\f276';
  }

  .fa-map-signs:before {
    content: '\\f277';
  }

  .fa-markdown:before {
    content: '\\f60f';
  }

  .fa-marker:before {
    content: '\\f5a1';
  }

  .fa-mars:before {
    content: '\\f222';
  }

  .fa-mars-double:before {
    content: '\\f227';
  }

  .fa-mars-stroke:before {
    content: '\\f229';
  }

  .fa-mars-stroke-h:before {
    content: '\\f22b';
  }

  .fa-mars-stroke-v:before {
    content: '\\f22a';
  }

  .fa-mask:before {
    content: '\\f6fa';
  }

  .fa-mastodon:before {
    content: '\\f4f6';
  }

  .fa-maxcdn:before {
    content: '\\f136';
  }

  .fa-mdb:before {
    content: '\\f8ca';
  }

  .fa-medal:before {
    content: '\\f5a2';
  }

  .fa-medapps:before {
    content: '\\f3c6';
  }

  .fa-medium:before {
    content: '\\f23a';
  }

  .fa-medium-m:before {
    content: '\\f3c7';
  }

  .fa-medkit:before {
    content: '\\f0fa';
  }

  .fa-medrt:before {
    content: '\\f3c8';
  }

  .fa-meetup:before {
    content: '\\f2e0';
  }

  .fa-megaport:before {
    content: '\\f5a3';
  }

  .fa-meh:before {
    content: '\\f11a';
  }

  .fa-meh-blank:before {
    content: '\\f5a4';
  }

  .fa-meh-rolling-eyes:before {
    content: '\\f5a5';
  }

  .fa-memory:before {
    content: '\\f538';
  }

  .fa-mendeley:before {
    content: '\\f7b3';
  }

  .fa-menorah:before {
    content: '\\f676';
  }

  .fa-mercury:before {
    content: '\\f223';
  }

  .fa-meteor:before {
    content: '\\f753';
  }

  .fa-microchip:before {
    content: '\\f2db';
  }

  .fa-microphone:before {
    content: '\\f130';
  }

  .fa-microphone-alt:before {
    content: '\\f3c9';
  }

  .fa-microphone-alt-slash:before {
    content: '\\f539';
  }

  .fa-microphone-slash:before {
    content: '\\f131';
  }

  .fa-microscope:before {
    content: '\\f610';
  }

  .fa-microsoft:before {
    content: '\\f3ca';
  }

  .fa-minus:before {
    content: '\\f068';
  }

  .fa-minus-circle:before {
    content: '\\f056';
  }

  .fa-minus-square:before {
    content: '\\f146';
  }

  .fa-mitten:before {
    content: '\\f7b5';
  }

  .fa-mix:before {
    content: '\\f3cb';
  }

  .fa-mixcloud:before {
    content: '\\f289';
  }

  .fa-mizuni:before {
    content: '\\f3cc';
  }

  .fa-mobile:before {
    content: '\\f10b';
  }

  .fa-mobile-alt:before {
    content: '\\f3cd';
  }

  .fa-modx:before {
    content: '\\f285';
  }

  .fa-monero:before {
    content: '\\f3d0';
  }

  .fa-money-bill:before {
    content: '\\f0d6';
  }

  .fa-money-bill-alt:before {
    content: '\\f3d1';
  }

  .fa-money-bill-wave:before {
    content: '\\f53a';
  }

  .fa-money-bill-wave-alt:before {
    content: '\\f53b';
  }

  .fa-money-check:before {
    content: '\\f53c';
  }

  .fa-money-check-alt:before {
    content: '\\f53d';
  }

  .fa-monument:before {
    content: '\\f5a6';
  }

  .fa-moon:before {
    content: '\\f186';
  }

  .fa-mortar-pestle:before {
    content: '\\f5a7';
  }

  .fa-mosque:before {
    content: '\\f678';
  }

  .fa-motorcycle:before {
    content: '\\f21c';
  }

  .fa-mountain:before {
    content: '\\f6fc';
  }

  .fa-mouse:before {
    content: '\\f8cc';
  }

  .fa-mouse-pointer:before {
    content: '\\f245';
  }

  .fa-mug-hot:before {
    content: '\\f7b6';
  }

  .fa-music:before {
    content: '\\f001';
  }

  .fa-napster:before {
    content: '\\f3d2';
  }

  .fa-neos:before {
    content: '\\f612';
  }

  .fa-network-wired:before {
    content: '\\f6ff';
  }

  .fa-neuter:before {
    content: '\\f22c';
  }

  .fa-newspaper:before {
    content: '\\f1ea';
  }

  .fa-nimblr:before {
    content: '\\f5a8';
  }

  .fa-node:before {
    content: '\\f419';
  }

  .fa-node-js:before {
    content: '\\f3d3';
  }

  .fa-not-equal:before {
    content: '\\f53e';
  }

  .fa-notes-medical:before {
    content: '\\f481';
  }

  .fa-npm:before {
    content: '\\f3d4';
  }

  .fa-ns8:before {
    content: '\\f3d5';
  }

  .fa-nutritionix:before {
    content: '\\f3d6';
  }

  .fa-object-group:before {
    content: '\\f247';
  }

  .fa-object-ungroup:before {
    content: '\\f248';
  }

  .fa-odnoklassniki:before {
    content: '\\f263';
  }

  .fa-odnoklassniki-square:before {
    content: '\\f264';
  }

  .fa-oil-can:before {
    content: '\\f613';
  }

  .fa-old-republic:before {
    content: '\\f510';
  }

  .fa-om:before {
    content: '\\f679';
  }

  .fa-opencart:before {
    content: '\\f23d';
  }

  .fa-openid:before {
    content: '\\f19b';
  }

  .fa-opera:before {
    content: '\\f26a';
  }

  .fa-optin-monster:before {
    content: '\\f23c';
  }

  .fa-orcid:before {
    content: '\\f8d2';
  }

  .fa-osi:before {
    content: '\\f41a';
  }

  .fa-otter:before {
    content: '\\f700';
  }

  .fa-outdent:before {
    content: '\\f03b';
  }

  .fa-page4:before {
    content: '\\f3d7';
  }

  .fa-pagelines:before {
    content: '\\f18c';
  }

  .fa-pager:before {
    content: '\\f815';
  }

  .fa-paint-brush:before {
    content: '\\f1fc';
  }

  .fa-paint-roller:before {
    content: '\\f5aa';
  }

  .fa-palette:before {
    content: '\\f53f';
  }

  .fa-palfed:before {
    content: '\\f3d8';
  }

  .fa-pallet:before {
    content: '\\f482';
  }

  .fa-paper-plane:before {
    content: '\\f1d8';
  }

  .fa-paperclip:before {
    content: '\\f0c6';
  }

  .fa-parachute-box:before {
    content: '\\f4cd';
  }

  .fa-paragraph:before {
    content: '\\f1dd';
  }

  .fa-parking:before {
    content: '\\f540';
  }

  .fa-passport:before {
    content: '\\f5ab';
  }

  .fa-pastafarianism:before {
    content: '\\f67b';
  }

  .fa-paste:before {
    content: '\\f0ea';
  }

  .fa-patreon:before {
    content: '\\f3d9';
  }

  .fa-pause:before {
    content: '\\f04c';
  }

  .fa-pause-circle:before {
    content: '\\f28b';
  }

  .fa-paw:before {
    content: '\\f1b0';
  }

  .fa-paypal:before {
    content: '\\f1ed';
  }

  .fa-peace:before {
    content: '\\f67c';
  }

  .fa-pen:before {
    content: '\\f304';
  }

  .fa-pen-alt:before {
    content: '\\f305';
  }

  .fa-pen-fancy:before {
    content: '\\f5ac';
  }

  .fa-pen-nib:before {
    content: '\\f5ad';
  }

  .fa-pen-square:before {
    content: '\\f14b';
  }

  .fa-pencil-alt:before {
    content: '\\f303';
  }

  .fa-pencil-ruler:before {
    content: '\\f5ae';
  }

  .fa-penny-arcade:before {
    content: '\\f704';
  }

  .fa-people-carry:before {
    content: '\\f4ce';
  }

  .fa-pepper-hot:before {
    content: '\\f816';
  }

  .fa-percent:before {
    content: '\\f295';
  }

  .fa-percentage:before {
    content: '\\f541';
  }

  .fa-periscope:before {
    content: '\\f3da';
  }

  .fa-person-booth:before {
    content: '\\f756';
  }

  .fa-phabricator:before {
    content: '\\f3db';
  }

  .fa-phoenix-framework:before {
    content: '\\f3dc';
  }

  .fa-phoenix-squadron:before {
    content: '\\f511';
  }

  .fa-phone:before {
    content: '\\f095';
  }

  .fa-phone-alt:before {
    content: '\\f879';
  }

  .fa-phone-slash:before {
    content: '\\f3dd';
  }

  .fa-phone-square:before {
    content: '\\f098';
  }

  .fa-phone-square-alt:before {
    content: '\\f87b';
  }

  .fa-phone-volume:before {
    content: '\\f2a0';
  }

  .fa-photo-video:before {
    content: '\\f87c';
  }

  .fa-php:before {
    content: '\\f457';
  }

  .fa-pied-piper:before {
    content: '\\f2ae';
  }

  .fa-pied-piper-alt:before {
    content: '\\f1a8';
  }

  .fa-pied-piper-hat:before {
    content: '\\f4e5';
  }

  .fa-pied-piper-pp:before {
    content: '\\f1a7';
  }

  .fa-piggy-bank:before {
    content: '\\f4d3';
  }

  .fa-pills:before {
    content: '\\f484';
  }

  .fa-pinterest:before {
    content: '\\f0d2';
  }

  .fa-pinterest-p:before {
    content: '\\f231';
  }

  .fa-pinterest-square:before {
    content: '\\f0d3';
  }

  .fa-pizza-slice:before {
    content: '\\f818';
  }

  .fa-place-of-worship:before {
    content: '\\f67f';
  }

  .fa-plane:before {
    content: '\\f072';
  }

  .fa-plane-arrival:before {
    content: '\\f5af';
  }

  .fa-plane-departure:before {
    content: '\\f5b0';
  }

  .fa-play:before {
    content: '\\f04b';
  }

  .fa-play-circle:before {
    content: '\\f144';
  }

  .fa-playstation:before {
    content: '\\f3df';
  }

  .fa-plug:before {
    content: '\\f1e6';
  }

  .fa-plus:before {
    content: '\\f067';
  }

  .fa-plus-circle:before {
    content: '\\f055';
  }

  .fa-plus-square:before {
    content: '\\f0fe';
  }

  .fa-podcast:before {
    content: '\\f2ce';
  }

  .fa-poll:before {
    content: '\\f681';
  }

  .fa-poll-h:before {
    content: '\\f682';
  }

  .fa-poo:before {
    content: '\\f2fe';
  }

  .fa-poo-storm:before {
    content: '\\f75a';
  }

  .fa-poop:before {
    content: '\\f619';
  }

  .fa-portrait:before {
    content: '\\f3e0';
  }

  .fa-pound-sign:before {
    content: '\\f154';
  }

  .fa-power-off:before {
    content: '\\f011';
  }

  .fa-pray:before {
    content: '\\f683';
  }

  .fa-praying-hands:before {
    content: '\\f684';
  }

  .fa-prescription:before {
    content: '\\f5b1';
  }

  .fa-prescription-bottle:before {
    content: '\\f485';
  }

  .fa-prescription-bottle-alt:before {
    content: '\\f486';
  }

  .fa-print:before {
    content: '\\f02f';
  }

  .fa-procedures:before {
    content: '\\f487';
  }

  .fa-product-hunt:before {
    content: '\\f288';
  }

  .fa-project-diagram:before {
    content: '\\f542';
  }

  .fa-pushed:before {
    content: '\\f3e1';
  }

  .fa-puzzle-piece:before {
    content: '\\f12e';
  }

  .fa-python:before {
    content: '\\f3e2';
  }

  .fa-qq:before {
    content: '\\f1d6';
  }

  .fa-qrcode:before {
    content: '\\f029';
  }

  .fa-question:before {
    content: '\\f128';
  }

  .fa-question-circle:before {
    content: '\\f059';
  }

  .fa-quidditch:before {
    content: '\\f458';
  }

  .fa-quinscape:before {
    content: '\\f459';
  }

  .fa-quora:before {
    content: '\\f2c4';
  }

  .fa-quote-left:before {
    content: '\\f10d';
  }

  .fa-quote-right:before {
    content: '\\f10e';
  }

  .fa-quran:before {
    content: '\\f687';
  }

  .fa-r-project:before {
    content: '\\f4f7';
  }

  .fa-radiation:before {
    content: '\\f7b9';
  }

  .fa-radiation-alt:before {
    content: '\\f7ba';
  }

  .fa-rainbow:before {
    content: '\\f75b';
  }

  .fa-random:before {
    content: '\\f074';
  }

  .fa-raspberry-pi:before {
    content: '\\f7bb';
  }

  .fa-ravelry:before {
    content: '\\f2d9';
  }

  .fa-react:before {
    content: '\\f41b';
  }

  .fa-reacteurope:before {
    content: '\\f75d';
  }

  .fa-readme:before {
    content: '\\f4d5';
  }

  .fa-rebel:before {
    content: '\\f1d0';
  }

  .fa-receipt:before {
    content: '\\f543';
  }

  .fa-record-vinyl:before {
    content: '\\f8d9';
  }

  .fa-recycle:before {
    content: '\\f1b8';
  }

  .fa-red-river:before {
    content: '\\f3e3';
  }

  .fa-reddit:before {
    content: '\\f1a1';
  }

  .fa-reddit-alien:before {
    content: '\\f281';
  }

  .fa-reddit-square:before {
    content: '\\f1a2';
  }

  .fa-redhat:before {
    content: '\\f7bc';
  }

  .fa-redo:before {
    content: '\\f01e';
  }

  .fa-redo-alt:before {
    content: '\\f2f9';
  }

  .fa-registered:before {
    content: '\\f25d';
  }

  .fa-remove-format:before {
    content: '\\f87d';
  }

  .fa-renren:before {
    content: '\\f18b';
  }

  .fa-reply:before {
    content: '\\f3e5';
  }

  .fa-reply-all:before {
    content: '\\f122';
  }

  .fa-replyd:before {
    content: '\\f3e6';
  }

  .fa-republican:before {
    content: '\\f75e';
  }

  .fa-researchgate:before {
    content: '\\f4f8';
  }

  .fa-resolving:before {
    content: '\\f3e7';
  }

  .fa-restroom:before {
    content: '\\f7bd';
  }

  .fa-retweet:before {
    content: '\\f079';
  }

  .fa-rev:before {
    content: '\\f5b2';
  }

  .fa-ribbon:before {
    content: '\\f4d6';
  }

  .fa-ring:before {
    content: '\\f70b';
  }

  .fa-road:before {
    content: '\\f018';
  }

  .fa-robot:before {
    content: '\\f544';
  }

  .fa-rocket:before {
    content: '\\f135';
  }

  .fa-rocketchat:before {
    content: '\\f3e8';
  }

  .fa-rockrms:before {
    content: '\\f3e9';
  }

  .fa-route:before {
    content: '\\f4d7';
  }

  .fa-rss:before {
    content: '\\f09e';
  }

  .fa-rss-square:before {
    content: '\\f143';
  }

  .fa-ruble-sign:before {
    content: '\\f158';
  }

  .fa-ruler:before {
    content: '\\f545';
  }

  .fa-ruler-combined:before {
    content: '\\f546';
  }

  .fa-ruler-horizontal:before {
    content: '\\f547';
  }

  .fa-ruler-vertical:before {
    content: '\\f548';
  }

  .fa-running:before {
    content: '\\f70c';
  }

  .fa-rupee-sign:before {
    content: '\\f156';
  }

  .fa-sad-cry:before {
    content: '\\f5b3';
  }

  .fa-sad-tear:before {
    content: '\\f5b4';
  }

  .fa-safari:before {
    content: '\\f267';
  }

  .fa-salesforce:before {
    content: '\\f83b';
  }

  .fa-sass:before {
    content: '\\f41e';
  }

  .fa-satellite:before {
    content: '\\f7bf';
  }

  .fa-satellite-dish:before {
    content: '\\f7c0';
  }

  .fa-save:before {
    content: '\\f0c7';
  }

  .fa-schlix:before {
    content: '\\f3ea';
  }

  .fa-school:before {
    content: '\\f549';
  }

  .fa-screwdriver:before {
    content: '\\f54a';
  }

  .fa-scribd:before {
    content: '\\f28a';
  }

  .fa-scroll:before {
    content: '\\f70e';
  }

  .fa-sd-card:before {
    content: '\\f7c2';
  }

  .fa-search:before {
    content: '\\f002';
  }

  .fa-search-dollar:before {
    content: '\\f688';
  }

  .fa-search-location:before {
    content: '\\f689';
  }

  .fa-search-minus:before {
    content: '\\f010';
  }

  .fa-search-plus:before {
    content: '\\f00e';
  }

  .fa-searchengin:before {
    content: '\\f3eb';
  }

  .fa-seedling:before {
    content: '\\f4d8';
  }

  .fa-sellcast:before {
    content: '\\f2da';
  }

  .fa-sellsy:before {
    content: '\\f213';
  }

  .fa-server:before {
    content: '\\f233';
  }

  .fa-servicestack:before {
    content: '\\f3ec';
  }

  .fa-shapes:before {
    content: '\\f61f';
  }

  .fa-share:before {
    content: '\\f064';
  }

  .fa-share-alt:before {
    content: '\\f1e0';
  }

  .fa-share-alt-square:before {
    content: '\\f1e1';
  }

  .fa-share-square:before {
    content: '\\f14d';
  }

  .fa-shekel-sign:before {
    content: '\\f20b';
  }

  .fa-shield-alt:before {
    content: '\\f3ed';
  }

  .fa-ship:before {
    content: '\\f21a';
  }

  .fa-shipping-fast:before {
    content: '\\f48b';
  }

  .fa-shirtsinbulk:before {
    content: '\\f214';
  }

  .fa-shoe-prints:before {
    content: '\\f54b';
  }

  .fa-shopping-bag:before {
    content: '\\f290';
  }

  .fa-shopping-basket:before {
    content: '\\f291';
  }

  .fa-shopping-cart:before {
    content: '\\f07a';
  }

  .fa-shopware:before {
    content: '\\f5b5';
  }

  .fa-shower:before {
    content: '\\f2cc';
  }

  .fa-shuttle-van:before {
    content: '\\f5b6';
  }

  .fa-sign:before {
    content: '\\f4d9';
  }

  .fa-sign-in-alt:before {
    content: '\\f2f6';
  }

  .fa-sign-language:before {
    content: '\\f2a7';
  }

  .fa-sign-out-alt:before {
    content: '\\f2f5';
  }

  .fa-signal:before {
    content: '\\f012';
  }

  .fa-signature:before {
    content: '\\f5b7';
  }

  .fa-sim-card:before {
    content: '\\f7c4';
  }

  .fa-simplybuilt:before {
    content: '\\f215';
  }

  .fa-sistrix:before {
    content: '\\f3ee';
  }

  .fa-sitemap:before {
    content: '\\f0e8';
  }

  .fa-sith:before {
    content: '\\f512';
  }

  .fa-skating:before {
    content: '\\f7c5';
  }

  .fa-sketch:before {
    content: '\\f7c6';
  }

  .fa-skiing:before {
    content: '\\f7c9';
  }

  .fa-skiing-nordic:before {
    content: '\\f7ca';
  }

  .fa-skull:before {
    content: '\\f54c';
  }

  .fa-skull-crossbones:before {
    content: '\\f714';
  }

  .fa-skyatlas:before {
    content: '\\f216';
  }

  .fa-skype:before {
    content: '\\f17e';
  }

  .fa-slack:before {
    content: '\\f198';
  }

  .fa-slack-hash:before {
    content: '\\f3ef';
  }

  .fa-slash:before {
    content: '\\f715';
  }

  .fa-sleigh:before {
    content: '\\f7cc';
  }

  .fa-sliders-h:before {
    content: '\\f1de';
  }

  .fa-slideshare:before {
    content: '\\f1e7';
  }

  .fa-smile:before {
    content: '\\f118';
  }

  .fa-smile-beam:before {
    content: '\\f5b8';
  }

  .fa-smile-wink:before {
    content: '\\f4da';
  }

  .fa-smog:before {
    content: '\\f75f';
  }

  .fa-smoking:before {
    content: '\\f48d';
  }

  .fa-smoking-ban:before {
    content: '\\f54d';
  }

  .fa-sms:before {
    content: '\\f7cd';
  }

  .fa-snapchat:before {
    content: '\\f2ab';
  }

  .fa-snapchat-ghost:before {
    content: '\\f2ac';
  }

  .fa-snapchat-square:before {
    content: '\\f2ad';
  }

  .fa-snowboarding:before {
    content: '\\f7ce';
  }

  .fa-snowflake:before {
    content: '\\f2dc';
  }

  .fa-snowman:before {
    content: '\\f7d0';
  }

  .fa-snowplow:before {
    content: '\\f7d2';
  }

  .fa-socks:before {
    content: '\\f696';
  }

  .fa-solar-panel:before {
    content: '\\f5ba';
  }

  .fa-sort:before {
    content: '\\f0dc';
  }

  .fa-sort-alpha-down:before {
    content: '\\f15d';
  }

  .fa-sort-alpha-down-alt:before {
    content: '\\f881';
  }

  .fa-sort-alpha-up:before {
    content: '\\f15e';
  }

  .fa-sort-alpha-up-alt:before {
    content: '\\f882';
  }

  .fa-sort-amount-down:before {
    content: '\\f160';
  }

  .fa-sort-amount-down-alt:before {
    content: '\\f884';
  }

  .fa-sort-amount-up:before {
    content: '\\f161';
  }

  .fa-sort-amount-up-alt:before {
    content: '\\f885';
  }

  .fa-sort-down:before {
    content: '\\f0dd';
  }

  .fa-sort-numeric-down:before {
    content: '\\f162';
  }

  .fa-sort-numeric-down-alt:before {
    content: '\\f886';
  }

  .fa-sort-numeric-up:before {
    content: '\\f163';
  }

  .fa-sort-numeric-up-alt:before {
    content: '\\f887';
  }

  .fa-sort-up:before {
    content: '\\f0de';
  }

  .fa-soundcloud:before {
    content: '\\f1be';
  }

  .fa-sourcetree:before {
    content: '\\f7d3';
  }

  .fa-spa:before {
    content: '\\f5bb';
  }

  .fa-space-shuttle:before {
    content: '\\f197';
  }

  .fa-speakap:before {
    content: '\\f3f3';
  }

  .fa-speaker-deck:before {
    content: '\\f83c';
  }

  .fa-spell-check:before {
    content: '\\f891';
  }

  .fa-spider:before {
    content: '\\f717';
  }

  .fa-spinner:before {
    content: '\\f110';
  }

  .fa-splotch:before {
    content: '\\f5bc';
  }

  .fa-spotify:before {
    content: '\\f1bc';
  }

  .fa-spray-can:before {
    content: '\\f5bd';
  }

  .fa-square:before {
    content: '\\f0c8';
  }

  .fa-square-full:before {
    content: '\\f45c';
  }

  .fa-square-root-alt:before {
    content: '\\f698';
  }

  .fa-squarespace:before {
    content: '\\f5be';
  }

  .fa-stack-exchange:before {
    content: '\\f18d';
  }

  .fa-stack-overflow:before {
    content: '\\f16c';
  }

  .fa-stackpath:before {
    content: '\\f842';
  }

  .fa-stamp:before {
    content: '\\f5bf';
  }

  .fa-star:before {
    content: '\\f005';
  }

  .fa-star-and-crescent:before {
    content: '\\f699';
  }

  .fa-star-half:before {
    content: '\\f089';
  }

  .fa-star-half-alt:before {
    content: '\\f5c0';
  }

  .fa-star-of-david:before {
    content: '\\f69a';
  }

  .fa-star-of-life:before {
    content: '\\f621';
  }

  .fa-staylinked:before {
    content: '\\f3f5';
  }

  .fa-steam:before {
    content: '\\f1b6';
  }

  .fa-steam-square:before {
    content: '\\f1b7';
  }

  .fa-steam-symbol:before {
    content: '\\f3f6';
  }

  .fa-step-backward:before {
    content: '\\f048';
  }

  .fa-step-forward:before {
    content: '\\f051';
  }

  .fa-stethoscope:before {
    content: '\\f0f1';
  }

  .fa-sticker-mule:before {
    content: '\\f3f7';
  }

  .fa-sticky-note:before {
    content: '\\f249';
  }

  .fa-stop:before {
    content: '\\f04d';
  }

  .fa-stop-circle:before {
    content: '\\f28d';
  }

  .fa-stopwatch:before {
    content: '\\f2f2';
  }

  .fa-store:before {
    content: '\\f54e';
  }

  .fa-store-alt:before {
    content: '\\f54f';
  }

  .fa-strava:before {
    content: '\\f428';
  }

  .fa-stream:before {
    content: '\\f550';
  }

  .fa-street-view:before {
    content: '\\f21d';
  }

  .fa-strikethrough:before {
    content: '\\f0cc';
  }

  .fa-stripe:before {
    content: '\\f429';
  }

  .fa-stripe-s:before {
    content: '\\f42a';
  }

  .fa-stroopwafel:before {
    content: '\\f551';
  }

  .fa-studiovinari:before {
    content: '\\f3f8';
  }

  .fa-stumbleupon:before {
    content: '\\f1a4';
  }

  .fa-stumbleupon-circle:before {
    content: '\\f1a3';
  }

  .fa-subscript:before {
    content: '\\f12c';
  }

  .fa-subway:before {
    content: '\\f239';
  }

  .fa-suitcase:before {
    content: '\\f0f2';
  }

  .fa-suitcase-rolling:before {
    content: '\\f5c1';
  }

  .fa-sun:before {
    content: '\\f185';
  }

  .fa-superpowers:before {
    content: '\\f2dd';
  }

  .fa-superscript:before {
    content: '\\f12b';
  }

  .fa-supple:before {
    content: '\\f3f9';
  }

  .fa-surprise:before {
    content: '\\f5c2';
  }

  .fa-suse:before {
    content: '\\f7d6';
  }

  .fa-swatchbook:before {
    content: '\\f5c3';
  }

  .fa-swift:before {
    content: '\\f8e1';
  }

  .fa-swimmer:before {
    content: '\\f5c4';
  }

  .fa-swimming-pool:before {
    content: '\\f5c5';
  }

  .fa-symfony:before {
    content: '\\f83d';
  }

  .fa-synagogue:before {
    content: '\\f69b';
  }

  .fa-sync:before {
    content: '\\f021';
  }

  .fa-sync-alt:before {
    content: '\\f2f1';
  }

  .fa-syringe:before {
    content: '\\f48e';
  }

  .fa-table:before {
    content: '\\f0ce';
  }

  .fa-table-tennis:before {
    content: '\\f45d';
  }

  .fa-tablet:before {
    content: '\\f10a';
  }

  .fa-tablet-alt:before {
    content: '\\f3fa';
  }

  .fa-tablets:before {
    content: '\\f490';
  }

  .fa-tachometer-alt:before {
    content: '\\f3fd';
  }

  .fa-tag:before {
    content: '\\f02b';
  }

  .fa-tags:before {
    content: '\\f02c';
  }

  .fa-tape:before {
    content: '\\f4db';
  }

  .fa-tasks:before {
    content: '\\f0ae';
  }

  .fa-taxi:before {
    content: '\\f1ba';
  }

  .fa-teamspeak:before {
    content: '\\f4f9';
  }

  .fa-teeth:before {
    content: '\\f62e';
  }

  .fa-teeth-open:before {
    content: '\\f62f';
  }

  .fa-telegram:before {
    content: '\\f2c6';
  }

  .fa-telegram-plane:before {
    content: '\\f3fe';
  }

  .fa-temperature-high:before {
    content: '\\f769';
  }

  .fa-temperature-low:before {
    content: '\\f76b';
  }

  .fa-tencent-weibo:before {
    content: '\\f1d5';
  }

  .fa-tenge:before {
    content: '\\f7d7';
  }

  .fa-terminal:before {
    content: '\\f120';
  }

  .fa-text-height:before {
    content: '\\f034';
  }

  .fa-text-width:before {
    content: '\\f035';
  }

  .fa-th:before {
    content: '\\f00a';
  }

  .fa-th-large:before {
    content: '\\f009';
  }

  .fa-th-list:before {
    content: '\\f00b';
  }

  .fa-the-red-yeti:before {
    content: '\\f69d';
  }

  .fa-theater-masks:before {
    content: '\\f630';
  }

  .fa-themeco:before {
    content: '\\f5c6';
  }

  .fa-themeisle:before {
    content: '\\f2b2';
  }

  .fa-thermometer:before {
    content: '\\f491';
  }

  .fa-thermometer-empty:before {
    content: '\\f2cb';
  }

  .fa-thermometer-full:before {
    content: '\\f2c7';
  }

  .fa-thermometer-half:before {
    content: '\\f2c9';
  }

  .fa-thermometer-quarter:before {
    content: '\\f2ca';
  }

  .fa-thermometer-three-quarters:before {
    content: '\\f2c8';
  }

  .fa-think-peaks:before {
    content: '\\f731';
  }

  .fa-thumbs-down:before {
    content: '\\f165';
  }

  .fa-thumbs-up:before {
    content: '\\f164';
  }

  .fa-thumbtack:before {
    content: '\\f08d';
  }

  .fa-ticket-alt:before {
    content: '\\f3ff';
  }

  .fa-times:before {
    content: '\\f00d';
  }

  .fa-times-circle:before {
    content: '\\f057';
  }

  .fa-tint:before {
    content: '\\f043';
  }

  .fa-tint-slash:before {
    content: '\\f5c7';
  }

  .fa-tired:before {
    content: '\\f5c8';
  }

  .fa-toggle-off:before {
    content: '\\f204';
  }

  .fa-toggle-on:before {
    content: '\\f205';
  }

  .fa-toilet:before {
    content: '\\f7d8';
  }

  .fa-toilet-paper:before {
    content: '\\f71e';
  }

  .fa-toolbox:before {
    content: '\\f552';
  }

  .fa-tools:before {
    content: '\\f7d9';
  }

  .fa-tooth:before {
    content: '\\f5c9';
  }

  .fa-torah:before {
    content: '\\f6a0';
  }

  .fa-torii-gate:before {
    content: '\\f6a1';
  }

  .fa-tractor:before {
    content: '\\f722';
  }

  .fa-trade-federation:before {
    content: '\\f513';
  }

  .fa-trademark:before {
    content: '\\f25c';
  }

  .fa-traffic-light:before {
    content: '\\f637';
  }

  .fa-train:before {
    content: '\\f238';
  }

  .fa-tram:before {
    content: '\\f7da';
  }

  .fa-transgender:before {
    content: '\\f224';
  }

  .fa-transgender-alt:before {
    content: '\\f225';
  }

  .fa-trash:before {
    content: '\\f1f8';
  }

  .fa-trash-alt:before {
    content: '\\f2ed';
  }

  .fa-trash-restore:before {
    content: '\\f829';
  }

  .fa-trash-restore-alt:before {
    content: '\\f82a';
  }

  .fa-tree:before {
    content: '\\f1bb';
  }

  .fa-trello:before {
    content: '\\f181';
  }

  .fa-tripadvisor:before {
    content: '\\f262';
  }

  .fa-trophy:before {
    content: '\\f091';
  }

  .fa-truck:before {
    content: '\\f0d1';
  }

  .fa-truck-loading:before {
    content: '\\f4de';
  }

  .fa-truck-monster:before {
    content: '\\f63b';
  }

  .fa-truck-moving:before {
    content: '\\f4df';
  }

  .fa-truck-pickup:before {
    content: '\\f63c';
  }

  .fa-tshirt:before {
    content: '\\f553';
  }

  .fa-tty:before {
    content: '\\f1e4';
  }

  .fa-tumblr:before {
    content: '\\f173';
  }

  .fa-tumblr-square:before {
    content: '\\f174';
  }

  .fa-tv:before {
    content: '\\f26c';
  }

  .fa-twitch:before {
    content: '\\f1e8';
  }

  .fa-twitter:before {
    content: '\\f099';
  }

  .fa-twitter-square:before {
    content: '\\f081';
  }

  .fa-typo3:before {
    content: '\\f42b';
  }

  .fa-uber:before {
    content: '\\f402';
  }

  .fa-ubuntu:before {
    content: '\\f7df';
  }

  .fa-uikit:before {
    content: '\\f403';
  }

  .fa-umbraco:before {
    content: '\\f8e8';
  }

  .fa-umbrella:before {
    content: '\\f0e9';
  }

  .fa-umbrella-beach:before {
    content: '\\f5ca';
  }

  .fa-underline:before {
    content: '\\f0cd';
  }

  .fa-undo:before {
    content: '\\f0e2';
  }

  .fa-undo-alt:before {
    content: '\\f2ea';
  }

  .fa-uniregistry:before {
    content: '\\f404';
  }

  .fa-universal-access:before {
    content: '\\f29a';
  }

  .fa-university:before {
    content: '\\f19c';
  }

  .fa-unlink:before {
    content: '\\f127';
  }

  .fa-unlock:before {
    content: '\\f09c';
  }

  .fa-unlock-alt:before {
    content: '\\f13e';
  }

  .fa-untappd:before {
    content: '\\f405';
  }

  .fa-upload:before {
    content: '\\f093';
  }

  .fa-ups:before {
    content: '\\f7e0';
  }

  .fa-usb:before {
    content: '\\f287';
  }

  .fa-user:before {
    content: '\\f007';
  }

  .fa-user-alt:before {
    content: '\\f406';
  }

  .fa-user-alt-slash:before {
    content: '\\f4fa';
  }

  .fa-user-astronaut:before {
    content: '\\f4fb';
  }

  .fa-user-check:before {
    content: '\\f4fc';
  }

  .fa-user-circle:before {
    content: '\\f2bd';
  }

  .fa-user-clock:before {
    content: '\\f4fd';
  }

  .fa-user-cog:before {
    content: '\\f4fe';
  }

  .fa-user-edit:before {
    content: '\\f4ff';
  }

  .fa-user-friends:before {
    content: '\\f500';
  }

  .fa-user-graduate:before {
    content: '\\f501';
  }

  .fa-user-injured:before {
    content: '\\f728';
  }

  .fa-user-lock:before {
    content: '\\f502';
  }

  .fa-user-md:before {
    content: '\\f0f0';
  }

  .fa-user-minus:before {
    content: '\\f503';
  }

  .fa-user-ninja:before {
    content: '\\f504';
  }

  .fa-user-nurse:before {
    content: '\\f82f';
  }

  .fa-user-plus:before {
    content: '\\f234';
  }

  .fa-user-secret:before {
    content: '\\f21b';
  }

  .fa-user-shield:before {
    content: '\\f505';
  }

  .fa-user-slash:before {
    content: '\\f506';
  }

  .fa-user-tag:before {
    content: '\\f507';
  }

  .fa-user-tie:before {
    content: '\\f508';
  }

  .fa-user-times:before {
    content: '\\f235';
  }

  .fa-users:before {
    content: '\\f0c0';
  }

  .fa-users-cog:before {
    content: '\\f509';
  }

  .fa-usps:before {
    content: '\\f7e1';
  }

  .fa-ussunnah:before {
    content: '\\f407';
  }

  .fa-utensil-spoon:before {
    content: '\\f2e5';
  }

  .fa-utensils:before {
    content: '\\f2e7';
  }

  .fa-vaadin:before {
    content: '\\f408';
  }

  .fa-vector-square:before {
    content: '\\f5cb';
  }

  .fa-venus:before {
    content: '\\f221';
  }

  .fa-venus-double:before {
    content: '\\f226';
  }

  .fa-venus-mars:before {
    content: '\\f228';
  }

  .fa-viacoin:before {
    content: '\\f237';
  }

  .fa-viadeo:before {
    content: '\\f2a9';
  }

  .fa-viadeo-square:before {
    content: '\\f2aa';
  }

  .fa-vial:before {
    content: '\\f492';
  }

  .fa-vials:before {
    content: '\\f493';
  }

  .fa-viber:before {
    content: '\\f409';
  }

  .fa-video:before {
    content: '\\f03d';
  }

  .fa-video-slash:before {
    content: '\\f4e2';
  }

  .fa-vihara:before {
    content: '\\f6a7';
  }

  .fa-vimeo:before {
    content: '\\f40a';
  }

  .fa-vimeo-square:before {
    content: '\\f194';
  }

  .fa-vimeo-v:before {
    content: '\\f27d';
  }

  .fa-vine:before {
    content: '\\f1ca';
  }

  .fa-vk:before {
    content: '\\f189';
  }

  .fa-vnv:before {
    content: '\\f40b';
  }

  .fa-voicemail:before {
    content: '\\f897';
  }

  .fa-volleyball-ball:before {
    content: '\\f45f';
  }

  .fa-volume-down:before {
    content: '\\f027';
  }

  .fa-volume-mute:before {
    content: '\\f6a9';
  }

  .fa-volume-off:before {
    content: '\\f026';
  }

  .fa-volume-up:before {
    content: '\\f028';
  }

  .fa-vote-yea:before {
    content: '\\f772';
  }

  .fa-vr-cardboard:before {
    content: '\\f729';
  }

  .fa-vuejs:before {
    content: '\\f41f';
  }

  .fa-walking:before {
    content: '\\f554';
  }

  .fa-wallet:before {
    content: '\\f555';
  }

  .fa-warehouse:before {
    content: '\\f494';
  }

  .fa-water:before {
    content: '\\f773';
  }

  .fa-wave-square:before {
    content: '\\f83e';
  }

  .fa-waze:before {
    content: '\\f83f';
  }

  .fa-weebly:before {
    content: '\\f5cc';
  }

  .fa-weibo:before {
    content: '\\f18a';
  }

  .fa-weight:before {
    content: '\\f496';
  }

  .fa-weight-hanging:before {
    content: '\\f5cd';
  }

  .fa-weixin:before {
    content: '\\f1d7';
  }

  .fa-whatsapp:before {
    content: '\\f232';
  }

  .fa-whatsapp-square:before {
    content: '\\f40c';
  }

  .fa-wheelchair:before {
    content: '\\f193';
  }

  .fa-whmcs:before {
    content: '\\f40d';
  }

  .fa-wifi:before {
    content: '\\f1eb';
  }

  .fa-wikipedia-w:before {
    content: '\\f266';
  }

  .fa-wind:before {
    content: '\\f72e';
  }

  .fa-window-close:before {
    content: '\\f410';
  }

  .fa-window-maximize:before {
    content: '\\f2d0';
  }

  .fa-window-minimize:before {
    content: '\\f2d1';
  }

  .fa-window-restore:before {
    content: '\\f2d2';
  }

  .fa-windows:before {
    content: '\\f17a';
  }

  .fa-wine-bottle:before {
    content: '\\f72f';
  }

  .fa-wine-glass:before {
    content: '\\f4e3';
  }

  .fa-wine-glass-alt:before {
    content: '\\f5ce';
  }

  .fa-wix:before {
    content: '\\f5cf';
  }

  .fa-wizards-of-the-coast:before {
    content: '\\f730';
  }

  .fa-wolf-pack-battalion:before {
    content: '\\f514';
  }

  .fa-won-sign:before {
    content: '\\f159';
  }

  .fa-wordpress:before {
    content: '\\f19a';
  }

  .fa-wordpress-simple:before {
    content: '\\f411';
  }

  .fa-wpbeginner:before {
    content: '\\f297';
  }

  .fa-wpexplorer:before {
    content: '\\f2de';
  }

  .fa-wpforms:before {
    content: '\\f298';
  }

  .fa-wpressr:before {
    content: '\\f3e4';
  }

  .fa-wrench:before {
    content: '\\f0ad';
  }

  .fa-x-ray:before {
    content: '\\f497';
  }

  .fa-xbox:before {
    content: '\\f412';
  }

  .fa-xing:before {
    content: '\\f168';
  }

  .fa-xing-square:before {
    content: '\\f169';
  }

  .fa-y-combinator:before {
    content: '\\f23b';
  }

  .fa-yahoo:before {
    content: '\\f19e';
  }

  .fa-yammer:before {
    content: '\\f840';
  }

  .fa-yandex:before {
    content: '\\f413';
  }

  .fa-yandex-international:before {
    content: '\\f414';
  }

  .fa-yarn:before {
    content: '\\f7e3';
  }

  .fa-yelp:before {
    content: '\\f1e9';
  }

  .fa-yen-sign:before {
    content: '\\f157';
  }

  .fa-yin-yang:before {
    content: '\\f6ad';
  }

  .fa-yoast:before {
    content: '\\f2b1';
  }

  .fa-youtube:before {
    content: '\\f167';
  }

  .fa-youtube-square:before {
    content: '\\f431';
  }

  .fa-zhihu:before {
    content: '\\f63f';
  }

  .sr-only {
    border: 0;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  .sr-only-focusable:active,
  .sr-only-focusable:focus {
    clip: auto;
    height: auto;
    margin: 0;
    overflow: visible;
    position: static;
    width: auto;
  }


  .fab {
    font-family: 'Font Awesome 5 Brands';
  }


  .far {
    font-family: 'Font Awesome 5 Free';
    font-weight: 400;
  }


  .fa,
  .fas {
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
  }
`,Na=`.board-outer-frame{display:flex;flex-direction:column;justify-content:center;width:600px}.board-outer-frame .board-outer{position:relative;height:342px}.board-outer-frame .board-outer .converter-btn{color:#fff;position:absolute;top:0;right:0;background-color:#00b3ff;box-shadow:inset 0 0 3px 1px #ffffffb3;z-index:2;padding:7px 10px 10px;border-radius:5px;font-size:13px;transform:translate(8px,-8px);cursor:pointer;user-select:none}.board-outer-frame .board-outer .board-to-rgb,.board-outer-frame .board-outer .board-to-hex{display:flex;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;z-index:-1;transform:scale(.95);background-color:#fff;transition:.7s ease;box-shadow:0 0 20px 4px #0000004d;border-radius:5px;overflow:hidden}.board-outer-frame .board-outer .board-to-rgb.active,.board-outer-frame .board-outer .board-to-hex.active{opacity:1;z-index:1;transform:scale(1)}.board-outer-frame .board-outer .board-to-rgb .input-groups,.board-outer-frame .board-outer .board-to-hex .input-groups{display:flex;flex-direction:column;justify-content:center;width:40%;padding:15px 20px}.board-outer-frame .board-outer .board-to-rgb .input-groups .converter-rgb-title,.board-outer-frame .board-outer .board-to-hex .input-groups .converter-rgb-title{text-align:center;font-size:25px;font-weight:700}.board-outer-frame .board-outer .board-to-rgb .input-groups .R-input-group,.board-outer-frame .board-outer .board-to-rgb .input-groups .G-input-group,.board-outer-frame .board-outer .board-to-rgb .input-groups .B-input-group,.board-outer-frame .board-outer .board-to-rgb .input-groups .to-R-input-group,.board-outer-frame .board-outer .board-to-rgb .input-groups .to-G-input-group,.board-outer-frame .board-outer .board-to-rgb .input-groups .to-B-input-group,.board-outer-frame .board-outer .board-to-hex .input-groups .R-input-group,.board-outer-frame .board-outer .board-to-hex .input-groups .G-input-group,.board-outer-frame .board-outer .board-to-hex .input-groups .B-input-group,.board-outer-frame .board-outer .board-to-hex .input-groups .to-R-input-group,.board-outer-frame .board-outer .board-to-hex .input-groups .to-G-input-group,.board-outer-frame .board-outer .board-to-hex .input-groups .to-B-input-group{margin:15px 0;display:flex;align-items:center;position:relative}.board-outer-frame .board-outer .board-to-rgb .input-groups .R-input-group input,.board-outer-frame .board-outer .board-to-rgb .input-groups .G-input-group input,.board-outer-frame .board-outer .board-to-rgb .input-groups .B-input-group input,.board-outer-frame .board-outer .board-to-rgb .input-groups .to-R-input-group input,.board-outer-frame .board-outer .board-to-rgb .input-groups .to-G-input-group input,.board-outer-frame .board-outer .board-to-rgb .input-groups .to-B-input-group input,.board-outer-frame .board-outer .board-to-hex .input-groups .R-input-group input,.board-outer-frame .board-outer .board-to-hex .input-groups .G-input-group input,.board-outer-frame .board-outer .board-to-hex .input-groups .B-input-group input,.board-outer-frame .board-outer .board-to-hex .input-groups .to-R-input-group input,.board-outer-frame .board-outer .board-to-hex .input-groups .to-G-input-group input,.board-outer-frame .board-outer .board-to-hex .input-groups .to-B-input-group input{width:100%;font-size:20px;border:none;outline:none;border-radius:5px;box-shadow:0 0 2px #000000b3;padding:6px 5px 4px;text-align:center}.board-outer-frame .board-outer .board-to-rgb .input-groups .R-input-group input:not(:placeholder-shown)~p,.board-outer-frame .board-outer .board-to-rgb .input-groups .R-input-group input:focus~p,.board-outer-frame .board-outer .board-to-rgb .input-groups .G-input-group input:not(:placeholder-shown)~p,.board-outer-frame .board-outer .board-to-rgb .input-groups .G-input-group input:focus~p,.board-outer-frame .board-outer .board-to-rgb .input-groups .B-input-group input:not(:placeholder-shown)~p,.board-outer-frame .board-outer .board-to-rgb .input-groups .B-input-group input:focus~p,.board-outer-frame .board-outer .board-to-rgb .input-groups .to-R-input-group input:not(:placeholder-shown)~p,.board-outer-frame .board-outer .board-to-rgb .input-groups .to-R-input-group input:focus~p,.board-outer-frame .board-outer .board-to-rgb .input-groups .to-G-input-group input:not(:placeholder-shown)~p,.board-outer-frame .board-outer .board-to-rgb .input-groups .to-G-input-group input:focus~p,.board-outer-frame .board-outer .board-to-rgb .input-groups .to-B-input-group input:not(:placeholder-shown)~p,.board-outer-frame .board-outer .board-to-rgb .input-groups .to-B-input-group input:focus~p,.board-outer-frame .board-outer .board-to-hex .input-groups .R-input-group input:not(:placeholder-shown)~p,.board-outer-frame .board-outer .board-to-hex .input-groups .R-input-group input:focus~p,.board-outer-frame .board-outer .board-to-hex .input-groups .G-input-group input:not(:placeholder-shown)~p,.board-outer-frame .board-outer .board-to-hex .input-groups .G-input-group input:focus~p,.board-outer-frame .board-outer .board-to-hex .input-groups .B-input-group input:not(:placeholder-shown)~p,.board-outer-frame .board-outer .board-to-hex .input-groups .B-input-group input:focus~p,.board-outer-frame .board-outer .board-to-hex .input-groups .to-R-input-group input:not(:placeholder-shown)~p,.board-outer-frame .board-outer .board-to-hex .input-groups .to-R-input-group input:focus~p,.board-outer-frame .board-outer .board-to-hex .input-groups .to-G-input-group input:not(:placeholder-shown)~p,.board-outer-frame .board-outer .board-to-hex .input-groups .to-G-input-group input:focus~p,.board-outer-frame .board-outer .board-to-hex .input-groups .to-B-input-group input:not(:placeholder-shown)~p,.board-outer-frame .board-outer .board-to-hex .input-groups .to-B-input-group input:focus~p{color:#000;background-color:#fff;transform:translate(-103px,-25px)}.board-outer-frame .board-outer .board-to-rgb .input-groups .R-input-group input::-webkit-outer-spin-button,.board-outer-frame .board-outer .board-to-rgb .input-groups .R-input-group input::-webkit-inner-spin-button,.board-outer-frame .board-outer .board-to-rgb .input-groups .G-input-group input::-webkit-outer-spin-button,.board-outer-frame .board-outer .board-to-rgb .input-groups .G-input-group input::-webkit-inner-spin-button,.board-outer-frame .board-outer .board-to-rgb .input-groups .B-input-group input::-webkit-outer-spin-button,.board-outer-frame .board-outer .board-to-rgb .input-groups .B-input-group input::-webkit-inner-spin-button,.board-outer-frame .board-outer .board-to-rgb .input-groups .to-R-input-group input::-webkit-outer-spin-button,.board-outer-frame .board-outer .board-to-rgb .input-groups .to-R-input-group input::-webkit-inner-spin-button,.board-outer-frame .board-outer .board-to-rgb .input-groups .to-G-input-group input::-webkit-outer-spin-button,.board-outer-frame .board-outer .board-to-rgb .input-groups .to-G-input-group input::-webkit-inner-spin-button,.board-outer-frame .board-outer .board-to-rgb .input-groups .to-B-input-group input::-webkit-outer-spin-button,.board-outer-frame .board-outer .board-to-rgb .input-groups .to-B-input-group input::-webkit-inner-spin-button,.board-outer-frame .board-outer .board-to-hex .input-groups .R-input-group input::-webkit-outer-spin-button,.board-outer-frame .board-outer .board-to-hex .input-groups .R-input-group input::-webkit-inner-spin-button,.board-outer-frame .board-outer .board-to-hex .input-groups .G-input-group input::-webkit-outer-spin-button,.board-outer-frame .board-outer .board-to-hex .input-groups .G-input-group input::-webkit-inner-spin-button,.board-outer-frame .board-outer .board-to-hex .input-groups .B-input-group input::-webkit-outer-spin-button,.board-outer-frame .board-outer .board-to-hex .input-groups .B-input-group input::-webkit-inner-spin-button,.board-outer-frame .board-outer .board-to-hex .input-groups .to-R-input-group input::-webkit-outer-spin-button,.board-outer-frame .board-outer .board-to-hex .input-groups .to-R-input-group input::-webkit-inner-spin-button,.board-outer-frame .board-outer .board-to-hex .input-groups .to-G-input-group input::-webkit-outer-spin-button,.board-outer-frame .board-outer .board-to-hex .input-groups .to-G-input-group input::-webkit-inner-spin-button,.board-outer-frame .board-outer .board-to-hex .input-groups .to-B-input-group input::-webkit-outer-spin-button,.board-outer-frame .board-outer .board-to-hex .input-groups .to-B-input-group input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}.board-outer-frame .board-outer .board-to-rgb .input-groups .R-input-group input:placeholder-shown::placeholder,.board-outer-frame .board-outer .board-to-rgb .input-groups .G-input-group input:placeholder-shown::placeholder,.board-outer-frame .board-outer .board-to-rgb .input-groups .B-input-group input:placeholder-shown::placeholder,.board-outer-frame .board-outer .board-to-rgb .input-groups .to-R-input-group input:placeholder-shown::placeholder,.board-outer-frame .board-outer .board-to-rgb .input-groups .to-G-input-group input:placeholder-shown::placeholder,.board-outer-frame .board-outer .board-to-rgb .input-groups .to-B-input-group input:placeholder-shown::placeholder,.board-outer-frame .board-outer .board-to-hex .input-groups .R-input-group input:placeholder-shown::placeholder,.board-outer-frame .board-outer .board-to-hex .input-groups .G-input-group input:placeholder-shown::placeholder,.board-outer-frame .board-outer .board-to-hex .input-groups .B-input-group input:placeholder-shown::placeholder,.board-outer-frame .board-outer .board-to-hex .input-groups .to-R-input-group input:placeholder-shown::placeholder,.board-outer-frame .board-outer .board-to-hex .input-groups .to-G-input-group input:placeholder-shown::placeholder,.board-outer-frame .board-outer .board-to-hex .input-groups .to-B-input-group input:placeholder-shown::placeholder{color:transparent}.board-outer-frame .board-outer .board-to-rgb .input-groups .R-input-group p,.board-outer-frame .board-outer .board-to-rgb .input-groups .G-input-group p,.board-outer-frame .board-outer .board-to-rgb .input-groups .B-input-group p,.board-outer-frame .board-outer .board-to-rgb .input-groups .to-R-input-group p,.board-outer-frame .board-outer .board-to-rgb .input-groups .to-G-input-group p,.board-outer-frame .board-outer .board-to-rgb .input-groups .to-B-input-group p,.board-outer-frame .board-outer .board-to-hex .input-groups .R-input-group p,.board-outer-frame .board-outer .board-to-hex .input-groups .G-input-group p,.board-outer-frame .board-outer .board-to-hex .input-groups .B-input-group p,.board-outer-frame .board-outer .board-to-hex .input-groups .to-R-input-group p,.board-outer-frame .board-outer .board-to-hex .input-groups .to-G-input-group p,.board-outer-frame .board-outer .board-to-hex .input-groups .to-B-input-group p{position:absolute;left:50%;top:0%;color:#0000004d;transform:translate(-50%,-25%);background-color:transparent;pointer-events:none;padding:0 5px;margin-bottom:0;transition:.7s ease}.board-outer-frame .board-outer .board-to-rgb .input-groups .converter-hex-footer,.board-outer-frame .board-outer .board-to-rgb .input-groups .converter-rgb-footer,.board-outer-frame .board-outer .board-to-hex .input-groups .converter-hex-footer,.board-outer-frame .board-outer .board-to-hex .input-groups .converter-rgb-footer{text-align:center;font-size:22px;font-weight:700;margin-top:10px}.board-outer-frame .board-outer .board-to-rgb .input-groups .converter-hex-footer,.board-outer-frame .board-outer .board-to-hex .input-groups .converter-hex-footer{margin-top:25px}.board-outer-frame .board-outer .board-to-rgb .input-groups .to-hex-input-group,.board-outer-frame .board-outer .board-to-rgb .input-groups .hex-input-group,.board-outer-frame .board-outer .board-to-rgb .input-groups .full-rgb-input-group,.board-outer-frame .board-outer .board-to-hex .input-groups .to-hex-input-group,.board-outer-frame .board-outer .board-to-hex .input-groups .hex-input-group,.board-outer-frame .board-outer .board-to-hex .input-groups .full-rgb-input-group{display:flex;justify-content:center;margin-top:15px}.board-outer-frame .board-outer .board-to-rgb .input-groups .to-hex-input-group input,.board-outer-frame .board-outer .board-to-rgb .input-groups .hex-input-group input,.board-outer-frame .board-outer .board-to-rgb .input-groups .full-rgb-input-group input,.board-outer-frame .board-outer .board-to-hex .input-groups .to-hex-input-group input,.board-outer-frame .board-outer .board-to-hex .input-groups .hex-input-group input,.board-outer-frame .board-outer .board-to-hex .input-groups .full-rgb-input-group input{width:100%;font-size:20px;border:none;outline:none;border-radius:5px;box-shadow:0 0 2px #000000b3;padding:6px 5px 4px;text-align:center}.board-outer-frame .board-outer .board-to-rgb .input-groups .full-rgb-input-group,.board-outer-frame .board-outer .board-to-hex .input-groups .full-rgb-input-group{margin-top:unset}.board-outer-frame .board-outer .board-to-rgb .input-groups .to-hex-input-group,.board-outer-frame .board-outer .board-to-rgb .input-groups .full-rgb-input-group,.board-outer-frame .board-outer .board-to-hex .input-groups .to-hex-input-group,.board-outer-frame .board-outer .board-to-hex .input-groups .full-rgb-input-group{position:relative}.board-outer-frame .board-outer .board-to-rgb .input-groups .to-hex-input-group .copy-btn,.board-outer-frame .board-outer .board-to-rgb .input-groups .full-rgb-input-group .copy-btn,.board-outer-frame .board-outer .board-to-hex .input-groups .to-hex-input-group .copy-btn,.board-outer-frame .board-outer .board-to-hex .input-groups .full-rgb-input-group .copy-btn{position:absolute;top:0;right:0;transform:translate(-65%,50%);cursor:pointer;user-select:none}.board-outer-frame .board-outer .board-to-rgb .input-groups .to-hex-input-group .copy-btn i,.board-outer-frame .board-outer .board-to-rgb .input-groups .full-rgb-input-group .copy-btn i,.board-outer-frame .board-outer .board-to-hex .input-groups .to-hex-input-group .copy-btn i,.board-outer-frame .board-outer .board-to-hex .input-groups .full-rgb-input-group .copy-btn i{color:#646464}.board-outer-frame .board-outer .board-to-rgb .input-groups .to-hex-input-group .copy-btn .tooltip,.board-outer-frame .board-outer .board-to-rgb .input-groups .full-rgb-input-group .copy-btn .tooltip,.board-outer-frame .board-outer .board-to-hex .input-groups .to-hex-input-group .copy-btn .tooltip,.board-outer-frame .board-outer .board-to-hex .input-groups .full-rgb-input-group .copy-btn .tooltip{color:#fff;font-size:15px;position:absolute;border-radius:6.4px;padding:6px;text-align:center;transform:translate(-28px,-52px);width:55px;opacity:0;z-index:-1;transition:.7s ease;background-color:#505050}.board-outer-frame .board-outer .board-to-rgb .input-groups .to-hex-input-group .copy-btn .tooltip:after,.board-outer-frame .board-outer .board-to-rgb .input-groups .full-rgb-input-group .copy-btn .tooltip:after,.board-outer-frame .board-outer .board-to-hex .input-groups .to-hex-input-group .copy-btn .tooltip:after,.board-outer-frame .board-outer .board-to-hex .input-groups .full-rgb-input-group .copy-btn .tooltip:after{content:"";position:absolute;top:0;left:0;width:0;height:0;border:6px solid transparent;border-top-color:#505050;transform:translate(29px,27px);transition:.7s ease}.board-outer-frame .board-outer .board-to-rgb .input-groups .to-hex-input-group .copy-btn:hover .tooltip,.board-outer-frame .board-outer .board-to-rgb .input-groups .full-rgb-input-group .copy-btn:hover .tooltip,.board-outer-frame .board-outer .board-to-hex .input-groups .to-hex-input-group .copy-btn:hover .tooltip,.board-outer-frame .board-outer .board-to-hex .input-groups .full-rgb-input-group .copy-btn:hover .tooltip{opacity:1}.board-outer-frame .board-outer .board-to-rgb .input-groups .hex-RGB-input-group,.board-outer-frame .board-outer .board-to-hex .input-groups .hex-RGB-input-group{display:grid;grid-template-columns:auto auto auto;grid-gap:10px}.board-outer-frame .board-outer .board-to-rgb .input-groups .hex-RGB-input-group input,.board-outer-frame .board-outer .board-to-hex .input-groups .hex-RGB-input-group input{padding:7px 5px 5px}.board-outer-frame .board-outer .board-to-rgb .input-groups .hex-RGB-input-group input:not(:placeholder-shown)~p,.board-outer-frame .board-outer .board-to-rgb .input-groups .hex-RGB-input-group input:focus~p,.board-outer-frame .board-outer .board-to-hex .input-groups .hex-RGB-input-group input:not(:placeholder-shown)~p,.board-outer-frame .board-outer .board-to-hex .input-groups .hex-RGB-input-group input:focus~p{transform:translate(-28px,-25px)}.board-outer-frame .board-outer .board-to-rgb .preview-color,.board-outer-frame .board-outer .board-to-hex .preview-color{width:60%;height:100%;position:relative}.board-outer-frame .board-outer .board-to-rgb .preview-color .color-box,.board-outer-frame .board-outer .board-to-hex .preview-color .color-box{width:100%;height:100%;transition:.5s ease}.board-outer-frame .board-outer .board-to-rgb .preview-color .color-box-frame,.board-outer-frame .board-outer .board-to-hex .preview-color .color-box-frame{color:#fff;font-weight:700;font-size:18px;text-shadow:0 1px 5px rgba(0,0,0,.6);display:flex;justify-content:flex-end;flex-direction:column;align-items:center;position:absolute;left:0;right:0;bottom:4%}.board-outer-frame .operate-desc{color:#fff;padding:12px 15px;margin-top:20px;background-color:#3c3c3c;box-shadow:0 0 20px 4px #0000004d;border-radius:5px}.board-outer-frame .operate-desc .title{font-size:25px;font-weight:700}.board-outer-frame .operate-desc .desc{margin-top:12px;line-height:25px;text-align:justify}
`,ja=Object.defineProperty,Ba=Object.getOwnPropertyDescriptor,Xt=(o,e,t,n)=>{for(var r=n>1?void 0:n?Ba(e,t):e,a=o.length-1,i;a>=0;a--)(i=o[a])&&(r=(n?i(e,t,r):i(r))||r);return n&&r&&ja(e,t,r),r};let ze=class extends W{constructor(){super(...arguments),this.toggleMode=!1,this.initState={inRGB_RVal:"0",inRGB_GVal:"0",inRGB_BVal:"0",inRGB_HexVal:"",inHex_RVal:"",inHex_GVal:"",inHex_BVal:"",inHex_HexVal:"#000000",isCopyed:!1}}toggleBoard(o){this.toggleMode=o}setInputVal(o,{target:e}){const t=e.value;if(o==="inHex_HexVal")try{const[n,r,a]=D.hexToRgb(e.value).split(",");this.initState={...this.initState,inHex_RVal:n,inHex_GVal:r,inHex_BVal:a}}catch{this.initState={...this.initState,inHex_RVal:"0",inHex_GVal:"0",inHex_BVal:"0"}}else{if(t.split("")[0]==="0"){const n=t.split("");n.shift(),e.value=n.join("")}else t===""?e.value="0":Number(t)>255&&(e.value="255");this.initState[o]=e.value,this.initState={...this.initState,inRGB_HexVal:D.rgbToHex(_.convert(this.initState.inRGB_RVal,"number"),_.convert(this.initState.inRGB_GVal,"number"),_.convert(this.initState.inRGB_BVal,"number"))}}this.requestUpdate()}copyText(o){navigator.clipboard.writeText(o),this.initState={...this.initState,isCopyed:!0},setTimeout(()=>this.initState={...this.initState,isCopyed:!1},1e3)}firstUpdated(o){const[e,t,n]=D.hexToRgb(this.initState.inHex_HexVal).split(",");this.initState={...this.initState,inRGB_HexVal:D.rgbToHex(_.convert(this.initState.inRGB_RVal,"number"),_.convert(this.initState.inRGB_GVal,"number"),_.convert(this.initState.inRGB_BVal,"number")),inHex_RVal:e,inHex_GVal:t,inHex_BVal:n},navigator.clipboard.addEventListener("copy",()=>console.log(1))}render(){return j`
            <div class="board-outer-frame">
                <div class="board-outer">
                    <div class="converter-btn" @click=${this.toggleBoard.bind(this,!this.toggleMode)}>${A("pages.converter.toggleConverter")}</div>
                    <div class=${this.toggleMode?"board-to-rgb":"board-to-rgb active"}>
                        <div class="input-groups">
                            <div class="converter-rgb-title">${A("pages.converter.rgbToHex")}</div>
                            <div class="R-input-group">
                                <input type="number" inputmode="numeric" value=${this.initState.inRGB_RVal} @input=${this.setInputVal.bind(this,"inRGB_RVal")}/>
                                <p>R</p>
                            </div>
                            <div class="G-input-group">
                                <input type="number" inputmode="numeric" value=${this.initState.inRGB_GVal} @input=${this.setInputVal.bind(this,"inRGB_GVal")} />
                                <p>G</p>
                            </div>
                            <div class="B-input-group">
                                <input type="number" inputmode="numeric" value=${this.initState.inRGB_BVal} @input=${this.setInputVal.bind(this,"inRGB_BVal")} />
                                <p>B</p>
                            </div>
                            <div class="converter-rgb-footer">${A("pages.converter.toHex")}</div>
                            <div class="to-hex-input-group">
                                <input type="text" readonly .value=${Xe(this.initState.inRGB_HexVal)} />
                                <div class="copy-btn" @click=${this.copyText.bind(this,this.initState.inRGB_HexVal)}>
                                    <i class="fas fa-copy"></i>
                                    <div class="tooltip">${A(`pages.converter.${this.initState.isCopyed?"copied":"copy"}`)}</div>
                                </div>
                            </div>
                        </div>
                        <div class="preview-color">
                            <div class="color-box" style="background-color:${this.initState.inRGB_HexVal};"></div>
                            <div class="color-box-frame">${A("pages.converter.previewColor")}</div>
                        </div>
                    </div>
                    <div class=${this.toggleMode?"board-to-hex active":"board-to-hex"}>
                        <div class="input-groups">
                            <div class="converter-rgb-title">${A("pages.converter.hexToRGB")}</div>
                            <div class="hex-input-group">
                                <input type="text" value=${this.initState.inHex_HexVal} @input=${this.setInputVal.bind(this,"inHex_HexVal")}/>
                            </div>
                            <div class="converter-hex-footer">${A("pages.converter.toRGB")}</div>
                            <div class="hex-RGB-input-group">
                                <div class="to-R-input-group">
                                    <input type="number" inputmode="numeric" readonly .value=${Xe(this.initState.inHex_RVal)} />
                                    <p>R</p>
                                </div>
                                <div class="to-G-input-group">
                                    <input type="number" inputmode="numeric" readonly .value=${Xe(this.initState.inHex_GVal)} />
                                    <p>G</p>
                                </div>
                                <div class="to-B-input-group">
                                    <input type="number" inputmode="numeric" readonly .value=${Xe(this.initState.inHex_BVal)} />
                                    <p>B</p>
                                </div>
                            </div>
                            <div class="full-rgb-input-group">
                                <input type="text" readonly .value=${`rgb(${this.initState.inHex_RVal},${this.initState.inHex_GVal},${this.initState.inHex_BVal})`} />
                                <div class="copy-btn" @click=${this.copyText.bind(this,`rgb(${this.initState.inHex_RVal},${this.initState.inHex_GVal},${this.initState.inHex_BVal})`)}>
                                    <i class="fas fa-copy"></i>
                                    <div class="tooltip">${A(`pages.converter.${this.initState.isCopyed?"copied":"copy"}`)}</div>
                                </div>
                            </div>
                        </div>
                        <div class="preview-color">
                            <div class="color-box" style="background-color:rgb(${this.initState.inHex_RVal},${this.initState.inHex_GVal},${this.initState.inHex_BVal});"></div>
                            <div class="color-box-frame">${A("pages.converter.previewColor")}</div>
                        </div>
                    </div>
                </div>
                <div class="operate-desc">
                    <div class="title">${A("pages.converter.operateDescTitle")}</div>
                    <div class="desc">${A("pages.converter.operateDescContent")}</div>
                </div>
            </div>
        `}};ze.styles=[Na,xn];Xt([P()],ze.prototype,"toggleMode",2);Xt([P()],ze.prototype,"initState",2);ze=Xt([Pe("converter-element"),Mt()],ze);var Da=`.color-card-outer-frame .color-card-outer{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));grid-gap:10px;padding:10px}.color-card-outer-frame .color-card-outer .color-card-item{position:relative;height:160px;border-radius:5px;overflow:hidden;box-shadow:0 0 6px #00000080;background-color:#ffffff80;backdrop-filter:blur(10px)}.color-card-outer-frame .color-card-outer .color-card-item .card-content-mask{display:flex;flex-direction:column;justify-content:center;align-items:center;position:absolute;top:0;right:0;left:0;bottom:0;border-radius:0 0 5px 5px;font-size:15px;color:#fff;padding:4px 7px 5px;line-height:25px;text-shadow:1px 1px 3px rgba(0,0,0,.7);background-color:#ffffff80;opacity:0;transition:.5s ease}.color-card-outer-frame .color-card-outer .color-card-item:hover .card-content-mask{opacity:1}
`,Ha=["#FFFFFF","#DDDDDD","#AAAAAA","#888888","#666666","#444444","#000000","#FFB7DD","#FF88C2","#FF44AA","#FF0088","#C10066","#A20055","#8C0044","#FFCCCC","#FF8888","#FF3333","#FF0000","#CC0000","#AA0000","#880000","#FFC8B4","#FFA488","#FF7744","#FF5511","#E63F00","#C63300","#A42D00","#FFDDAA","#FFBB66","#FFAA33","#FF8800","#EE7700","#CC6600","#BB5500","#FFEE99","#FFDD55","#FFCC22","#FFBB00","#DDAA00","#AA7700","#886600","#FFFFBB","#FFFF77","#FFFF33","#FFFF00","#EEEE00","#BBBB00","#888800","#EEFFBB","#DDFF77","#CCFF33","#BBFF00","#99DD00","#88AA00","#668800","#CCFF99","#BBFF66","#99FF33","#77FF00","#66DD00","#55AA00","#227700","#99FF99","#66FF66","#33FF33","#00FF00","#00DD00","#00AA00","#008800","#BBFFEE","#77FFCC","#33FFAA","#00FF99","#00DD77","#00AA55","#008844","#AAFFEE","#77FFEE","#33FFDD","#00FFCC","#00DDAA","#00AA88","#008866","#99FFFF","#66FFFF","#33FFFF","#00FFFF","#00DDDD","#00AAAA","#008888","#CCEEFF","#77DDFF","#33CCFF","#00BBFF","#009FCC","#0088A8","#007799","#CCDDFF","#99BBFF","#5599FF","#0066FF","#0044BB","#003C9D","#003377","#CCCCFF","#9999FF","#5555FF","#0000FF","#0000CC","#0000AA","#000088","#CCBBFF","#9F88FF","#7744FF","#5500FF","#4400CC","#2200AA","#220088","#D1BBFF","#B088FF","#9955FF","#7700FF","#5500DD","#4400B3","#3A0088","#E8CCFF","#D28EFF","#B94FFF","#9900FF","#7700BB","#66009D","#550088","#F0BBFF","#E377FF","#D93EFF","#CC00FF","#A500CC","#7A0099","#660077","#FFB3FF","#FF77FF","#FF3EFF","#FF00FF","#CC00CC","#990099","#770077"],Ia=Object.defineProperty,Ua=Object.getOwnPropertyDescriptor,Ma=(o,e,t,n)=>{for(var r=n>1?void 0:n?Ua(e,t):e,a=o.length-1,i;a>=0;a--)(i=o[a])&&(r=(n?i(e,t,r):i(r))||r);return n&&r&&Ia(e,t,r),r};let Bt=class extends W{render(){return j`
            <div class="color-card-outer-frame">
                <div class="color-card-outer">
                    ${_.maps(Ha,o=>j`
                        <div class="color-card-item" style="background-color:${o};">
                            <div class="card-content-mask">
                                <div>RGB：rgb(${D.hexToRgb(o)})</div>
                                <div>HEX：${o}</div>
                            </div>
                        </div>
                    `)}
                </div>
            </div>
        `}};Bt.styles=Da;Bt=Ma([Pe("color-card-element")],Bt);var Va=`.area-outer{display:grid;grid-template-columns:60vw 30vw;grid-template-rows:90vh;grid-gap:10px;justify-content:center}.area-outer .left-area{position:relative}.area-outer .left-area .img-outer{overflow:hidden;border-radius:5px}.area-outer .left-area .img-outer .img{width:100%;height:100%;opacity:0;border-radius:5px;user-select:none}.area-outer .left-area .img-outer .img.toggle{opacity:1}.area-outer .left-area .img-outer .img-frame{color:#fff;font-weight:700;display:flex;justify-content:center;flex-direction:column;align-items:center;position:absolute;top:0;left:0;right:0;bottom:0;opacity:1;pointer-events:all;border-radius:5px;background-color:#3c3c3c;transition:.7s ease}.area-outer .left-area .img-outer .img-frame.toggle{opacity:0;pointer-events:none}.area-outer .right-area .color-view-outer{display:grid;grid-template-rows:300px auto;grid-gap:10px}.area-outer .right-area .color-view-outer .color-box{border-radius:5px;box-shadow:3px 3px 13px 3px #00000080;transition:.3s ease}.area-outer .right-area .color-view-outer .color-box-content{padding:5px 12px;line-height:30px;border-radius:5px;color:#fff;background-color:#3c3c3c;box-shadow:3px 3px 13px 3px #00000080}.canvas{display:none}.bgview{width:100px;height:100px}
`,za=Object.defineProperty,Ga=Object.getOwnPropertyDescriptor,oe=(o,e,t,n)=>{for(var r=n>1?void 0:n?Ga(e,t):e,a=o.length-1,i;a>=0;a--)(i=o[a])&&(r=(n?i(e,t,r):i(r))||r);return n&&r&&za(e,t,r),r};let M=class extends W{constructor(){super(...arguments),this.x=0,this.y=0,this.img=Qe(),this.canvas=Qe(),this.colorVeiwBox=Qe(),this.fileUrl="",this.toggleImg=!1,this.rgb=[]}dragenter(o){o.stopPropagation(),o.preventDefault()}dragover(o){o.stopPropagation(),o.preventDefault()}drop(o){o.stopPropagation(),o.preventDefault();const e=o.dataTransfer.files;e[0]&&this.handleFiles(e)}handleFiles(o){const{img:{value:e},canvas:{value:t}}=this,n=o[0];/^image\//.test(n.type)&&(e.setAttribute("src",window.URL.createObjectURL(n)),t.getContext("2d").clearRect(0,0,t.width,t.height),this.convertRGB(t,e),this.toggleImg=!0)}catchColor(o){const{img:{value:e},canvas:{value:t}}=this;o.offsetX?(this.x=o.offsetX,this.y=o.offsetY):o.layerX&&(this.x=o.layerX,this.y=o.layerY),this.convertRGB(t,e)}convertRGB(o,e){o.width=e.width,o.height=e.height,o.getContext("2d").drawImage(e,0,0,e.width,e.height);const t=o.getContext("2d").getImageData(this.x,this.y,1,1).data;this.colorVeiwBox.value.style.background=D.rgbToHex(t[0],t[1],t[2]),this.rgb=[_.convert(t[0],"number"),_.convert(t[1],"number"),_.convert(t[2],"number")]}changeCursor(o){const{img:{value:e}}=this;o?_(e).styles("set","cursor","crosshair"):_(e).styles("remove","cursor","")}convertText(o){const[e,t,n]=this.rgb;return console.log(this.rgb),{rgb:this.rgb.length>0?`rgb(${e},${t},${n})`:A("pages.imagePicker.cathMsg"),hex:this.rgb.length>0?D.rgbToHex(e,t,n):A("pages.imagePicker.cathMsg")}[o]}render(){return j`
        <div class="area-outer">
          <div class="left-area">
            <div class="img-outer">
              <img class=${this.toggleImg?"img toggle":"img"}
                ${Ze(this.img)} 
                src=${this.fileUrl}
                @click=${this.catchColor}
                @dragenter=${this.dragenter}
                @dragover=${this.dragover}
                @drop=${this.drop}
                @mouseenter=${this.changeCursor}
              />
              <div 
                class=${this.toggleImg?"img-frame toggle":"img-frame"}
                @dragenter=${this.dragenter}
                @dragover=${this.dragover}
                @drop=${this.drop}
              >
                ${A("pages.imagePicker.dragImgContent")}
              </div>
            </div>
          </div>
          <div class="right-area">
            <div class="color-view-outer">
              <div class="color-box" ${Ze(this.colorVeiwBox)}></div>
              <div class="color-box-content">
                <span>${A("pages.imagePicker.cathColorTitle")}</span>
                <div>RGB：${this.convertText("rgb")}</div>
                <div>HEX：${this.convertText("hex")}</div>
              </div>
            </div>
          </div>
        </div>
        <canvas class="canvas" ${Ze(this.canvas)}></canvas>
      `}};M.styles=Va;oe([P()],M.prototype,"x",2);oe([P()],M.prototype,"y",2);oe([P()],M.prototype,"img",2);oe([P()],M.prototype,"canvas",2);oe([P()],M.prototype,"colorVeiwBox",2);oe([P()],M.prototype,"fileUrl",2);oe([P()],M.prototype,"toggleImg",2);oe([P()],M.prototype,"rgb",2);M=oe([Pe("image-color-picker-element"),Mt()],M);const ee=new aa("/");ee.useLocation=()=>({...ee.current[0],state:window.history.state});ee.useNavigate=o=>ee.navigate(o.path,o);const qa=o=>(ee.on("/",()=>o.call(o,j`<my-element />`)).on("/converter",()=>o.call(o,j`<converter-element />`)).on("/picker",()=>o.call(o,j`<color-picker-element />`)).on("/color_card",()=>o.call(o,j`<color-card-element />`)).on("/image_picker",()=>o.call(o,j`<image-color-picker-element />`)),ee.resolve(),ee);var Ka=`.language-list-outer{position:fixed;top:0;right:0;z-index:2;margin:5px;overflow:hidden;border-radius:5px;height:32px;transition:.5s ease}.language-list-outer .language-display-outer{display:flex;align-items:center;color:#fff;padding:8px;background-color:#3c3c3c;cursor:pointer;user-select:none}.language-list-outer .language-display-outer i{padding-right:5px}.language-list-outer .language-list{position:absolute;top:0;left:0;right:0;bottom:0;z-index:-1;transition:.5s ease}.language-list-outer .language-list .language-list-item{color:#fff;padding:8px;background-color:#3c3c3c;cursor:pointer;user-select:none;text-align:center}.language-list-outer .language-list .language-list-item:nth-of-type(2){padding:0 8px 8px}.language-list-outer .language-list.toggle{top:32%}.language-list-outer.toggle{height:82px}.nav-list{position:fixed;right:0;bottom:0;border-radius:50%;background-color:#00b3ff;box-shadow:inset 0 0 3px 1px #ffffffb3;padding:9px 11px;z-index:5;transform:translate(-90%,-75%);cursor:pointer;user-select:none}.nav-list .line-icon .line{width:18px;height:2px;background-color:#fff;border-radius:20px;margin:4px 0;transform:translate(0) rotate(0);transition:.3s ease}.nav-list .nav-btn-group-zh,.nav-list .nav-btn-group-en{position:absolute;top:0;left:0;right:0;bottom:0;width:125px;height:128px;opacity:0;transform:scale(.8) translate(-118px,-126px);background-color:#ffffff80;box-shadow:0 0 5px #0000004d;border-radius:5px;padding:4px 2px;pointer-events:none;transition:.3s ease;backdrop-filter:blur(10px)}.nav-list .nav-btn-group-zh div,.nav-list .nav-btn-group-en div{cursor:pointer;user-select:none;padding:8px;text-align:center}.nav-list .nav-btn-group-zh.toggle,.nav-list .nav-btn-group-en.toggle{opacity:1;transform:scale(1) translate(-107px,-114px);pointer-events:all}.nav-list .nav-btn-group-en{width:152px;transform:scale(.8) translate(-148px,-126px)}.nav-list .nav-btn-group-en.toggle{transform:scale(1) translate(-134px,-115px)}.nav-list.toggle .line-icon .line:nth-of-type(1){transform:translateY(6px) rotate(135deg)}.nav-list.toggle .line-icon .line:nth-of-type(2){width:0}.nav-list.toggle .line-icon .line:nth-of-type(3){transform:translateY(-6px) rotate(-135deg)}.container{display:flex;flex-direction:column;justify-content:center;min-height:100vh;max-width:1270px;margin:0 auto}.container converter-element,.container color-picker-element{align-self:center}
`,Wa=Object.defineProperty,Ja=Object.getOwnPropertyDescriptor,ut=(o,e,t,n)=>{for(var r=n>1?void 0:n?Ja(e,t):e,a=o.length-1,i;a>=0;a--)(i=o[a])&&(r=(n?i(e,t,r):i(r))||r);return n&&r&&Wa(e,t,r),r};let Ae=class extends W{constructor(){super(...arguments),this.toggleNavStatus=!1,this.toggleLanguageList=!1}goPage(o){ee.useNavigate({path:o})}toggleNavBar(){this.toggleNavStatus=!this.toggleNavStatus}changeLanguage(o){this.toggleLanguageList=!1,B.changeLanguage(o)}toggleLanguageListStatus(){this.toggleLanguageList=!this.toggleLanguageList}firstUpdated(o){qa(e=>this.currentRoute=e),ee.useNavigate({path:"/converter"})}render(){return j`
            <div class=${this.toggleLanguageList?"language-list-outer toggle":"language-list-outer"}>
                <div class="language-display-outer" @click=${this.toggleLanguageListStatus}>
                    <i class="fas fa-globe-asia"></i>
                    <div class="language-display">${A(B.language)}</div>
                </div>
                <div class=${this.toggleLanguageList?"language-list toggle":"language-list"}>
                    <div class="language-list-item" @click=${this.changeLanguage.bind(this,"zh")}>${A("zh")}</div>
                    <div class="language-list-item" @click=${this.changeLanguage.bind(this,"en")}>${A("en")}</div>
                </div>
            </div>
            <div class=${this.toggleNavStatus?"nav-list toggle":"nav-list"} @click=${this.toggleNavBar}>
                <div class="line-icon">
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                </div>
                <div class=${this.toggleNavStatus?`nav-btn-group-${B.language} toggle`:`nav-btn-group-${B.language}`}>
                    <div class="converter" @click=${this.goPage.bind(this,"/converter")}>${A("nav.converter")}</div>
                    <div class="picker" @click=${this.goPage.bind(this,"/picker")}>${A("nav.picker")}</div>
                    <div class="color-card" @click=${this.goPage.bind(this,"/color_card")}>${A("nav.card")}</div>
                    <div class="image-picker" @click=${this.goPage.bind(this,"/image_picker")}>${A("nav.imagePicker")}</div>
                </div>
            </div>
            <div class="container">${this.currentRoute}</div>
        `}};Ae.styles=[Ka,xn];ut([P()],Ae.prototype,"currentRoute",2);ut([P()],Ae.prototype,"toggleNavStatus",2);ut([P()],Ae.prototype,"toggleLanguageList",2);Ae=ut([Pe("main-element")],Ae);var Ya=Object.defineProperty,Xa=Object.getOwnPropertyDescriptor,wn=(o,e,t,n)=>{for(var r=n>1?void 0:n?Xa(e,t):e,a=o.length-1,i;a>=0;a--)(i=o[a])&&(r=(n?i(e,t,r):i(r))||r);return n&&r&&Ya(e,t,r),r};let Dt=class extends W{constructor(){super(...arguments),this.i18Init=B.init({resources:Nr,lng:"zh",fallbackLng:"zh",interpolation:{escapeValue:!1}})}async performUpdate(){return await this.i18Init,super.performUpdate()}render(){return j`
      <main-element></main-element>
    `}};wn([P()],Dt.prototype,"i18Init",2);Dt=wn([Pe("my-element"),Mt()],Dt);
