<div class="container">
    <div class="txt">
        Parcel & Svelte3
    </div>
    <Main />

    <!-- use svelte origin method -->
    <!-- <div on:click={() => toggModal = true}>open</div> -->
    <div class="open-modal-btn" on:click={toggModalFn.bind(undefined,true)}>Open Modal</div>
    <!-- use svelte origin method -->
    <!-- <Modal toggModal={toggModal} on:toggModalProps="{toggModalFn}" /> -->
    <Modal toggModal={toggModal} toggModalProps={toggModalFn} />
</div>

<style lang="scss">
.container{
    .txt{
        color: red;
        font-size: 30px;
    }
    .open-modal-btn{
        padding: 5px 0;
        width: 100px;
        text-align: center;
        background-color: black;
        border-radius: 5px;
        color: white;
        cursor: pointer;
        user-select: none;
    }
}
</style>
<script lang="ts">
    import { setContext } from 'svelte/internal'
    import { store, dispatch, renderFromStore } from '../store'
    import Main from './Main.svelte'
    import Modal from './Modal.svelte'

    setContext<UtilesContextType>('utiles',{
        getReducer:callBack => callBack.call(callBack,store!),
        setReducer:(actionCreator,actionMethod,value) => dispatch(value ? actionCreator[actionMethod](value) : actionCreator[actionMethod]()),
        renderFromStore:renderFromStore
    })

    let toggModal:boolean = false

    // use svelte origin method
    // const toggModalFn:(e:CustomEvent<{ status:boolean }>) => void = e => {
    //     toggModal = e.detail.status
    // }

    const toggModalFn:(status:boolean) => void = status => {
        toggModal = status
    }
</script>