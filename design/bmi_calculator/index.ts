import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.scss'
import './lib/Library'
import $ from './lib/Library'

interface collectObjType {
    refTxt:string,
    colorClassTag:string,
    height:number,
    weight:number,
    bmi:number,
    timesTemp:string
}

declare global {
    interface Window {
        deleteItem(time:string,currentIndex:number):void
        toggleDisplay(dom:HTMLDivElement,currentIndex:number):void
    }
}

let vals:{
    height?:number,
    weight?:number,
    check?:boolean,
    bmi?:number
} = {}

let data = $.localData("get","data") as collectObjType[]

const countCenter = ({ target:{ className,value } }:{ target:HTMLInputElement }) => {
    const isNumber = new RegExp('^[0-9]*$').test(value);

    if(!isNumber) return
    
    (vals as {[key:string]:any})[className] = parseInt(value)

    vals.check = false

    const { height,weight } = vals

    const ruleItem:{[key:string]:{ ruleTxtH:string,ruleTxtW:string } | undefined} | { ruleTxtH:string,ruleTxtW:string } | undefined = {
        [`${!height || !weight}`]:{
            ruleTxtH:"請輸入身高",
            ruleTxtW:"請輸入體重"
        },
        [`${height === 0 || weight === 0}`]:{
            ruleTxtH:"請輸入身高",
            ruleTxtW:"請輸入體重"
        },
        [`${height! > 201 || height! < 10}`]:{
            ruleTxtH:"身高區間錯誤",
            ruleTxtW:''
        },
        [`${weight! > 201 || weight! < 10}`]:{
            ruleTxtH:'',
            ruleTxtW:"體重區間錯誤"
        },
        [`${height && weight}`]:undefined
    }['true']

    if(ruleItem){
        const { ruleTxtH,ruleTxtW } = ruleItem
        $(".height-check").texts(ruleTxtH)
        $(".weight-check").texts(ruleTxtW)
        vals.check = false

        return
    } else {
        $(".height-check").texts("格式正確")
        $(".weight-check").texts("格式正確")

        vals.check = true
    }

    vals.bmi = Math.floor(weight! / ((height! / 100) * (height! / 100)));
}

const makeSideText:(bmiParams:number) => { refTxt:string,colorClassTag:string } = bmiParams => ({
    [`${bmiParams < 18.5}`]:{
        refTxt:'過輕呦',
        colorClassTag:'pink',
    },
    [`${18.5 <= bmiParams && bmiParams < 24}`]:{
        refTxt:'理想型',
        colorClassTag:'green',
    },
    [`${24 <= bmiParams && bmiParams < 27}`]:{
        refTxt:'開始胖',
        colorClassTag:'orange-sm'
    },
    [`${27 <= bmiParams && bmiParams < 30}`]:{
        refTxt:'輕度胖',
        colorClassTag:'orange-md'
    },
    [`${30 <= bmiParams && bmiParams < 35}`]:{
        refTxt:'中度胖',
        colorClassTag:'orange-lg'
    },
    [`${bmiParams >= 35}`]:{
        refTxt:'幸福胖',
        colorClassTag:'red'
    }
})['true']

const addItem = () => {
    const { height,weight,bmi,check } = vals

    if(!check) return

    const { refTxt,colorClassTag } = makeSideText(bmi!)

    data = [{
        refTxt:refTxt,
        colorClassTag:colorClassTag,
        height:height!,
        weight:weight!,
        bmi:bmi!,
        timesTemp:$.formatDateTime({ formatDate:new Date(),formatType:'yyyy-MM-dd HH:mm:ss' }) as string
    },...data]

    $.localData("set","data",data)

    renderItem(data);

    (document.querySelector(".height") as HTMLInputElement).value = "";
    (document.querySelector(".weight") as HTMLInputElement).value = ""
    $(".height-check").texts("請輸入身高")
    $(".weight-check").texts("請輸入體重")

    $(".render-data-outer").addClass("active")

    vals = {}
}

const renderItem:(dataCath:collectObjType[]) => void = dataCath => {
    let str = ""
    if(dataCath.length > 0){
        str = $.maps(dataCath,(item:collectObjType,index) => `
            <div class="list-item ${item.colorClassTag}">
                <div class="row no-gutters">
                    <div class="col-md-9">
                        <div class="row no-gutters pos">
                            <div class="col-md-2">
                                <span>${item.refTxt}</span>
                            </div>
                            <div class="col-md-2">
                                <span>BMI值 <span>${item.bmi}</span><span>
                            </div>
                            <div class="col-md-2">
                                <span>身高 <span>${item.height} CM</span></span>
                            </div>
                            <div class="col-md-2">
                                <span>體重 <span>${item.weight} KG</span></span>
                            </div>
                            <div class="col-md-4">
                                <span>${item.timesTemp}</span>
                            </div>
                            <div class="ref-content">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div>
                                            <span ${makeSideText(item.bmi).refTxt === "過輕呦" ? "class='math-val'":""}>BMI ＜ 18.5 過輕呦</span>
                                            <span ${makeSideText(item.bmi).refTxt === "理想型" ? "class='math-val'":""}>18.5 ≦ BMI ＜ 24 理想型</span>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div>
                                            <span ${makeSideText(item.bmi).refTxt === "開始胖" ? "class='math-val'":""}>24 ≦ BMI ＜ 27 開始胖</span>
                                            <span ${makeSideText(item.bmi).refTxt === "輕度胖" ? "class='math-val'":""}>27 ≦ BMI ＜ 30 輕度胖</span>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div>
                                            <span ${makeSideText(item.bmi).refTxt === "中度胖" ? "class='math-val'":""}>30 ≦ BMI ＜ 35 中度胖</span>
                                            <span ${makeSideText(item.bmi).refTxt === "幸福胖" ? "class='math-val'":""}>BMI ≧ 35 幸福胖</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="delete-content">
                                <div class="title">確定要刪除此筆紀錄？</div>
                                <div class="row no-gutters">
                                    <div class="col-12">
                                        <div class="confirm" onclick="deleteItem('${item.timesTemp}',${index})">確定</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="side-btn-group">
                            <div class="row no-gutters">
                                <div class="col-6">
                                    <div class="ref-btn" onclick="toggleDisplay(this,${index})">參考指標</div>
                                </div>
                                <div class="col-6">
                                    <div class="delete-btn" onclick="toggleDisplay(this,${index})">刪除</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join("")
    }else{
        str = "<div class='no-data-outer'><div class='no-data'>-- 目前無檢測紀錄 --</div></div>"
    }
    
    $(".render-data").html(str)
}

window.deleteItem = (time,currentIndex) => {
    const index = $.findIndexOfObj(data,({ timesTemp }:collectObjType) => timesTemp === time)
    if(data.length > 1){
        $(($(".list-item") as unknown as HTMLDivElement[])[currentIndex]).addClass("delete-active")
        setTimeout(()=>$(($(".list-item") as unknown as HTMLDivElement[])[currentIndex]).styles("set","margin",`-${$(($(".list-item") as unknown as HTMLDivElement[])[currentIndex]).props("offsetHeight") / 2}px 0`),650)
    } else {
        $(".list-item").addClass("delete-active")
        setTimeout(()=>$(".list-item").styles("set","margin",`-${$(".list-item").props("offsetHeight") / 2}px 0`),650)
    }
    
    setTimeout(()=>{
        data.splice(index,1)
        $.localData("set","data",data)
        renderItem($.localData("get","data"))
    },1650)
}

window.toggleDisplay = ({ className },index) => {
    const currentClassName = className === "ref-btn" ? ".ref-content" : ".delete-content"
    const classNameTemp =  data.length > 1 ? $(($(currentClassName) as unknown as HTMLDivElement[])[index]).attr("class") : $(currentClassName).attr("class")
    const haveOtherClass = $.indexOf(classNameTemp,"active")
    if(data.length > 1){
        haveOtherClass === -1 ? $(($(currentClassName) as unknown as HTMLDivElement[])[index]).addClass("active"):$(($(currentClassName) as unknown as HTMLDivElement[])[index]).removeClass("active")
        haveOtherClass === -1 ? $(($(`.${className}`) as unknown as HTMLDivElement[])[index]).texts("關閉"):$(($(`.${className}`) as unknown as HTMLDivElement[])[index]).texts(className === "ref-btn" ? "參考指標":"刪除")
    } else {
        haveOtherClass === -1 ? $(currentClassName).addClass("active"):$(currentClassName).removeClass("active")
        haveOtherClass === -1 ? $(`.${className}`).texts("關閉"):$(`.${className}`).texts(className === "ref-btn" ? "參考指標":"刪除")
    }
}

const toggleData:() => void = () => {
    const classNameTemp = $(".render-data-outer").attr("class")
    const haveOtherClass = $.indexOf(classNameTemp,"active")
    $(".render-data-outer")[haveOtherClass === -1 ? 'addClass':'removeClass']("active")
}

$(document).useMounted(() => {
    $(".height").listener("input",countCenter);
    $(".weight").listener("input",countCenter);
    $(".add-btn").listener("click",addItem);
    $(".toggle-data-btn").listener("click",toggleData);
    $(".title").addClass("title-active")
    setTimeout(()=>$(".input-groups").addClass("input-group-active"),700)
    setTimeout(()=>$(".add-btn").addClass("add-btn-active"),1400)
    renderItem(data)
    data.length > 0 && toggleData()
})