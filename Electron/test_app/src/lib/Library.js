// Javascript Class 版 ( 雛型版本 )
// class element {
//     constructor(el){
//         return typeof(el) === "object" ? el : document.querySelector(el)
//     }
// }
//
// class $ extends element {
//     constructor(el){
//         super(el)
//         this.text = txt => txt === undefined ? this.textContent : this.textContent = txt
//         this.addClass = classTxt => this.classList.add(classTxt)
//         this.removeClass = classTxt => this.classList.remove(classTxt)
//         this.listener = (eventType,fn) => this.addEventListener(eventType,fn)
//         this.val = valTemp => valTemp === undefined ? this.value : this.value = valTemp
//     }
// }

// Javascript function 版，不需要 new 2021/7/29 ( 雛型版本 )
// const element = (function () {
//     function element (el) {
//         this.el = el;
//         return typeof (el) === "object" ? el : document.querySelector(el);
//     }
//     return element;
// }());
//
// const $ = (function (supers) {
//     function $(el){
//         let scopeThis = supers.call(this, el) || this;
//         scopeThis.el = el;
//         scopeThis.text = txt => txt === undefined ? scopeThis.textContent : scopeThis.textContent = txt;
//         scopeThis.html = dom => scopeThis.innerHTML = dom;
//         scopeThis.addClass = classText => scopeThis.classList.add(classText);
//         scopeThis.removeClass = classTxt => scopeThis.classList.remove(classTxt);
//         scopeThis.listener = (eventType, fn) => scopeThis.addEventListener(eventType, fn);
//         scopeThis.val = valTemp => valTemp === undefined ? scopeThis.value : scopeThis.value = valTemp;
//         scopeThis.attr = (props,val) => val === undefined ? scopeThis.getAttribute(props) : scopeThis.setAttribute(props,val);
//         scopeThis.styles = (cssType, cssParameter) => scopeThis.style.setProperty(cssType, cssParameter);
//         return scopeThis;
//     }
//     return $
// }(element));
//
// $.each = (item,fn) => item.forEach((items,index)=> fn.call(this,items,index))
// $.maps = (item,fn) => item.map((items,index)=> fn.call(this,items,index))
// $.indexOf = (item,x) => item.indexOf(x)
// $.findIndexOfObj = (item,fn) => item.findIndex(where => fn.call(this,where))
// $.sum = (item,fn) => item.reduce((a,b)=> fn.call(this,a,b))
// $.eachKeys = item => Object.keys(item)

// Javascript function 版，不需要 new 更新方法 2021/8/28 ( 正式版本 )
const $ = (function(el) {
    const $ = (targets) => {
        let targetThis = el.call(el, targets) || targets;
        targetThis.targets = targets;
        targetThis.texts = (txt) => txt === undefined ? targetThis.textContent : targetThis.textContent = txt;
        targetThis.html = (dom) => dom === undefined ? targetThis.innerHTML : targetThis.innerHTML = dom;
        targetThis.addClass = (classText) => targetThis.classList.add(classText);
        targetThis.removeClass = (classTxt) => targetThis.classList.remove(classTxt);
        targetThis.toggleClass = (classText) => targetThis.classList.toggle(classText); // 更新方法 2021/09/20
        targetThis.on = (eventType, fn) => { targetThis[["on",eventType].join("")] = t => fn.call(targetThis,t); }; // 更新方法 2021/09/20
        targetThis.listener = (eventType, fn) => targetThis.addEventListener(eventType, fn);
        targetThis.val = (valTemp) => valTemp === undefined ? targetThis.value : targetThis.value = valTemp;
        targetThis.attr = (props, val) => val === undefined ? targetThis.getAttribute(props) : targetThis.setAttribute(props, val);
        targetThis.styles = (method,cssType, cssParameter) => { if(!$.includes(['set','remove'],method)){ $.console('error',"First parameter method must use string and keyword is 'set' or 'remove'."); return; }; method === 'set' ? targetThis.style.setProperty(cssType, cssParameter) : targetThis.style.removeProperty(cssType); }; // 更新方法 2021/10/26
        targetThis.getDomStyles = (conditionProps) => { let cssProperty = {}; if(typeof conditionProps !== "object"){ $.console('error','Parameter must use array.'); return; } else { if(conditionProps['length'] === 0){ $.console('error','Parameter must use array,and css property must in array with string.'); return; } else { $.each(conditionProps,item => cssProperty[item] = getComputedStyle($(targetThis)).getPropertyValue(item)); return cssProperty; } }; }; // 更新方法 2021/10/26
        targetThis.props = (props, val) => val === undefined ? targetThis[props] : targetThis[props] = val;        // 更新方法 2021/08/31
        targetThis.sibling = (num) => $(targetThis[num]);                                                          // 更新方法 2021/08/31
        targetThis.child = (num) => $(targetThis.children[num]);                                                   // 更新方法 2021/08/31
        targetThis.childFirst = () => $(targetThis.firstElementChild);                                             // 更新方法 2021/08/31
        targetThis.childLast = () => $(targetThis.lastElementChild);                                               // 更新方法 2021/08/31
        targetThis.parent = () => $(targetThis.parentNode);                                                        // 更新方法 2021/08/31
        targetThis.appendDom = (el) => $(targetThis).append(el);                                                   // 更新方法 2021/09/12
        targetThis.removeDom = () => $(targetThis).remove();                                                       // 更新方法 2021/09/12
        targetThis.removeChildDom = () => $(targetThis).replaceChildren();                                         // 更新方法 2021/10/25
        targetThis.appendDomText = (el) => $(targetThis).appendChild(el);                                          // 更新方法 2021/09/12
        targetThis.easyAppendDom = (orderBy,domStr) => $(targetThis).insertAdjacentHTML(orderBy !== 'afterDom' ? 'afterbegin' : 'beforeend',domStr);    // 更新方法 2021/11/25
        targetThis.scrollToTop = (scrollSetting = { scrollTop:0,duration:0 }) => { // 更新方法 2021/10/26
            let animateScroll = undefined;
            const [keyI,keyII] = Object.keys(scrollSetting);
            const startPos = targetThis[keyI];
            const changePos = scrollSetting[keyI] - startPos;
            const startTimeStamp = +new Date();

            const animationSettings = (animationSetting = { currentTime:0, startVal:0, changeVal:0, animateDuration:0 }) => {
              let { currentTime,startVal,changeVal,animateDuration } = animationSetting
              let currentTimeTemp = currentTime;
              currentTimeTemp /= animateDuration / 2;
              if (currentTimeTemp < 1) return (changeVal / 2) * currentTimeTemp * currentTimeTemp + startVal;
              currentTimeTemp -= 1;
              return (-changeVal / 2) * (currentTimeTemp * (currentTimeTemp - 2) - 1) + startVal;
            };

            (animateScroll = () => {
                const currentTimeStamp = +new Date() - startTimeStamp;
                targetThis.scrollTop = Number(animationSettings({
                    currentTime:currentTimeStamp, 
                    startVal:startPos,
                    changeVal:changePos, 
                    animateDuration:scrollSetting[keyII]
                }));
                currentTimeStamp < scrollSetting[keyII] ? requestAnimationFrame(animateScroll) : targetThis.scrollTop = scrollSetting[keyI];
            })();
        }
        return targetThis;
    };
    // public function
    $.each = (item, fn) => item.forEach((items, index) => fn.call(item, items, index));
    $.maps = (item, fn) => item.map((items, index) => fn.call(item, items, index));
    $.filter = (item, fn) => item.filter((items) => fn.call(item, items));
    $.sort = (item,fn) => item.sort((a,b) => fn.call(item,a,b))
    $.indexOf = (item, x) => item.indexOf(x);
    $.includes = (item, x) => item.includes(x);
    $.findIndexOfObj = (item, fn) => item.findIndex((where) => fn.call(item, where));
    $.sum = (item, fn) => item.reduce((a, b) => fn.call(item, a, b));
    $.typeOf = (item,classType) => classType === undefined ? item.constructor.name : item.constructor.name === classType; // 更新方法 2021/10/26
    $.console = (type,...item) => console[type](...item); // 更新方法 2021/10/26
    $.localData = (action,keyName,item) => action === 'get' ? ($.convert(localStorage.getItem(keyName),'json') || []) : localStorage.setItem(keyName,$.convert(item,'stringify')); // 更新方法 2021/11/29
    $.convert = (val,type) => { // 更新方法 2021/10/22
        if(val === undefined || type === undefined || !$.includes(['string','number','float','boolean','json','stringify'],type)){
            $.console('error',"Please enter first parameters value who want to convert and seconde paramters value is convert type 'string' or 'number' or 'float' or 'boolean' or 'json' or 'stringify'.");
            return
        } else if(typeof val === 'object' && $.includes(['string','number','float','boolean'],type)){
            $.console('error',`Convert value can't be object when use convert type ${type}.`);
            return
        }
        return {
            string: String(val),
            number: parseInt(val),
            float: parseFloat(val),
            boolean: Boolean(val),
            json: type === 'json' && JSON.parse(val),
            stringify: type === 'stringify' && JSON.stringify(val),
        }[type];
    }
    $.createDom = (tag,props) => { // 更新方法 2021/09/12
        const el = document.createElement(tag);
        const propsArr = Object.entries(props);
        $.each(propsArr,getProps => {
            const [propertyI,valueI] = getProps
            if($.typeOf(valueI,'Object')){ // 更新方法 2021/12/07，解析 data-* 建構屬性內容
                const [propertyII,obj] = getProps
                const [[key,valueII]] = Object.entries(obj)
                el[propertyII][key] = valueII
            } else {
                el[propertyI] = $.typeOf(valueI,'String') ? valueI.trim() : valueI
            }
        })
        return el;
    }
    $.createDomText = (text) => document.createTextNode(text); // 更新方法 2021/09/12
    $.objDetails = (obj,method) => method === undefined || !$.includes(['keys','values','entries'],method) ? $.console('error',"please enter secode prameter 'keys' or 'values' or 'entries' in type string") : Object[method](obj); // 更新方法 2021/09/12
    $.objManager = (obj,action,key,value) => { // 更新方法 2021/10/21

        //#region 參數設定
        /**
         * @param {object} obj <= 型別物件 要管理的物件
         * @param {string} action <= 型別字串，要執行的動作，有分為 get ( 取得管理物件內容 )、set ( 設定管理物件指定鍵與值 )、add ( 新增管理物件鍵與值 )、delete ( 刪除管理物件指定鍵與值 )
         * @param {string} key <= 型別字串，為鍵值的鍵
         * @param {any} value <= 型別任意，為鍵值的值
         * @returns {object | void}
         */
        //#endregion

        const check = () => {
            if(obj === undefined){
                return "Please put want to manage's object at first parameters";
            };
        
            if(action === undefined || !$.includes(['get','set','add','delete'],action)){
                return 'Please enter want to use methods "get、set、add、delete" at seconde parameters'
            } else if(typeof action !== 'string'){
                return 'Seconde parameters must use type string.';
            };
        
            if(key === undefined){
                return 'Please enter want to use key name at third parameters';
            } else if(typeof key !== 'string'){
                return 'Third parameters must use type string.';
            };
        
            if(value === undefined){
                return `Please enter want to set value at forth parameters.`;
            };
        }

        switch(action){
            case 'get':
                return obj;
            case 'set':
                check() !== undefined ? $.console('error',check()) : key in obj ? obj[key] = value : $.console('error',`Key name ${key} not in this object.`);
                break;
            case 'add':
                check() !== undefined ? $.console('error',check()) : key in obj ? $.console('error',`Key name ${key} already in this object`) : obj[key] = value;
                break;
            case 'delete':
                check() !== undefined ? $.console('error',check()) : key in obj ? delete obj[key] : $.console('error',`Key name ${key} not in this object.`);
                break;
        }
    }

    $.formatDateTime = (format = { formatDate:'',formatType:'' }) => { // 更新方法 2021/12/01
        //#region 參數設定
        /**
         * @param {object} 
         * { 
         *   formatDate: Date || string,
         *   formatType:string, <= formatType 參數 time 取時間、date 取日期、full 取日期與時間
         *   localCountryTime:number <= localCountryTime 根據時區格式化，預設為 GMT+8，可選參數
         * }
         * @returns {string}
         */
        //#endregion
    
        if(!('formatDate' in format || 'formatType' in format)){
            $.console('error','Please enter an object and use formatType property in the object.');
            return
        } else if(format.formatDate !== '' && !$.includes(['date','time','full','toDateFullNumber'],format.formatType)){
            $.console('error',"Please enter format type 'date' or 'time' or 'full or toDateFullNumber'.");
            return
        };
        
        const localCountryTime = ('localCountryTime' in format ? format.localCountryTime : 8)* 60 * 60 * 1000
        const dateStr = new Date(+new Date(format.formatDate) + localCountryTime).toJSON();
        const dateSplit = dateStr.replace(/T/g,"-").replace(/:/g,"-").split(".")[0].split("-");
        const [year,month,date,hour,minute,second] = dateSplit;

        return {...{
            date:`${year}-${month}-${date}`,
            time:`${hour}：${minute}：${second}`,
            full:`${year}-${month}-${date} ${hour}：${minute}：${second}`,
            toDateFullNumber:Number(dateSplit.join(""))
        }}[format.formatType]
    }

    $.fetch = async (settingParams = {
        method:'',
        url:'',
        headers:{},
        contentType:'',
        data:{},
        beforePost:undefined,
        successFn:undefined,
        errorFn:undefined
    }) => { 
        // 更新類 ajax 方法 2021/09/11
        // 更新類 ajax 方法內容 2021/10/21

        //#region 參數設定
        /**
         * @param {string} method
         * @param {string} url
         * @param {object} header 追加 hearder 物件 2021/10/21
         * @param {string} contentType
         * @param {Function} beforePost <= 回呼函式
         * @param {Function} successFn <= 回呼函式
         * @param {Function} errorFn <= 回呼函式
         */
        //#endregion

        let resError = undefined;
        let settings = {};
        let { method, url,headers, contentType, data,beforePost,successFn,errorFn } = settingParams;

        settings.method = method;
        settings.url = url;

        if(headers !== undefined){
            settings.headers = headers;
        } else if (data !== undefined) {
            settings.headers = {"Content-Type": contentType};
            settings.body = $.convert(data,'stringify');
        } else if(headers !== undefined && data !== undefined){
            settings.headers = {...headers,"Content-Type": contentType};
            settings.body = $.convert(data,'stringify');
        };

        if(beforePost !== undefined){
            beforePost.call(beforePost);
        };
        
        if(successFn === undefined){
            $.console('error','Function Name successFn is required in obejct parameters.');
            return
        };

        if(errorFn === undefined){
            $.console('error','Function Name errorFn is required in obejct parameters.');
            return
        };

        try {
            let res = await fetch(url, settings);
            if (res.status === 200) {
                res.json().then(resItem => successFn.call(successFn,resItem));
            }
            else {
                resError = res
                throw new Error();
            };
        }
        catch (err) {
            errorFn.call(errorFn,resError);
        };
    };

    return $;
}((el) => typeof el === "object" ? el : document.querySelectorAll(el).length > 1 ? document.querySelectorAll(el) : document.querySelector(el))); // 更新元素指向 2021/08/31

Date.prototype.calculateDay = (format) => { 
    // 更新方法內容與回傳內容 2021/09/22
    // 更新方法 2021/12/01

    //#region 參數設定
    /**
     * @param {object} { day: number,method:string }
     * @returns {string}
     */
    //#endregion

    if(format === undefined || !('day' in format && 'method' in format)){
        $.console('error','Please enter an object and use day and method property in the object.');
        return
    } else if(typeof format.day !== 'number'){
        $.console('error',"day property must use type number.");
    } else if(!$.includes(['add','reduce'],format.method)){
        $.console('error',"Please enter method type 'add' or 'reduce'.");
        return
    };

    const addDay = new Date(+new Date() + (format.day * 24 * 60 * 60 * 1000))
    const reduceDay = new Date(+new Date() - (format.day * 24 * 60 * 60 * 1000))
    
    return format.method === 'add' ? addDay : reduceDay ;
};