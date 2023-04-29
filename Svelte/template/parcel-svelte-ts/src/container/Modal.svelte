<div class={toggModal ? "modal-outer active" : "modal-outer"}>
    <div class="modal">
        <div class="modal-header">Some text</div>
        <hr>
        <div class="modal-body">
            Open !
        </div>
        <hr>
        <!-- use svelte origin method -->
        <!-- <div on:click={() => dispatchEvent('toggModalProps',{ status:false })}>close</div> -->
        
        <!-- use like react -->
        <div class="modal-footer">
            <div on:click={useToggleModalProps.bind(undefined,false)}>Close</div>
            <div on:click={useToggleModalProps.bind(undefined,false)}>Confirm</div>
        </div>
    </div>
</div>
<style lang="scss">
    .modal-outer{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(30,30,30,.5);
        backdrop-filter: blur(10px);
        opacity: 0;
        z-index: -1;
        transition: .5s ease;

        .modal{
            position: absolute;
            top: 50%;
            left: 50%;
            width: 500px;
            max-width: 90%;
            transform: translate(-50%,-50%) scale(1.1);
            background-color: white;
            border-radius: 5px;
            transition: .5s ease;
            .modal-header{
                padding: 12px;
                font-size: 18px;
                font-weight: bold;
            }
            .modal-body{
                padding: 12px;
                text-align: center;
            }
            .modal-footer{
                display: flex;
                div{
                    width: 50%;
                    text-align: center;
                    padding: 10px 0;
                    cursor: pointer;
                    user-select: none;
                }
            }
            hr{
                margin: 0;
            }
        }

        &.active{
            opacity: 1;
            z-index: 2;
            .modal{
                transform: translate(-50%,-50%) scale(1);
            }
        }
    }
</style>
<script lang="ts">
    // use svelte origin method
    // import { createEventDispatcher } from 'svelte'

    export let toggModal:boolean = false

    // use like react,must use let that can replace declare method to props method
    export let toggModalProps:(status:boolean) => void

    // use svelte origin method
    // const dispatchEvent = createEventDispatcher()

    const useToggleModalProps:(status:boolean) => void = status => {
        toggModalProps(status)
    }
</script>