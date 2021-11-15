import axios, { AxiosResponse } from "axios"
import { takeEvery, put, ForkEffect, PutEffect } from 'redux-saga/effects'
import { paramsObjType } from './types'
import actionType from './actionType'
import actionCreater from './actionCreator'

function* getItem(action:object):Generator<Promise<void | { error_code: any,reason: any }> | PutEffect<any>, void> {
    let temp: { [key: string]: any } = {}
    let url: string = ''
    let paramsObj: paramsObjType = {}
    const { searchVal, page,totalPage,haveAdult }: { [key: string]: any } = action
    let newData: { [key: string]: any }[] = []

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
            include_adult: haveAdult
        }
    }

    yield axios.get(url, { params: paramsObj }).then((res: AxiosResponse<never>) => temp = res.data).catch((ex: any) => temp = {
        error_code: ex.response.status,
        reason: ex.response.data.status_message
    })

    if (totalPage !== undefined) {
        // const date:number = Number(new Date(+new Date() + (8 * 60 * 60 * 1000)).toJSON().split('T')[0].split('-').join(''))
        for (let x: number = 1; x <= totalPage; x++) {
            yield axios.get(url, { params:{ ...paramsObj,page:x } }).then((res: AxiosResponse<{ results: { [key: string]: any }[] }>) => {
                let newDataTemp: { [key: string]: any }[] = []
                res.data.results.forEach((item: object) => newDataTemp.push(item))
                newDataTemp.forEach((item: object) => newData.push(item))
            // eslint-disable-next-line no-loop-func
            }).catch((ex: any) => temp = {
                error_code: ex.response.status,
                reason: ex.response.data.status_message
            })
        }

        yield put(actionCreater.setFullSearchTvItem(newData))
    }

    if ("error_code" in temp) {
        alert(`Error Code：${temp.error_code} \nError Message：${temp.reason}`)
    } else {
        yield put(actionCreater.setSearchTvItem(temp))
    }
}

function* allSagas(): Generator<ForkEffect<never>, void> {
    yield takeEvery(actionType.getSearchTvItem, getItem)
}

export default allSagas