import axios, { AxiosResponse } from "axios"
import { takeEvery, put, PutEffect, ForkEffect } from 'redux-saga/effects'
import { paramsObjType } from './types'
import actionTypes from './actionType'
import actionCreater from './actionCreator'

function* getItem(action: object): Generator<Promise<{ error_code: any, reason: any; }> | PutEffect<any>, void, unknown> {
    let temp: { [key: string]: any } = {}
    let url: string = ''
    let paramsObj: paramsObjType = {}
    const { searchVal, page }: { [key: string]: any } = action

    if (searchVal === 'popular_tv') {
        url = "https://api.themoviedb.org/3/tv/popular"
        paramsObj = {
            api_key: "aa85ad102a35998adb8d48a1ff616189",
            language: "zh-TW",
            page: page,
        }
    } else {
        url = "https://api.themoviedb.org/3/search/tv"
        paramsObj = {
            api_key: "aa85ad102a35998adb8d48a1ff616189",
            language: "zh-TW",
            page: page,
            query: searchVal,
            include_adult: true
        }
    }

    yield axios.get(url, { params: paramsObj }).then((res: AxiosResponse<never>) => temp = res.data).catch((ex: any) => temp = {
        error_code: ex.response.status,
        reason: ex.response.data.status_message
    })

    if ("error_code" in temp) {
        alert(`Error Code：${temp.error_code} \nError Message：${temp.reason}`)
    } else {
        yield put(actionCreater.setSearchTvItem(temp))
    }
}

function* allSagas(): Generator<ForkEffect<never>, void, unknown> {
    yield takeEvery(actionTypes.getSearchTvItem, getItem)
}

export default allSagas