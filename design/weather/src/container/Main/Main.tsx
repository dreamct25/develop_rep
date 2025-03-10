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
            const retunArr = $.maps(data,({ Geocode:posGeoCode,LocationName:posName }:citysDatasObjType) => ({ posName,posGeoCode })) as optionListObjType[]
            
            return $.maps(orderCityCode,(orderCode:string) => {
                const pos = $.findIndexOfObj(retunArr,({ posGeoCode }:optionListObjType) => posGeoCode === orderCode)
                return retunArr[pos]
            })
        } else {
            const retunArr = $.maps(data,({ blockGeoCode:posGeoCode,blockName:posName }:repackCitysBlocksDatasObjType) => ({ posName,posGeoCode })) as optionListObjType[]
            
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
        
        const citysBlocksDatasRes = await Promise.all(promisAllBlocks).then<citysBlocksDatasObjType[]>(arrays => $.maps(arrays,({ data }:{ data:citysBlocksDatasType }) => data.records?.Locations[0]))
        
        const citysDatasRes = await $.fetch?.get<citysDatasType>('https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-091',{
            queryParams:{
                Authorization:'CWB-6BEED9AA-24B5-4569-BB51-FC0BCFA7595B'
            }
        })

        const getIp = await $.fetch?.get<string>('https://api.ipify.org',{ returnType:'text' })
        const getGeo = await $.fetch?.get<{ latitude:number, longitude: number }>(`https://proxy-service-three.vercel.app/uts/get_geo/${btoa(getIp?.data!)}`)

        if(citysDatasRes?.data){
            citysDatasTemp = citysDatasRes.data.records?.Locations[0].Location

            optionListTemp = filterOptionData(citysDatasTemp,'citys')
        }


        if(citysBlocksDatasRes.length > 0){
            citysBlocksDatasTemp = $.sum($.maps(citysBlocksDatasRes,({ Location }:{ Location:citysBlocksDatasObjType[] }) => 
                $.sort($.maps(Location,(dataRow:citysBlocksDatasObjType) => ({
                    blockGeoCode:dataRow.Geocode,
                    blockName:dataRow.LocationName,
                    blockLat:dataRow.Latitude,
                    blockLon:dataRow.Longitude,
                    blockElement:dataRow.WeatherElement
                })),(a:repackCitysBlocksDatasObjType,b:repackCitysBlocksDatasObjType) => parseInt(a.blockGeoCode) - parseInt(b.blockGeoCode))
            ),(a:any[],b:repackCitysBlocksDatasObjType[]) => a.concat(b),[]) as repackCitysBlocksDatasObjType[]
        }

        setIniState(prevState => ({
            ...prevState,
            citysBlocksDatas:citysBlocksDatasTemp,
            citysDatas:citysDatasTemp,
            optionList:optionListTemp,
            currentLatLon: [getGeo?.data?.latitude!, getGeo?.data?.longitude!],
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
            let filterItem = $.filter(citysDatas,({ Geocode }:citysDatasObjType):any => cityCode === Geocode) as citysDatasObjType[]
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
        
        const [{ LocationName,WeatherElement,areaBlock,renderAreaBlock }] = data
        const [equalTemp,maxTemp,minTemp,,wetEqualPercent,maxFeelTemp,minFeelTemp,comferMaxPercent,comferMinPercent,,,rainPercent,weatherSignState,uiv,weatherDesc] = WeatherElement

        const filterCityObj:filterCityObjType | returnFilterCityObjType = { 
            [type]:{
                cityName: LocationName,
                minTemp: convertMatchSign<string>('temperatureSign',minTemp?.Time[0].ElementValue[0].MinTemperature),
                maxTemp: convertMatchSign<string>('temperatureSign',maxTemp?.Time[0].ElementValue[0].MaxTemperature),
                minFeelTemp: convertMatchSign<string>('temperatureSign',minFeelTemp?.Time[0].ElementValue[0].MinApparentTemperature),
                maxFeelTemp: convertMatchSign<string>('temperatureSign',maxFeelTemp?.Time[0].ElementValue[0].MaxApparentTemperature),
                equalTemp: convertMatchSign<string>('temperatureSign',equalTemp?.Time[0].ElementValue[0].Temperature),
                comferMinPerc: convertMatchSign<string>('percentSign',comferMinPercent?.Time[0].ElementValue[0].MinComfortIndex),
                comferMaxPerc: convertMatchSign<string>('percentSign',comferMaxPercent?.Time[0].ElementValue[0].MaxComfortIndex),
                rainNightPerc: convertMatchSign<string>('percentSign',rainPercent?.Time[1].ElementValue[0].ProbabilityOfPrecipitation),
                rainMoringPerc: convertMatchSign<string>('percentSign',rainPercent?.Time[0].ElementValue[0].ProbabilityOfPrecipitation),
                uivLevel: uiv?.Time[0].ElementValue[0].UVIndex,
                uivDesc: uiv?.Time[0].ElementValue[0].UVExposureLevel,
                wetEqualPerc: convertMatchSign<string>('percentSign',wetEqualPercent?.Time[0].ElementValue[0].RelativeHumidity),
                weatherSign: weatherSignState?.Time[0].ElementValue[0].Weather,
                weatherSignState: convertMatchSign<TSX>('transWeatherIcon',weatherSignState.Time[0].ElementValue[0].WeatherCode),
                weatherNightDesc: weatherDesc?.Time[1].ElementValue[0].WeatherDescription,
                weatherMoringDesc:weatherDesc?.Time[0].ElementValue[0].WeatherDescription,
                areaBlock
            },
            tomorrow:{
                cityName: LocationName,
                minTemp: convertMatchSign<string>('temperatureSign',minTemp.Time[3].ElementValue[0].MinTemperature),
                maxTemp: convertMatchSign<string>('temperatureSign',maxTemp.Time[2].ElementValue[0].MaxTemperature),
                minFeelTemp: convertMatchSign<string>('temperatureSign',minFeelTemp.Time[2].ElementValue[0].MinApparentTemperature),
                maxFeelTemp: convertMatchSign<string>('temperatureSign',maxFeelTemp.Time[2].ElementValue[0].MaxApparentTemperature),
                equalTemp: convertMatchSign<string>('temperatureSign',equalTemp.Time[2].ElementValue[0].Temperature),
                comferMinPerc: convertMatchSign<string>('percentSign',comferMinPercent.Time[2].ElementValue[0].MinComfortIndex),
                comferMaxPerc: convertMatchSign<string>('percentSign',comferMaxPercent.Time[2].ElementValue[0].MaxComfortIndex),
                rainNightPerc: convertMatchSign<string>('percentSign',rainPercent.Time[2].ElementValue[0].ProbabilityOfPrecipitation),
                rainMoringPerc: convertMatchSign<string>('percentSign',rainPercent.Time[3].ElementValue[0].ProbabilityOfPrecipitation),
                uivLevel: uiv.Time[1].ElementValue[0].UVIndex,
                uivDesc: uiv.Time[1].ElementValue[0]?.UVExposureLevel,
                wetEqualPerc: convertMatchSign<string>('percentSign',wetEqualPercent.Time[2].ElementValue[0].RelativeHumidity),
                weatherSign: weatherSignState.Time[1].ElementValue[0].Weather,
                weatherSignState: convertMatchSign<TSX>('transWeatherIcon',weatherSignState.Time[1].ElementValue[0].WeatherCode),
                weatherNightDesc: weatherDesc.Time[2].ElementValue[0].WeatherDescription,
                weatherMoringDesc: weatherDesc.Time[3].ElementValue[0].WeatherDescription,
                areaBlock
            },
        }[type] as returnFilterCityObjType

        if(areaBlock!.length > 0){
            const filterDate:Set<string> = new Set<string>()
            const [{ blockElement }] = areaBlock!

            const [tempForTown,,wetEqualPercentForTown,feelTempForTown,comferPercentForTown,,,,weatherSignStateForTown,] = blockElement

            const repackData = [
                ...weatherSignStateForTown.Time.map(({ StartTime: startTime, EndTime: endTime, ElementValue: elementValue }) => {
                    const [{ Weather:value1 , WeatherCode: value2 }] = elementValue
                    return { startTime,endTime,valueGroup:[value1!,convertMatchSign<string>('transWeatherIcon',value2)] }
                }),
                ...feelTempForTown.Time.map(({ DataTime: dataTime, ElementValue: elementValue }) => {
                    const [{ ApparentTemperature :value }] = elementValue
                    const startTime = dataTime!
                    return { startTime, endTime:'',valueGroup:[value!] }
                }),
                ...tempForTown.Time.map(({ DataTime: dataTime, ElementValue: elementValue }) => {
                    const [{ Temperature: value }] = elementValue
                    const startTime = dataTime!
                    return { startTime,endTime:'',valueGroup:[convertMatchSign<string>('temperatureSign',value)] }
                }),
                ...wetEqualPercentForTown.Time.map(({ DataTime: dataTime, ElementValue: elementValue }) => {
                    const [{ RelativeHumidity: value }] = elementValue
                    const startTime = dataTime!
                    return { startTime,endTime:'',valueGroup:[convertMatchSign<string>('percentSign',value)] }
                }),
                ...comferPercentForTown.Time.map(({ DataTime: dataTime, ElementValue: elementValue }) => {
                    const [{ ComfortIndex: value }] = elementValue
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
                
                const startTimeRepack = startTime.split('+')[0].replace('T', ' ')
                const endTimeRepack = endTimeTemp.split('+')[0].replace('T', ' ')
                const [date,] = startTimeRepack.split(' ')
                const [,month,day] = date.split('-')
                const [,endTimes] = endTimeRepack.split(' ')
                const endTime = endTimes ? endTimes.split(':').removeLast().join(':') : ''

                filterDate.append(`${month}-${day}`)

                return { startTime: startTimeRepack,endTime,weatherSign,weatherSignState,feelTemp,temp,wetEqualPercent,comferPercent }
            })
            
            const [obj1,obj2,] = $.maps($.createArray({ type:'new',item:filterDate }) as string[],(date:string) => ({
                date,
                descItem: $.filter(repackData,({ startTime }:{ startTime:string }):any => startTime.match(date)).map(item => ({
                    ...item,
                    startTime:item.startTime.split(' ')[1].split(':').removeLast().join(':')
                })).filter(row => row.endTime !== '')
            }))

            singleTownData = [obj1,obj2]
        }
       
        if(type === 'week'){
            const moringData:weekItemObjType[] = []
            const nightData:weekItemObjType[] = []

            $.createArray({ type:'fake',item:{ random: minTemp.Time.length }},(num:number) => {

                const [,month,date,hour,] = minTemp.Time[num].StartTime.replace('T','-').replace(/:/g,'-').split('+')[0].split('-')

                if (parseInt(hour) === 6) {
                    moringData.push({
                        date: `${month}-${date}`,
                        weatherDescState: convertMatchSign<TSX>('transWeatherIcon', weatherSignState.Time[num].ElementValue[0].WeatherCode),
                        weatherDesc: weatherSignState.Time[num].ElementValue[0].WeatherDescription!,
                        minTemp:  convertMatchSign<string>('temperatureSign',minTemp.Time[num].ElementValue[0].MinTemperature),
                        maxTemp: convertMatchSign<string>('temperatureSign',maxTemp.Time[num].ElementValue[0].MaxTemperature),
                        rainPerc:rainPercent.Time[num].ElementValue[0].ProbabilityOfPrecipitation!.trim() ? `降雨機率 ${convertMatchSign<string>('percentSign',rainPercent.Time[num].ElementValue[0].ProbabilityOfPrecipitation)}` : '氣象局暫無資料'
                    })
                } else if (parseInt(hour) === 18) {
                    nightData.push({
                        date: `${month}-${date}`,
                        weatherDescState: convertMatchSign<TSX>('transWeatherIcon',weatherSignState.Time[num].ElementValue[0].WeatherCode),
                        weatherDesc: weatherSignState.Time[num].ElementValue[0].WeatherDescription!,
                        minTemp: convertMatchSign<string>('temperatureSign',minTemp.Time[num].ElementValue[0].MinTemperature),
                        maxTemp: convertMatchSign<string>('temperatureSign',maxTemp.Time[num].ElementValue[0].MaxTemperature),
                        rainPerc: rainPercent.Time[num].ElementValue[0].ProbabilityOfPrecipitation!.trim() ? `降雨機率 ${convertMatchSign<string>('percentSign',rainPercent.Time[num].ElementValue[0].ProbabilityOfPrecipitation)}` : '氣象局暫無資料'
                    })
                }
            })

            weekItem = { moringData,nightData }
        }

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
                                                            <div className={index % 2 ? 'box-ii' : 'box-i'} key={index}>
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
                                                            index !== 0 && (
                                                                <div className={index % 2 ? 'box-i' : 'box-ii'} key={index}>
                                                                    <span>
                                                                        {weatherDescState}
                                                                        {weekWeatherDesc}
                                                                    </span>
                                                                    <span>{weekMinTemp} ~ {weekMaxTemp}</span>
                                                                    <span>{rainPerc}</span>
                                                                </div>
                                                            )
                                                        )).filter((item:weekItemObjType | boolean) => item !== false)}
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
                                                        <div className={index % 2 ? 'box-ii' : 'box-i'} key={index}>
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
                                                        index !== 0 && (
                                                            <div className={index % 2 ? 'box-i' : 'box-ii'} key={index}>
                                                                <span>
                                                                    {weatherDescState}
                                                                    {weekWeatherDesc}
                                                                </span>
                                                                <span>{weekMinTemp} ~ {weekMaxTemp}</span>
                                                                <span>{rainPerc}</span>
                                                            </div>
                                                        )
                                                    )).filter((item:weekItemObjType | boolean) => item !== false)}
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
            const [{ Geocode }] = $.filter(citysDatas,(item:citysDatasObjType):any => parseFloat(item.Latitude) + 0.02 >= lat && lon <= parseFloat(item.Longitude)) as citysDatasObjType[]
            choiceCity(Geocode,'citys')
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