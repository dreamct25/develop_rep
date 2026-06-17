import { type initStoreType as HomeReducerType } from '@/pages/Home'
import { type initStoreType as LeftBarReducerType } from '@/component/LeftBar'
import { type StateCreator } from 'zustand'

export interface InitStoreAssimbleType {
    HomeReducer: HomeReducerType,
    LeftBarReducer: LeftBarReducerType
}

export type ReducerAssimbleType<T> = StateCreator<InitStoreAssimbleType, [], [], T>