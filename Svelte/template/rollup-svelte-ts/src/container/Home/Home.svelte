<div>
    Home
    <!-- like react -->
    <Modal toggleModal={toggleModal} setModalToggle={setModalToggle}>
        abc
        <div slot="line-1">AAA</div>
    </Modal>
    <!-- like vue -->
    <!-- <Modal toggleModal={toggleModal} on:setModalToggle={setModalToggleEvent} /> -->
    <!-- or write like -->
    <!-- <Modal {toggleModal} {setModalToggle} /> -->
    <div on:click={setModalToggle.bind(this,true)}>showModal</div>
    <div bind:this={divRef} class="ancs">jjjjs</div>
    {#await fetchData}
        <div>loading</div>
    {:then value}
        <div>{value.title} 1</div>
    {:catch err}
        <div>{err}</div>
    {/await}
    <div>{@html '<div>1ffff</div>'}</div>
    <input type="checkbox" bind:group={checkboxValGroup} value="a">
    <input type="checkbox" bind:group={checkboxValGroup} value="b">
    <input type="checkbox" bind:group={checkboxValGroup} value="c">
    <input type="checkbox" bind:group={checkboxValGroup} value="d">
</div>
<script lang="ts">
    export let params
    import { Modal } from "../../component";
    let toggleModal:boolean = false
    let divRef:HTMLDivElement = undefined
    let checkboxValGroup:string[] = []

    console.log(params)
    $:console.log(checkboxValGroup)

    

    $: {
        if(divRef) console.log(divRef.textContent)
    }

    // like react
    const setModalToggle:(status:boolean) => void = status => {
        toggleModal = status
        console.log(status)
    }

    // setReducer<number>('PageIReducer','a',999123)

    // subscribe 取得當前 store 值
    // store.subscribe(reducer => storeData = reducer)
    // store.subscribe(reducer => storeData = reducer)

    // $: console.log(storeData)

    const fetchData:Promise<{[key:string]:any}> = fetch('https://jsonplaceholder.typicode.com/todos/1').then(res => res.json())
    
    // like vue
    // const setModalToggleEvent:(e:CustomEvent<boolean>) => void = e => {
    //     setModalToggle(e.detail)
    // }
</script>