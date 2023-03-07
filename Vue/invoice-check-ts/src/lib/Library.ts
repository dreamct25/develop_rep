// CopyRight 2021/08 - 2023/03 Alex Chen. Library language - typescript ver 1.5.7
// Work Environment Typescript v4.9.5、eslint v8.28.0
//
// Use in ESModule
// export default $

// String tips when use method
type objDetailsMethod = 'keys' | 'values' | 'entries'
type createArrayType = 'fake' | 'new'
type localDataActionType = 'get' | 'set'
type stylesMethod = 'set' | 'remove'
type consoleMethod = 'log' | 'dir' | 'error' | 'info' | 'warn' | 'assert' | 'clear' | 'context' | 'count' | 'countReset' | 'debug' | 'dirxml' | 'group' | 'groupCollapsed' | 'groupEnd' | 'memory' | 'profile' | 'profileEnd' | 'table' | 'time' | 'timeEnd' | 'timeLog' | 'timeStamp' | 'trace'
type convertType = 'string' | 'number' | 'float' | 'boolean' | 'json' | 'stringify'
type requestMethod = 'get' | 'post' | 'patch' | 'put' | 'delete'
type retunType = 'json' | 'text' | 'blob' | 'formData' | 'arrayBuffer' | 'clone'
type SHAType = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512'
type padDirection = 'left' | 'right'

interface fetchClassReturnType<T> {
    bodyUsed: boolean,
    headers: object,
    ok: boolean,
    redirected: boolean,
    status: number,
    statusText: string,
    type: string,
    url: string,
    data?: T
}

interface fetchClassSettingParmasType { 
    method: requestMethod; 
    url: string; 
    headers?: { [key: string]: any; }; 
    contentType?: string;
    returnType?: retunType;
    data?: { [key: string]: any; }; 
    routeParams?: { [key: string]: any; };
    queryParams?: { [key: string]:any }
    beforePost?: () => void; 
    successFn?: (data: any) => void; 
    excuteDone?: () => void; 
    errorFn?: (err: any) => void; 
}

interface fetchPromiseClassSettingParmasType{
    headers?: { [key: string]: any; }; 
    returnType?: retunType;
    data?: { [key: string]: any; };
    routeParams?: { [key: string]: any; };
    queryParams?: { [key: string]:any }
}

// declare $
declare interface $ { // 更新 2022/06/29
    (target: string | object): {
        texts(txt?: string): string | void
        html(dom?: string): string | void
        addClass(classText: string): any
        removeClass(classText: string): any
        toggleClass(classText: string): void
        on(eventType: string, fn: (self: any, t: Event) => void): void
        listener(eventType: string, fn: (event:any) => void): void
        removeListener(eventType: string, fn: (event:any) => void): void
        val(valTemp?: string): string | void
        attr(props: string, val?: any): (string | number | void)
        props(props: string, val?: any): any
        sibling(num: number): HTMLElement
        child(num: number): HTMLElement
        childFirst(): HTMLElement
        childLast(): HTMLElement
        parent(): HTMLElement
        appendDom(el: HTMLElement): void
        removeDom(): void
        removeChildDom(): void
        appendDomText(el: Text): void
        easyAppendDom(orderBy: string, domStr: string): void
        styles(method: stylesMethod, cssType: string, cssParameter: string): typeof $ | undefined
        getDomStyles(conditionProps: string[]): { [key: string]: any }
        getDomPos():{ x: number,y: number,top: number,left: number,right: number,bottom: number,width: number,height: number }
        scrollToTop(scrollSetting: { scrollTop: number, duration: number }):void
        useWillMount(willMountCallBack: (target: HTMLDocument) => void): void
        useMounted(useMountedCallBack: (target: HTMLDocument) => void): void
    }
    each<T>(item: T[], callBack: (items: T,index:number) => void): void
    maps<T,R>(item: T[], callBack: (items: T,index:number) => R): R[]
    filter<T>(item: T[], callBack: (items: T) => boolean):T[]
    find<T>(item: T[], callBack: (items: T) => T | undefined):(T | undefined)
    sort<T>(item: T[], callBack: (a: T, b: T) => number):T[]
    sum<T,R>(item: T[], callBack: (a: T, b: T) => any, initialVal?: any):R
    indexOf<T>(item: T, x: string | number):number
    includes<T>(item: T, x: string | number): boolean;
    findIndexOfObj<T>(item: T[], callBack: (items: T) => boolean):number
    findObjProperty<T>(obj: T, propertyName: string):boolean
    mergeArray<T,M>(item: T, mergeItem: M, callBack?: ((items: any) => any)):any
    typeOf<T>(item: T, classType?: string): string | boolean;
    console(type: consoleMethod, ...item: any): void;
    localData<T>(action: localDataActionType, keyName: string, item?: string):T
    getNumberOfDecimal(num:number,digits:number):number
    createCustomEvent(eventName:string,setEventResposeContext?:any):CustomEvent
    registerCustomEvent(eventName:string,fn:() => void):void
    useCustomEvent(eventObj:CustomEvent):void
    removeCustomEvent(eventName:string,fn:() => void):void
    createPromise<T>(callBack:(success:(value: any) => void,error: (reason?: any) => void) => void):Promise<T>
    createPromiseAll<T>(paramaters:Promise<Awaited<T>>[]):Promise<Awaited<T>[]>
    createDomText(text: string):Text
    objDetails<T>(obj: T, method: objDetailsMethod):void | any[]
    createArray<T,R>({ type, item }: { type: createArrayType; item: T | { random: number }}, repack?: ((y: number) => R) | undefined):R[] | undefined
    convert<T>(val: any, type: convertType): (T | undefined)
    createDom(tag: string, props: { [key: string]: any }):HTMLElement
    currencyTranser(currencyType: string, formatNumber: number):string | undefined
    useBase64(method: 'encode' | 'decode',str:string):string
    useSHA(shaType:SHAType,str:string):Promise<string>
    formatDateTime(format: { 
        formatDate: string | Date; 
        formatType: string;
        toTcYear?: boolean;
        localCountryTime?: number; 
        toDateFullNumber?: boolean;
        customWeekItem?:any[]
    }):string | number | undefined | { fullDateTime:string,getWeekName:any }
    fetch?:{
        <T>(settingParams:fetchClassSettingParmasType):Promise<fetchClassReturnType<T> | undefined>
        get<T>(url: string, settingParams?: fetchPromiseClassSettingParmasType):Promise<fetchClassReturnType<T> | undefined>
        post<T>(url: string, settingParams?: fetchPromiseClassSettingParmasType):Promise<fetchClassReturnType<T> | undefined>
        patch<T>(url: string, settingParams?: fetchPromiseClassSettingParmasType):Promise<fetchClassReturnType<T> | undefined>
        put<T>(url: string, settingParams?: fetchPromiseClassSettingParmasType):Promise<fetchClassReturnType<T> | undefined>
        delete<T>(url: string, settingParams?: fetchPromiseClassSettingParmasType):Promise<fetchClassReturnType<T> | undefined>
        createBase(paramters: { baseUrl: string; baseHeaders: { [key:string]:any }}):void
    }
}

const $:$ = ((el) => {
    const $:$ = (target: string | object):any => {
        const self: {[key:string]:any} = el.call(el, target) as HTMLElement || target as Object;
        self.texts = (txt?: string): string | void => txt ? self.textContent = txt : self.textContent;
        self.html = (dom?: string): string | void => dom ?  self.innerHTML = dom : self.innerHTML;
        self.addClass = (classText: string): any => { self.classList.add(classText); return self } // 更新方法 2022/03/12 變形為可鏈式寫法
        self.removeClass = (classText: string): any => { self.classList.remove(classText); return self } // 更新方法 2022/03/12 變形為可鏈式寫法
        self.toggleClass = (classText: string): void => self.classList.toggle(classText); // 更新方法 2021/09/20
        self.on = (eventType: string, fn: (self: any, t: Event) => void): void => { self[["on", eventType].join("")] = (t: Event) => fn.call(fn, self, t); }; // 更新方法 2021/09/20
        self.listener = (eventType: string, fn: (event:any) => void): void => self.addEventListener(eventType, fn);
        self.removeListener = (eventType: string, fn: (event:any) => void): void => self.removeEventListener(eventType, fn); // 更新方法 2022/01/04
        self.val = (valTemp?: string): string | void => valTemp ? self.value = valTemp : self.value;
        self.attr = (props: string, val?: any): (string | number | void) => val ? self.setAttribute(props, val) : self.getAttribute(props);
        self.props = (props: string, val?: any): any => val ? self[props] = val : self[props];
        self.sibling = (num: number): HTMLElement => self[num];         // 更新方法 2021/08/31
        self.child = (num: number): HTMLElement => self.children[num];  // 更新方法 2021/08/31
        self.childFirst = (): HTMLElement => self.firstElementChild;    // 更新方法 2021/08/31
        self.childLast = (): HTMLElement => self.lastElementChild;      // 更新方法 2021/08/31
        self.parent = (): HTMLElement => self.parentNode;               // 更新方法 2021/08/31
        self.appendDom = (el: HTMLElement): void => self.append(el);    // 更新方法 2021/09/12
        self.removeDom = (): void => self.remove();                     // 更新方法 2021/09/12
        self.removeChildDom = (): void => self.replaceChildren();       // 更新方法 2021/10/25
        self.appendDomText = (el: Text): void => self.appendChild(el);  // 更新方法 2021/09/12
        self.easyAppendDom = (orderBy: string, domStr: string): void => self.insertAdjacentHTML(orderBy !== 'afterDom' ? 'afterbegin' : 'beforeend', domStr);  // 更新方法 2021/11/25
        self.styles = (method: stylesMethod, cssType: string, cssParameter: string): typeof self | undefined => {
            // 更新方法 2021/10/26
            // 更新方法 2022/03/12 變形為可鏈式寫法
            if (!$.includes(['set', 'remove'], method)) {
                $.console('error', "First parameter method must use string and keyword is 'set' or 'remove'.");
                return;
            }
            method === 'set' ? self.style.setProperty(cssType, cssParameter) : self.style.removeProperty(cssType);
            return self
        };

        self.getDomStyles = (conditionProps: string[]): { [key: string]: any } => { // 更新方法 2021/10/26
            const cssProperty: { [key: string]: any } = {};
            if (typeof conditionProps !== "object") {
                $.console('error', 'Parameter must use array.');
            } else {
                if (conditionProps.length === 0) {
                    $.console('error', 'Parameter must use array,and css property must in array with string.');
                } else {
                    $.each<string>(conditionProps, item => cssProperty[item] = getComputedStyle(self as HTMLElement).getPropertyValue(item));
                    return cssProperty;
                }
            }
            return cssProperty;
        };

        self.getDomPos = (): { // 更新方法 2022/03/23
            x: number,
            y: number,
            top: number,
            left: number,
            right: number,
            bottom: number,
            width: number,
            height: number
        } => ({
            x: self.props('offsetLeft'),
            y: self.props('offsetTop') - window.scrollY,
            top: self.props('offsetTop'),
            left: self.props('offsetLeft'),
            right: self.props('offsetLeft') + self.props('offsetWidth'),
            bottom: (self).props('offsetTop') + self.props('offsetHeight') - window.scrollY,
            width: self.props('offsetWidth'),
            height: self.props('offsetHeight')
        });
        
        self.scrollToTop = (scrollSetting: { scrollTop: number, duration: number } = { scrollTop: 0, duration: 0 }): void => { // 更新方法 2021/10/26
            let animateScroll: any = undefined;
            const [keyI, keyII]: string[] = Object.keys(scrollSetting);
            const startPos: number = self[keyI];
            const changePos: number = (scrollSetting as { [key: string]: any })[keyI] - startPos;
            const startTimeStamp: number = +new Date();

            const animationSettings: (animationSetting: {
                currentTime: number,
                startVal: number,
                changeVal: number,
                animateDuration: number
            }) => number = animationSetting => {
                const { currentTime, startVal, changeVal, animateDuration }: typeof animationSetting = animationSetting;
                let currentTimeTemp: number = currentTime;
                currentTimeTemp /= animateDuration / 2;
                if (currentTimeTemp < 1) return (changeVal / 2) * currentTimeTemp * currentTimeTemp + startVal;
                currentTimeTemp -= 1;
                return (-changeVal / 2) * (currentTimeTemp * (currentTimeTemp - 2) - 1) + startVal;
            };

            (animateScroll = () => {
                const currentTimeStamp: number = +new Date() - startTimeStamp;
                self.scrollTop = Number(animationSettings({
                    currentTime: currentTimeStamp,
                    startVal: startPos,
                    changeVal: changePos,
                    animateDuration: (scrollSetting as { [key: string]: any })[keyII]
                }));
                currentTimeStamp < (scrollSetting as { [key: string]: any })[keyII] ? requestAnimationFrame(animateScroll) : self.scrollTop = (scrollSetting as { [key: string]: any })[keyI];
            })();
        };

        self.useWillMount = (willMountCallBack: (target: HTMLDocument) => void): void => { // 更新方法 2022/03/19
            if (typeof self === 'object') {
                if ($.typeOf(self, 'HTMLDocument')) {
                    self.listener('readystatechange', ({ target }: { target: HTMLDocument }) => target.readyState === 'interactive' && willMountCallBack.call(willMountCallBack, target))
                } else {
                    $.console('error', 'UseWillMount hook just use when selector document.')
                }
            } else {
                $.console('error', 'UseWillMount hook just use when selector document.')
            }
        };

        self.useMounted = (useMountedCallBack: (target: HTMLDocument) => void): void => { // 更新方法 2022/03/19
            if (typeof self === 'object') {
                if ($.typeOf(self, 'HTMLDocument')) {
                    self.listener('readystatechange', ({ target }: { target: HTMLDocument }) => target.readyState === 'complete' && useMountedCallBack.call(useMountedCallBack, target))
                } else {
                    $.console('error', 'UseMounted Hook just use when selector document.')
                }
            } else {
                $.console('error', 'UseMounted Hook just use when selector document.')
            }
        };

        return self;
    };

    // public function
    $.each = (item,callBack) => item.forEach((items, index) => callBack.call(callBack, items, index));
    $.maps = (item, callBack) => item.map((items, index) => callBack.call(callBack, items, index));
    $.filter = (item, callBack) => item.filter(items => callBack.call(callBack, items));
    $.find = (item, callBack) => item.find(items => callBack.call(callBack, items))  // 更新方法 2022/03/12
    $.sort = (item, callBack) => item.sort((a, b) => callBack.call(callBack, a, b));
    $.sum = (item, callBack,initialVal) => initialVal ? item.reduce((a, b) => callBack.call(callBack, a, b),initialVal) : item.reduce((a, b) => callBack.call(callBack, a, b));
    $.indexOf = (item, x) => (item as any).indexOf(x);
    $.includes = (item, x) => (item as any).includes(x);
    $.findIndexOfObj = (item, callBack) => item.findIndex(items => callBack.call(callBack, items));
    $.findObjProperty = (obj, propertyName) => (obj as {[key:string]:any}).hasOwnProperty(propertyName) // 更新方法 2022/03/23
    $.mergeArray = (item, mergeItem, callBack) => callBack ? (item as any).concat(mergeItem) : callBack!.call(callBack, (item as any).concat(mergeItem)) // 更新方法 2022/03/23
    $.typeOf = (item, classType) => classType ? (item as any).constructor.name === classType : (item as any).constructor.name; // 更新方法 2021/10/26
    $.console = (type, ...item) => (console as { [key: string]: any })[type](...item) // 更新方法 2021/10/26
    $.localData = (action, keyName, item) => action === 'get' ? ($.convert<any>(localStorage.getItem(keyName), 'json') || []) : localStorage.setItem(keyName, $.convert<string>(item, 'stringify')!); // 更新方法 2021/11/29
    $.getNumberOfDecimal = (num, digits) => parseInt(num.toFixed(digits)) // 更新方法 2022/09/28
    $.createCustomEvent = (eventName,setEventResposeContext) => setEventResposeContext ? new CustomEvent(eventName,{ detail: setEventResposeContext }) : new CustomEvent(eventName) // 更新方法 2022/07/13
    $.registerCustomEvent = (eventName,fn) => window.addEventListener(eventName,fn) // 更新方法 2022/07/13
    $.useCustomEvent = (eventObj) => window.dispatchEvent(eventObj) // 更新方法 2022/07/13
    $.removeCustomEvent = (eventName,fn) => window.removeEventListener(eventName,fn) // 更新方法 2022/07/13
    $.createPromise = (callBack) => new Promise((resovle,reject) => callBack.call(callBack,resovle,reject)) // 更新方法 2022/07/14
    $.createPromiseAll = (paramaters) => Promise.all(paramaters) // 更新方法 2022/07/14
    $.createDomText = text => document.createTextNode(text); // 更新方法 2021/09/12
    $.objDetails = (obj, method) => method === undefined || !$.includes(['keys', 'values', 'entries'], method) ? $.console('error', "please enter secode prameter 'keys' or 'values' or 'entries' in type string") : (Object as { [key: string]: any })[method](obj); // 更新方法 2021/09/12
    $.useBase64 = (method,str) => method === 'encode' ? btoa(str) : atob(str) // 更新方法 2021/11/24
    $.useSHA = async (shaType,str) => { // 更新方法 2021/11/24
        // Cryptoing only working in https of production or http of development environment
        const hashBuffer = await window.crypto.subtle.digest(shaType, new TextEncoder().encode(str));
        return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
    $.createArray = ({ type, item }, repack) => { // 更新方法 2022/03/14
        //#region 參數設定
        /**
         * @param {string} type <= 型別字串 要創建種類，fake 為創建假陣列、new 為創建新陣列
         * @param {object}} item <= 型別物件，建假陣列時需使用為 { random:100 或其他數字 }
         * @param {function | undefined} repack <= 型別函式，為 call back function 為處理假陣列時使用的後續操作
         * @returns {Array}
         */
        //#endregion

        const itemTemp = item as { random: number }

        if (type === 'fake') {
            if ('random' in itemTemp && $.typeOf(itemTemp.random, 'Number') && repack !== undefined && $.typeOf(repack, 'Function')) {
                return Array.from({ length: itemTemp.random }, (_, items) => repack.call(repack, items as number))
            } else {
                $.console('error', 'item property must have random in object and radom type must be number,with call back function in secode parameters.')
            }
        } else if (type === 'new' && !('random' in itemTemp)) {
            return Array.from(item as [])
        }

        return undefined
    }

    $.convert = (val, type) => {
        // 更新方法 2021/10/22
        // 更新泛型回傳值 2022/03/19
        if (!val || !type) {
            $.console('error', "Please enter first parameters value who want to convert and seconde paramters value is convert type 'string' or 'number' or 'float' or 'boolean' or 'json' or 'stringify'.");
            return
        } else if ($.typeOf(val,'Object') && $.includes(['string', 'number', 'float', 'boolean'], type)) {
            $.console('error', `Convert value can't be object when use convert type ${type}.`);
            return
        }

        const returnItem: {
            string: string,
            number: number,
            float: number,
            boolean: boolean,
            json: { [key: string]: any } | boolean,
            stringify: string | boolean
        } = {
            string: String(val),
            number: parseInt(val),
            float: parseFloat(val),
            boolean: Boolean(val),
            json: type === 'json' && JSON.parse(val),
            stringify: type === 'stringify' && JSON.stringify(val),
        }

        return (returnItem as { [key: string]: any })[type];
    }

    $.createDom = (tag, props) => { // 更新方法 2021/09/12
        const el: HTMLElement & { [key: string]: any } = document.createElement(tag);
        const propsArr: [string, any][] = Object.entries(props);
        $.each(propsArr, (getProps: [string, any]) => {
            const [propertyI, valueI]: [string, any] = getProps
            if ($.typeOf(valueI, 'Object')) { // 更新方法 2021/12/07，解析 data-* 建構屬性內容
                const [propertyII, obj]: [string, { [key: string]: any }] = getProps
                const [[key, valueII]]: [string, any][] = Object.entries(obj)
                el[propertyII][key] = valueII
            } else {
                el[propertyI] = $.typeOf(valueI, 'String') ? valueI.trim() : valueI
            }
        })
        return el;
    };
    
    $.currencyTranser = (currencyType,formatNumber) => { // 更新方法 2022/06/24
        if(currencyType !== undefined){
            const currencyOptionalObj = currencyType === '' ? {} : { style: 'currency', currency: currencyType }
            return new Intl.NumberFormat(currencyType === '' ? 'TWN' : currencyType,currencyOptionalObj).format(formatNumber)
        } else {
            $.console('error','First argument currency type is must.')
        }

        return undefined
    }
    
    $.formatDateTime = format => { // 更新方法 2021/12/01
        //#region 參數設定
        /**
         * @param {object}
         * { 
         *   formatDate: Date || string,
         *   formatType:string, <= 取日期時間格式 yyyy-MM-dd HH:mm:ss 等方式
         *   localCountryTime:number <= localCountryTime 根據時區格式化，預設為 GMT+8，可選參數
         *   toDateFullNumber <= toDateFullNumber 將當前格式化時間改為數字，可以用於排序上，可選參數
         *   customWeekItem <= customWeekItem 放入格式化文字日別，如 ['週一','週二',...'週日'] // 更新方法 2021/08/02
         * }
         * @returns {string | number}
         */
        //#endregion

        if (!('formatDate' in format || 'formatType' in format)) {
            $.console('error', 'Please enter an object and use formatType property in the object.');
            return undefined;
        }

        if($.findObjProperty(format,'customWeekItem')){
            if(!($.typeOf(format.customWeekItem) === 'Array')){
                $.console('error','customWeekItem property Must use array.')
                return
            }

            if(format.customWeekItem!.length <= 6 || format.customWeekItem!.length > 7){
                $.console('error','customWeekItem property must put seven days name of week in array.')
                return
            }

            format.customWeekItem = [format.customWeekItem![format.customWeekItem!.length - 1],...format.customWeekItem!]
            format.customWeekItem.pop()
        }

        const localCountryTime: number = ('localCountryTime' in format ? format.localCountryTime || 0 : 8) * 60 * 60 * 1000
        const dateStr: string = new Date(+new Date(format.formatDate) + localCountryTime).toJSON();
        const dateSplit: string[] = dateStr.replace(/T/g, "-").replace(/:/g, "-").split(".")[0].split("-");
        const [yearTemp, month, date, hour, minute, second] = dateSplit;

        const year = format?.toTcYear ? (parseInt(yearTemp) - 1911).toString() : yearTemp

        if ('toDateFullNumber' in format) return $.convert(dateSplit.join(""), 'number')

        // 更新是否格式化 AM 或 PM 2022/03/19

        if (format.formatType.match('tt')) {
            const currentAMorPM: string = $.convert(hour, 'number')! > 11 ? 'PM' : 'AM'
            const transHour: string = ($.convert<number>(hour, 'number')! - 12) < 10 ? `0${$.convert<number>(hour, 'number')! - 12}` : $.convert($.convert<number>(hour, 'number')! - 12, 'string')!
            return format.formatType.replace(/yyyy/g, year).replace(/MM/g, month).replace(/dd/g, date).replace(/HH/g, transHour).replace(/mm/g, minute).replace(/ss/g, second).replace(/tt/g, currentAMorPM)
        } else if ($.findObjProperty(format,'customWeekItem')) { // 更新客製化週數命名 2022/07/27
            return {
                fullDateTime:format.formatType.replace(/yyyy/g,year).replace(/MM/g,month).replace(/dd/g,date).replace(/HH/g,hour).replace(/mm/g,minute).replace(/ss/g,second),
                getWeekName:format.customWeekItem![new Date(+new Date(format.formatDate)).getDay()]
            }
        } else {
            return format.formatType.replace(/yyyy/g, year).replace(/MM/g, month).replace(/dd/g, date).replace(/HH/g, hour).replace(/mm/g, minute).replace(/ss/g, second)
        }
    }

    class FetchClass { // 更新 FetchClass 類封裝方法內容 2022/03/24
        private static baseUrl:string = ''
        private static baseHeaders:{[key:string]:any} = {}

        static async fetchSetting <T>(settingParams:{ 
            method: requestMethod; 
            url: string; 
            headers?: { [key: string]: any; }; 
            contentType?: string;
            returnType?: retunType;
            data?: { [key: string]: any; }; 
            routeParams?: { [key: string]: any; };
            queryParams?: { [key: string]:any }
            beforePost?: () => void; 
            successFn?: (data: any) => void; 
            excuteDone?: () => void; 
            errorFn?: (err: any) => void; 
        },usePromise:boolean):Promise<fetchClassReturnType<T> | undefined> { 
            // 更新類 ajax 方法 2021/09/11
            // 更新類 ajax 方法內容 2021/10/21
            //#region 參數設定
            /**
             * @param {string} method
             * @param {string} url
             * @param {object} header 追加 hearder 物件 2021/10/21
             * @param {object} data
             * @param {object} routeParams 追加 routeParams 路由參數 2022/05/01
             * @param {object} queryParams 追加 queryParams 路由參數 2022/11/21
             * @param {string} contentType
             * @param {string} retunType 追加 retunType 回傳轉譯 2022/08/26
             * @param {Function} beforePost <= 回呼函式
             * @param {Function} successFn <= 回呼函式
             * @param {Function} excuteDone <= 回調函式 追加方法 2022/03/14
             * @param {Function} errorFn <= 回呼函式
             */
            //#endregion
    
            const settings:{ [key: string]: any } = {};
            const { method, headers, contentType, returnType, data,routeParams,queryParams,beforePost,successFn,excuteDone,errorFn } = settingParams;
    
            settings.method = method;
            settingParams.url = this.baseUrl ? `${this.baseUrl}${settingParams.url}` : settingParams.url;

            const returnTypeUse = returnType || 'json'

            if(method){
                if(!$.includes(["get","post","patch","put","delete"],method.toLocaleLowerCase())){
                    $.console('error','Method value must use valid request method,like get、post ...');
                    return
                }
            } else {
                $.console('error','Property name method is required in obejct parameters.');
                return
            }
    
            if(routeParams){
                const [keyName] = $.objDetails(routeParams, 'keys') as string[]
                settingParams.url = `${settingParams.url}/${routeParams[keyName]}`
            }

            if(queryParams){
                const querys = $.maps(Object.entries(queryParams),([key,value]) => `${key}=${value}`).join('&') as string
                settingParams.url = `${settingParams.url}?${querys}`
            }

            if (($.objDetails(this.baseHeaders, 'keys') as string[]).length > 0 || (headers && ($.objDetails(headers, 'keys') as string[]).length > 0)) {
                settings.headers = ($.objDetails(this.baseHeaders, 'keys') as string[]).length > 0 ? this.baseHeaders : { 'Content-Type': 'application/json', ...headers }
            }
    
            if (data) {
                settings.headers = ($.objDetails(this.baseHeaders, 'keys') as string[]).length > 0 ? this.baseHeaders : { 'Content-Type': contentType || 'application/json' }
                settings.body = $.convert(data, 'stringify')
            }
    
            if ((($.objDetails(this.baseHeaders, 'keys') as string[]).length > 0 || headers) && data) {
                settings.headers = ($.objDetails(this.baseHeaders, 'keys') as string[]).length > 0 ? this.baseHeaders : { ...headers }
                settings.body = $.convert(data, 'stringify')
            };

            if(!usePromise){
                if (beforePost){
                    beforePost!.call(beforePost);
                };
        
                if(!successFn){
                    $.console('error','Function Name successFn is required in obejct parameters.');
                    return
                };
        
                if(!errorFn){
                    $.console('error','Function Name errorFn is required in obejct parameters.');
                    return
                };
            }

            const res:Response = await fetch(settingParams.url, settings);

            if(usePromise){
                return new Promise<fetchClassReturnType<T>>(async (resolve,reject) => {
                    if (res.status >= 200 && res.status < 400) {
                        const result = await (res as {[key:string]:any})[returnTypeUse]() as T

                        return resolve({
                            bodyUsed: res.bodyUsed,
                            headers: res.headers,
                            ok: res.ok,
                            redirected: res.redirected,
                            status: res.status,
                            statusText: res.statusText,
                            type: res.type,
                            url:res.url,
                            data:result
                        })
                    }
                    else {
                        reject({
                            bodyUsed: res.bodyUsed,
                            headers: res.headers,
                            ok: res.ok,
                            redirected: res.redirected,
                            status: res.status,
                            statusText: res.statusText,
                            type: res.type,
                            url:res.url,
                        });
                    };
                })
            } else {
                // 更新 Request 成功與錯誤回傳內容 2022/03/14
                try {
                    if (res.status >= 200 && res.status < 400) {
                        const result = await (res as {[key:string]:any})[returnTypeUse]() as T
                        
                        successFn?.call(successFn,{
                            bodyUsed: res.bodyUsed,
                            headers: res.headers,
                            ok: res.ok,
                            redirected: res.redirected,
                            status: res.status,
                            statusText: res.statusText,
                            type: res.type,
                            url:res.url,
                            data:result
                        })
                        
                        excuteDone && excuteDone.call(excuteDone)
                    }
                    else {
                        throw new Error(JSON.stringify({
                            bodyUsed: res.bodyUsed,
                            headers: res.headers,
                            ok: res.ok,
                            redirected: res.redirected,
                            status: res.status,
                            statusText: res.statusText,
                            type: res.type,
                            url:res.url,
                        }));
                    };
                }
                catch (err:any) {
                    errorFn?.call(errorFn,JSON.parse((err as Error).message));
                };
            }
        };

        static createBase({ baseUrl,baseHeaders }:{ baseUrl:string,baseHeaders:{ [key: string]: any }}) { // 更新 fetch 物件組態設定方法 2022/03/24
            //#region
            /** 參數設定
             * @param {string} baseUrl 固定網址，設定後網址後半部變動部分只須設定 url
             * @param {object} baseHeaders 固定使用的 headers 內容，如 token、Content-Type 之類的
             */
            //#endregion
            this.baseUrl = baseUrl
            this.baseHeaders = baseHeaders
        }
    }

    class FetchPromisClass extends FetchClass {
        
        // 更新 Promise 導出 get 方法 2022/05/01
        static get = <T>(url: string, setting: fetchPromiseClassSettingParmasType):Promise<fetchClassReturnType<T> | undefined> => this.fetchSetting<T>({ method: 'get',url ,...setting },true)
        
        // 更新 Promise 導出 post 方法 2022/05/01
        static post = <T>(url: string, setting: fetchPromiseClassSettingParmasType):Promise<fetchClassReturnType<T> | undefined> => this.fetchSetting<T>({ method: 'post',url ,...setting },true)
        
        // 更新 Promise 導出 patch 方法 2022/05/01
        static patch = <T>(url: string, setting: fetchPromiseClassSettingParmasType):Promise<fetchClassReturnType<T> | undefined> => this.fetchSetting<T>({ method: 'patch',url ,...setting },true)
        
        // 更新 Promise 導出 put 方法 2022/05/01
        static put = <T>(url: string, setting: fetchPromiseClassSettingParmasType):Promise<fetchClassReturnType<T> | undefined> => this.fetchSetting<T>({ method: 'put',url ,...setting },true)
        
        // 更新 Promise 導出 delete 方法 2022/05/01
        static delete = <T>(url: string, setting: fetchPromiseClassSettingParmasType):Promise<fetchClassReturnType<T> | undefined> => this.fetchSetting<T>({ method: 'delete',url ,...setting },true)
    }
    
    ($.fetch as any) = <T>(settingParams:fetchClassSettingParmasType):Promise<fetchClassReturnType<T> | undefined> => FetchClass.fetchSetting<T>(settingParams,false) // 更新 FetchClass 類方法導出 2022/03/24

    $.fetch!.get = <T>(url:string,settingParams:fetchPromiseClassSettingParmasType):Promise<fetchClassReturnType<T> | undefined> => FetchPromisClass.get<T>(url,settingParams);

    $.fetch!.post = <T>(url:string,settingParams:fetchPromiseClassSettingParmasType):Promise<fetchClassReturnType<T> | undefined> => FetchPromisClass.post<T>(url,settingParams);

    $.fetch!.patch = <T>(url:string,settingParams:fetchPromiseClassSettingParmasType):Promise<fetchClassReturnType<T> | undefined> => FetchPromisClass.patch<T>(url,settingParams);

    $.fetch!.put = <T>(url:string,settingParams:fetchPromiseClassSettingParmasType):Promise<fetchClassReturnType<T> | undefined> => FetchPromisClass.put<T>(url,settingParams);

    $.fetch!.delete = <T>(url:string,settingParams:fetchPromiseClassSettingParmasType):Promise<fetchClassReturnType<T> | undefined> => FetchPromisClass.delete<T>(url,settingParams);

    $.fetch!.createBase = (paramters:{ // 更新 FetchClass 類方法導出，為 fetch 基礎組態設定 2022/03/24
        baseUrl:string,
        baseHeaders:{ [key:string]:any }
    }):void => FetchClass.createBase(paramters);

    return $;
})((el: string | object): (HTMLElement | Object) => typeof el === "object" ? el : document.querySelectorAll(el).length > 1 ? document.querySelectorAll(el) : document.querySelector(el)!); // 更新元素指向 2021/8/31

// Origin class extends method
// Use in ESModule you can use to import prototype extends like import './Library.ts'
/*eslint no-extend-native: ["off", { "exceptions": ["Object"] }]*/

// Use in ESModule global.d.ts
declare global {
    interface Math { 
        toFixedNum(setting:{ value:string | number,toFloatPos:number }):(number | undefined)
    }

    interface String { 
        format(formatStr:string,value:any[]):(string | undefined)
        appendText(txt:string):string
        appendDirection(direction:padDirection,pos:number,txt:string):string
        range(startPos:number,endPos:number):string
    }

    interface Date { 
        calculateDay(format: { day: number, method: string }):(Date | undefined)
        toOptionTimeZoneForISO(timeZone:number):(string | void)
        getLocalTimeZone():number
    }

    interface Array<T> { 
        append(item:any):void
        appendFirst(item:any):any[]
        remove(pos:number):any[]
        range(startPos:number,endPos:number):any[]
        removeFirst():any[]
        removeLast():any[]
    }

    interface Map<K,V> {
        append(keyName:K,value:V):void
        getValue(keyName:K):any
        deleteKeyValue(keyName:K):boolean
        removeAll():void
        isKeyInMap(keyName:K):boolean
        toObject():{[key:string]:any}
    }

    interface Set<T> {
        append(value:any):void
        deleteValue(value:any):boolean
        isValueInSet(value:any):boolean
        removeAll():void
        toArray():any[]
    }

    interface Object { // 更新方法 2022/08/02
        toMap(obj:{[key:string]:any}):Map<string,any>
    }
}

// interface Math {
//     toFixedNum(setting:{ value:string | number,toFloatPos:number }):(number | undefined)
// }

Math.toFixedNum = setting => { // 更新方法 2023/02/07
    if(!setting || !('value' in setting) || !('toFloatPos' in setting)){
      $.console('error','Please use object and with key value pair. ex: { value:100.1,toFloatPos:1 }')
      return
    }
  
    if(!$.typeOf(setting.toFloatPos,'Number')){
      $.console('error','toFloatPos key must use number.')
      return
    }
    
    return $.typeOf(setting.value,'String') ? Number(parseFloat(setting.value as string).toFixed(setting.toFloatPos)) : Number((setting.value as number).toFixed(setting.toFloatPos))
}

// interface String {
//     format(formatStr:string,value:any[]):(string | undefined)
//     appendText(txt:string):string
//     appendDirection(direction:padDirection,pos:number,txt:string):string
//     range(startPos:number,endPos:number):string
// }

String.prototype.appendText = function(txt) { return this.toString() + txt } // 更新方法 2022/06/24

String.prototype.appendDirection = function(direction,pos,txt){ return this[direction === 'left' ? 'padStart' : 'padEnd'](pos,txt) } // 更新方法 2023/02/07

String.prototype.range = function(startPos,endPos){ return this.toString().slice(startPos,endPos) } // 更新方法 2022/11/21

String.prototype.format = function(formatStr,...values) { // 更新方法 2022/06/24
    if($.typeOf(formatStr,'String') && $.includes(formatStr,'{') && $.includes(formatStr,'}')){
        if(formatStr.split('{').join('').split('}').length - 1 === values.length){

            let formatStrTemp:string = formatStr

            const valuesTemp:{ replaceKey:string,replaceValue:any }[] = $.maps(values,(value:any,index:number) => ({ replaceKey:`{${index}}`,replaceValue:value }))
            
            const returnReplaceDoneStr:string = $.maps(valuesTemp,({ replaceKey,replaceValue }:{ replaceKey:string,replaceValue:any }) => {
                formatStrTemp = formatStrTemp.replace(replaceKey,replaceValue)
                return formatStrTemp
            }).range(valuesTemp.length - 1,valuesTemp.length).join('')

            return returnReplaceDoneStr
        } else {
            $.console('error',"Can't not find else aguments.")
        }
    } else {
        $.console('error','First paramter must use type string,if use string must like this ex：abc {0} efg {1}.')
    }

    return undefined
}

// interface Date {
//     calculateDay(format:{ day: number, method: string }):(Date | undefined)
//     toOptionTimeZoneForISO(timeZone: number):(string | void)
//     getLocalTimeZone():number
// }

Date.prototype.calculateDay = function(format) {
    // 更新方法內容與回傳內容 2021/09/22
    // 更新方法 2021/12/01
    // 改變回傳物件 2022/03/23

    //#region 參數設定
    /**
     * @param {object} { day: number,method:string }
     * @returns {string}
     */
    //#endregion

    if (!format || !('day' in format && 'method' in format)) {
        $.console('error', 'Please enter an object and use day and method property in the object.');
        return
    } else if (typeof format.day !== 'number') {
        $.console('error', "day property must use type number.");
        return
    } else if (!$.includes(['addDay', 'reduceDay'], format.method)) {
        $.console('error', "Please enter method type 'addDay' or 'reduceDay'.");
        return
    }

    return {
        addDay: new Date(+this + (format.day * 24 * 60 * 60 * 1000)),
        reduceDay: new Date(+this - (format.day * 24 * 60 * 60 * 1000))
    }[format.method]
};

Date.prototype.getLocalTimeZone = function(){ return Math.abs(this.getTimezoneOffset() / 60) } // 更新方法 2023/02/07

Date.prototype.toOptionTimeZoneForISO = function (timeZone) {
    return timeZone ? new Date(+this + (timeZone * 60 * 60 * 1000)).toISOString() : $.console('error','Lost one parameter in function.') // 更新方法 2021/03/23
}

// interface Array<T> { // 更新方法 2022/03/23
//     append(item: any):void
//     appendFirst(item: any):any[]
//     remove(pos: number):any[]
//     range(startPos: number, endPos: number):any[]
//     removeFirst():any[]
//     removeLast():any[]
// }

Array.prototype.append = function (item) { this.push(item) } // 更新方法 2021/03/23

Array.prototype.appendFirst = function (item) { this.unshift(item); return this } // 更新方法 2021/03/23

Array.prototype.remove = function (pos) { this.splice(pos, 1); return this } // 更新方法 2021/03/23

Array.prototype.range = function (startPos, endPos) { return this.slice(startPos, endPos) } // 更新方法 2021/03/23

Array.prototype.removeFirst = function () { this.shift(); return this } // 更新方法 2021/03/23

Array.prototype.removeLast = function () { this.pop(); return this } // 更新方法 2021/03/23

// interface Map<K,V> { // 更新方法 2022/08/02
//     append(keyName:string,value:any):void
//     getValue(keyName:string):any
//     deleteKeyValue(keyName:string):boolean
//     removeAll():void
//     isKeyInMap(keyName:string):boolean
//     toObject():{[key:string]:any}
// }

Map.prototype.append = function(keyName,value){ this.set(keyName,value) } // 更新方法 2022/08/02

Map.prototype.getValue = function(keyName){ return this.get(keyName) } // 更新方法 2022/08/02

Map.prototype.deleteKeyValue = function(keyName){ return this.delete(keyName) } // 更新方法 2022/08/02

Map.prototype.removeAll = function(){ this.clear() } // 更新方法 2022/08/02

Map.prototype.isKeyInMap = function(keyName){ return this.has(keyName) } // 更新方法 2022/08/02

Map.prototype.toObject = function(){ return Object.fromEntries(this) } // 更新方法 2022/08/02

// interface Set<T> { // 更新方法 2022/08/02
//     append(value:any):void
//     deleteValue(value:any):boolean
//     isValueInSet(value:any):boolean
//     removeAll():void
//     toArray():any[]
// }

Set.prototype.append = function(value){ this.add(value) } // 更新方法 2022/08/02

Set.prototype.deleteValue = function(value){ return this.delete(value) } // 更新方法 2022/08/02

Set.prototype.isValueInSet = function(value){ return this.has(value) } // 更新方法 2022/08/02

Set.prototype.removeAll = function(){ this.clear() } // 更新方法 2022/08/02

Set.prototype.toArray = function(){ return [...this] } // 更新方法 2022/08/02

// interface Object { // 更新方法 2022/08/02
//     toMap(obj:{[key:string]:any}):Map<string,any>
// }
Object.prototype.toMap = function(obj){ return new Map(Object.entries(obj)) } // 更新方法 2022/08/02

export default $