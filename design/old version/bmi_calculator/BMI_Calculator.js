'use-strick'

let vals = {}
let data = $.localData("get","data")

const countCenter = ({ target:{ className,value } }) => {
    vals[className] = Number(value)

    vals.check = false

    const { height,weight } = vals

    const ruleItem = [{
        rule:(vals.height === undefined || vals.weight === undefined) && 0,
        ruleTxtH:"請輸入身高",
        ruleTxtW:"請輸入體重"
    },{
        rule:(vals.height === 0 || vals.weight === 0) && 1,
        ruleTxtH:"請輸入身高",
        ruleTxtW:"請輸入體重"
    },{
        rule:(vals.height > 201 || vals.height < 10) && 2,
        ruleTxt:"身高區間錯誤"
    },{
        rule:(vals.weight > 201 || vals.weight < 10) && 3,
        ruleTxt:"體重區間錯誤"
    }]

    const rulePos = $.findIndexOfObj(ruleItem,({ rule }) => typeof(rule) !== "boolean")
    
    vals.check = rulePos === -1

    if(rulePos === 0 || rulePos === 1){
        $(".height-check").texts(ruleItem[rulePos].ruleTxtH)
        $(".weight-check").texts(ruleItem[rulePos].ruleTxtW)
    }else if(rulePos === 2){
        $(".height-check").texts(ruleItem[rulePos].ruleTxt)
    }else if(rulePos === 3){
        $(".weight-check").texts(ruleItem[rulePos].ruleTxt)
    }else{
        $(".height-check").texts("格式正確")
        $(".weight-check").texts("格式正確")
    }

    const heightCount = (height / 100) * (height / 100);

    vals.bmi = Math.floor(weight / heightCount);
}

const makeSideText = bmiParmas => {
    const textGroupItem = [{
        refTxt:'過輕呦',
        colorClassTag:'pink',
        rule:bmiParmas < 18.5 && 0
    },{
        refTxt:'理想型',
        colorClassTag:'green',
        rule:(18.5 <= bmiParmas && bmiParmas < 24) && 1
    },{
        refTxt:'開始胖',
        colorClassTag:'orange-sm',
        rule:(24 <= bmiParmas && bmiParmas < 27) && 2
    },{
        refTxt:'輕度胖',
        colorClassTag:'orange-md',
        rule:(27 <= bmiParmas && bmiParmas < 30) && 3
    },{
        refTxt:'中度胖',
        colorClassTag:'orange-lg',
        rule:(30 <= bmiParmas && bmiParmas < 35) && 4
    },{
        refTxt:'幸福胖',
        colorClassTag:'red',
        rule:bmiParmas >= 35 && 5
    }]

    const rulePos = $.findIndexOfObj(textGroupItem,({ rule }) => typeof(rule) !== "boolean")

    return textGroupItem[rulePos]
}

const addItem = () => {
    const { height,weight,bmi,check } = vals

    if(!check) return

    const { refTxt,colorClassTag } = makeSideText(bmi)

    const collectObj = {
        refTxt:refTxt,
        colorClassTag:colorClassTag,
        height:height,
        weight:weight,
        bmi:bmi,
        timesTemp:$.formatDateTime({ formatDate:+new Date(),formatType:'yyyy-MM-dd HH:mm:ss' })
    }

    data = [collectObj,...data]

    $.localData("set","data",data)

    renderItem(data)

    $(".height").val("")
    $(".weight").val("")
    $(".height-check").texts("請輸入身高")
    $(".weight-check").texts("請輸入體重")

    $(".render-data-outer").addClass("active")

    vals = {}
}

const renderItem = dataCath => {
    let str = ""
    if(dataCath.length > 0){
        str = $.maps(dataCath,(item,index) => `
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

const deleteItem = (time,currentIndex) => {
    const index = $.findIndexOfObj(data,({timesTemp}) => timesTemp === time)
    if(data.length > 1){
        $($(".list-item")[currentIndex]).addClass("delete-active")
        setTimeout(()=>$($(".list-item")[currentIndex]).styles("set","margin",`-${$($(".list-item")[currentIndex]).props("offsetHeight") / 2}px 0`),650)
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

const toggleDisplay = ({ className },index) => {
    const currentClassName = className === "ref-btn" ? ".ref-content" : ".delete-content"
    const classNameTemp =  data.length > 1 ? $($(currentClassName)[index]).attr("class") : $(currentClassName).attr("class")
    const haveOtherClass = $.indexOf(classNameTemp,"active")
    if(data.length > 1){
        haveOtherClass === -1 ? $($(currentClassName)[index]).addClass("active"):$($(currentClassName)[index]).removeClass("active")
        haveOtherClass === -1 ? $($(`.${className}`)[index]).texts("關閉"):$($(`.${className}`)[index]).texts(className === "ref-btn" ? "參考指標":"刪除")
    } else {
        haveOtherClass === -1 ? $(currentClassName).addClass("active"):$(currentClassName).removeClass("active")
        haveOtherClass === -1 ? $(`.${className}`).texts("關閉"):$(`.${className}`).texts(className === "ref-btn" ? "參考指標":"刪除")
    }
}

const toggleData = () => {
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
    setTimeout(()=>$(".input-group").addClass("input-group-active"),700)
    setTimeout(()=>$(".add-btn").addClass("add-btn-active"),1400)
    renderItem(data)
})