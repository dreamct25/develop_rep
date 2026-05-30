import { type initStoreType as HomeReducerType } from '@/pages/Home'
import { type StateCreator } from 'zustand'

export interface InitStoreAssimbleType {
    HomeReducer: HomeReducerType
}

export type ReducerAssimbleType<T> = StateCreator<InitStoreAssimbleType, [], [], T>