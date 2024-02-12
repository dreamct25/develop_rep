// CopyRight © 2021-08 - 2024-02 Alex Chen. Library Language - Typescript Ver 1.6.4
// Work Environment Typescript v5.3.3、ESlint v8.56.0
//
/* eslint-disable no-return-assign */
/* eslint-disable promise/param-names */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/method-signature-style */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
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
type typeOfClassType = 'String' | 'Number' | 'Boolean' | 'Array' | 'Object'
type codeType = 'encode' | 'decode'

type fetchClassReturnType<T> = T extends undefined ? fetchClassReturnTypeBase : fetchClassReturnTypeBase & { data: T }

interface fetchClassReturnTypeBase {
  bodyUsed: boolean
  headers: object
  ok: boolean
  redirected: boolean
  status: number
  statusText: string
  type: string
  url: string
}

interface fetchClassSettingParmasType<ResponesResult = undefined> {
  method: requestMethod
  url: string
  headers?: Record<string, any>
  contentType?: string
  returnType?: retunType
  useFormData?: boolean
  useXMLHttpRequest?: boolean
  data?: Record<string, any>
  routeParams?: Record<string, any>
  queryParams?: Record<string, any>
  timeout?: number
  beforePost?: () => void
  successFn?: (data: fetchClassReturnType<ResponesResult>) => void
  excuteDone?: () => void
  errorFn?: (err: fetchClassReturnType<undefined>) => void
}

interface fetchPromiseClassSettingParmasType {
  headers?: Record<string, any>
  returnType?: retunType
  data?: Record<string, any>
  useFormData?: boolean
  useXMLHttpRequest?: boolean
  routeParams?: Record<string, any>
  queryParams?: Record<string, any>
  timeout?: number
}

interface xhrReturnMethodType<T> {
  xhrResponseResult(callBack: (result: T) => void): void
  xhrUploadProgress(callBack: (p: number) => void): void
  xhrRequestStart(): void
}

interface fetchGroupType {
  <T, useXMLReq = false>(settingParams: fetchClassSettingParmasType<T>): Promise<useXMLReq extends false ? undefined : xhrReturnMethodType<T>>
  get<T, useXMLReq = false>(url: string, settingParams?: fetchPromiseClassSettingParmasType): Promise<useXMLReq extends false ? fetchClassReturnType<T> : xhrReturnMethodType<T>>
  post<T, useXMLReq = false>(url: string, settingParams: fetchPromiseClassSettingParmasType): Promise<useXMLReq extends false ? fetchClassReturnType<T> : xhrReturnMethodType<T>>
  patch<T, useXMLReq = false>(url: string, settingParams: fetchPromiseClassSettingParmasType): Promise<useXMLReq extends false ? fetchClassReturnType<T> : xhrReturnMethodType<T>>
  put<T, useXMLReq = false>(url: string, settingParams: fetchPromiseClassSettingParmasType): Promise<useXMLReq extends false ? fetchClassReturnType<T> : xhrReturnMethodType<T>>
  delete<T, useXMLReq = false>(url: string, settingParams: fetchPromiseClassSettingParmasType): Promise<useXMLReq extends false ? fetchClassReturnType<T> : xhrReturnMethodType<T>>
  createBase(paramters: { baseUrl: string, baseHeaders: Record<string, any> }): void
}

export interface Self extends HTMLElement {
  texts(txt?: string): string | null | undefined
  html(dom?: string): string | undefined
  addClass(classText: string): any
  removeClass(classText: string): any
  toggleClass(classText: string): boolean
  on(eventType: string, fn: (self: any, t: Event) => void): void
  listener(eventType: string, fn: (event: any) => void): void
  removeListener(eventType: string, fn: (event: any) => void): void
  val(valTemp?: string): string | undefined
  attr(props: string, val?: any): string | void | null
  props(props: string, val?: any): any
  sibling(num: number): HTMLElement
  child(num: number): HTMLElement
  childFirst(): Element | null
  childLast(): Element | null
  parent(): ParentNode | null
  appendDom(el: HTMLElement): void
  removeDom(): void
  removeChildDom(): void
  appendDomText(el: Text): void
  easyAppendDom(orderBy: string, domStr: string): void
  styles(method: stylesMethod, cssType: string, cssParameter: string): Self | undefined
  getDomStyles(conditionProps: string[]): Record<string, any>
  getDomPos(): { x: number, y: number, top: number, left: number, right: number, bottom: number, width: number, height: number }
  scrollToTop(scrollSetting: { scrollTop: number, duration: number }): void
  useWillMount(willMountCallBack: (target: HTMLDocument) => void): void
  useMounted(useMountedCallBack: (target: HTMLDocument) => void): void
}

// declare $
declare interface $ { // 更新 2022/06/29
  <T>(target: T extends string ? string : T): Self
  each<T>(item: T[], callBack: (items: T, index: number) => void): void
  maps<T, R>(item: T[], callBack: (items: T, index: number) => R): R[]
  filter<T>(item: T[], callBack: (items: T) => boolean): T[]
  find<T>(item: T[], callBack: (items: T) => T | undefined): T | undefined
  sort<T>(item: T[], callBack: (a: T, b: T) => number): T[]
  sum<T, R>(item: T[], callBack: (a: T, b: T) => any, initialVal?: any): R
  indexOf<T>(item: T, x: string | number): number
  includes<T>(item: T, x: string | number): boolean
  findIndexOfObj<T>(item: T[], callBack: (items: T) => boolean): number
  findObjProperty<T>(obj: T, propertyName: string): boolean
  mergeArray<T, M>(item: T[], mergeItem: M[], callBack?: ((items: T[]) => T[])): T[]
  typeOf<T>(item: T, classType?: typeOfClassType | string): string | boolean
  console(type: consoleMethod, ...item: any): undefined
  localData<T>(action: localDataActionType, keyName: string, item?: string): (T extends void ? any : T)
  getNumberOfDecimal(num: number, digits: number): number
  createCustomEvent(eventName: string, setEventResposeContext?: any): CustomEvent
  registerCustomEvent(eventName: string, fn: () => void): void
  useCustomEvent(eventObj: CustomEvent): void
  removeCustomEvent(eventName: string, fn: () => void): void
  createPromise<T>(callBack: (success: (value: any) => void, error: (reason?: any) => void) => void): Promise<T>
  createPromiseAll<T>(paramaters: Array<Promise<Awaited<T>>>): Promise<Array<Awaited<T>>>
  createDomText: (text: string) => Text
  objDetails<T, R extends objDetailsMethod, V extends T>(obj: T, method: R): R extends 'keys' ? Array<keyof T> : R extends 'values' ? Array<V[keyof T]> : R extends 'entries' ? [keyof T, V[keyof T]] : void
  createArray<T, R>({ type, item }: { type: createArrayType, item: T | { random: number } }, repack?: ((y: number) => R) | undefined): R[] | undefined
  convert<T>(val: any, type: convertType): T | undefined
  createDom(tag: string, props: Record<string, any>): HTMLElement
  currencyTranser(formatNumber: number, currencyType: string, withCurrencyStyle: boolean): string | undefined
  isObjectTheSame<T1, T2>(objI: T1, obj: T2): boolean
  useBase64(method: codeType, str: string): string
  useSHA(shaType: SHAType, str: string): Promise<string>
  useUnicode(str: string, codeType: codeType): string
  jwtDeocde<R>(token: string): R
  rebuildObject<R extends Record<string, any>, T extends Record<string, any>>(obj: T, callback: (keyName: keyof T, value: any) => [keyof T, any]): R
  formatDateTime<T>(format: {
    formatDate: string | globalThis.Date | number
    formatType: string
    toROCYear?: boolean
    localCountryTime?: number
    toDateFullNumber?: boolean
    customWeekItem?: any[]
  } & T): T extends {
    formatDate: string | Date | number
    formatType: string
    customWeekItem: any[]
  } ? { fullDateTime: string, getWeekName: any } :
    T extends {
      formatDate: string | Date | number
      formatType: string
      toDateFullNumber: boolean
    } ? number : string
  fetch: fetchGroupType
}

const $: $ = (target) => {
  const self = (typeof target === 'string' ? document.querySelectorAll(target as string).length > 1 ? document.querySelectorAll(target as string) : document.querySelector(target as string)! : target) as Self
  self.texts = (txt) => { if (txt) { self.textContent = txt } else { return self.textContent } }
  self.html = (dom) => { if (dom) { self.innerHTML = dom } else { return self.innerHTML } }
  self.addClass = (classText) => { self.classList.add(classText); return self } // 更新方法 2022/03/12 變形為可鏈式寫法
  self.removeClass = (classText) => { self.classList.remove(classText); return self } // 更新方法 2022/03/12 變形為可鏈式寫法
  self.toggleClass = (classText) => self.classList.toggle(classText) // 更新方法 2021/09/20
  self.on = (eventType, fn) => { (self as Record<string, any>)[['on', eventType].join('')] = (t: Event) => fn.call(fn, self, t) } // 更新方法 2021/09/20
  self.listener = (eventType, fn) => self.addEventListener(eventType, fn)
  self.removeListener = (eventType, fn) => self.removeEventListener(eventType, fn) // 更新方法 2022/01/04
  self.val = (valTemp) => { if (valTemp) { (self as unknown as HTMLInputElement).value = valTemp } else { return (self as unknown as HTMLInputElement).value } }
  self.attr = (props, val) => val ? self.setAttribute(props, val) : self.getAttribute(props)
  self.props = (props, val) => val ? (self as Record<string, any>)[props] = val : (self as Record<string, any>)[props]
  self.sibling = (num) => (self as unknown as HTMLElement[])[num] // 更新方法 2021/08/31
  self.child = (num) => (self.children as unknown as HTMLElement[])[num] // 更新方法 2021/08/31
  self.childFirst = () => self.firstElementChild // 更新方法 2021/08/31
  self.childLast = () => self.lastElementChild // 更新方法 2021/08/31
  self.parent = () => self.parentNode // 更新方法 2021/08/31
  self.appendDom = (el) => self.append(el) // 更新方法 2021/09/12
  self.removeDom = () => self.remove() // 更新方法 2021/09/12
  self.removeChildDom = () => self.replaceChildren() // 更新方法 2021/10/25
  self.appendDomText = (el) => self.appendChild(el) // 更新方法 2021/09/12
  self.easyAppendDom = (orderBy, domStr) => self.insertAdjacentHTML(orderBy !== 'afterDom' ? 'afterbegin' : 'beforeend', domStr) // 更新方法 2021/11/25
  self.styles = (method, cssType, cssParameter) => {
    // 更新方法 2021/10/26
    // 更新方法 2022/03/12 變形為可鏈式寫法
    if (!$.includes(['set', 'remove'], method)) {
      $.console('error', "First parameter method must use string and keyword is 'set' or 'remove'.")
      return
    }
    method === 'set' ? self.style.setProperty(cssType, cssParameter) : self.style.removeProperty(cssType)
    return self
  }

  self.getDomStyles = (conditionProps) => { // 更新方法 2021/10/26
    const cssProperty: Record<string, any> = {}
    if (typeof conditionProps !== 'object') {
      $.console('error', 'Parameter must use array.')
    } else {
      if (conditionProps.length === 0) {
        $.console('error', 'Parameter must use array,and css property must in array with string.')
      } else {
        $.each<string>(conditionProps, item => cssProperty[item] = getComputedStyle(self as HTMLElement).getPropertyValue(item))
        return cssProperty
      }
    }
    return cssProperty
  }

  self.getDomPos = () => ({ // 更新方法 2022/03/23
    x: self.props('offsetLeft'),
    y: self.props('offsetTop') - window.scrollY,
    top: self.props('offsetTop'),
    left: self.props('offsetLeft'),
    right: (self.props('offsetLeft') as number) + (self.props('offsetWidth') as number),
    bottom: ((self).props('offsetTop') as number) + (self.props('offsetHeight') as number) - window.scrollY,
    width: self.props('offsetWidth'),
    height: self.props('offsetHeight')
  })

  self.scrollToTop = (scrollSetting) => { // 更新方法 2021/10/26
    let animateScroll: FrameRequestCallback
    const [keyI, keyII]: string[] = Object.keys(scrollSetting)
    const startPos: number = (self as Record<string, any>)[keyI]
    const changePos: number = (scrollSetting as Record<string, any>)[keyI] - startPos
    const startTimeStamp: number = +new Date()

    const animationSettings: (animationSetting: {
      currentTime: number
      startVal: number
      changeVal: number
      animateDuration: number
    }) => number = animationSetting => {
      const { currentTime, startVal, changeVal, animateDuration }: typeof animationSetting = animationSetting
      let currentTimeTemp: number = currentTime
      currentTimeTemp /= animateDuration / 2
      if (currentTimeTemp < 1) return (changeVal / 2) * currentTimeTemp * currentTimeTemp + startVal
      currentTimeTemp -= 1
      return (-changeVal / 2) * (currentTimeTemp * (currentTimeTemp - 2) - 1) + startVal
    };

    (animateScroll = () => {
      const currentTimeStamp: number = +new Date() - startTimeStamp
      self.scrollTop = Number(animationSettings({
        currentTime: currentTimeStamp,
        startVal: startPos,
        changeVal: changePos,
        animateDuration: (scrollSetting as Record<string, any>)[keyII]
      }))
      currentTimeStamp < (scrollSetting as Record<string, any>)[keyII] ? requestAnimationFrame(animateScroll) : self.scrollTop = (scrollSetting as Record<string, any>)[keyI]
    })()
  }

  self.useWillMount = (willMountCallBack) => { // 更新方法 2022/03/19
    const vm = self
    if (typeof self === 'object') {
      if ($.typeOf(vm, 'HTMLDocument')) {
        vm.listener('readystatechange', ({ target }: { target: HTMLDocument }) => target.readyState === 'interactive' && willMountCallBack.call(willMountCallBack, target))
      } else {
        $.console('error', 'UseWillMount hook just use when selector document.')
      }
    } else {
      $.console('error', 'UseWillMount hook just use when selector document.')
    }
  }

  self.useMounted = (useMountedCallBack) => { // 更新方法 2022/03/19
    const vm = self
    if (typeof self === 'object') {
      if ($.typeOf(vm, 'HTMLDocument')) {
        vm.listener('readystatechange', ({ target }: { target: HTMLDocument }) => target.readyState === 'complete' && useMountedCallBack.call(useMountedCallBack, target))
      } else {
        $.console('error', 'UseMounted Hook just use when selector document.')
      }
    } else {
      $.console('error', 'UseMounted Hook just use when selector document.')
    }
  }

  return self
}

// public function
$.each = (item, callBack) => item.forEach((items, index) => callBack.call(callBack, items, index))
$.maps = (item, callBack) => item.map((items, index) => callBack.call(callBack, items, index))
$.filter = (item, callBack) => item.filter(items => callBack.call(callBack, items))
$.find = (item, callBack) => item.find(items => callBack.call(callBack, items)) // 更新方法 2022/03/12
$.sort = (item, callBack) => item.sort((a, b) => callBack.call(callBack, a, b))
$.sum = (item, callBack, initialVal) => initialVal ? item.reduce((a, b) => callBack.call(callBack, a, b), initialVal) : item.reduce((a, b) => callBack.call(callBack, a, b))
$.indexOf = (item, x) => (item as any).indexOf(x)
$.includes = (item, x) => (item as any).includes(x)
$.findIndexOfObj = (item, callBack) => item.findIndex(items => callBack.call(callBack, items))
$.findObjProperty = (obj, propertyName) => (obj as Record<string, any>).hasOwnProperty(propertyName) // 更新方法 2022/03/23
$.mergeArray = (item, mergeItem, callBack) => callBack ? (item as any).concat(mergeItem) : callBack!.call(callBack!, (item as any).concat(mergeItem)) // 更新方法 2022/03/23
$.typeOf = (item, classType) => classType ? (item as any).constructor.name === classType : (item as any).constructor.name // 更新方法 2021/10/26
$.console = (type, ...item) => (console as Record<string, any>)[type](...item) // 更新方法 2021/10/26
$.localData = (action, keyName, item) => action === 'get' ? ($.convert<any>(localStorage.getItem(keyName), 'json') || []) : localStorage.setItem(keyName, $.convert<string>(item, 'stringify')!) // 更新方法 2021/11/29
$.getNumberOfDecimal = (num, digits) => parseInt(num.toFixed(digits)) // 更新方法 2022/09/28
$.createCustomEvent = (eventName, setEventResposeContext) => setEventResposeContext ? new CustomEvent(eventName, { detail: setEventResposeContext }) : new CustomEvent(eventName) // 更新方法 2022/07/13
$.registerCustomEvent = (eventName, fn) => window.addEventListener(eventName, fn) // 更新方法 2022/07/13
$.useCustomEvent = (eventObj) => window.dispatchEvent(eventObj) // 更新方法 2022/07/13
$.removeCustomEvent = (eventName, fn) => window.removeEventListener(eventName, fn) // 更新方法 2022/07/13
$.createPromise = async (callBack) => await new Promise((resovle, reject) => callBack.call(callBack, resovle, reject)) // 更新方法 2022/07/14
$.createPromiseAll = async (paramaters) => await Promise.all(paramaters) // 更新方法 2022/07/14
$.createDomText = text => document.createTextNode(text) // 更新方法 2021/09/12
$.objDetails = (obj, method) => method && $.includes(['keys', 'values', 'entries'], method) ? (Object as Record<string, any>)[method](obj as Record<string, any>) : $.console('error', "please enter secode prameter 'keys' or 'values' or 'entries' in type string") // 更新方法 2021/09/12
$.isObjectTheSame = (objI, objII) => $.convert(objI, 'stringify') === $.convert(objII, 'stringify') // 更新方法 2023/06/01
$.useBase64 = (method, str) => method === 'encode' ? btoa(str) : atob(str) // 更新方法 2021/11/24
$.useSHA = async (shaType, str) => { // 更新方法 2021/11/24
  // Cryptoing only working in https of production or http of development environment
  const hashBuffer = await window.crypto.subtle.digest(shaType, new TextEncoder().encode(str))
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('')
}
$.useUnicode = (str, method) => { // 更新方法 2023/05/31
  if (method === 'encode') {
    return $.createArray({ type: 'fake', item: { random: str.length } }, (num) => {
      const code: number = str.charCodeAt(num)
      const code16: string = code.toString(16)

      if (code < 0xf) {
        return `\\u000${code16.toUpperCase()}`
      } else if (code < 0xff) {
        return `\\u00${code16.toUpperCase()}`
      } else if (code < 0xfff) {
        return `\\u0${code16.toUpperCase()}`
      } else {
        return `\\u${code16.toUpperCase()}`
      }
    })!.join('')
  }

  return str.replace(/\\u(\d{4})/g, (_, code) => String.fromCharCode(parseInt(code, 16)))
}
$.jwtDeocde = (token) => { // 更新方法 2023/11/30
  if (token) {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const result = decodeURIComponent(
      $.maps(
        $.useBase64('decode', base64).split(''),
        char => `%${(`00${char.charCodeAt(0).toString(16)}`).slice(-2)}`
      ).join('')
    )

    return JSON.parse(result)
  }

  $.console('error', 'please typing token at first paramters .')

  return undefined
}
$.createArray = ({ type, item }, repack) => { // 更新方法 2022/03/14
  // #region 參數設定
  /**
       * @param {string} type <= 型別字串 要創建種類，fake 為創建假陣列、new 為創建新陣列
       * @param {object}} item <= 型別物件，建假陣列時需使用為 { random:100 或其他數字 }
       * @param {function | undefined} repack <= 型別函式，為 call back function 為處理假陣列時使用的後續操作
       * @returns {Array}
       */
  // #endregion

  const itemTemp = item as { random: number }

  if (type === 'fake') {
    if ('random' in itemTemp && $.typeOf(itemTemp.random, 'Number') && repack !== undefined && $.typeOf(repack, 'Function')) {
      return Array.from({ length: itemTemp.random }, (_, items) => repack.call(repack, items))
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
    $.console('error', "Please enter first parameters value who want to convert and seconde paramters value is convert type 'string' or 'number' or 'float' or 'boolean' or 'json' or 'stringify'.")
    return
  } else if ($.typeOf(val, 'Object') && $.includes(['string', 'number', 'float', 'boolean'], type)) {
    $.console('error', `Convert value can't be object when use convert type ${type}.`)
    return
  }

  const returnItem: {
    string: string
    number: number
    float: number
    boolean: boolean
    json: Record<string, any> | boolean
    stringify: string | boolean
  } = {
    string: String(val),
    number: parseInt(val),
    float: parseFloat(val),
    boolean: Boolean(val),
    json: type === 'json' && JSON.parse(val),
    stringify: type === 'stringify' && JSON.stringify(val)
  }

  return (returnItem as Record<string, any>)[type]
}

$.createDom = (tag, props) => { // 更新方法 2021/09/12
  const el: HTMLElement & Record<string, any> = document.createElement(tag)
  const propsArr: Array<[string, any]> = Object.entries(props)
  $.each(propsArr, (getProps: [string, any]) => {
    const [propertyI, valueI]: [string, any] = getProps
    if ($.typeOf(valueI, 'Object')) { // 更新方法 2021/12/07，解析 data-* 建構屬性內容
      const [propertyII, obj]: [string, Record<string, any>] = getProps
      const [[key, valueII]]: Array<[string, any]> = Object.entries(obj)
      el[propertyII][key] = valueII
    } else {
      el[propertyI] = $.typeOf(valueI, 'String') ? valueI.trim() : valueI
    }
  })
  return el
}

$.currencyTranser = (formatNumber, currencyType, withCurrencyStyle) => { // 更新方法 2022/06/24
  if ($.typeOf(formatNumber, 'Number')) {
    const currencyOptionalObj = !withCurrencyStyle ? {} : { style: 'currency', currency: currencyType }
    return new Intl.NumberFormat(currencyType || 'TWN', currencyOptionalObj).format(formatNumber)
  } else {
    $.console('error', 'First argument formatNumber type must use number.')
  }
}

$.formatDateTime = format => { // 更新方法 2021/12/01
  // #region 參數設定
  /**
       * @param {object}
       * {
       *   formatDate: Date || string || number,
       *   formatType:string, <= 取日期時間格式 yyyy-MM-dd HH:mm:ss 等方式
       *   toROCYear:boolean <= 輸出民國年，可選參數
       *   localCountryTime:number <= localCountryTime 根據時區格式化，預設為 GMT+8，可選參數
       *   toDateFullNumber <= toDateFullNumber 將當前格式化時間改為數字，可以用於排序上，可選參數
       *   customWeekItem <= customWeekItem 放入格式化文字日別，如 ['週一','週二',...'週日'] // 更新方法 2021/08/02
       * }
       * @returns {string | number}
       */
  // #endregion

  if (!($.findObjProperty(format, 'formatDate') || $.findObjProperty(format, 'formatType'))) {
    $.console('error', 'Please enter an object and use formatType property in the object.')
    return undefined as any
  }

  if ($.findObjProperty(format, 'customWeekItem')) {
    if (!($.typeOf(format.customWeekItem) === 'Array')) {
      $.console('error', 'customWeekItem property Must use array.')
      return
    }

    if (format.customWeekItem!.length <= 6 || format.customWeekItem!.length > 7) {
      $.console('error', 'customWeekItem property must put seven days name of week in array.')
      return
    }

    format.customWeekItem = [format.customWeekItem![format.customWeekItem!.length - 1], ...format.customWeekItem!].removeFirst()
  }

  const localCountryTime: number = ('localCountryTime' in format ? format.localCountryTime ?? 0 : 8) * 60 * 60 * 1000
  const dateStr: string = new Date($.typeOf(format.formatDate, 'Number') ? format.formatDate : +new Date(format.formatDate) + localCountryTime).toJSON()
  const dateSplit = dateStr.replace(/T/g, '-').replace(/:/g, '-').replace(/\./g, '-').replace(/Z/g, '').split('-')
  const [yearTemp, month, date, hour, minute, second, milliSecond] = dateSplit

  const year = format?.toROCYear ? (parseInt(yearTemp) - 1911).toString() : yearTemp // 更新方法 2023/03/08

  if ($.findObjProperty(format, 'toDateFullNumber')) return $.convert(dateSplit.join(''), 'number')

  // 更新是否格式化 AM 或 PM 2022/03/19

  if (format.formatType.match('tt')) {
    const currentAMorPM: string = $.convert<number>(hour, 'number')! > 11 ? 'PM' : 'AM'
    const transHour: string = ($.convert<number>(hour, 'number')! - 12) < 10 ? `0${$.convert<number>(hour, 'number')! - 12}` : $.convert($.convert<number>(hour, 'number')! - 12, 'string')!
    return format.formatType.replace(/yyyy/g, year).replace(/MM/g, month).replace(/dd/g, date).replace(/HH/g, transHour).replace(/mm/g, minute).replace(/ss/g, second).replace(/ms/g, milliSecond).replace(/tt/g, currentAMorPM)
  }

  if ($.findObjProperty(format, 'customWeekItem')) { // 更新客製化週數命名 2022/07/27
    return {
      fullDateTime: format.formatType.replace(/yyyy/g, year).replace(/MM/g, month).replace(/dd/g, date).replace(/HH/g, hour).replace(/mm/g, minute).replace(/ss/g, second).replace(/ms/g, milliSecond),
      getWeekName: format.customWeekItem![new Date(+new Date(format.formatDate)).getDay()]
    }
  }

  return format.formatType.replace(/yyyy/g, year).replace(/MM/g, month).replace(/dd/g, date).replace(/HH/g, hour).replace(/mm/g, minute).replace(/ss/g, second).replace(/ms/g, milliSecond)
}

$.rebuildObject = (obj, callback) => Object.fromEntries(Object.entries(obj).map(([keyName, value]) => callback.call(callback, keyName, value))) as any // 更新方法內容 2023/09/12

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class FetchClass { // 更新 FetchClass 類封裝方法內容 2022/03/24
  private static baseUrl: string = ''
  private static baseHeaders: Record<string, any> = {}

  static async fetchSetting <T, useXMLReq>(
    settingParams: fetchClassSettingParmasType<T>,
    usePromise: boolean
  ): Promise<
    (useXMLReq extends false ? fetchClassReturnType<T> : xhrReturnMethodType<T>) | any
    > {
    // 更新類 ajax 方法 2021/09/11
    // 更新類 ajax 方法內容 2021/10/21
    // #region 參數設定
    /**
           * @param {string} method
           * @param {string} url
           * @param {object} header 追加 hearder 物件 2021/10/21
           * @param {object} data
           * @param {object} routeParams 追加 routeParams 路由參數 2022/05/01
           * @param {object} queryParams 追加 queryParams 路由參數 2022/11/21
           * @param {string} contentType
           * @param {boolean} useFormData 追加 useFormData 是否使用 form 表屬性 2022/04/22
           * @param {boolean} useXMLHttpRequest 追加 useXMLHttpRequest 是否使用 XMLHttpRequest 2022/04/22
           * @param {number} timeout 追加 timeout 逾時請求處理參數 (單位毫秒 Ex:1000 = 1秒) 2023/03/08
           * @param {string} retunType 追加 retunType 回傳轉譯 2022/08/26
           * @param {Function} beforePost <= 回呼函式
           * @param {Function} successFn <= 回呼函式
           * @param {Function} excuteDone <= 回調函式 追加方法 2022/03/14
           * @param {Function} errorFn <= 回呼函式
           */
    // #endregion

    const settings: Record<string, any> = {}
    const { method, headers, contentType, useFormData, useXMLHttpRequest, returnType, data, routeParams, queryParams, timeout, beforePost, successFn, excuteDone, errorFn } = settingParams

    settings.method = method
    settingParams.url = this.baseUrl ? `${this.baseUrl}${settingParams.url}` : settingParams.url

    const returnTypeUse = returnType ?? 'json'

    if (method) {
      if (!$.includes(['get', 'post', 'patch', 'put', 'delete'], method.toLocaleLowerCase())) {
        $.console('error', 'Method value must use valid request method,like get、post ...')
        return
      }
    } else {
      $.console('error', 'Property name method is required in obejct parameters.')
      return
    }

    settingParams.useFormData = !!useFormData

    if (routeParams) {
      const [keyName] = $.objDetails(routeParams, 'keys')
      settingParams.url = `${settingParams.url}/${routeParams[keyName]}`
    }

    if (queryParams) {
      const querys = $.maps($.objDetails(queryParams, 'entries'), ([key, value]) => `${key}=${value}`).join('&')
      settingParams.url = `${settingParams.url}?${querys}`
    }

    if (($.objDetails(this.baseHeaders, 'keys')).length > 0 || (headers && $.objDetails(headers, 'keys').length > 0)) {
      settings.headers = $.objDetails(this.baseHeaders, 'keys').length > 0 ? this.baseHeaders : { 'Content-Type': 'application/json', ...headers }
    }

    if (data) {
      if (!useFormData) {
        settings.headers = $.objDetails(this.baseHeaders, 'keys').length > 0 ? this.baseHeaders : { 'Content-Type': contentType ?? 'application/json' }
        settings.body = $.convert(data, 'stringify')
      } else {
        settings.body = this.convertFormData(data)
      }
    }

    if (($.objDetails(this.baseHeaders, 'keys').length > 0 || headers) && data) {
      settings.headers = $.objDetails(this.baseHeaders, 'keys').length > 0 ? this.baseHeaders : { ...headers }
      settings.body = useFormData ? this.convertFormData(data) : $.convert(data, 'stringify')
    };

    if (!usePromise && !useXMLHttpRequest) {
      if (beforePost) {
        beforePost.call(beforePost)
      };

      if (!successFn) {
        $.console('error', 'Function Name successFn is required in obejct parameters.')
        return
      };

      if (!errorFn) {
        $.console('error', 'Function Name errorFn is required in obejct parameters.')
        return
      };
    }

    if (useXMLHttpRequest) {
      if (successFn) {
        $.console('error', 'successFn not necessary parameters.')
        return
      };

      if (errorFn) {
        $.console('error', 'errorFn not necessary parameters.')
        return
      };

      if (usePromise) {
        return this.XMLHttpRequest<T>({
          url: settingParams.url,
          method: settings.method,
          headers: settings.headers,
          data: settings.body
        })
      }

      return this.XMLHttpRequest<T>({
        url: settingParams.url,
        method: settings.method,
        headers: settings.headers,
        data: settings.body
      })
    }

    const abController = new AbortController()

    if (timeout) { // 更新 Request timeout 逾時請求處理 2023/03/08
      setTimeout(() => abController.abort(), timeout)
    }

    const res = await fetch(settingParams.url, timeout ? { ...settings, signal: abController.signal } : settings)

    if (usePromise) {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
      return await new Promise<fetchClassReturnType<T>>(async (resolve, reject) => {
        if (res.status >= 200 && res.status < 400) {
          const result: T = await (res as Record<string, any>)[returnTypeUse]()

          resolve({
            bodyUsed: res.bodyUsed,
            headers: res.headers,
            ok: res.ok,
            redirected: res.redirected,
            status: res.status,
            statusText: res.statusText,
            type: res.type,
            url: res.url,
            data: result
          } as fetchClassReturnType<T>)
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            bodyUsed: res.bodyUsed,
            headers: res.headers,
            ok: res.ok,
            redirected: res.redirected,
            status: res.status,
            statusText: res.statusText,
            type: res.type,
            url: res.url
          })
        };
      })
    } else {
      // 更新 Request 成功與錯誤回傳內容 2022/03/14
      try {
        if (res.status >= 200 && res.status < 400) {
          const result: T = await (res as Record<string, any>)[returnTypeUse]()

          successFn?.call(successFn, {
            bodyUsed: res.bodyUsed,
            headers: res.headers,
            ok: res.ok,
            redirected: res.redirected,
            status: res.status,
            statusText: res.statusText,
            type: res.type,
            url: res.url,
            data: result
          } as fetchClassReturnType<T>)

          // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
          excuteDone && excuteDone.call(excuteDone)
        } else {
          throw new Error(JSON.stringify({
            bodyUsed: res.bodyUsed,
            headers: res.headers,
            ok: res.ok,
            redirected: res.redirected,
            status: res.status,
            statusText: res.statusText,
            type: res.type,
            url: res.url
          }))
        };
      } catch (err: any) {
        errorFn?.call(errorFn, JSON.parse((err as Error).message))
      };
    }
  };

  private static XMLHttpRequest<T>(setting: { // 更新方法 XMLHttpRequest 2023/04/22
    url: string
    method: string
    headers: Record<string, any>
    data: XMLHttpRequestBodyInit
  }): xhrReturnMethodType<T> {
    const xhr = new XMLHttpRequest()

    xhr.open(setting.method, setting.url, true)

    if (setting?.headers) $.each($.objDetails(setting?.headers, 'entries'), ([key, value]) => xhr.setRequestHeader(key, value))

    return {
      xhrResponseResult: (callBack: (result: T) => void) => {
        xhr.onreadystatechange = () => {
          if (xhr.readyState === xhr.DONE && xhr.status >= 200 && xhr.status <= 399) {
            try {
              const result: T = JSON.parse(xhr.responseText)
              callBack.call(callBack, result)
            } catch (err) {
              $.console('error', err)
            }
          }

          if (xhr.status >= 400) {
            $.console('error', xhr.statusText)
          }
        }
      },
      xhrUploadProgress: (callBack: (p: number) => void) => {
        xhr.upload.onprogress = (event: ProgressEvent<EventTarget>) => {
          if (event.lengthComputable) {
            const uploadPercent = 100 * event.loaded / event.total
            callBack.call(callBack, uploadPercent)
          }
        }
      },
      xhrRequestStart: () => xhr.send(setting?.data || undefined)
    }
  }

  private static convertFormData (formDataObj: Record<string, any>): FormData {
    const formData = new FormData()

    $.each($.objDetails(formDataObj, 'entries'), ([key, value]) => formData.append(key === 'uploadFile' ? 'FileList' : key, value))

    return formData
  }

  static createBase ({ baseUrl, baseHeaders }: { baseUrl: string, baseHeaders: Record<string, any> }): void { // 更新 fetch 物件組態設定方法 2022/03/24
    // #region
    /** 參數設定
           * @param {string} baseUrl 固定網址，設定後網址後半部變動部分只須設定 url
           * @param {object} baseHeaders 固定使用的 headers 內容，如 token、Content-Type 之類的
           */
    // #endregion
    this.baseUrl = baseUrl
    this.baseHeaders = baseHeaders
  }
}

class FetchPromisClass extends FetchClass {
  // 更新 Promise 導出 get 方法 2022/05/01
  static get = async <T, useXMLReq>(url: string, setting?: fetchPromiseClassSettingParmasType): Promise<useXMLReq extends false ? fetchClassReturnType<T> : xhrReturnMethodType<T>> =>
    await this.fetchSetting<T, useXMLReq>({ method: 'get', url, ...setting }, true)

  // 更新 Promise 導出 post 方法 2022/05/01
  static post = async <T, useXMLReq>(url: string, setting: fetchPromiseClassSettingParmasType): Promise<useXMLReq extends false ? fetchClassReturnType<T> : xhrReturnMethodType<T>> =>
    await this.fetchSetting<T, useXMLReq>({ method: 'post', url, ...setting }, true)

  // 更新 Promise 導出 patch 方法 2022/05/01
  static patch = async <T, useXMLReq>(url: string, setting: fetchPromiseClassSettingParmasType): Promise<useXMLReq extends false ? fetchClassReturnType<T> : xhrReturnMethodType<T>> =>
    await this.fetchSetting<T, useXMLReq>({ method: 'patch', url, ...setting }, true)

  // 更新 Promise 導出 put 方法 2022/05/01
  static put = async <T, useXMLReq>(url: string, setting: fetchPromiseClassSettingParmasType): Promise<useXMLReq extends false ? fetchClassReturnType<T> : xhrReturnMethodType<T>> =>
    await this.fetchSetting<T, useXMLReq>({ method: 'put', url, ...setting }, true)

  // 更新 Promise 導出 delete 方法 2022/05/01
  static delete = async <T, useXMLReq>(url: string, setting: fetchPromiseClassSettingParmasType): Promise<useXMLReq extends false ? fetchClassReturnType<T> : xhrReturnMethodType<T>> =>
    await this.fetchSetting<T, useXMLReq>({ method: 'delete', url, ...setting }, true)
}

const fetchGroup: fetchGroupType = async (settingParams) => await FetchClass.fetchSetting(settingParams, false) // 更新 FetchClass 類方法導出 2022/03/24

// 更新 FetchClass 類方法導出，為 fetch 基礎組態設定 2022/03/24
fetchGroup.get = async (url, settingParams) => await FetchPromisClass.get(url, settingParams)

fetchGroup.post = async (url, settingParams) => await FetchPromisClass.post(url, settingParams)

fetchGroup.patch = async (url, settingParams) => await FetchPromisClass.patch(url, settingParams)

fetchGroup.put = async (url, settingParams) => await FetchPromisClass.put(url, settingParams)

fetchGroup.delete = async (url, settingParams) => await FetchPromisClass.delete(url, settingParams)

fetchGroup.createBase = (paramters) => FetchClass.createBase(paramters)

$.fetch = fetchGroup

// Origin class extends method
// Use in ESModule you can use to import prototype extends like import './Library.ts'
/* eslint no-extend-native: ["off", { "exceptions": ["Object"] }] */

declare global {
  interface JSON {
    deepCopy<T>(obj: T, weakMap: WeakMap<WeakKey, any>): T
  }

  interface Math {
    toFixedNum(setting: { value: string | number, toFloatPos: number }): (number | undefined)
  }

  interface String {
    format(formatStr: string, value: any[]):(string | undefined)
    appendText(txt: string): string
    appendDirection(direction: padDirection, pos: number, txt: string): string
    range(startPos: number, endPos: number): string
  }

  interface StringConstructor {
    toChartCode(str: string): number[]
  }

  interface Date {
    calculateFullDateTime(year?: number, month?: number, day?: number, hour?: number, minute?: number, second?: number):(Date | undefined)
    toOptionTimeZoneForISO(timeZone: number):(string | void)
    getLocalTimeZone(): number
  }

  interface DateConstructor { // 更新方法 2023/08/13
    formatCountingTime(format: { formatTimesTemp: number, formatType: string }): string
  }

  interface Array<T> { // 更新方法 2022/03/23
    append(item: T): void
    appendFirst(item: T): T[]
    remove(pos: number): T[]
    range(startPos: number, endPos: number): T[]
    removeFirst(): T[]
    removeLast(): T[]
    first(): T
    firstOrDefault(): T | undefined
  }

  interface Map<K, V> { // 更新方法 2022/08/02
    append(keyName: K, value: V): void
    getValue(keyName: K): any
    deleteKeyValue(keyName: K): boolean
    removeAll(): void
    isKeyInMap(keyName: K): boolean
    toObject(): Record<string, any>
  }

  interface Set<T> { // 更新方法 2022/08/02
    append(value: T): void
    deleteValue(value: T): boolean
    isValueInSet(value: T): boolean
    removeAll(): void
    toArray<T>(): T[]
  }

  interface Object { // 更新方法 2022/08/02
    toMap(obj: Record<string, any>): Map<string, any>
  }
}

JSON.deepCopy = (obj, weakMap = new WeakMap()) => {
  // 更新方法 2023/04/22
  // 提高深拷貝多樣性 2023/10/14
  if (
    obj === null ||
    typeof obj !== 'object' ||
    obj instanceof RegExp ||
    obj instanceof Date ||
    obj instanceof Function
  ) return obj

  if ((weakMap).has(obj)) return (weakMap).get(obj)

  if (Array.isArray(obj)) {
    let arrCopy: any[] = [];

    // eslint-disable-next-line @typescript-eslint/semi
    (weakMap).set(obj, arrCopy);

    arrCopy = $.createArray({ type: 'fake', item: { random: obj.length } }, index => JSON.deepCopy(obj[index], (weakMap)))!

    return arrCopy
  }

  const objCopy: Record<string, any> = {};
  // eslint-disable-next-line @typescript-eslint/semi
  (weakMap).set(obj, objCopy);

  $.objDetails(obj, 'keys').forEach(key => {
    if ($.findObjProperty(obj, key as string)) objCopy[key as string] = JSON.deepCopy((obj as Record<string, any>)[key as string], (weakMap))
  })

  return objCopy
}

Math.toFixedNum = setting => { // 更新方法 2023/02/07
  if (!setting || !('value' in setting) || !('toFloatPos' in setting)) {
    $.console('error', 'Please use object and with key value pair. ex: { value:100.1,toFloatPos:1 }')
    return
  }

  if (!$.typeOf(setting.toFloatPos, 'Number')) {
    $.console('error', 'toFloatPos key must use number.')
    return
  }

  return $.typeOf(setting.value, 'String') ? Number(parseFloat(setting.value as string).toFixed(setting.toFloatPos)) : Number((setting.value as number).toFixed(setting.toFloatPos))
}

String.prototype.appendText = function (txt) { return this.toString() + txt } // 更新方法 2022/06/24

String.prototype.appendDirection = function (direction, pos, txt) { return this[direction === 'left' ? 'padStart' : 'padEnd'](pos, txt) } // 更新方法 2023/02/07

String.prototype.range = function (startPos, endPos) { return this.toString().slice(startPos, endPos) } // 更新方法 2022/11/21

String.prototype.format = function (formatStr, ...values) { // 更新方法 2022/06/24
  if ($.typeOf(formatStr, 'String') && $.includes(formatStr, '{') && $.includes(formatStr, '}')) {
    if (formatStr.split('{').join('').split('}').length - 1 === values.length) {
      let formatStrTemp: string = formatStr

      const valuesTemp: Array<{ replaceKey: string, replaceValue: any }> = $.maps(values, (value: any, index: number) => ({ replaceKey: `{${index}}`, replaceValue: value }))

      const returnReplaceDoneStr: string = $.maps(valuesTemp, ({ replaceKey, replaceValue }: { replaceKey: string, replaceValue: any }) => {
        formatStrTemp = formatStrTemp.replace(replaceKey, replaceValue)
        return formatStrTemp
      }).range(valuesTemp.length - 1, valuesTemp.length).join('')

      return returnReplaceDoneStr
    } else {
      $.console('error', "Can't not find else aguments.")
    }
  } else {
    $.console('error', 'First paramter must use type string,if use string must like this ex：abc {0} efg {1}.')
  }

  return undefined
}

String.toChartCode = (str) => $.createArray({ type: 'fake', item: { random: str.length } }, (index) => str.charCodeAt(index))! // 更新方法 2023/05/31

Date.prototype.calculateFullDateTime = function (year, month, day, hour, minute, second) {
  // 更新方法內容與回傳內容 2021/09/22
  // 更新方法 2021/12/01
  // 改變回傳物件 2022/03/23
  // 改寫完整調適日期方式 2023/08/13

  const currentFullDateTime = this
  const calFullDateTime = new Date(currentFullDateTime)

  if (year) calFullDateTime.setFullYear(currentFullDateTime.getFullYear() + year)
  if (month) calFullDateTime.setMonth(currentFullDateTime.getMonth() + month)
  if (day) calFullDateTime.setDate(currentFullDateTime.getDate() + day)
  if (hour) calFullDateTime.setHours(currentFullDateTime.getHours() + hour)
  if (minute) calFullDateTime.setMinutes(currentFullDateTime.getMinutes() + minute)
  if (second) calFullDateTime.setSeconds(currentFullDateTime.getSeconds() + second)

  return calFullDateTime
}

Date.formatCountingTime = function ({ formatTimesTemp, formatType }) {
  // 更新方法 2023/08/13

  // #region 參數設定
  /**
   * @param {object} { formatTimesTemp: number,formatType:string ex:dd HH:mm:ss }
   * @returns {string}
   */
  // #endregion

  const addZero: (num: number) => string = num => num < 10 ? `0${num}` : `${num}`
  const timeRange = Math.abs(formatTimesTemp)
  const day = timeRange / (24 * 60 * 60 * 1000)
  const dayFix = Math.floor(day)
  const hour = (day - dayFix) * 24
  const hourFix = Math.floor(hour)
  const minute = (hour - hourFix) * 60
  const minuteFix = Math.floor((hour - hourFix) * 60)
  const secondesFix = Math.floor((minute - minuteFix) * 60)

  return formatType.replace(/dd/g, addZero(dayFix)).replace(/HH/g, addZero(hourFix)).replace(/mm/g, addZero(minuteFix)).replace(/ss/g, addZero(secondesFix))
}

Date.prototype.getLocalTimeZone = function () { return Math.abs(this.getTimezoneOffset() / 60) } // 更新方法 2023/02/07

Date.prototype.toOptionTimeZoneForISO = function (timeZone) {
  return timeZone ? new Date(+this + (timeZone * 60 * 60 * 1000)).toISOString() : $.console('error', 'Lost one parameter in function.') // 更新方法 2021/03/23
}

Array.prototype.append = function (item) { this.push(item) } // 更新方法 2021/03/23

Array.prototype.appendFirst = function (item) { this.unshift(item); return this } // 更新方法 2021/03/23

Array.prototype.remove = function (pos) { this.splice(pos, 1); return this } // 更新方法 2021/03/23

Array.prototype.range = function (startPos, endPos) { return this.slice(startPos, endPos) } // 更新方法 2021/03/23

Array.prototype.removeFirst = function () { this.shift(); return this } // 更新方法 2021/03/23

Array.prototype.removeLast = function () { this.pop(); return this } // 更新方法 2021/03/23

Array.prototype.first = function () { return this.range(0, 1)[0] } // 更新方法 2024/02/08

Array.prototype.firstOrDefault = function () { return this.range(0, 1).length > 0 ? this.range(0, 1)[0] : undefined } // 更新方法 2024/02/08

Map.prototype.append = function (keyName, value) { this.set(keyName, value) } // 更新方法 2022/08/02

Map.prototype.getValue = function (keyName) { return this.get(keyName) } // 更新方法 2022/08/02

Map.prototype.deleteKeyValue = function (keyName) { return this.delete(keyName) } // 更新方法 2022/08/02

Map.prototype.removeAll = function () { this.clear() } // 更新方法 2022/08/02

Map.prototype.isKeyInMap = function (keyName) { return this.has(keyName) } // 更新方法 2022/08/02

Map.prototype.toObject = function () { return Object.fromEntries(this) } // 更新方法 2022/08/02

Set.prototype.append = function (value) { this.add(value) } // 更新方法 2022/08/02

Set.prototype.deleteValue = function (value) { return this.delete(value) } // 更新方法 2022/08/02

Set.prototype.isValueInSet = function (value) { return this.has(value) } // 更新方法 2022/08/02

Set.prototype.removeAll = function () { this.clear() } // 更新方法 2022/08/02

Set.prototype.toArray = function () { return [...this] } // 更新方法 2022/08/02

// Object.prototype.toMap = function (obj) { return new Map(Object.entries(obj)) } // 更新方法 2022/08/02

export default $