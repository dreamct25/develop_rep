<div>
    PageI {params.obj}
    <div>{inputText}</div>
    <input type="text" bind:value={val} />

    <div>
        {#each arr as { name,old,id }}
            <div on:click={() => {
                arr = arr.filter(item => item.id !== id)
            }}>{name} is {old} years old.</div>
        {/each}
            <div on:click={handler}>click</div>
    </div>
    {$store['PageI'].a}
</div>
<script lang="ts">
    // export let location
    export let params
    import { getContext } from 'svelte'
    import type { ContextType } from '../../App.svelte'
    import { actionCreator } from '.'

    const { getReducer,setReducer } = getContext<ContextType>('context')

    let val:string = ''
    let arr = [{
        id:1,
        name:'Jack',
        old:10
    },{
        id:2,
        name:'Alice',
        old:20
    },{
        id:3,
        name:'Bill',
        old:30
    }]

    $: inputText = `Input Val :${val}`

    const store = getReducer((reducers,stores) => ({
        ...reducers,
        ...stores
    }))

    const handler:() => void = () => {
        setReducer(actionCreator,'changeSome',1000)
    }

    
    // subscribe 取得當前 store 值
    // store.subscribe(reducer => storeData = reducer)

    // update 更新 store 值，與 set 雖然同為更新值，但差別在於 update 可抓取前一個設定值再做更新，但 set 是完全更新(重設)值
    // store.update(reducer => ({ ...reducer,a:1000 }))

    // set 更新 store 值，與 update 雖然同為更新值，但差別在於 update 可抓取前一個設定值再做更新，但 set 是完全更新(重設)值
    // store.set({ a:99, b:888 })

    // $: console.log(storeData)
</script>