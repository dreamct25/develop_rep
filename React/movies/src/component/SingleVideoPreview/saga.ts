import axios, { AxiosResponse } from "axios"
import { takeEvery, put, PutEffect, ForkEffect } from 'redux-saga/effects'
import actionTypes from './actionType'
import actionCreater from './actionCreator'

function* getSingleVideoItem(action: object): Generator<Promise<{ error_code: any, reason: any; }> | PutEffect<any>, void, unknown> {
    let temp: { [key: string]: any } = {}
    const { id, types }: { [key: string]: any } = action
    yield axios.get(`https://api.themoviedb.org/3/${types}/${id}`, {
        params: {
            api_key: "aa85ad102a35998adb8d48a1ff616189",
            language: "zh-TW",
            append_to_response: "credits"
        }
    }).then((res: AxiosResponse<never>) => temp = res.data).catch((ex: any) => temp = {
        error_code: ex.response.status,
        reason: ex.response.data.status_message
    })

    if ("error_code" in temp) {
        alert(`Error Code：${temp.error_code} \nError Message：${temp.reason}`)
    } else {
        yield put(actionCreater.getSingleVideo(temp))
    }
}

function* getSingleVideoUrl(action: object): Generator<Promise<void | { error_code: any, reason: any }> | PutEffect<any>, void, unknown> {
    let temp: { [key: string]: any } | { [key: string]: any }[] = []
    const { id, types }: { [key: string]: any } = action
    yield axios.get(`https://api.themoviedb.org/3/${types}/${id}/videos`, {
        params: {
            api_key: "aa85ad102a35998adb8d48a1ff616189",
        }
    }).then((res: AxiosResponse<{ results: { name: string }[] }>) => {
        temp = {
            id: id,
            results: res.data.results.filter(({ name }: { name: string }) => name.match('Official') || name.match('Trailer'))
        }
    }).catch((ex: any) => temp = {
        error_code: ex.response.status,
        reason: ex.response.data.status_message
    })

    if ("error_code" in temp) {
        alert(`Error Code：${temp.error_code} \nError Message：${temp.reason}`)
    } else {
        yield put(actionCreater.getSingleVideoUrl(temp))
    }
}

function* getSingleReiview(action: object): Generator<Promise<void | { error_code: any, reason: any }> | PutEffect<any>, void, unknown> {
    let temp: { [key: string]: any } | { [key: string]: any }[] = []
    const { id, types }: { [key: string]: any } = action
    yield axios.get(`https://api.themoviedb.org/3/${types}/${id}/reviews`, {
        params: {
            api_key: 'aa85ad102a35998adb8d48a1ff616189'
        }
    }).then((res: AxiosResponse) => {
        temp = res.data
    }).catch((ex: any) => temp = {
        error_code: ex.response.status,
        reason: ex.response.data.status_message
    })

    if ("error_code" in temp) {
        alert(`Error Code：${temp.error_code} \nError Message：${temp.reason}`)
    } else {
        yield put(actionCreater.getSingleReview(temp))
    }
}

function* allSagas(): Generator<ForkEffect<never>, void, unknown> {
    yield takeEvery(actionTypes.postId, getSingleVideoItem)
    yield takeEvery(actionTypes.postId, getSingleVideoUrl)
    yield takeEvery(actionTypes.postId, getSingleReiview)
}

export default allSagas