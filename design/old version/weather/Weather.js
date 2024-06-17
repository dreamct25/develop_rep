const obj = {}
obj.jsonData = [];
obj.jsonBlockData = [];
obj.filterWeatherState = []
obj.renderWeatherTemp = []
obj.renderCount = 0

const loadingAnimate = state => {
    if (state == true) {
        $(".loading-outer").addClass("loading-outer-toggle")
        $(".loading-text").texts("Loading")
    } else {
        $(".loading-text").texts("Completed")
        setTimeout(() => $(".loading-outer").removeClass("loading-outer-toggle"), 1000)
        setTimeout(() => {
            $(".select-group").removeClass("select-toggle")
            $(".other-block").removeClass("other-block-toggle")
        }, 3010)
    }
}

const getData = async () => {
    loadingAnimate(true)
    for (let x = 1; x <= 85; x += 4) {
        let orders = x <= 9 ? "00" : "0"
        await $.fetch({
            method:"get",
            url:`https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-093/?Authorization=CWB-6BEED9AA-24B5-4569-BB51-FC0BCFA7595B&locationId=F-D0047-${orders}${x}`,
            successFn:({ data }) => {
                $.each(data.records.locations,items => {
                    const arrayTemp = $.maps(items.location,itemL => ({
                        blockGeoCode: itemL.geocode,
                        blockName: itemL.locationName,
                        blockLat: itemL.lat,
                        blockLon: itemL.lon,
                        blockElement: itemL.weatherElement
                    }))

                    obj.jsonBlockData.push({
                        locationsName: items.locationsName,
                        block: $.sort(arrayTemp,(a, b) => a.blockGeoCode - b.blockGeoCode)
                    })
                })
            },
            errorFn:err => alert(err.statusText)
        })
    }

    await $.fetch({
        method:"get",
        url:"https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-6BEED9AA-24B5-4569-BB51-FC0BCFA7595B",
        successFn: ({ data }) => {
            const jsonDataTemp = $.maps(data.records.locations[0].location,items => items)
            cityType(jsonDataTemp)
        },
        excuteDone:() => loadingAnimate(false),
        errorFn:err => alert(err.statusText)
    })
}

const cityType = arry => {
    let arrySort = []
    let cityTagTemp = []
    $(".current-select").texts("-- 請選擇欲查詢縣市氣象 --")
    arrySort = $.sort(arry,(a, b) => b.lon - a.lon)
    $.each(arrySort,(key, index) => {
        obj.jsonData.push(key)
        cityTagTemp.push(`<span class="city-name" data-num="${index}" onclick="selectCityPart(this)">${key.locationName}</span>`)
    })
    $(".select-city").html(cityTagTemp.join(""))
    $.each(obj.jsonData,item => 
        $.each(obj.jsonBlockData,itemBlock => {
            if(item.locationName === itemBlock.locationsName) item.block = itemBlock.block
        })
    )
}

const scrolls = () => $('html').scrollToTop({ scrollTop:0,duration:3000 })

const changeMoring = () => {
    $(".background-text").texts('Moring')
    $(".header").addClass("header-moring").removeClass("header-night")
    $('html').removeClass('night').addClass('moring')
    $(".background-controller").removeClass('background-controller-toggle')
    $('.circle').removeClass('circle-toggle')
}

const changeNight = () => {
    $(".background-text").texts('Night')
    $(".header").addClass("header-night").removeClass("header-moring")
    $('html').addClass('night').removeClass('moring')
    $(".background-controller").addClass('background-controller-toggle')
    $('.circle').addClass('circle-toggle')
}

// 設定背景圖隨畫面時間不同更換背景圖
const backgroundChange = currentVal => {
    if (currentVal == 'global') {
         new Date().getHours() >= 6 &&  new Date().getHours() <= 17 ? changeMoring() : changeNight()
        return
    } else {
        const haveMoringClass = $.indexOf($('html').attr('class').split(" "),"moring")
        haveMoringClass != -1 ? changeNight() : changeMoring()
    }
}

const switchTopBar = () => {
    let height = document.documentElement.scrollTop || document.body.scrollTop;
    const heightI = height > 28 ? 'addClass':'removeClass'
    const heightII = height > 28 ? 'addClass':'removeClass'
    $('.header')[heightI]('header-toggle')
    $('.go-top')[heightII]('go-top-toggle')
}

// 畫面時間內容設定
const time = () => {
    $(".date").texts($.formatDateTime({ formatDate:+new Date(),formatType:'yyyy-MM-dd' }))
    $(".time").texts($.formatDateTime({ formatDate:+new Date(),formatType:'HH:mm:ss' }))
}

const selectCityPart = element => {
    $(".current-select").texts(element.textContent)
    
    $.each($(".city-name"),item => $(item).attr("data-num") === $(element).attr("data-num") ? $(item).addClass("selected") : $(item).removeClass("selected"))
    
    setTimeout(() => selectAnimate(element), 700)
    setTimeout(() => selectCity(element), 2100)
}

function selectCity(currentTaget) {
    let currentTagetTemp = currentTaget.className == undefined ? currentTaget.target.className : currentTaget.className
    switch (currentTagetTemp) {
        case "city-name selected":
            obj.filterWeatherState = $.filter(obj.jsonData,key => key.locationName === currentTaget.textContent)
            renderList(false)
            chooseDayBtn()
            break;
        case "other-block":
            renderList(true)
            chooseBlockBtn()
            break;
    }
    $(".select-group").toggleClass("select-toggle")
    $(".other-block").toggleClass("other-block-toggle")
    setTimeout(() => $(".option-group").toggleClass("option-group-toggle"), 701)

}

const addTempSign = text => `${text}&degC`

const addPercent = text => `${text}%`

const transWeatherIcon = text => {
    let transText = ""
    const iconsItem = [{
        num: 1,
        icon: '<i class="fas fa-sun"></i>'
    }, {
        num: 2,
        icon: '<i class="fas fa-sun-cloud"></i>'
    }, {
        num: 3,
        icon: '<i class="fas fa-clouds-sun"></i>'
    }, {
        num: 7,
        icon: '<i class="fas fa-clouds"></i>'
    }, {
        num: 8,
        icon: '<i class="fas fa-cloud-showers-heavy"></i>'
    }]
    $.each(iconsItem,key => {
        if (key.num == Number(text)) {
            transText = key.icon
        } else if (Number(text) >= 4 && Number(text) <= 7 && key.num >= 4 && key.num <= 7) {
            transText = key.icon
        } else if (Number(text) >= 8 && key.num >= 8) {
            transText = key.icon
        }
    })
    return transText
}

const dateTrans = time => {
    const browserVersion = navigator.userAgent.toLowerCase().indexOf('chrome')
    const replaceWord = browserVersion === -1 ? '/' : '-'
    time = time.replace(/-/g,replaceWord)
    const [year,month,date,hour] = new Date(+new Date(time) + (8*60*60*1000)).toJSON().replace(/T/g,'-').replace(/:/g,'-').split('.')[0].split('-')
    return { year:year,month:month,date:date,hour:hour}
}

const today = (renderWeather, order) => {
    const [{ locationName,block,weatherElement }] = obj.filterWeatherState
    const [rainPercent,equalTemp,wetEqualPercent,comferMinPercent,,maxFeelTemp,weatherSignState,comferMaxPercent,minTemp,uiv,weatherDesc,minFeelTemp,maxTemp] = weatherElement

    renderWeather.push({
        cityName: locationName,
        minTemp: addTempSign(minTemp.time[0].elementValue[0].value),
        maxTemp: addTempSign(maxTemp.time[0].elementValue[0].value),
        minFeelTemp: addTempSign(minFeelTemp.time[0].elementValue[0].value),
        maxFeelTemp: addTempSign(maxFeelTemp.time[0].elementValue[0].value),
        equalTemp: addTempSign(equalTemp.time[0].elementValue[0].value),
        comferMinPerc: addPercent(comferMinPercent.time[0].elementValue[0].value),
        comferMaxPerc: addPercent(comferMaxPercent.time[0].elementValue[0].value),
        rainNightPerc: addPercent(rainPercent.time[0].elementValue[0].value),
        rainMoringPerc: addPercent(rainPercent.time[1].elementValue[0].value),
        uivLevel: uiv.time[0].elementValue[0].value,
        uivDesc: uiv.time[0].elementValue[1].value,
        wetEqualPerc: addPercent(wetEqualPercent.time[0].elementValue[0].value),
        weatherSign: weatherSignState.time[0].elementValue[0].value,
        weatherSignState: transWeatherIcon(weatherSignState.time[1].elementValue[0].value),
        weatherNightDesc: weatherDesc.time[1].elementValue[0].value,
        weatherMoringDesc:weatherDesc.time[0].elementValue[0].value,
        areaBlock: block
    })

    obj.renderWeatherTemp = renderWeather
    renderView(renderWeather, order)
}

const tomorrow = (renderWeather, order) => {
    const [{ locationName,block,weatherElement }] = obj.filterWeatherState
    const [rainPercent,equalTemp,wetEqualPercent,comferMinPercent,,maxFeelTemp,weatherSignState,comferMaxPercent,minTemp,uiv,weatherDesc,minFeelTemp,maxTemp] = weatherElement

    renderWeather.push({
        cityName: locationName,
        minTemp: addTempSign(minTemp.time[3].elementValue[0].value),
        maxTemp: addTempSign(maxTemp.time[2].elementValue[0].value),
        minFeelTemp: addTempSign(minFeelTemp.time[2].elementValue[0].value),
        maxFeelTemp: addTempSign(maxFeelTemp.time[2].elementValue[0].value),
        equalTemp: addTempSign(equalTemp.time[2].elementValue[0].value),
        comferMinPerc: addPercent(comferMinPercent.time[2].elementValue[0].value),
        comferMaxPerc: addPercent(comferMaxPercent.time[2].elementValue[0].value),
        rainNightPerc: addPercent(rainPercent.time[2].elementValue[0].value),
        rainMoringPerc: addPercent(rainPercent.time[3].elementValue[0].value),
        uivLevel: uiv.time[1].elementValue[0].value,
        uivDesc: uiv.time[1].elementValue[1].value,
        wetEqualPerc: addPercent(wetEqualPercent.time[2].elementValue[0].value),
        weatherSign: weatherSignState.time[1].elementValue[0].value,
        weatherSignState: transWeatherIcon(weatherSignState.time[1].elementValue[1].value),
        weatherNightDesc: weatherDesc.time[3].elementValue[0].value,
        weatherMoringDesc: weatherDesc.time[2].elementValue[0].value,
        areaBlock: block
    })

    obj.renderWeatherTemp = renderWeather
    renderView(renderWeather, order)
}

const week = (renderWeather, order) => {
    let moringTemp = []
    let nightTemp = []
    $.each(obj.filterWeatherState,(key => {
        for (var x = 0; x < key.weatherElement[8].time.length; x++) {
            const { month,date,hour } = dateTrans(key.weatherElement[8].time[x].startTime)
            if (hour == 6) {
                moringTemp.push({
                    date: `${month}-${date}`,
                    weatherDesc: key.weatherElement[6].time[x].elementValue[0].value,
                    minTemp: key.weatherElement[8].time[x].elementValue[0].value,
                    maxTemp: key.weatherElement[12].time[x].elementValue[0].value,
                    rainPerc: key.weatherElement[0].time[x].elementValue[0].value
                })
            } else if (hour == 18) {
                nightTemp.push({
                    date: `${month}-${date}`,
                    weatherDesc: key.weatherElement[6].time[x].elementValue[0].value,
                    minTemp: key.weatherElement[8].time[x].elementValue[0].value,
                    maxTemp: key.weatherElement[12].time[x].elementValue[0].value,
                    rainPerc: key.weatherElement[0].time[x].elementValue[0].value
                })
            }
        }
    }))

    renderWeather.push({
        cityName: obj.filterWeatherState[0].locationName,
        moring: moringTemp,
        night: nightTemp
    })
    renderView(renderWeather, order)
}

const weekBlock = (renderWeather, filterCurrentCity, text) => {
    let moringTemp = []
    let nightTemp = []
    $.each(filterCurrentCity,(key => {
        for (let x = 0; x < key.weatherElement[8].time.length; x++) {
            const { month,date,hour } = dateTrans(key.weatherElement[8].time[x].startTime)
            if (hour == 6) {
                moringTemp.push({
                    date: `${month}-${date}`,
                    weatherDesc: key.weatherElement[6].time[x].elementValue[0].value,
                    minTemp: key.weatherElement[8].time[x].elementValue[0].value,
                    maxTemp: key.weatherElement[12].time[x].elementValue[0].value,
                    rainPerc: key.weatherElement[0].time[x].elementValue[0].value
                })
            } else if (hour == 18) {
                nightTemp.push({
                    date: `${month}-${date}`,
                    weatherDesc: key.weatherElement[6].time[x].elementValue[0].value,
                    minTemp: key.weatherElement[8].time[x].elementValue[0].value,
                    maxTemp: key.weatherElement[12].time[x].elementValue[0].value,
                    rainPerc: key.weatherElement[0].time[x].elementValue[0].value
                })
            }
        }
    }))
    renderWeather.push({
        cityName: obj.filterWeatherState[obj.renderCount].locationName,
        moring: moringTemp,
        night: nightTemp
    })
    renderBlockView(renderWeather, text)
}

const renderCurrentCity = lengthCount => {
    let text = ""
    let filterCurrentCity = []
    let renderWeather = []
    for (let x = 0; x <= obj.filterWeatherState.length; x++) {
        if (obj.renderCount == x) filterCurrentCity.push(obj.filterWeatherState[x])
    }
    text = `
    <div class="city-name-title-switch">
        <i class="fas fa-chevron-left arrow-left" onclick="renderCountCenter(this,${lengthCount})"></i>
            <div class="city-name-outer">
                <div class="city-name">${obj.filterWeatherState[obj.renderCount].locationName}</div>
            </div>
        <i class="fas fa-chevron-right arrow-right" onclick="renderCountCenter(this,${lengthCount})"></i>
    </div>`
    weekBlock(renderWeather, filterCurrentCity, text)
}

function chooseDayBtn() {
    let renderWeather = []
    const dayBtnItem = [{
        order: 0,
        fn: order => today(renderWeather, order)
    }, {
        order: 1,
        fn: order => tomorrow(renderWeather, order)
    }, {
        order: 2,
        fn: order => week(renderWeather, order)
    }]
    chooseAnimate(dayBtnItem, this)
}

function chooseBlockBtn() {
    const northCode = [10002000, 10017000, 65000000, 63000000, 68000000, 10004000, 10018000, 10005000]
    const middleCode = [66000000, 10007000, 10009000, 10008000]
    const southCode = [10010000, 10020000, 67000000, 64000000, 10013000]
    const eastCode = [10015000, 10014000]
    const outeCode = [09007000, 09020000, 10016000]
    const blockBtnItem = [{
        order: 0,
        fn: () => chooseArea(northCode)
    }, {
        order: 1,
        fn: () => chooseArea(middleCode)
    }, {
        order: 2,
        fn: () => chooseArea(southCode)
    }, {
        order: 3,
        fn: () => chooseArea(eastCode)
    }, {
        order: 4,
        fn: () => chooseArea(outeCode)
    }]
    chooseAnimate(blockBtnItem, this)
}

const chooseArea = cityCode => {
    obj.renderCount = 0
    obj.filterWeatherState = []
    $.each(cityCode,(code => $.each(obj.jsonData,(key => code == key.geocode && obj.filterWeatherState.push(key)))))
    renderCurrentCity(cityCode.length)
}

const chooseAnimate = (array, element) => {
    $.each(array,(key => {
        if (element == window) {
            if (key.order == 0) {
                $($(".btn-session")[key.order]).addClass("btn-session-active")
                key.fn(key.order)
            }
            return
        }

        if (key.order == element.dataset.order) {
            $(element).addClass("btn-session-active")
            key.fn(key.order)
        } else {
            $($(".btn-session")[key.order]).removeClass("btn-session-active")
        }
    }))
}

const selectAnimate = element => {
    const currentElement = element.target == undefined ? ".current-select" : element.target
    const haveClass = $.indexOf($(currentElement).attr('class'),"current-select-toggle")
    if (haveClass == -1) {
        $(currentElement).addClass("current-select-toggle")
        $(".select-group").addClass("select-group-action")
        $(".other-block").addClass("other-block-action")
        setTimeout(() => {
            $(".select-city-outer").addClass("select-city-toggle")
            $(".arrow").addClass("arrow-toggle")
        }, 700)
    } else {
        $(".select-city-outer").removeClass("select-city-toggle")
        $(".arrow").removeClass("arrow-toggle")
        setTimeout(() => {
            $(".select-group").removeClass("select-group-action")
            $(".other-block").removeClass("other-block-action")
            $(currentElement).removeClass("current-select-toggle")
        }, 700)
    }

}

const weatherOuterAnimate = state => {
    if (state == true) {
        $(".weathers-outer").addClass("weathers-outer-active")
        $(".weathers-outer").styles('set','margin-top','0px')
    } else {
        $(".weathers-outer").styles('set','margin-top',`-${$(".weathers-outer").props('offsetHeight')}px`)
        $(".weathers-outer").removeClass("weathers-outer-active")
    }
}

const showBlockSelectAnimate = element => {
    $(element).toggleClass("block-select-outer-toggle")
    $(".block-has-select-title .arrow").toggleClass("arrow-toggle")
}

const renderList = state => {
    let domObject = ""
    const btnItem = [{
        matchSwitch: false,
        btnText: "目前天氣",
    }, {
        matchSwitch: false,
        btnText: "明日天氣",
    }, {
        matchSwitch: false,
        btnText: "一週天氣",
    }, {
        matchSwitch: true,
        btnText: "北部",
    }, {
        matchSwitch: true,
        btnText: "中部",
    }, {
        matchSwitch: true,
        btnText: "南部",
    }, {
        matchSwitch: true,
        btnText: "東部",
    }, {
        matchSwitch: true,
        btnText: "外島",
    }]

    domObject = $.maps(btnItem,(item => { if(item.matchSwitch == state){ return `<div class="btn-session">${item.btnText}</div>`} })).join('')
    $(".btn-session-group").html(domObject)
    $.each($(".btn-session"),(item, index) => $(item).attr("data-order", index))
    setTimeout(() => weatherOuterAnimate(true), 1401)
    $.each($(".btn-session"),item => item.addEventListener("click", state == false ? chooseDayBtn : chooseBlockBtn))
}

const renderCountCenter = (element, lengthCount) => {
    if ($.indexOf($(element).attr('class'),"arrow-left") !==  -1) {
        obj.renderCount == 0 ? obj.renderCount = (lengthCount - 1) : obj.renderCount--
    } else {
        obj.renderCount == (lengthCount - 1) ? obj.renderCount = 0 : obj.renderCount++
    }
    renderCurrentCity(lengthCount)
}

const currentBlockChoose = (element, ...items) => {
    const [array, order, cityName, equalTemp, uivLevel, uivDesc] = items
    if (cityName != undefined && equalTemp != undefined && uivLevel != undefined && uivDesc != undefined) {
        let blockFilterArray = $.filter(array,item => item.blockName == $(element).texts())
        let blockArray = order == 0 ? todayBlock(blockFilterArray, array, cityName, equalTemp, uivLevel, uivDesc) : tomorrowBlock(blockFilterArray, array, cityName, equalTemp, uivLevel, uivDesc)
        setTimeout(() => renderView(blockArray, order, $(element).texts()), 700)
    } else {
        setTimeout(() => renderView(array, order, $(element).texts()), 700)
    }
    setTimeout(() => $.each($(".block-select span"),item => item.dataset.num == element.dataset.num ? $(item).addClass("block-selected") : $(item).removeClass("block-selected")), 702)

    $(".block-has-select-title span").texts($(element).texts())
}

const currentTimeMatch = (datas, hasMax) => {
    let filterMaxArray = []
    const currentDate = new Date().getFullDateTime({ formatType:'date' })
    const currentTime = new Date().getFullDateTime({ formatType:'time' })
    let timeSelectCount = Number(currentTime.split("：")[0]) >= 18 ? 0 : 1
    
    $.each(datas,key => key.dataTime.split(' ')[0] == currentDate && filterMaxArray.push(key))
    return hasMax == true ? filterMaxArray[0 + timeSelectCount].elementValue[0].value : filterMaxArray[1 - timeSelectCount].elementValue[0].value
}

const todayBlock = (...items) => {
    let blockArrayTemp = []
    const [blockFilterArray, array, cityName, equalTemp, uivLevel, uivDesc] = items
    $.each(blockFilterArray,(key => {
        blockArrayTemp.push({
            cityName: cityName,
            minTemp: addTempSign(currentTimeMatch(key.blockElement[3].time, false)),
            maxTemp: addTempSign(currentTimeMatch(key.blockElement[3].time, true)),
            minFeelTemp: addTempSign(currentTimeMatch(key.blockElement[2].time, false)),
            maxFeelTemp: addTempSign(currentTimeMatch(key.blockElement[2].time, true)),
            equalTemp: addTempSign(equalTemp),
            comferMinPerc: addPercent(currentTimeMatch(key.blockElement[5].time, false)),
            comferMaxPerc: addPercent(currentTimeMatch(key.blockElement[5].time, true)),
            rainNightPerc: addPercent(key.blockElement[7].time[1].elementValue[0].value),
            rainMoringPerc: addPercent(key.blockElement[7].time[0].elementValue[0].value),
            uivLevel: uivLevel,
            uivDesc: uivDesc,
            wetEqualPerc: addPercent(key.blockElement[4].time[0].elementValue[0].value),
            weatherSign: key.blockElement[1].time[0].elementValue[0].value,
            weatherSignState: transWeatherIcon(key.blockElement[1].time[0].elementValue[1].value),
            weatherNightDesc: key.blockElement[6].time[2].elementValue[0].value,
            weatherMoringDesc: key.blockElement[6].time[0].elementValue[0].value,
            areaBlock: array
        })
    }))
    return blockArrayTemp
}

const tomorrowBlock = (...items) => {
    let blockArrayTemp = []
    const timeSelectCount = Number(new Date().getFullDateTime({ formatType:'time'}).split("：")[0]) >= 18 ? 2 : 0
    const [blockFilterArray, array, cityName, equalTemp, uivLevel, uivDesc] = items
    $.each(blockFilterArray,(key => {
        blockArrayTemp.push({
            cityName: cityName,
            minTemp: addTempSign(key.blockElement[3].time[6 + timeSelectCount].elementValue[0].value),
            maxTemp: addTempSign(key.blockElement[3].time[8 - timeSelectCount].elementValue[0].value),
            minFeelTemp: addTempSign(key.blockElement[2].time[6 + timeSelectCount].elementValue[0].value),
            maxFeelTemp: addTempSign(key.blockElement[2].time[8 - timeSelectCount].elementValue[0].value),
            equalTemp: addTempSign(equalTemp),
            comferMinPerc: addPercent(key.blockElement[5].time[6 + timeSelectCount].elementValue[0].value),
            comferMaxPerc: addPercent(key.blockElement[5].time[8 - timeSelectCount].elementValue[0].value),
            rainNightPerc: addPercent(key.blockElement[7].time[4].elementValue[0].value),
            rainMoringPerc: addPercent(key.blockElement[7].time[2].elementValue[0].value),
            uivLevel: uivLevel,
            uivDesc: uivDesc,
            wetEqualPerc: addPercent(key.blockElement[4].time[6].elementValue[0].value),
            weatherSign: key.blockElement[1].time[4].elementValue[0].value,
            weatherSignState: transWeatherIcon(key.blockElement[1].time[4].elementValue[1].value),
            weatherNightDesc: key.blockElement[6].time[10].elementValue[0].value,
            weatherMoringDesc: key.blockElement[6].time[6].elementValue[0].value,
            areaBlock: array
        })
    }))
    return blockArrayTemp
}

const renderViewWeekWithoutRwd = renderWeather => $.maps(renderWeather,(render => `
    <div class="city-title-outer">
        <div class="city-name-title">${render.cityName}</div>
    </div>
    <table class="table">
        <thead>
            <tr>
                <th scope="col"></th>
                ${$.maps(render.moring,(key => `<th scope="col">${key.date.replace("2021 / ","")}</th>`)).join('')}
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>白天</td>
            ${$.maps(render.moring,(key =>
                `<td>
                    <div class="week-desc">
                        <span>${key.weatherDesc}</span>
                        <span>${addTempSign(key.minTemp)} ~ ${addTempSign(key.maxTemp)}</span>
                        <span>${key.rainPerc == " "?"氣象局暫無資料":`降雨機率 ${addPercent(key.rainPerc)}`}</span>
                    </div>
                </td>`
            )).join('')}
            </tr>
            <tr>
                <td>夜晚</td>
                ${$.maps(render.night,((key, index) => index !== 0 && `
                    <td>
                        <div class="week-desc">
                            <span>${key.weatherDesc}</span>
                            <span>${addTempSign(key.minTemp)} ~ ${addTempSign(key.maxTemp)}</span>
                            <span>${key.rainPerc == " "?"氣象局暫無資料":`降雨機率 ${addPercent(key.rainPerc)}`}</span>
                        </div>
                    </td>`
                )).join('').replace(/false/g,'')}
            </tr>
        <tbody>
    </table>`
)).join('')


const renderViewWeekOnRwd = renderWeather => $.maps(renderWeather,(render=> `
    <div class="city-title-outer">
        <div class="city-name-title">${render.cityName}</div>
    </div>
    <table class="table">
        <thead>
            <tr>
                <th scope="col"></th>
                <th scope="col">白天</th>
                <th scope="col">夜晚</th>
            </tr>
        </thead>
        <tbody>
            ${$.maps(render.moring,(moringData =>
                $.maps(render.night,(nightData=> moringData.date == nightData.date && `
                    <tr>
                        <td>${moringData.date.replace("2021 / ","")}</td>
                        <td>
                            <div class="week-desc">
                                <span>${moringData.weatherDesc}</span>
                                <span>${addTempSign(moringData.minTemp)} ~ ${addTempSign(moringData.maxTemp)}</span>
                                <span>${moringData.rainPerc == " "?"氣象局暫無資料":`降雨機率 ${addPercent(moringData.rainPerc)}`}</span>
                            </div>
                        </td>
                        <td>
                            <div class="week-desc">
                                <span>${nightData.weatherDesc}</span>
                                <span>${addTempSign(nightData.minTemp)} ~ ${addTempSign(nightData.maxTemp)}</span>
                                <span>${nightData.rainPerc == " "?"氣象局暫無資料":`降雨機率 ${addPercent(nightData.rainPerc)}`}</span>
                            </div>
                        </td>
                    </tr>`
                )).join('').replace(/false/g,'')
            )).join('')}
        <tbody>
    </table>`
)).join('')


const renderViewWeek = renderWeather => window.innerWidth <= 768 ? renderViewWeekOnRwd(renderWeather) : renderViewWeekWithoutRwd(renderWeather)

const renderViewWithoutWeek = (renderWeather,order,currentBlock) => $.maps(renderWeather,(render=>`
    <div class="row no-gutters">
        <div class="col-md-12">
            <div class="city-title-outer">
                <div class="block-select-outer" onclick="showBlockSelectAnimate(this)">
                    <div class="block-has-select-title">
                        區域：<span>${currentBlock == undefined ? "全區":currentBlock}</span>
                        <i class="fas fa-chevron-up arrow"></i>
                    </div>
                    <div class="block-select">
                        <span class="block-selected" data-num="0" onclick='currentBlockChoose(this,${JSON.stringify(obj.renderWeatherTemp)},${order})'>全區</span>
                        ${$.maps(render.areaBlock,((renderBlock,index)=> `<span data-num="${index+=1}" onclick='currentBlockChoose(this,${JSON.stringify(render.areaBlock)},${order},"${render.cityName}",${Number(render.equalTemp.split("&degC")[0])},${Number(render.uivLevel)},"${render.uivDesc}")'>${renderBlock.blockName}</span>`)).join('')}
                    </div>
                </div>
                <div class="city-name-title">${render.cityName}</div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="temp-desc">
                <div class="temp-desc-title">溫度資訊</div>
                <span>氣溫：${render.minTemp} ~ ${render.maxTemp}</span>
                <span>${order == 0?"本日":"明日"}均溫：${render.equalTemp}</span>
                <span>體感溫度：${render.minFeelTemp} ~ ${render.maxFeelTemp}</span>
            </div>
        </div>
        <div class="col-md-4">
            <div class="rain-desc">
                <div class="rain-desc-title">${order == 0?"本日":"明日"}降雨機率</div>
                <div class="rain-sign">${render.weatherSign}</div>
                <div class="rain-icon">${render.weatherSignState}</div>
                <div class="rain-percent">
                    <span>白天：${render.rainMoringPerc}</span>
                    <span>夜晚：${render.rainNightPerc}</span>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="other-desc">
                <div class="other-desc-title">各項指數</div>
                <span>舒適度指數：${render.comferMinPerc} ~ ${render.comferMaxPerc}</span>
                <span>紫外線指數：${render.uivLevel} ${render.uivDesc}</span>
                <span>濕度：${render.wetEqualPerc}</span>
            </div>
        </div>
        <div class="col-md-12">
            <div class="weather-desc">
                <div class="weather-desc-title">${order == 0?"本日":"明日"}天氣概況</div>
                <div class="row no-gutters">  
                    <div class="col-md-6">  
                        <div class="weather-desc-moring">
                            <span>白天至夜晚</span>
                            <span>${render.weatherMoringDesc}</span>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="weather-desc-night">
                            <span>夜晚至凌晨</span>
                            <span>${render.weatherNightDesc}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
)).join('')


const renderView = (renderWeather, order,currentBlock) => {
    let text = order == 2 ? renderViewWeek(renderWeather) : renderViewWithoutWeek(renderWeather,order,currentBlock)
    $(".weathers").html(text)
    setTimeout(()=>$(".go-back-options").addClass("go-back-options-toggle"),1500)
}

const renderBlockWithoutRwd = renderWeather => $.maps(renderWeather,(render=>`
    <table class="table">
        <thead>
            <tr>
                <th scope="col"></th>
                ${$.maps(render.moring,(key =>`<th scope="col">${key.date.replace("2021 / ","")}</th>`)).join('')}
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>白天</td>
                ${$.maps(render.moring,(key => `
                    <td>
                        <div class="week-desc">
                            <span>${key.weatherDesc}</span>
                            <span>${addTempSign(key.minTemp)} ~ ${addTempSign(key.maxTemp)}</span>
                            <span>${key.rainPerc == " "?"氣象局暫無資料":`降雨機率 ${addPercent(key.rainPerc)}`}</span>
                        </div>
                    </td>`
                )).join('')}
            </tr>
            <tr>
                <td>夜晚</td>
                ${$.maps(render.night,((key, index) => index !== 0 &&
                    `<td>
                        <div class="week-desc">
                            <span>${key.weatherDesc}</span>
                            <span>${addTempSign(key.minTemp)} ~ ${addTempSign(key.maxTemp)}</span>
                            <span>${key.rainPerc == " "?"氣象局暫無資料":`降雨機率 ${addPercent(key.rainPerc)}`}</span>
                        </div>
                    </td>`
                )).join('').replace(/false/g,'')}
            </tr>
        <tbody>
    </table>`
)).join('')


const renderBlockOnRwd = renderWeather => $.maps(renderWeather,(render=>`
    <table class="table">
        <thead>
            <tr>
                <th scope="col"></th>
                <th scope="col">白天</th>
                <th scope="col">夜晚</th>
            </tr>
        </thead>
        <tbody>
            ${$.maps(render.moring,(moringData =>
                $.maps(render.night,(nightData=> moringData.date == nightData.date && `
                    <tr>
                        <td>${moringData.date.replace("2021 / ","")}</td>
                        <td>
                            <div class="week-desc">
                                <span>${moringData.weatherDesc}</span>
                                <span>${addTempSign(moringData.minTemp)} ~ ${addTempSign(moringData.maxTemp)}</span>
                                <span>${moringData.rainPerc == " "?"氣象局暫無資料":`降雨機率 ${addPercent(moringData.rainPerc)}`}</span>
                            </div>
                        </td>
                        <td>
                            <div class="week-desc">
                                <span>${nightData.weatherDesc}</span>
                                <span>${addTempSign(nightData.minTemp)} ~ ${addTempSign(nightData.maxTemp)}</span>
                                <span>${nightData.rainPerc == " "?"氣象局暫無資料":`降雨機率 ${addPercent(nightData.rainPerc)}`}</span>
                            </div>
                        </td>
                    </tr>`
                )).join('').replace(/false/g,'')
            )).join('')}
        <tbody>
    </table>`
)).join('')

const renderBlockView = (renderWeather,text) => {
    let newText = window.innerWidth <= 768 ? renderBlockOnRwd(renderWeather):renderBlockWithoutRwd(renderWeather)
    $(".weathers").html(`${text}${newText}`)
    setTimeout(()=>$(".go-back-options").addClass("go-back-options-toggle"),1500)
}

const returnOptions = ({ target }) => {
    $(target).removeClass("go-back-options-toggle")
    weatherOuterAnimate(false)
    setTimeout(()=>$(".weathers").texts(""),1200) 
    setTimeout(() => $(".option-group").toggleClass("option-group-toggle"), 1210)
    setTimeout(()=>{
        $(".select-group").toggleClass("select-toggle")
        $(".other-block").toggleClass("other-block-toggle")
    },2010)
}

$(document).useWillMount(() => getData())

$(document).useMounted(() => {
    setInterval(time, 1000)

    backgroundChange('global')
    
    $(".background-controller").listener("click",backgroundChange.bind(this,'controller'))
    
    $(".weathers-outer").styles("set","margin-top",`-${window.innerHeight}px`)
    
    $(".current-select").listener("click",selectAnimate)
    
    $(".other-block").listener("click",selectCity)
    
    $(".go-back-options").listener("click",returnOptions)
    
    $('.go-top').listener('click', scrolls)
    
    $(window).listener('scroll', switchTopBar)
})