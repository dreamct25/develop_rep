function e(e,t,a,n){Object.defineProperty(e,t,{get:a,set:n,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var a=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequire35b1;a.register("7gcRj",(function(t,n){e(t.exports,"CustomInput",(function(){return a("b9jEe").default})),e(t.exports,"CustomTextArea",(function(){return a("9aewZ").default})),e(t.exports,"ActionModal",(function(){return a("gS6P6").default})),e(t.exports,"Pagination",(function(){return a("aJ6yw").default})),e(t.exports,"Loading",(function(){return a("iqnQ5").default})),a("gE27O");a("b9jEe");a("khpzf");a("9aewZ");a("ajQuo");a("gS6P6");a("Rf4XD");a("aJ6yw");a("kwGWo");a("iqnQ5")})),a.register("gE27O",(function(t,n){e(t.exports,"CustomInput",(function(){return a("b9jEe").default})),e(t.exports,"Container",(function(){return a("829AE").default}));a("b9jEe"),a("829AE")})),a.register("b9jEe",(function(n,r){e(n.exports,"default",(function(){return i}));var o=a("e0rqH");a("gE27O");var l=a("829AE");var i=({label:e,bindVal:a,type:n,changeEvent:r,clickEvent:i,className:s,disabled:c})=>t(o).createElement(l.default,null,r?t(o).createElement(t(o).Fragment,null,t(o).createElement("input",{disabled:c||!1,type:n,value:a,onChange:r,className:s||""}),t(o).createElement("p",null,e),t(o).createElement("fieldset",null,t(o).createElement("legend",null,e))):i?t(o).createElement(t(o).Fragment,null,t(o).createElement("input",{disabled:c||!1,type:n,defaultValue:a,onClick:i,readOnly:!0,className:s||""}),t(o).createElement("p",null,e),t(o).createElement("fieldset",null,t(o).createElement("legend",null,e))):t(o).createElement(t(o).Fragment,null,t(o).createElement("input",{disabled:c||!1,type:n,defaultValue:a,readOnly:!0,className:s||""}),t(o).createElement("p",null,e),t(o).createElement("fieldset",null,t(o).createElement("legend",null,e))))})),a.register("829AE",(function(t,n){e(t.exports,"default",(function(){return o}));let r;var o=a("b9ZNc").default.div(r||(r=(e=>e)`
    position: relative;

    fieldset{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 1px solid;
        border-color: rgba(255,255,255,.5);
        border-radius: 5px;
        padding: 0 12px 0 8px;
        margin-top: -12px;
        height: 70px;
        z-index: 1;
        transition: .5s ease;
        opacity: 0;

        legend{
            float: unset;
            width: unset;
            font-size: 16px;
            line-height: unset;
            margin-bottom: unset;
            padding: 0 3px;
            opacity: 0;
        }
    }

    input{
        position: relative;
        z-index: 3;
        width: 100%;
        outline: none;
        border: none;
        background-color: transparent;
        font-size: 18px;
        height: 58px;
        padding: 0 12px;
        color: white;
        border: 1px solid;
        border-color: rgba(255,255,255,.5);
        border-radius: 5px;
        transition: .5s ease;

        &:placeholder-shown::placeholder {
            color: transparent;
        }

        &:focus{
            border-color: rgba(255,255,255,0);
        }

        &:focus ~ p{
            opacity: 1;
            transform: scale(0.85);
            left: 0;
            top: -22%;
        }

        &:focus ~ fieldset{
            opacity: 1;
        }

        &.lock{
            &:not(:placeholder-shown){
                border-color: rgba(255,255,255,0);
            }

            &:not(:placeholder-shown) ~ p {
                opacity: 1;
                transform: scale(0.85);
                left: 0;
                top: -22%;
            }

            &:not(:placeholder-shown) ~ fieldset{
                opacity: 1;
            }
        }
        
    }

    p {
        position: absolute;
        left: 50%;
        top: 50%;
        color: white;
        opacity: .7;
        transform: scale(1) translate(-50%, -50%);
        pointer-events: none;
        margin-bottom: 0;
        font-size: 13px;
        transition: .5s ease;
        z-index: 2;
        font-size: 18px;
        padding: 0 10px 0 6px;

        &::before{
            content: '';
            margin-right: 4px;
        }

        &::after{
            content: '';
            margin-left: 4px;
        }
    }
`))})),a.register("khpzf",(function(t,n){e(t.exports,"CustomTextArea",(function(){return a("9aewZ").default})),e(t.exports,"Container",(function(){return a("l28WL").default}));a("9aewZ"),a("l28WL")})),a.register("9aewZ",(function(n,r){e(n.exports,"default",(function(){return i}));var o=a("e0rqH");a("khpzf");var l=a("l28WL");var i=({label:e,bindVal:a,type:n,changeEvent:r,className:i,disabled:s})=>t(o).createElement(l.default,null,r?t(o).createElement(t(o).Fragment,null,t(o).createElement("textarea",{disabled:s||!1,cols:"30",rows:"10",value:a,onChange:r,className:i||""}),t(o).createElement("p",null,e),t(o).createElement("fieldset",null,t(o).createElement("legend",null,e))):t(o).createElement(t(o).Fragment,null,t(o).createElement("textarea",{disabled:s||!1,cols:"30",rows:"10",value:a,readOnly:!0,className:i||""}),t(o).createElement("p",null,e),t(o).createElement("fieldset",null,t(o).createElement("legend",null,e))))})),a.register("l28WL",(function(t,n){e(t.exports,"default",(function(){return o}));let r;var o=a("b9ZNc").default.div(r||(r=(e=>e)`
    position: relative;

    fieldset{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 1px solid;
        border-color: rgba(255,255,255,.5);
        border-radius: 5px;
        padding: 0 12px 0 8px;
        height: 172px;
        z-index: 1;
        transition: .5s ease;
        opacity: 0;
        margin-top: -12px;

        legend{
            float: unset;
            width: unset;
            font-size: 16px;
            line-height: unset;
            margin-bottom: unset;
            padding: 0 3px;
            opacity: 0;
        }
    }

    textarea{
        position: relative;
        z-index: 3;
        width: 100%;
        outline: none;
        border: none;
        background-color: transparent;
        font-size: 18px;
        height: 160px;
        padding: 12px;
        color: white;
        border: 1px solid;
        border-color: rgba(255,255,255,.5);
        border-radius: 5px;
        resize: none;
        transition: .5s ease;

        &:placeholder-shown::placeholder {
            color: transparent;
        }

        &:focus{
            border-color: rgba(255,255,255,0);
        }

        &:focus ~ p{
            opacity: 1;
            transform: scale(0.85);
            left: 0;
            top: -7%;
        }

        &:focus ~ fieldset{
            opacity: 1;
        }

        &.lock{
            &:not(:placeholder-shown){
                border-color: rgba(255,255,255,0);
            }

            &:not(:placeholder-shown) ~ p {
                opacity: 1;
                transform: scale(0.85);
                left: 0;
                top: -7%;
            }

            &:not(:placeholder-shown) ~ fieldset{
                opacity: 1;
            }
        }
        
    }

    p {
        position: absolute;
        left: 50%;
        top: 50%;
        color: white;
        opacity: .7;
        transform: scale(1) translate(-50%, -50%);
        pointer-events: none;
        margin-bottom: 0;
        font-size: 13px;
        transition: .5s ease;
        z-index: 2;
        font-size: 18px;
        padding: 0 10px 0 4px;

        &::before{
            content: '';
            margin-right: 4px;
        }

        &::after{
            content: '';
            margin-left: 4px;
        }
    }
`))})),a.register("ajQuo",(function(t,n){e(t.exports,"ActionModal",(function(){return a("gS6P6").default})),e(t.exports,"Container",(function(){return a("cxSWF").default}));a("gS6P6"),a("cxSWF")})),a.register("gS6P6",(function(n,r){e(n.exports,"default",(function(){return i}));var o=a("e0rqH");a("ajQuo");var l=a("cxSWF");var i=({acionModalTitle:e,toggleModalStatus:a,children:n,confirmEvent:r,cancelEvent:i})=>t(o).createElement(l.default,{toggleModalStatus:a},t(o).createElement("div",{className:"action-modal-outer"},t(o).createElement("div",{className:"action-modal-header"},e||"提示訊息"),t(o).createElement("hr",null),t(o).createElement("div",{className:"action-modal-body"},n),t(o).createElement("hr",null),t(o).createElement("div",{className:"action-modal-footer"},t(o).createElement("div",{onClick:r,className:"confirm"},"確定"),i?t(o).createElement("div",{onClick:i,className:"cancel"},"取消"):null)))})),a.register("cxSWF",(function(t,n){e(t.exports,"default",(function(){return o}));let r;var o=a("b9ZNc").default.div(r||(r=(e=>e)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(30,30,30,.5);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    opacity: ${0};
    z-index: ${0};;
    transition: .5s ease;

    .action-modal-outer{
        background-color: white;
        overflow: hidden;
        border-radius: 8px;
        width: 95%;
        max-width: 500px;

        .action-modal-header{
            padding: 8px 10px 6px 10px;
            font-size: 24px;
            font-weight: bold;
        }

        .action-modal-body{
            padding: 12px;
        }

        .action-modal-footer{
            display: flex;
            justify-content: flex-end;
            gap: 5px;
            margin: 5px;

            div{
                border-radius: 5px;
                padding: 4px 10px;
                box-shadow: 0 0 0 0.5px rgba(30,30,30,.5);
                cursor: pointer;
                user-select: none;
            }
        }

        hr{
            margin: 0;
        }
    }
`),(({toggleModalStatus:e})=>e?1:0),(({toggleModalStatus:e})=>e?10:-1))})),a.register("Rf4XD",(function(t,n){e(t.exports,"Pagination",(function(){return a("aJ6yw").default})),e(t.exports,"Container",(function(){return a("fMfbD").default}));a("fMfbD"),a("aJ6yw");a("3PaFk")})),a.register("fMfbD",(function(t,n){e(t.exports,"default",(function(){return o}));let r;var o=a("b9ZNc").default.div(r||(r=(e=>e)`
    .pagination-outer {
        ul{
            margin:0;
            .page-link {
                z-index: unset !important;
                background-color: rgba(0, 0, 0, 0.7);
                box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
                padding: 3px 0 3px 0;
                border-radius: 12px;
                margin: 0 3px 0 3px;
                width: 40px;
                text-align:center;
                border: none;
                color: white;
                transition: .7s ease;
                span {
                    display: block;
                    font-size: 11px;
                    padding: 3px 0 4px 0;
                }
            }
            .page-link:hover {
                color: black !important;
                background-color: rgba(255, 255, 255, 0.9) !important;
            }
            .active{
                color: black;
                background-color: rgba(255, 255, 255, 0.9);
            }
            .page-item:first-child {
                .page-link {
                    border-top-left-radius: 12px;
                    border-bottom-left-radius: 12px;
                    background-color: rgba(150, 150, 150, 0.7);
                }
                .page-link-active {
                    background-color: rgba(0, 0, 0, 0.7);
                }
            }
            .page-item:last-child {
                .page-link {
                    border-top-right-radius: 12px;
                    border-bottom-right-radius: 12px;
                    background-color: rgba(150, 150, 150, 0.7);
                }
                .page-link-active {
                    background-color: rgba(0, 0, 0, 0.7);
                }
            }
        }
        .page-text{
            text-align:center;
            color:white;
            margin-top:10px;
        }
    }
`))})),a.register("aJ6yw",(function(n,r){e(n.exports,"default",(function(){return s}),(function(e){return s=e}));var o=a("e0rqH"),l=a("stS02");a("Rf4XD");var i=a("fMfbD");var s=e=>{const{$:a}=(0,o.useContext)(l.NewContext),{hasPrev:n,hasNext:r,currentPage:s,pageTotal:c,pageSize:d,partPage:p,postNext:u}=e,f=(e,t)=>{t.preventDefault(),u({pages:e,partPage:p,pageSize:d})};return t(o).createElement(i.default,null,t(o).createElement("nav",{"aria-label":"Page navigation",className:"pagination-outer"},t(o).createElement("ul",{className:"pagination justify-content-center align-items-center"},t(o).createElement("li",{className:n?"page-item":"page-item disabled"},t(o).createElement("a",{href:"/#",onClick:f.bind(void 0,s-1),className:n?"page-link page-link-active":"page-link"},t(o).createElement("span",{"aria-hidden":"true"},t(o).createElement("i",{className:"far fa-chevron-double-left"})))),(()=>{let t=[];if(e&&s<=c)if(s<d){let e=Math.min(d,c);for(;e;)t=[e--,...t]}else{let e=s-Math.floor(d/2),a=d;for(e>c-d&&(e=c-d+1);a--;)t=[...t,e++]}return t})().map(((e,a)=>t(o).createElement("li",{key:a,className:"page-item"},t(o).createElement("a",{href:"#",onClick:f.bind(void 0,e),className:s===e?"page-link active":"page-link"},e)))),t(o).createElement("li",{className:r?"page-item":"page-item disabled"},t(o).createElement("a",{href:"/#",onClick:f.bind(void 0,s+1),className:r?"page-link page-link-active":"page-link"},t(o).createElement("span",{"aria-hidden":"true"},t(o).createElement("i",{className:"far fa-chevron-double-right"})))))))}})),a.register("3PaFk",(function(e,t){})),a.register("kwGWo",(function(t,n){e(t.exports,"Container",(function(){return a("4vaFq").default})),e(t.exports,"Loading",(function(){return a("iqnQ5").default}));a("iqnQ5"),a("4vaFq")})),a.register("iqnQ5",(function(n,r){e(n.exports,"default",(function(){return i}));var o=a("e0rqH");a("kwGWo");var l=a("4vaFq");var i=({loadingStatus:e})=>t(o).createElement(l.default,{loadingStatus:e},t(o).createElement("div",{className:"loading"},t(o).createElement("div",{className:"loading-circle"},t(o).createElement("svg",{width:"100%",height:"100%",className:"fsg"},t(o).createElement("defs",null,t(o).createElement("linearGradient",{id:"a1",x1:"0%",y1:"0%",x2:"100%",y2:"100%"},t(o).createElement("stop",{offset:"10%",stopColor:"rgb(255,255,255)"}),t(o).createElement("stop",{offset:"50%",stopColor:"rgb(200,200,200)",stopOpacity:".5"}),t(o).createElement("stop",{offset:"70%",stopColor:"rgb(0,0,0)",stopOpacity:"0"}),t(o).createElement("stop",{offset:"90%",stopColor:"rgb(0,0,0)",stopOpacity:"0"}),t(o).createElement("stop",{offset:"100%",stopColor:"rgb(0,0,0)",stopOpacity:"0"}))),t(o).createElement("circle",{cx:"105",cy:"105",r:"100",strokeWidth:"6",stroke:"url(#a1)",fill:"none"}))),t(o).createElement("div",{className:"loading-text"},"Loading")))})),a.register("4vaFq",(function(t,n){e(t.exports,"default",(function(){return o}));let r;var o=a("b9ZNc").default.div(r||(r=(e=>e)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: ${0};
    z-index: ${0};
    transition: .5s ease;
    backdrop-filter: blur(10px);
    background-color: rgba(30,30,30,.5);

    .loading-circle{
        svg{
            width: 210px;
            height: 210px;
            transform:rotate(0deg);
            animation: loadingFram 1s linear infinite;
        }
        
        @keyframes loadingFram {
            0%{
                transform:rotate(0deg);
            }
            100%{
                transform:rotate(360deg);
            }
        }
    }

    .loading-text{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        letter-spacing: 3px;
        font-style: italic;
        color: white;
        font-weight: bold;
        font-size: 18px;
    }
`),(({loadingStatus:e})=>e?1:0),(({loadingStatus:e})=>e?15:-1))}));