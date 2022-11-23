export interface citysDatasObjType {
    geocode:string
    lat:string
    locationName:string
    lon:string
    weatherElement:{
        description:string
        elementName:string
        time:{
            startTime:string,
            endTime:string,
            elementValue:{ value:string,measures:string }[]
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
    blockElement:{
        description:string
        elementName:string
        time:{
            startTime:string,
            endTime:string,
            dataTime?:string,
            elementValue:{ value:string,measures:string }[]
        }[]
    }[]
}

export interface citysDatasType {
    records:{
        locations:{
            location: citysDatasObjType[]
        }[]
    }
}

export interface citysBlocksDatasType {
    records:{
        locations:{
            location: citysBlocksDatasObjType[]
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