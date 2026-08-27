import { effect, computed } from '@angular/core'
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals'
import { type ValidationError } from '@angular/forms/signals';
import type { modalContentType, dataType } from '@/app/types'

interface InitStoreState {
    currentSingleName: string,
    currentQueryStr: string,
    isShowGPSModalStatus: boolean,
    component: {
        filterBox: {
            forceRenderCount: number,
            searhAction: boolean,
            modalToggle: boolean,
            modalContent: modalContentType,
            checkBoxToggle: boolean,
            selectListValI: {
                columnText: string, 
                columnName: string, 
                currentIndex: number
            },
            selectListValII: {
                columnText: string, 
                columnName: string, 
                currentIndex: number
            },
            searchErrorMessages: ValidationError.WithFieldTree,
            searchCheckStatusCode: number
        },
        collect: {
            list: dataType[],
            isRemove: boolean,
            isAdd: boolean
        }
    }
}

const initState: InitStoreState = {
    currentSingleName: '',
    currentQueryStr: '',
    isShowGPSModalStatus: false,
    component: {
        filterBox: {
            forceRenderCount: -1,
            searhAction: false,
            modalToggle: false,
            modalContent: {
                msTitle: '',
                msContent: '',
                msItem: {}
            },
            checkBoxToggle: false,
            selectListValI: {
                columnText: '全部', 
                columnName: '', 
                currentIndex: 0
            },
            selectListValII: {
                columnText: '不限定', 
                columnName: '', 
                currentIndex: 0
            },
            searchErrorMessages: undefined,
            searchCheckStatusCode: -1
        },
        collect: {
            list: JSON.parse(localStorage.getItem("hotelCollect") || JSON.stringify([])),
            isRemove: false,
            isAdd: false
        }
    }
}

const store = signalStore(
    { providedIn: 'root' },
    withState(initState),
    withComputed(currentStore => ({
        filterBox: computed(() => currentStore.component().filterBox),
        collect: computed(() => currentStore.component().collect)
    })),
    withMethods(currentStore => ({
        setCurrentSingleName: (val: InitStoreState['currentSingleName']) => {
            patchState<InitStoreState>(currentStore, { currentSingleName: val });
        },
        setCurrentQueryStr: (val: InitStoreState['currentQueryStr']) => {
            patchState<InitStoreState>(currentStore, { currentQueryStr: val });
        },
        setIsShowGPSModalStatus: (val: InitStoreState['isShowGPSModalStatus']) => {
            patchState<InitStoreState>(currentStore, { isShowGPSModalStatus: val });
        },
        setCollectIsRemove: (val: InitStoreState['component']['collect']['isRemove']) => {

            patchState<InitStoreState>(currentStore, state => ({
                component: {
                    ...state.component,
                    collect: {
                        ...state.component.collect,
                        isRemove: val
                    }
                }
            }));
        },
        setCollectIsAdd: (val: InitStoreState['component']['collect']['isAdd']) => {

            patchState<InitStoreState>(currentStore, state => ({
                component: {
                    ...state.component,
                    collect: {
                        ...state.component.collect,
                        isAdd: val
                    }
                }
            }));
        },
        setCollectList(val: InitStoreState['component']['collect']['list']) {

            localStorage.setItem("hotelCollect", 
                JSON.stringify(val)
            )

            patchState<InitStoreState>(currentStore, state => ({
                component: {
                    ...state.component,
                    collect: {
                        ...state.component.collect,
                        list: val
                    }
                }
            }));
        },
        setFilterBoxForceRenderCount: (val: InitStoreState['component']['filterBox']['forceRenderCount']) => {

            patchState<InitStoreState>(currentStore, state => ({
                component: {
                    ...state.component,
                    filterBox: {
                        ...state.component.filterBox,
                        forceRenderCount: val
                    }
                }
            }));
        },
        setFilterBoxSearhAction: (val: InitStoreState['component']['filterBox']['searhAction']) => {

            patchState<InitStoreState>(currentStore, state => ({
                component: {
                    ...state.component,
                    filterBox: {
                        ...state.component.filterBox,
                        searhAction: val
                    }
                }
            }));
        },
         setFilterBoxModalToggle: (val: InitStoreState['component']['filterBox']['modalToggle']) => {

            patchState<InitStoreState>(currentStore, state => ({
                component: {
                    ...state.component,
                    filterBox: {
                        ...state.component.filterBox,
                        modalToggle: val
                    }
                }
            }));
        },
        setFilterBoxModalContent: (val: InitStoreState['component']['filterBox']['modalContent']) => {

            patchState<InitStoreState>(currentStore, state => ({
                component: {
                    ...state.component,
                    filterBox: {
                        ...state.component.filterBox,
                        modalContent: val
                    }
                }
            }));
        },
        setFilterBoxCheckBoxToggle: (val: InitStoreState['component']['filterBox']['checkBoxToggle']) => {

            patchState<InitStoreState>(currentStore, state => ({
                component: {
                    ...state.component,
                    filterBox: {
                        ...state.component.filterBox,
                        checkBoxToggle: val
                    }
                }
            }));
        },
        setFilterBoxSelectListValI: (val: InitStoreState['component']['filterBox']['selectListValI']) => {

            patchState<InitStoreState>(currentStore, state => ({
                component: {
                    ...state.component,
                    filterBox: {
                        ...state.component.filterBox,
                        selectListValI: val
                    }
                }
            }));
        },
        setFilterBoxSelectListValII: (val: InitStoreState['component']['filterBox']['selectListValII']) => {

            patchState<InitStoreState>(currentStore, state => ({
                component: {
                    ...state.component,
                    filterBox: {
                        ...state.component.filterBox,
                        selectListValII: val
                    }
                }
            }));
        },
        setFilterBoxSearchErrorMessages: (val: InitStoreState['component']['filterBox']['searchErrorMessages']) => {

            patchState<InitStoreState>(currentStore, state => ({
                component: {
                    ...state.component,
                    filterBox: {
                        ...state.component.filterBox,
                        searchErrorMessages: val
                    }
                }
            }));
        },
        setFilterBoxSearchCheckStatusCode: (val: InitStoreState['component']['filterBox']['searchCheckStatusCode']) => {

            patchState<InitStoreState>(currentStore, state => ({
                component: {
                    ...state.component,
                    filterBox: {
                        ...state.component.filterBox,
                        searchCheckStatusCode: val
                    }
                }
            }));
        },
    }))
)

export default store