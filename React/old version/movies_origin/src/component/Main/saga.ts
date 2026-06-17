import axios, { AxiosResponse } from "axios"
import { takeEvery, put, PutEffect, ForkEffect } from 'redux-saga/effects'
import actionTypes from './actionType'
import actionCreater from './actionCreator'

function* getItem(action: object): Generator<Promise<{ error_code: any, reason: any; }> | PutEffect<any>, void, unknown> {
    let temp: { [key: string]: any } = {}
    let { val }: { [key: string]: any } = action
    yield axios.get(`https://api.themoviedb.org/3/${val}/popular`, {
        params: {
            api_key: "aa85ad102a35998adb8d48a1ff616189",
            language: "zh-TW",
            page: 1
        }
    }).then((res: AxiosResponse<never>) => temp = res.data).catch((ex: any) => temp = {
        error_code: ex.response.status,
        reason: ex.response.data.status_message
    })

    if ("error_code" in temp) {
        alert(`Error Code：${temp.error_code} \nError Message：${temp.reason}`)
    } else {
        yield put(actionCreater.postItemVal(temp, val))
    }
}

function* allSagas(): Generator<ForkEffect<never>, void, unknown> {
    yield takeEvery(actionTypes.setHotItemType, getItem)
}

export default allSagas