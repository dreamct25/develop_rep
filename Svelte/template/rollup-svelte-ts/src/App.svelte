<main>
	<Main />
</main>
<script context="module" lang="ts">
	import type { reducerAssemble } from './store/reducerAssembleTypes';

	interface StoreTypes {
		subscribe: (run: (value: unknown) => void, invalidate?: (value?: unknown) => void) => () => void;
    	dispatch: any;
	}

	interface CombindTypes extends StoreTypes,reducerAssemble {}

	export interface ContextType {
		getReducer:(callBack:(state:reducerAssemble,stores:StoreTypes) => CombindTypes) => CombindTypes
		setReducer:<T>(actionCreator:{[key:string]:any},propertyName:string,value:T) => void
	}
</script>
<script lang="ts">
	import { setContext } from 'svelte'
	import store from './store';
	import { Main } from './container';

	const getReducer:(callBack:(state:reducerAssemble,stores:StoreTypes) => CombindTypes) => CombindTypes = callBack => {
		let storeData = {}
		store.subscribe(reducers => storeData = reducers)
		return callBack.call(callBack,storeData,store)
	}

	const setReducer:<T>(actionCreator:{[key:string]:any},propertyName:string,value:T) => void = (actionCreator,propertyName,value) => {
		store.dispatch(actionCreator[propertyName](value))
	}

	setContext<ContextType>('context',{
		getReducer,
		setReducer
	})

	

	// setContext<ContextType>('abc',{
	// 	setState:(obj) => {
	// 		// const newObj = JSON.parse(JSON.stringify(obj))
	// 		const callBack:(fn:(objx:typeof obj) => typeof obj) => void = fn => {
	// 			obj = fn.call(fn,obj)
	// 			console.log(obj)
	// 		}
	// 		// console.log(obj)
	// 		return [obj,callBack]
	// 	}
	// })
</script>