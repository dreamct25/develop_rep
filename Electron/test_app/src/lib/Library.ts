// CopyRight by Chen 2021/08 - 2022/01 Library language - typescript ver 1.3.3
// work environment typescript v4.5.4
//
// Use in node js
// export default $
const $: any = (function (el) {
    const $ = (targets: any): any => {
        let targetThis: any = el.call(el, targets) || targets;
        targetThis.targets = targets;
        targetThis.texts = (txt: string | undefined): string | void => txt === undefined ? targetThis.textContent : targetThis.textContent = txt;
        targetThis.html = (dom: string | undefined): string | void => dom === undefined ? targetThis.innerHTML : targetThis.innerHTML = dom;
        targetThis.addClass = (classText: string): void => targetThis.classList.add(classText);
        targetThis.removeClass = (classText: string): void => targetThis.classList.remove(classText);
        targetThis.toggleClass = (classText: string): void => targetThis.classList.toggle(classText); // 更新方法 2021/09/20
        targetThis.on = (eventType: string, fn: Function): void => { targetThis[["on", eventType].join("")] = (t: Event) => fn.call(targetThis, t); }; // 更新方法 2021/09/20
        targetThis.listener = (eventType: string, fn: Function): void => targetThis.addEventListener(eventType, fn);
        targetThis.removeListener = (eventType: string, fn: Function): void => targetThis.removeEventListener(eventType, fn); // 更新方法 2022/01/04
        targetThis.val = (valTemp: string | undefined): string | void => valTemp === undefined ? targetThis.value : targetThis.value = valTemp;
        targetThis.attr = (props: string, val: any): string | number | void => val === undefined ? targetThis.getAttribute(props) : targetThis.setAttribute(props, val);
        targetThis.props = (props: string, val: any): any => val === undefined ? targetThis[props] : targetThis[props] = val;
        targetThis.styles = (method: string, cssType: string, cssParameter: string): void => { if (!$.includes(['set', 'remove'], method)) { $.console('error', "First parameter method must use string and keyword is 'set' or 'remove'."); return; }; method === 'set' ? targetThis.style.setProperty(cssType, cssParameter) : targetThis.style.removeProperty(cssType); }; // 更新方法 2021/10/26
        targetThis.getDomStyles = (conditionProps: string[]): { [key: string]: any } => { let cssProperty: { [key: string]: any } = {}; if (typeof conditionProps !== "object") { $.console('error', 'Parameter must use array.'); return; } else { if (conditionProps.length === 0) { $.console('error', 'Parameter must use array,and css property must in array with string.'); return; } else { $.each(conditionProps, item => cssProperty[item] = getComputedStyle($(targetThis)).getPropertyValue(item)); return cssProperty; } }; }; // 更新方法 2021/10/26
        targetThis.sibling = (num: number): HTMLElement => $(targetThis[num]);         // 更新方法 2021/08/31
        targetThis.child = (num: number): HTMLElement => $(targetThis.children[num]);  // 更新方法 2021/08/31
        targetThis.childFirst = (): HTMLElement => $(targetThis.firstElementChild);    // 更新方法 2021/08/31
        targetThis.childLast = (): HTMLElement => $(targetThis.lastElementChild);      // 更新方法 2021/08/31
        targetThis.parent = (): HTMLElement => $(targetThis.parentNode);               // 更新方法 2021/08/31
        targetThis.appendDom = (el: HTMLElement): void => $(targetThis).append(el);    // 更新方法 2021/09/12
        targetThis.removeDom = (): void => $(targetThis).remove();                     // 更新方法 2021/09/12
        targetThis.removeChildDom = (): void => $(targetThis).replaceChildren();       // 更新方法 2021/10/25
        targetThis.appendDomText = (el: Text): void => $(targetThis).appendChild(el);  // 更新方法 2021/09/12
        targetThis.easyAppendDom = (orderBy: string, domStr: string): void => $(targetThis).insertAdjacentHTML(orderBy !== 'afterDom' ? 'afterbegin' : 'beforeend', domStr);  // 更新方法 2021/11/25
        targetThis.scrollToTop = (scrollSetting: { [key: string]: number, scrollTop: number, duration: number } = { scrollTop: 0, duration: 0 }): void => { // 更新方法 2021/10/26
            let animateScroll: any = undefined;
            const [keyI, keyII]: string[] = Object.keys(scrollSetting);
            const startPos: number = targetThis[keyI];
            const changePos: number = scrollSetting[keyI] - startPos;
            const startTimeStamp: number = +new Date();

            const animationSettings: (animationSetting: {
                currentTime: number,
                startVal: number,
                changeVal: number,
                animateDuration: number
            }) => number = animationSetting => {
                let { currentTime, startVal, changeVal, animateDuration }: typeof animationSetting = animationSetting;
                let currentTimeTemp: number = currentTime;
                currentTimeTemp /= animateDuration / 2;
                if (currentTimeTemp < 1) return (changeVal / 2) * currentTimeTemp * currentTimeTemp + startVal;
                currentTimeTemp -= 1;
                return (-changeVal / 2) * (currentTimeTemp * (currentTimeTemp - 2) - 1) + startVal;
            };

            (animateScroll = () => {
                const currentTimeStamp: number = +new Date() - startTimeStamp;
                targetThis.scrollTop = Number(animationSettings({
                    currentTime: currentTimeStamp,
                    startVal: startPos,
                    changeVal: changePos,
                    animateDuration: scrollSetting[keyII]
                }));
                currentTimeStamp < scrollSetting[keyII] ? requestAnimationFrame(animateScroll) : targetThis.scrollTop = scrollSetting[keyI];
            })();
        }
        return targetThis;
    };

    $.each = (item: any[], fn: (...parameters: any[]) => void): void => item.forEach((items: any, index: number) => fn.call(item, items, index));
    $.maps = (item: any[], fn: (...parameters: any[]) => void): any[] => item.map((items: any, index: number) => fn.call(item, items, index));
    $.filter = (item: any[], fn: (...parameters: any[]) => void): { [key: string]: any }[] => item.filter((items: any) => fn.call(item, items));
    $.sort = (item: any[], fn: () => void): any => item.sort((a: any, b: any) => fn.call(item, a, b));
    $.indexOf = (item: any, x: any): number => item.indexOf(x);
    $.includes = (item: any[], x: any): boolean => item.includes(x);
    $.findIndexOfObj = (item: any, fn: (...parameters: any[]) => void): number => item.findIndex((where: object) => fn.call(item, where));
    $.sum = (item: any, fn: (...parameters: any[]) => void) => item.reduce((a: any, b: any) => fn.call(item, a, b));
    $.typeOf = (item: any, classType: any): string | Boolean => classType === undefined ? item.constructor.name : item.constructor === classType; // 更新方法 2021/10/26
    $.console = (type: string, ...item: any): void => (console as { [key: string]: any })[type](...item) // 更新方法 2021/10/26
    $.localData = (action: string, keyName: string, item: { [key: string]: any } | any[]): { [key: string]: any } | any[] => action === 'get' ? ($.convert(localStorage.getItem(keyName), 'json') || []) : localStorage.setItem(keyName, $.convert(item, 'stringify')); // 更新方法 2021/11/29
    $.convert = (val: any, type: string): any => { // 更新方法 2021/10/22
        if (val === undefined || type === undefined) {
            $.console('error', "Please enter first parameters value who want to convert and seconde paramters value is convert type 'string' or 'number' or 'float' or 'boolean' or 'json' or 'stringify'.");
            return
        } else if (typeof val === 'object' && $.includes(['string', 'number', 'float', 'boolean'], type)) {
            $.console('error', `Convert value can't be object when use convert type ${type}.`);
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

    $.createDom = (tag: string, props: { [key: string]: any }): HTMLElement => { // 更新方法 2021/09/12
        const el: HTMLElement & { [key: string]: any } = document.createElement(tag);
        const propsArr: [string, any][] = Object.entries(props);
        $.each(propsArr, (getProps: [string, any]) => {
            const [propertyI, valueI]: [string, any] = getProps
            if ($.typeOf(valueI, 'Object')) { // 更新方法 2021/12/07，解析 data-* 建構屬性內容
                const [propertyII, obj]: [string, object] = getProps
                const [[key, valueII]]: [string, any][] = Object.entries(obj)
                el[propertyII][key] = valueII
            } else {
                el[propertyI] = $.typeOf(valueI, 'String') ? valueI.trim() : valueI
            }
        })
        return el;
    };
    $.createDomText = (text: string): Text => document.createTextNode(text); // 更新方法 2021/09/12
    $.objDetails = (obj: { [key: string]: any }, method: string): any[] | void => method === undefined || !$.includes(['keys', 'values', 'entries'], method) ? $.console('error', "please enter secode prameter 'keys' or 'values' or 'entries' in type string") : (Object as { [key: string]: any })[method](obj); // 更新方法 2021/09/12
    $.objManager = (obj: { [key: string]: any }, action: string | undefined, key: string | undefined, value: any): { [key: string]: any } | void => { // 更新方法 2021/10/21

        //#region 參數設定
        /**
         * @param {object} obj <= 型別物件 要管理的物件
         * @param {string} action <= 型別字串，要執行的動作，有分為 get ( 取得管理物件內容 )、set ( 設定管理物件指定鍵與值 )、add ( 新增管理物件鍵與值 )、delete ( 刪除管理物件指定鍵與值 )
         * @param {string} key <= 型別字串，為鍵值的鍵
         * @param {any} value <= 型別任意，為鍵值的值
         * @returns {object | void}
         */
        //#endregion

        const check: () => string | undefined = () => {
            if (obj === undefined) {
                return "Please put want to manage's object at first parameters";
            };

            if (action === undefined || !$.includes(['get', 'set', 'add', 'delete'], action)) {
                return 'Please enter want to use methods "get、set、add、delete" at seconde parameters';
            } else if (typeof action !== 'string') {
                return 'Seconde parameters must use type string.';
            };

            if (key === undefined) {
                return 'Please enter want to use key name at third parameters';
            } else if (typeof key !== 'string') {
                return 'Third parameters must use type string.';
            };

            if (value === undefined) {
                return `Please enter want to set value at forth parameters.`;
            };
        }

        switch (action) {
            case 'get':
                return obj;
            case 'set':
                check() !== undefined ? $.console('error', check()) : key in obj ? obj[key] = value : $.console('error', `Key name ${key} not in this object.`);
                break;
            case 'add':
                check() !== undefined ? $.console('error', check()) : key in obj ? $.console('error', `Key name ${key} already in this object`) : obj[key] = value;
                break;
            case 'delete':
                check() !== undefined ? $.console('error', check()) : key in obj ? delete obj[key] : $.console('error', `Key name ${key} not in this object.`);
                break;
        }
    }

    $.formatDateTime = (format: { formatDate: string | Date, formatType: string, localCountryTime?: number }): string | number => { // 更新方法 2021/12/01
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

        if (!('formatDate' in format || 'formatType' in format)) {
            $.console('error', 'Please enter an object and use formatType property in the object.');
            return
        } else if (format.formatDate !== '' && !$.includes(['date', 'time', 'full', 'toDateFullNumber'], format.formatType)) {
            $.console('error', "Please enter format type 'date' or 'time' or 'full' or 'toDateFullNumber'.");
            return
        };

        const localCountryTime: number = ('localCountryTime' in format ? format.localCountryTime : 8) * 60 * 60 * 1000
        const dateStr: string = new Date(+new Date(format.formatDate) + localCountryTime).toJSON();
        const dateSplit: string[] = dateStr.replace(/T/g, "-").replace(/:/g, "-").split(".")[0].split("-");
        const [year, month, date, hour, minute, second] = dateSplit;

        return {
            date: `${year}-${month}-${date}`,
            time: `${hour}：${minute}：${second}`,
            full: `${year}-${month}-${date} ${hour}：${minute}：${second}`,
            toDateFullNumber: Number(dateSplit.join(""))
        }[format.formatType]
    }

    $.fetch = async (settingParams: {
        method: string,
        url: string,
        headers: { [key: string]: any } | undefined
        contentType: string,
        data: { [key: string]: any } | undefined,
        beforePost: Function,
        successFn: Function,
        errorFn: Function
    }): Promise<void> => {
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

        let resError: { [key: string]: any } | undefined;
        let settings: { [key: string]: any } = {};
        let { method, url, headers, contentType, data, beforePost, successFn, errorFn } = settingParams;

        settings.method = method;
        settings.url = url;

        if (headers !== undefined) {
            settings.headers = headers;
        } else if (data !== undefined) {
            settings.headers = { "Content-Type": contentType };
            settings.body = $.convert(data, 'stringify');
        } else if (headers !== undefined && data !== undefined) {
            settings.headers = { ...headers, "Content-Type": contentType };
            settings.body = $.convert(data, 'stringify');
        };

        if (beforePost !== undefined) {
            beforePost.call(beforePost);
        };

        if (successFn === undefined) {
            $.console('error', 'Function Name successFn is required in obejct parameters.');
            return
        };

        if (errorFn === undefined) {
            $.console('error', 'Function Name errorFn is required in obejct parameters.');
            return
        };

        try {
            let res: Response = await fetch(url, settings);
            if (res.status === 200) {
                res.json().then((resItem: { [key: string]: any }) => successFn.call(successFn, resItem));
            }
            else {
                resError = res;
                throw new Error();
            }
        }
        catch (err: any) {
            errorFn.call(errorFn, resError)
        };
    };

    return $;
}((el: object | string): any => typeof el === "object" ? el : document.querySelectorAll(el).length > 1 ? document.querySelectorAll(el) : document.querySelector(el))); // 更新元素指向 2021/8/31

declare global {
    interface Date { calculateDay: (format: { day:number,method: string }) => Date }
}

Date.prototype.calculateDay = (format: { day: number, method: string }) => {
    // 更新方法內容與回傳內容 2021/09/22
    // 更新方法 2021/12/01

    //#region 參數設定
    /**
     * @param {object} { day: number,method:string }
     * @returns {string}
     */
    //#endregion

    if (format === undefined || !('day' in format && 'method' in format)) {
        $.console('error', 'Please enter an object and use day and method property in the object.');
        return
    } else if (typeof format.day !== 'number') {
        $.console('error', "day property must use type number.");
    } else if (!$.includes(['add', 'reduce'], format.method)) {
        $.console('error', "Please enter method type 'add' or 'reduce'.");
        return
    };

    const addDay = new Date(+new Date() + (format.day * 24 * 60 * 60 * 1000))
    const reduceDay = new Date(+new Date() - (format.day * 24 * 60 * 60 * 1000))

    return format.method === 'add' ? addDay : reduceDay;
};

export default $