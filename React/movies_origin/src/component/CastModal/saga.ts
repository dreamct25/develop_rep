import axios, { AxiosResponse } from "axios"
import { takeEvery, put, PutEffect, ForkEffect } from 'redux-saga/effects'
import actionTypes from './actionType'
import actionCreater from './actionCreator'

function* getItem(action: object): Generator<Promise<{ error_code: any, reason: any; }> | PutEffect<any>, void, unknown> {
    let temp: { [key: string]: any } = {}
    const { val }: { [key: string]: any } = action

    yield axios.get(`https://api.themoviedb.org/3/person/${val}`, {
        params: {
            api_key: "aa85ad102a35998adb8d48a1ff616189",
            language: "zh-TW",
            append_to_response: 'combined_credits',
        }
    }).then((res: AxiosResponse<never>) => temp = res.data).catch((ex: any) => temp = {
        error_code: ex.response.status,
        reason: ex.response.data.status_message
    })

    if ("error_code" in temp) {
        alert(`Error Code：${temp.error_code} \nError Message：${temp.reason}`)
    } else {
        yield put(actionCreater.setSingleCastItem(temp))
    }
}

function* allSagas(): Generator<ForkEffect<never>, void, unknown> {
    yield takeEvery(actionTypes.getSingleCastItem, getItem)
}

export default allSagas