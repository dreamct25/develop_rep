import axios, { AxiosResponse } from "axios"
import { takeEvery, put, PutEffect, ForkEffect } from 'redux-saga/effects'
import actionType from './actionType'
import actionCreater from './actionCreator'

function* getItem(action: object):Generator<Promise<void | { error_code: any,reason: any }> | PutEffect<any>, void> {
    let temp: { [key: string]: any } = {}
    let newData: { [key: string]: any }[] = []
    const { searchVal, page,totalPage  }: { [key: string]: any } = action

    yield axios.get("https://api.themoviedb.org/3/search/person", {
        params: {
            api_key: "aa85ad102a35998adb8d48a1ff616189",
            language: "zh-TW",
            page: page,
            query: searchVal,
            include_adult: true
        }
    }).then((res: AxiosResponse<never>) => temp = res.data).catch((ex: any) => temp = {
        error_code: ex.response.status,
        reason: ex.response.data.status_message
    })

    if (totalPage !== undefined) {
        // const date:number = Number(new Date(+new Date() + (8 * 60 * 60 * 1000)).toJSON().split('T')[0].split('-').join(''))
        for (let x: number = 1; x <= totalPage; x++) {
            yield axios.get("https://api.themoviedb.org/3/search/person", { 
                params:{ 
                    api_key: "aa85ad102a35998adb8d48a1ff616189",
                    language: "zh-TW",
                    page: x,
                    query: searchVal,
                    include_adult: true 
                } 
            }).then((res: AxiosResponse<{ results: { [key: string]: any }[] }>) => {
                let newDataTemp: { [key: string]: any }[] = []
                res.data.results.forEach((item: object) => newDataTemp.push(item))
                newDataTemp.forEach((item: object) => newData.push(item))
            // eslint-disable-next-line no-loop-func
            }).catch((ex: any) => temp = {
                error_code: ex.response.status,
                reason: ex.response.data.status_message
            })
        }

        yield put(actionCreater.setFullSearchActorItem(newData))
    }

    if ("error_code" in temp) {
        alert(`Error Code：${temp.error_code} \nError Message：${temp.reason}`)
    } else {
        yield put(actionCreater.setSearchActorItem(temp))
    }
}

function* allSagas(): Generator<ForkEffect<never>, void> {
    yield takeEvery(actionType.getSearchActorItem, getItem)
}

export default allSagas