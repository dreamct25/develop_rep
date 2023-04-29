<div class={ toggleModal ? "modal-outer toggle-modal" : "modal-outer"}>
    <div class="modal">
        <div class="modal-body">
            <slot name="line-1" />
            <slot />
        </div>
        <div class="modal-footer">
            <div class="comfirm">Confirm</div>
            <div class="cancle" on:click={setModalToggleProps}>Cancle</div>
        </div>
    </div>
</div>
<style lang="scss" scoped>
    .modal-outer{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,.7);
        opacity: 0;
        z-index: -1;
        transition: .7s ease;
        .modal{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            width: 100%;
            max-width: 400px;
            .modal-body{
                background-color: white;
                padding: 12px;
            }
        }
        &.toggle-modal{
            opacity: 1;
            z-index: 1;
        }
    }
</style>
<script lang="ts">
    export let toggleModal:boolean = false

    // like react
    export let setModalToggle:(status:boolean) => void = () => undefined;
    export let setModalToggleProps:() => void = () => setModalToggle(false)

    // like vue
    // import { createEventDispatcher } from 'svelte'
    // const emite = createEventDispatcher()
    // const setModalToggleProps:() => void = () => emite('setModalToggle',false)
</script>