import actionTypes from '../Main'
import { fromJS } from 'immutable'

const dataState = fromJS({
    originItems:[],
    newFilterItems:[],
    itemsTotal:0,
    searchVal:"",
    selectVal:"",
    searchBtnHasClick:false,
    selectItem:[{
        selectTypeZh:"音樂",
        selectTypeEn:'music'
    },{
        selectTypeZh:"音樂影音",
        selectTypeEn:'musicVideo'
    },{
        selectTypeZh:"電影",
        selectTypeEn:'movie'
    },{
        selectTypeZh:"podcast",
        selectTypeEn:'podcast'
    },{
        selectTypeZh:"電子書",
        selectTypeEn:'ebook'
    },{
        selectTypeZh:"App",
        selectTypeEn:'software'
    }],
    componentOption:[{
        currentSelect:"music",
        routeName:"/search_music",
    },{
        currentSelect:"musicVideo",
        routeName:"/search_music_video",
    },{
        currentSelect:"movie",
        routeName:"/search_movie"
    },{
        currentSelect:"podcast",
        routeName:"/search_podcast"
    },{
        currentSelect:"ebook",
        routeName:"/search_ebook"
    },{
        currentSelect:"software",
        routeName:"/search_software"
    }],
    isSearching:{
        searching:null,
        status:null
    }
})

const timeFormate = timeVal => {
    if (isNaN(timeVal) === true) timeVal = 0;
    let newTimeVal = timeVal / 1000
    let min = Math.floor(newTimeVal / 60);
    let sec = Math.floor(newTimeVal) - min * 60;
    min = min < 10 ? `0${min}` : min;
    sec = sec < 10 ? `0${sec}` : sec;
    return `${min} : ${sec}`;
}

const dateFormate = dateVal => dateVal.split("T")[0]

const kindFormate = kindEnStr => {
    let newKindInZh = ""
    const toZhArray = [{
        kindEn:"book",
        kindZh:"書籍"
    },{
        kindEn:"album",
        kindZh:"專輯"
    },{
        kindEn:"feature-movie",
        kindZh:"電影"
    },{
        kindEn:"interactive-booklet",
        kindZh:"互動書籍"
    },{
        kindEn:"music-video",
        kindZh:"音樂影音"
    },{
        kindEn:"podcast-episode",
        kindZh:"播客集"
    },{
        kindEn:"software",
        kindZh:"App"
    },{
        kindEn:"song",
        kindZh:"歌曲"
    }]

    toZhArray.forEach(key => {
        if(key.kindEn === kindEnStr) newKindInZh = key.kindZh
    })
    return newKindInZh
}

const currentDataOption = (data,state) => {
    let newData = []
    const dataKeys = [{
        selectVal:"music",
        dataKeysVal:[
            "artistId",
            "artistViewUrl",
            "trackId",
            "previewUrl",
            "collectionName",
            "collectionViewUrl",
            "primaryGenreName",
            "artistName",
            "kind",
            "releaseDate",
            "trackName",
            "artworkUrl100",
            "collectionId",
            "trackTimeMillis",
            "trackVeiwUrl"
        ]
    },{
        selectVal:"musicVideo",
        dataKeysVal:[
            "artistId",
            "artistViewUrl",
            "trackId",
            "previewUrl",
            "primaryGenreName",
            "artistName",
            "trackName",
            "releaseDate",
            "artworkUrl100",
            "trackTimeMillis",
            "trackViewUrl",
            "kind"
        ]
    },{
        selectVal:"movie",
        dataKeysVal:[
            "longDescription",
            "trackId",
            "previewUrl",
            "primaryGenreName",
            "contentAdvisoryRating",
            "artistName",
            "trackName",
            "artworkUrl100",
            "trackTimeMillis",
            "trackViewUrl",
            "releaseDate",
            "kind"
        ]
    },{
        selectVal:"podcast",
        dataKeysVal:[
            "trackId",
            "collectionName",
            "collectViewUrl",
            "primaryGenreName",
            "genres",
            "artistName",
            "kind",
            "trackName",
            "releaseDate",
            "artworkUrl600",
            "trackViewUrl",
            "feedUrl"
        ]
    },{
        selectVal:"ebook",
        dataKeysVal:[
            "artistId",
            "artistViewUrl",
            "trackId",
            "fileSizeBytes",
            "genres",
            "artistIds",
            "artistName",
            "kind",
            "releaseDate",
            "trackName",
            "artworkUrl100",
            "description",
            "trackViewUrl"
        ]
    },{
        selectVal:"software",
        dataKeysVal:[
            "artistId",
            "artistViewUrl",
            "minimumOsVesion",
            "trackId",
            "screenshotUrls",
            "trackContentRating",
            "primaryGenreName",
            "formattedPrice",
            "fileSizeBytes",
            "supportedDevices",
            "genres",
            "sellerName",
            "sellerUrl",
            "ipadScreenshotUrls",
            "kind",
            "releaseDate",
            "currentVersionReleaseDate",
            "trackName",
            "releaseNotes",
            "artworkUrl100",
            "artworkUrl512",
            "advisories",
            "description",
            "trackViewUrl",
            "averageUserRating",
            "averageUserRatingForCurrentVersion",
            "userRatingCount",
            "userRatingCountForCurrentVersion",
            "version"
        ]
    }]
    return currentDataOptionPart(data,dataKeys,state,newData)
}

const currentDataOptionPart = (data,dataKeys,state,newData) => {
    data.forEach(inputKey => {
        let newObj = {}
        dataKeys.forEach(matchKey => {
            if(matchKey.selectVal === state){
                Object.keys(inputKey).forEach(transKey => {
                    matchKey.dataKeysVal.forEach(matchDataKeys => {
                        if(transKey === matchDataKeys){
                            switch(transKey){
                                case 'trackTimeMillis':
                                    newObj[matchDataKeys] = timeFormate(inputKey[transKey])
                                    break
                                case 'releaseDate':
                                case 'currentVersionReleaseDate':
                                    newObj[matchDataKeys] = dateFormate(inputKey[transKey])
                                    break
                                case 'kind':
                                    newObj[matchDataKeys] = kindFormate(inputKey[transKey])
                                    break
                                default:
                                    newObj[matchDataKeys] = inputKey[transKey]
                            }
                        } 
                    })
                })
            }
        })
        newData.push(newObj)
    })
    return newData
}

const callBackState = (state = dataState,action) => {
    switch(action.type){
        case actionTypes.typesName.getItemTypes:
            let newFilterItems = currentDataOption(
                action.datas.results,
                state.get('selectVal'))
            return state.merge({
                originItems:fromJS(action.datas.results),
                newFilterItems:fromJS(newFilterItems),
                itemsTotal:fromJS(action.datas.resultCount)
            })
        case actionTypes.typesName.getVal:
            return state.set('searchVal',action.val)
        case actionTypes.typesName.getSelectVal:
            return state.set('selectVal',action.val)
        case actionTypes.typesName.searchBtnHasClick:
            return state.set('searchBtnHasClick',action.changeState)
        case actionTypes.typesName.searching:
        case actionTypes.typesName.searchingDefault:
            return state.merge({
                isSearching:{
                    searching:fromJS(action.searchObj.searching),
                    status:fromJS(action.searchObj.status)
                }  
            })
        default:
            return state
    }
}

export default callBackState