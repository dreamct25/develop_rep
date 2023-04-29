<div>
    <div>{name}</div>
    <div>Route state : {JSON.stringify(params)}</div>
    <div>Route query : {JSON.stringify(urlQuery)}</div>
    <div class="add-count-btn" on:click={addCount}>Add Count</div>
    <div>Redux count : {$renderFromStore.PageIReducer.count}</div>
    <div>Redux arr : {JSON.stringify($renderFromStore.PageIReducer.arr)}</div>
</div>
<style lang="scss" scoped>
    .add-count-btn{
        margin: 5px 0;
        padding: 5px 0;
        width: 100px;
        text-align: center;
        background-color: black;
        border-radius: 5px;
        color: white;
        cursor: pointer;
        user-select: none;
    }
</style>
<script lang="ts">
    export let params:{[key:string]:any}
    export let urlQuery:{[key:string]:any}

    import { getContext } from 'svelte/internal'
    import { actionCreator } from '.'
    import routes from "../../router";

    const { name } = routes.getRoute(window.location.pathname)

    const { getReducer,setReducer,renderFromStore } = getContext<UtilesContextType>('utiles')
    
    $:state = getReducer(state => state.PageIReducer)
    
    const addCount:() => void = () => {
        setReducer(actionCreator,'setCount',state.count += 1)
        setReducer(actionCreator,'setArr',state.count)
    }

</script>