import React,{ useContext,useEffect,useState,Fragment } from 'react'
// import geoIp from 'geoip-lite'
// https://api.ipify.org/?format=json get current ip
import { NewContext } from '../../App'
import { 
    Container,
    citysDatasType,
    citysBlocksDatasType,
    citysDatasObjType,
    citysBlocksDatasObjType,
    optionListObjType,
    repackCitysBlocksDatasObjType,
    filterCityObjType,
    returnFilterCityObjType,
    descItemType,
    singleTownObjType,
    weekItemObjType,
    weekItemType
} from '.'

const Main:FC = ():TSX => {
    const { $ } = useContext(NewContext)

    const orderCityCode = [
        '10002000', '10017000', '65000000', '63000000', '68000000', '10004000', '10018000', '10005000', // northCode
        '66000000', '10007000', '10009000', '10008000', // middleCode
        '10010000', '10020000', '67000000', '64000000', '10013000', // southCode
        '10015000', '10014000', // eastCode
        '09007000', '09020000', '10016000' // outeCode
    ]

    const [{
        citysBlocksDatas,
        citysDatas,
        optionList,
        renderCityData,
        currentLatLon,
        currrentOptionListType,
        currentChoiceObj,
        toggleOptionList,
        renderType,
        rwdStatus,
        toggleBar,
        toggleGoTop
    },setIniState] = useState<{
        citysBlocksDatas:repackCitysBlocksDatasObjType[],
        citysDatas:citysDatasObjType[],
        optionList:optionListObjType[],
        renderCityData:citysDatasObjType[],
        currentLatLon:number[],
        currrentOptionListType:string,
        currentChoiceObj:{ cityCode:string,townCode:string }
        toggleOptionList:boolean,
        renderType:string,
        rwdStatus:boolean,
        toggleBar:boolean,
        toggleGoTop:boolean,
        scrollPosTemp:number
    }>({
        citysBlocksDatas:[],
        citysDatas:[],
        optionList:[],
        renderCityData:[],
        currentLatLon:[],
        currrentOptionListType:'',
        currentChoiceObj:{ cityCode:'',townCode:'' },
        toggleOptionList: false,
        renderType: 'today',
        rwdStatus: false,
        toggleBar: false,
        toggleGoTop: false,
        scrollPosTemp: -1
    })

    const [loadingStatus,setLoadingStatus] = useState<boolean>(false)
    const [isMoon,setIsMoon] = useState<boolean>(false)

    const filterOptionData:<T>(data:T[],type:string) => optionListObjType[] = (data,type) => {
        if(type === 'citys'){
            const retunArr = $.maps(data as citysDatasObjType[],({ geocode:posGeoCode,locationName:posName }:citysDatasObjType) => ({ posName,posGeoCode })) as optionListObjType[]
            
            return $.maps(orderCityCode,(orderCode:string) => {
                const pos = $.findIndexOfObj(retunArr,({ posGeoCode }:optionListObjType) => posGeoCode === orderCode)
                return retunArr[pos]
            })
        } else {
            const retunArr = $.maps(data as repackCitysBlocksDatasObjType[],({ blockGeoCode:posGeoCode,blockName:posName }) => ({ posName,posGeoCode })) as optionListObjType[]
            
            return $.sort(retunArr,(a:optionListObjType,b:optionListObjType) => parseInt(a.posGeoCode) - parseInt(b.posGeoCode))
        }
    }

    const getData:() => void = async () => {

        setLoadingStatus(true)

        let citysBlocksDatasTemp:repackCitysBlocksDatasObjType[] = []
        let citysDatasTemp:citysDatasObjType[] = []
        let optionListTemp:optionListObjType[] = []
        const promisAllBlocks:Promise<{ data:citysBlocksDatasType }>[] = []
        
        for (let num = 1; num <= 85; num += 4) {
            const orders = num <= 9 ? '00':'0'
            promisAllBlocks.append($.fetch?.get<citysBlocksDatasType>(`https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-093`,{
                queryParams:{
                    Authorization:`CWB-6BEED9AA-24B5-4569-BB51-FC0BCFA7595B&locationId=F-D0047-${orders}${num}`
                }
            }))
        }
        
        const citysBlocksDatasRes = await Promise.all(promisAllBlocks).then(arrays => $.maps(arrays,({ data }:{ data:citysBlocksDatasType }) => data.records?.locations[0]))
        
        const citysDatasRes = await $.fetch?.get<citysDatasType>('https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-091',{
            queryParams:{
                Authorization:'CWB-6BEED9AA-24B5-4569-BB51-FC0BCFA7595B'
            }
        })

        const getIp = await $.fetch?.get<string>('https://api.ipify.org',{ returnType:'text' })
        const getGeo = await $.fetch?.get<{ ll:number[] }>(`https://proxyservice-1-t7335739.deta.app/uts/get_geo/${btoa(getIp?.data!)}`)

        if(citysDatasRes?.data){
            citysDatasTemp = citysDatasRes.data.records?.locations[0].location

            optionListTemp = filterOptionData(citysDatasTemp,'citys')
        }

        if(citysBlocksDatasRes.length > 0){
            citysBlocksDatasTemp = $.sum($.maps(citysBlocksDatasRes,({ location }:{ location:citysBlocksDatasObjType[] }) => 
                $.sort($.maps(location,(dataRow:citysBlocksDatasObjType) => ({
                    blockGeoCode:dataRow.geocode,
                    blockName:dataRow.locationName,
                    blockLat:dataRow.lat,
                    blockLon:dataRow.lon,
                    blockElement:dataRow.weatherElement
                })),(a:repackCitysBlocksDatasObjType,b:repackCitysBlocksDatasObjType) => parseInt(a.blockGeoCode) - parseInt(b.blockGeoCode))
            ),(a:any[],b:repackCitysBlocksDatasObjType[]) => a.concat(b),[]) as repackCitysBlocksDatasObjType[]
        }

        setIniState(prevState => ({
            ...prevState,
            citysBlocksDatas:citysBlocksDatasTemp,
            citysDatas:citysDatasTemp,
            optionList:optionListTemp,
            currentLatLon:getGeo?.data?.ll!,
            rwdStatus: window.innerWidth <= 414
        }))

        setLoadingStatus(false)
    }

    const convertMatchSign:<T>(type:string,value:any) => T = (type,value) => ({
        temperatureSign:`${value}${unescape('%B0C')}`,
        percentSign: `${value}%`,
        transWeatherIcon:{
            [`${parseInt(value) === 1}`]: (<i className="fas fa-sun"></i>),
            [`${parseInt(value) === 2}`]: (<i className="fas fa-sun-cloud"></i>),
            [`${parseInt(value) === 3}`]: (<i className="fas fa-clouds-sun"></i>),
            [`${parseInt(value) >= 4 && parseInt(value) <= 7}`]: (<i className="fas fa-clouds"></i>),
            [`${parseInt(value) >= 8}`]: (<i className="fas fa-cloud-showers-heavy"></i>)
        }['true']
    })[type] as any

    const choiceCity:(cityCode:string,type:string) => void = (cityCode,type) => {
        if(type === 'citys'){
            let filterItem = $.filter(citysDatas,({ geocode }:citysDatasObjType):any => cityCode === geocode) as citysDatasObjType[]
            filterItem = $.maps(filterItem,item => ({
                ...item,
                renderAreaBlock:$.filter(citysBlocksDatas,({ blockGeoCode }:repackCitysBlocksDatasObjType):any => cityCode.slice(0,5) === blockGeoCode.slice(0,5)) as repackCitysBlocksDatasObjType[],
                areaBlock:[]
            }))

            setIniState(prevState => ({
                ...prevState,
                renderType: type,
                renderCityData:filterItem,
                currentChoiceObj:{
                    ...prevState.currentChoiceObj,
                    cityCode,
                }
            }))

        } else {
            const [{ renderAreaBlock }] = renderCityData
            const deepCopyData = JSON.parse(JSON.stringify(renderCityData)) as citysDatasObjType[]
            const filterBlock = $.filter(renderAreaBlock!,({ blockGeoCode }:repackCitysBlocksDatasObjType):any => cityCode === blockGeoCode) as repackCitysBlocksDatasObjType[]
            deepCopyData[0].areaBlock = filterBlock
            
            setIniState(prevState => ({
                ...prevState,
                renderType: type,
                renderCityData:deepCopyData,
                currentChoiceObj:{
                    ...prevState.currentChoiceObj,
                    townCode:cityCode,
                }
            }))
        }
    }

    const changeRenderType:(type:string) => void = type => setIniState(prevState => ({ ...prevState,renderType:type }))

    const toggleOptionListAction:(filterData:(citysDatasObjType | repackCitysBlocksDatasObjType )[],type:string) => void = (filterData,type) => setIniState(prevState => ({
        ...prevState,
        toggleOptionList: true,
        currrentOptionListType:type,
        optionList:filterOptionData(filterData,type)
    }))
    
    const renderDataElemet:(type:string,data:citysDatasObjType[]) => TSX = (type,data) => {
        let weekItem:weekItemType | undefined = undefined
        let singleTownData:singleTownObjType[] = []
        const [{ locationName,weatherElement,areaBlock,renderAreaBlock }] = data
        const [rainPercent,equalTemp,wetEqualPercent,comferMinPercent,,maxFeelTemp,weatherSignState,comferMaxPercent,minTemp,uiv,weatherDesc,minFeelTemp,maxTemp] = weatherElement

        const filterCityObj:filterCityObjType | returnFilterCityObjType = {
            [type]:{
                cityName: locationName,
                minTemp: convertMatchSign<string>('temperatureSign',minTemp?.time[0].elementValue[0].value),
                maxTemp: convertMatchSign<string>('temperatureSign',maxTemp?.time[0].elementValue[0].value),
                minFeelTemp: convertMatchSign<string>('temperatureSign',minFeelTemp?.time[0].elementValue[0].value),
                maxFeelTemp: convertMatchSign<string>('temperatureSign',maxFeelTemp?.time[0].elementValue[0].value),
                equalTemp: convertMatchSign<string>('temperatureSign',equalTemp?.time[0].elementValue[0].value),
                comferMinPerc: convertMatchSign<string>('percentSign',comferMinPercent?.time[0].elementValue[0].value),
                comferMaxPerc: convertMatchSign<string>('percentSign',comferMaxPercent?.time[0].elementValue[0].value),
                rainNightPerc: convertMatchSign<string>('percentSign',rainPercent?.time[1].elementValue[0].value),
                rainMoringPerc: convertMatchSign<string>('percentSign',rainPercent?.time[0].elementValue[0].value),
                uivLevel: uiv?.time[0].elementValue[0].value,
                uivDesc: uiv?.time[0].elementValue[1].value,
                wetEqualPerc: convertMatchSign<string>('percentSign',wetEqualPercent?.time[0].elementValue[0].value),
                weatherSign: weatherSignState?.time[0].elementValue[0].value,
                weatherSignState: convertMatchSign<TSX>('transWeatherIcon',weatherSignState?.time[0].elementValue[1].value),
                weatherNightDesc: weatherDesc?.time[1].elementValue[0].value,
                weatherMoringDesc:weatherDesc?.time[0].elementValue[0].value,
                areaBlock
            },
            tomorrow:{
                cityName: locationName,
                minTemp: convertMatchSign<string>('temperatureSign',minTemp.time[3].elementValue[0].value),
                maxTemp: convertMatchSign<string>('temperatureSign',maxTemp.time[2].elementValue[0].value),
                minFeelTemp: convertMatchSign<string>('temperatureSign',minFeelTemp.time[2].elementValue[0].value),
                maxFeelTemp: convertMatchSign<string>('temperatureSign',maxFeelTemp.time[2].elementValue[0].value),
                equalTemp: convertMatchSign<string>('temperatureSign',equalTemp.time[2].elementValue[0].value),
                comferMinPerc: convertMatchSign<string>('percentSign',comferMinPercent.time[2].elementValue[0].value),
                comferMaxPerc: convertMatchSign<string>('percentSign',comferMaxPercent.time[2].elementValue[0].value),
                rainNightPerc: convertMatchSign<string>('percentSign',rainPercent.time[2].elementValue[0].value),
                rainMoringPerc: convertMatchSign<string>('percentSign',rainPercent.time[3].elementValue[0].value),
                uivLevel: uiv.time[1].elementValue[0].value,
                uivDesc: uiv.time[1].elementValue[1].value,
                wetEqualPerc: convertMatchSign<string>('percentSign',wetEqualPercent.time[2].elementValue[0].value),
                weatherSign: weatherSignState.time[1].elementValue[0].value,
                weatherSignState: convertMatchSign<TSX>('transWeatherIcon',weatherSignState.time[1].elementValue[1].value),
                weatherNightDesc: weatherDesc.time[2].elementValue[0].value,
                weatherMoringDesc: weatherDesc.time[3].elementValue[0].value,
                areaBlock
            },
        }[type] as returnFilterCityObjType

        if(areaBlock!.length > 0){
            const filterDate:Set<string> = new Set<string>()
            const [{ blockElement }] = areaBlock!

            const [,weatherSignStateForTown,feelTempForTown,tempForTown,wetEqualPercentForTown,comferPercentForTown,] = blockElement
            
            const repackData = [
                ...weatherSignStateForTown.time.map(({ startTime,endTime,elementValue }) => {
                    const [{ value:value1 },{ value:value2 }] = elementValue
                    return { startTime,endTime,valueGroup:[value1,convertMatchSign<string>('transWeatherIcon',value2)] }
                }),
                ...feelTempForTown.time.map(({ dataTime, elementValue }) => {
                    const [{ value }] = elementValue
                    const startTime = dataTime!
                    return { startTime, endTime:'',valueGroup:[value] }
                }),
                ...tempForTown.time.map(({ dataTime, elementValue }) => {
                    const [{ value }] = elementValue
                    const startTime = dataTime!
                    return { startTime,endTime:'',valueGroup:[convertMatchSign<string>('temperatureSign',value)] }
                }),
                ...wetEqualPercentForTown.time.map(({ dataTime, elementValue }) => {
                    const [{ value }] = elementValue
                    const startTime = dataTime!
                    return { startTime,endTime:'',valueGroup:[convertMatchSign<string>('percentSign',value)] }
                }),
                ...comferPercentForTown.time.map(({ dataTime, elementValue }) => {
                    const [{ value }] = elementValue
                    const startTime = dataTime!
                    return { startTime,endTime:'',valueGroup:[convertMatchSign<string>('percentSign',value)] }
                })
            ].reduce((emptyInitalArray,{ startTime,endTime,valueGroup }) => {
                const pos = $.findIndexOfObj(emptyInitalArray,item => item.startTime === startTime)
                
                if(pos !== -1){
                    emptyInitalArray[pos].valueGroup = [...emptyInitalArray[pos].valueGroup,...valueGroup]
                } else {
                    emptyInitalArray = [...emptyInitalArray,{ startTime,endTime,valueGroup }]
                }

                return emptyInitalArray
            },[] as { startTime:string,endTime:string,valueGroup:string[]}[]).map(item => {
                const { startTime,endTime:endTimeTemp,valueGroup:[weatherSign,weatherSignState,feelTemp,temp,wetEqualPercent,comferPercent] } = item
                
                const [date,] = startTime.split(' ')
                const [,month,day] = date.split('-')
                const [,endTimes] = endTimeTemp.split(' ')
                const endTime = endTimes.split(':').removeLast().join(':')

                filterDate.append(`${month}-${day}`)

                return { startTime,endTime,weatherSign,weatherSignState,feelTemp,temp,wetEqualPercent,comferPercent }
            })
            
            const [obj1,obj2,] = $.maps($.createArray({ type:'new',item:filterDate }) as string[],(date:string) => ({
                date,
                descItem:$.filter(repackData,({ startTime }:{ startTime:string }):any => startTime.match(date)).map(item => ({
                    ...item,
                    startTime:item.startTime.split(' ')[1].split(':').removeLast().join(':')
                }))
            }))

            singleTownData = [obj1,obj2]
        }
       
        if(type === 'week'){
            const moringData:weekItemObjType[] = []
            const nightData:weekItemObjType[] = []

            $.createArray({ type:'fake',item:{ random: weatherElement[8].time.length }},(num:number) => {
           
                const [,month,date,hour,] = weatherElement[8].time[num].startTime.replace(' ','-').replace(/:/g,'-').split('-')

                if (parseInt(hour) === 6) {
                    moringData.push({
                        date: `${month}-${date}`,
                        weatherDescState: convertMatchSign<TSX>('transWeatherIcon', weatherElement[6].time[num].elementValue[1].value),
                        weatherDesc: weatherElement[6].time[num].elementValue[0].value,
                        minTemp:  convertMatchSign<string>('temperatureSign',weatherElement[8].time[num].elementValue[0].value),
                        maxTemp: convertMatchSign<string>('temperatureSign',weatherElement[12].time[num].elementValue[0].value),
                        rainPerc: weatherElement[0].time[num].elementValue[0].value.trim() ? `降雨機率 ${convertMatchSign<string>('percentSign',weatherElement[0].time[num].elementValue[0].value)}` : '暫無資料'
                    })
                } else if (parseInt(hour) === 18) {
                    nightData.push({
                        date: `${month}-${date}`,
                        weatherDescState: convertMatchSign<TSX>('transWeatherIcon',weatherElement[6].time[num].elementValue[1].value),
                        weatherDesc: weatherElement[6].time[num].elementValue[0].value,
                        minTemp: convertMatchSign<string>('temperatureSign',weatherElement[8].time[num].elementValue[0].value),
                        maxTemp: convertMatchSign<string>('temperatureSign',weatherElement[12].time[num].elementValue[0].value),
                        rainPerc: weatherElement[0].time[num].elementValue[0].value.trim() ? `降雨機率 ${convertMatchSign<string>('percentSign',weatherElement[0].time[num].elementValue[0].value)}` : '暫無資料'
                    })
                }
            })

            weekItem = { moringData,nightData }
        }

        console.log(weekItem)

        return (
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className='weather-board'>
                        <div className='top'>
                            <div className="row no-gutters align-items-center in-box">
                                { rwdStatus ? (
                                <>
                                    <div className="col-sm-5">
                                        <div className="middle">
                                            <div>{filterCityObj.cityName}</div>
                                            <div>
                                                <i className="fal fa-thermometer-three-quarters mr-3"></i>
                                                {filterCityObj.minTemp} ~ {filterCityObj.maxTemp}
                                            </div>
                                            <div>
                                                <i className="far fa-umbrella mr-3"></i>
                                                <i className="fas fa-sun"></i> {filterCityObj.rainMoringPerc}&nbsp;&nbsp;
                                                <i className="fas fa-moon-stars"></i> {filterCityObj.rainNightPerc}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-7">
                                        <div className="row no-gutters">
                                            <div className="col-6">
                                                <div className="left">
                                                    <div className="icon">
                                                        <span>{filterCityObj.weatherSignState}</span>
                                                        <span>{filterCityObj.weatherSign}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="right-group">
                                                    <div className="left-list-outer">
                                                        <div className={toggleOptionList ? 'left-list hide-list' : 'left-list'}>
                                                            <div onClick={toggleOptionListAction.bind(this,citysDatas,'citys')}>切換城市</div>
                                                            <div onClick={toggleOptionListAction.bind(this,renderAreaBlock!,'towns')}>切換鄉鎮區</div>
                                                            <div onClick={changeRenderType.bind(this,renderType !== 'tomorrow' ? 'tomorrow' : 'today')}>{renderType !== 'tomorrow' ? '明日天氣' : '今日天氣' }</div>
                                                            <div onClick={changeRenderType.bind(this,'week')}>一周天氣</div>
                                                            <div onClick={changeRenderType.bind(this,'others')}>其他資訊</div>
                                                        </div>
                                                    </div>
                                                    <div className={toggleOptionList ? 'city-list-outer show-list' : 'city-list-outer'}>
                                                        <div className='back-list-btn' onClick={() => {
                                                            setIniState(prevState => ({
                                                                ...prevState,
                                                                toggleOptionList: false
                                                            }))
                                                        }}>
                                                            <i className="fas fa-chevron-left"></i>
                                                        </div>
                                                        <div className='city-list'>
                                                            {optionList.length > 0 && (
                                                                $.maps(optionList,({ posGeoCode,posName }:optionListObjType,index:number) => (
                                                                    <div key={index} onClick={choiceCity.bind(this,posGeoCode,currrentOptionListType)}>{posName}</div>
                                                                ))
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                ) : (
                                <>
                                    <div className="col-sm-4">
                                        <div className="left">
                                            <div className="icon">
                                                <span>{filterCityObj.weatherSignState}</span>
                                                <span>{filterCityObj.weatherSign}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-5">
                                        <div className="middle">
                                            <div>{filterCityObj.cityName}</div>
                                            <div>
                                                <i className="fal fa-thermometer-three-quarters mr-3"></i>
                                                {filterCityObj.minTemp} ~ {filterCityObj.maxTemp}
                                            </div>
                                            <div>
                                                <i className="far fa-umbrella mr-3"></i>
                                                <i className="fas fa-sun"></i> {filterCityObj.rainMoringPerc}&nbsp;&nbsp;
                                                <i className="fas fa-moon-stars"></i> {filterCityObj.rainNightPerc}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="right-group">
                                            <div className="left-list-outer">
                                                <div className={toggleOptionList ? 'left-list hide-list' : 'left-list'}>
                                                    <div onClick={toggleOptionListAction.bind(this,citysDatas,'citys')}>切換城市</div>
                                                    <div onClick={toggleOptionListAction.bind(this,renderAreaBlock!,'towns')}>切換鄉鎮區</div>
                                                    <div onClick={changeRenderType.bind(this,renderType !== 'tomorrow' ? 'tomorrow' : 'today')}>{renderType !== 'tomorrow' ? '明日天氣' : '今日天氣' }</div>
                                                    <div onClick={changeRenderType.bind(this,'week')}>一周天氣</div>
                                                    <div onClick={changeRenderType.bind(this,'others')}>其他資訊</div>
                                                </div>
                                            </div>
                                            <div className={toggleOptionList ? 'city-list-outer show-list' : 'city-list-outer'}>
                                                <div className='back-list-btn' onClick={() => {
                                                    setIniState(prevState => ({
                                                        ...prevState,
                                                        toggleOptionList: false
                                                    }))
                                                }}>
                                                    <i className="fas fa-chevron-left"></i>
                                                </div>
                                                <div className='city-list'>
                                                    {optionList.length > 0 && (
                                                        $.maps(optionList,({ posGeoCode,posName }:optionListObjType,index:number) => (
                                                            <div className={posGeoCode === currentChoiceObj.cityCode || posGeoCode === currentChoiceObj.townCode ? 'active' : ''} key={index} onClick={choiceCity.bind(this,posGeoCode,currrentOptionListType)}>{posName}</div>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                )}
                            </div>
                        </div>
                        <div className="bottom">
                            {{
                                [type]:(
                                    <div className="others-layout">
                                        <div className='row align-items-center no-gutters'>
                                            <div className="col-md-4">
                                                <div className="left">
                                                    <div>體感溫度：{filterCityObj.minFeelTemp} ~ {filterCityObj.maxFeelTemp}</div>
                                                    <div>平均溫度：{filterCityObj.equalTemp}</div>
                                                    <div>濕度百分比：{filterCityObj.wetEqualPerc}</div>
                                                    <div>舒適度指數：{filterCityObj.comferMinPerc} ~ {filterCityObj.comferMaxPerc}</div>
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="right">
                                                    <div className="weather-desc-title">天氣概況</div>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="leaft-desc desc">
                                                                <i className="fas fa-sun"></i>
                                                                <span>{filterCityObj.weatherMoringDesc}</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="right-desc desc">
                                                                <i className="fas fa-moon-stars"></i>
                                                                <span>{filterCityObj.weatherNightDesc}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ),
                                towns:(
                                    <div className='single-town-info-layout'>
                                        <div className='title'>
                                            <span>{areaBlock!.length > 0 && areaBlock![0].blockName}</span>
                                            <span>每 3 小時天氣資訊</span>
                                        </div>
                                        <div className="data-list">
                                            {singleTownData.length > 0 && $.maps(singleTownData,(item:singleTownObjType,index:number) => (
                                                <Fragment key={index}>
                                                    <div className="data-row-outer">
                                                        {$.maps(item.descItem,(descDataRow:descItemType,descIndex:number) => (
                                                            <div className='data-row' key={descIndex}>
                                                                <div className='time'><i className="far fa-clock" />&nbsp;{item.date}&nbsp;{descDataRow.startTime} ~ {descDataRow.endTime}</div>
                                                                {rwdStatus ? (
                                                                    <div className='bottom'>
                                                                        <div>
                                                                            {descDataRow.weatherSignState}
                                                                            {descDataRow.weatherSign}
                                                                        </div>
                                                                        <div><i className="fal fa-thermometer-three-quarters" />&nbsp;{descDataRow.temp}</div>
                                                                        <div><i className="fas fa-laugh" />&nbsp;{descDataRow.feelTemp}</div>
                                                                        <div><i className="fad fa-tint" />&nbsp;{descDataRow.wetEqualPercent}</div>
                                                                    </div>
                                                                ) : (
                                                                    <>
                                                                        <div>
                                                                            {descDataRow.weatherSignState}
                                                                            {descDataRow.weatherSign}
                                                                        </div>
                                                                        <div><i className="fal fa-thermometer-three-quarters" />&nbsp;{descDataRow.temp}</div>
                                                                        <div><i className="fas fa-laugh" />&nbsp;{descDataRow.feelTemp}</div>
                                                                        <div><i className="fad fa-tint" />&nbsp;{descDataRow.wetEqualPercent}</div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Fragment>
                                            ))}
                                        </div>
                                    </div>
                                ),
                                week:weekItem && (
                                    <div className='week-info-layout'>
                                        {rwdStatus || window.innerWidth <= 768 ? (
                                            <div className="board">
                                                <div className="board-header">
                                                    <div></div>
                                                    <div>白天</div>
                                                    <div>夜晚</div>
                                                </div>
                                                <div className="board-body">
                                                    <div className='child-group'>
                                                        {$.maps(weekItem.moringData,({ date }:weekItemObjType,index:number) => (<div key={index}>{date}</div>))}
                                                    </div>
                                                    <div className='child-group'>
                                                        {$.maps(weekItem.moringData,({ weatherDescState,weatherDesc:weekWeatherDesc,minTemp:weekMinTemp,maxTemp:weekMaxTemp,rainPerc }:weekItemObjType,index:number) => (
                                                            <div key={index}>
                                                                <span>
                                                                    {weatherDescState}
                                                                    {weekWeatherDesc}
                                                                </span>
                                                                <span>{weekMinTemp} ~ {weekMaxTemp}</span>
                                                                <span>{rainPerc}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className='child-group'>
                                                        {$.maps(weekItem.nightData,({ weatherDescState,weatherDesc:weekWeatherDesc,minTemp:weekMinTemp,maxTemp:weekMaxTemp,rainPerc }:weekItemObjType,index:number) => (
                                                            <div key={index}>
                                                                <span>
                                                                    {weatherDescState}
                                                                    {weekWeatherDesc}
                                                                </span>
                                                                <span>{weekMinTemp} ~ {weekMaxTemp}</span>
                                                                <span>{rainPerc}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="board">
                                                <div className="board-header">
                                                    <div></div>
                                                    {$.maps(weekItem.moringData,({ date }:weekItemObjType,index:number) => (<div key={index}>{date}</div>))}
                                                </div>
                                                <div className="board-body">
                                                    <div>白天</div>
                                                    {$.maps(weekItem.moringData,({ weatherDescState,weatherDesc:weekWeatherDesc,minTemp:weekMinTemp,maxTemp:weekMaxTemp,rainPerc }:weekItemObjType,index:number) => (
                                                        <div key={index}>
                                                            <span>
                                                                {weatherDescState}
                                                                {weekWeatherDesc}
                                                            </span>
                                                            <span>{weekMinTemp} ~ {weekMaxTemp}</span>
                                                            <span>{rainPerc}</span>
                                                        </div>
                                                    ))}
                                                    <div>夜晚</div>
                                                    {$.maps(weekItem.nightData,({ weatherDescState,weatherDesc:weekWeatherDesc,minTemp:weekMinTemp,maxTemp:weekMaxTemp,rainPerc }:weekItemObjType,index:number) => (
                                                        <div key={index}>
                                                            <span>
                                                                {weatherDescState}
                                                                {weekWeatherDesc}
                                                            </span>
                                                            <span>{weekMinTemp} ~ {weekMaxTemp}</span>
                                                            <span>{rainPerc}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )
                            }[type]}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const scrollEvent: () => void = () => {
        setIniState(prevState => ({
            ...prevState,
            toggleBar:!(window.scrollY < prevState.scrollPosTemp),
            toggleGoTop: window.scrollY > 100,
            scrollPosTemp:window.scrollY
        }))
    }

    useEffect(() => {
        if(citysDatas.length > 0 && currentLatLon.length > 0){
            const [lat,lon] = currentLatLon
            const [{ geocode }] = $.filter(citysDatas,(item:citysDatasObjType):any => parseFloat(item.lat) + 0.02 >= lat && lon <= parseFloat(item.lon)) as citysDatasObjType[]
            choiceCity(geocode,'citys')
        }
    }, [citysDatas])
    
    useEffect(() => {
        getData()
        setIsMoon(!(new Date().getHours() >= 6 && new Date().getHours() <= 17))

        $(window).listener('scroll',scrollEvent)

        return () => $(window).removeListener('scroll',scrollEvent)
    },[])

    return (
        <Container isMoon={isMoon}>
            <div className={isMoon ? 'layout night' : 'layout morning'}>
                <div className="container-fluid">
                    <div className={toggleBar ? 'header header-toggle' : 'header'}>
                        <i className="fab fa-cloudversify fa-3x mx-2"></i>
                        <h1>Weather</h1>
                    </div>
                    <div className="main">
                        {renderCityData.length > 0 && renderDataElemet(renderType,renderCityData)}
                    </div>
                    <div className="footer">CopyRight &copy; 2022-11 Alex Chen.</div>
                    <div className={toggleGoTop ? 'go-top go-top-toggle' : 'go-top'} onClick={() => $('html').scrollToTop({ scrollTop:0,duration:2000 })}>
                        <i className="fas fa-chevron-up" />
                    </div>
                    <div className={isMoon ? 'mode mode-toggle' : 'mode'} onClick={() => setIsMoon(!isMoon)}>
                        <i className="fad fa-moon" />
                    </div>
                    <div className={loadingStatus ? 'loading-outer loading-outer-toggle' : 'loading-outer'}>
                        <div className="loading-text">{loadingStatus ? 'Loading' : 'Complated'}</div>
                        <div className="circle-I"></div>
                        <div className="circle-II"></div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Main