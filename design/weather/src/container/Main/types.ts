export interface citysDatasObjType {
    Geocode:string
    Latitude:string
    LocationName:string
    Longitude:string
    WeatherElement:{
        ElementName:string
        Time:{
            DataTime?: string
            StartTime:string,
            EndTime:string,
            ElementValue:{ 
                /** 平均溫度 */
                Temperature?:string,
                /** 最高溫度 */
                MaxTemperature?: string,
                /** 最低溫度 */
                MinTemperature?: string,
                /** 平均相對濕度 */
                RelativeHumidity?: string,
                /** 體感溫度 */
                ApparentTemperature?: string,
                /** 最高體感溫度 */
                MaxApparentTemperature?: string,
                /** 最低體感溫度 */
                MinApparentTemperature?: string,
                /** 舒適度指數 */
                ComfortIndex?: string
                /** 最大舒適度指數 */
                MaxComfortIndex?: string,
                /** 最小舒適度指數 */
                MinComfortIndex?: string,
                /** 12小時降雨機率 */
                ProbabilityOfPrecipitation?: string,
                /** 天氣現象 */
                Weather?: string,
                /** 天氣現象代號 */
                WeatherCode?: string
                /** 紫外線指數 */
                UVIndex?: string,
                /** 紫外線指數說明 */
                UVExposureLevel?: string,
                /** 天氣預報綜合描述 */
                WeatherDescription?: string
            }[]
        }[]
    }[],
    areaBlock?:repackCitysBlocksDatasObjType[],
    renderAreaBlock?:repackCitysBlocksDatasObjType[]
}

export interface citysBlocksDatasObjType extends citysDatasObjType {}

export interface repackCitysBlocksDatasObjType {
    blockGeoCode:string,
    blockName:string,
    blockLat:string,
    blockLon:string,
    blockElement: citysDatasObjType['WeatherElement']
}

export interface citysDatasType {
    records:{
        Locations:{
            Location: citysDatasObjType[]
        }[]
    }
}

export interface citysBlocksDatasType {
    records:{
        Locations:{
            Location: citysBlocksDatasObjType[]
        }[]
    }
}

export interface optionListObjType {
    posGeoCode:string,
    posName:string
}

export interface returnFilterCityObjType {
    cityName: string,
    minTemp: string,
    maxTemp: string,
    minFeelTemp: string,
    maxFeelTemp: string,
    equalTemp: string,
    comferMinPerc: string,
    comferMaxPerc: string,
    rainNightPerc: string,
    rainMoringPerc: string,
    uivLevel: string,
    uivDesc: string,
    wetEqualPerc: string,
    weatherSign: string,
    weatherSignState: TSX,
    weatherNightDesc: string,
    weatherMoringDesc: string,
    areaBlock: repackCitysBlocksDatasObjType[]
}

export interface filterCityObjType {
    today:returnFilterCityObjType
    tomorrow:returnFilterCityObjType
}

export interface descItemType {
    startTime:string,
    endTime:string,
    weatherSign:string,
    weatherSignState:string,
    feelTemp:string,
    temp:string,
    wetEqualPercent:string,
    comferPercent:string
}

export interface singleTownObjType {
    date:string,
    descItem:descItemType[]
}

export interface weekItemObjType {
    date: string,
    weatherDescState: TSX
    weatherDesc: string,
    minTemp:  string,
    maxTemp: string,
    rainPerc: string
}

export interface weekItemType {
    moringData:weekItemObjType[],
    nightData:weekItemObjType[]
}