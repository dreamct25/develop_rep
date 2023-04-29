<div>
    <div>{name}</div>
    <div>Route query : {JSON.stringify(urlQuery)}</div>
    <div class="member-list">
        <div class="title">Redux member list with input</div>
        <input type="text" placeholder="typeing something ..." on:keydown={addMember}>
        <div class="list">
            {#each $renderFromStore.PageIIReducer.memberList as item, index}
                <div>{index + 1}. {item}</div>
            {/each}
        </div>
    </div>
</div>
<style lang="scss" scoped>
    .member-list{
        .title{
            font-size: 18px;
            margin: 5px 0;
        }
        input{
            color: white;
            font-size: 18px;
            padding: 5px;
            outline: none;
            border: none;
            border-radius: 5px;
            background-color: transparent;
            box-shadow: 0 0 2px 1px rgba(255,255,255,.7);
            &::placeholder{
                color: rgba(255,255,255,.7);
                padding: 0 5px;
            }
        }
        .list{
            div{
                margin: 5px 0;
            }
        }
    }
</style>

<script lang="ts">
    export let urlQuery:{[key:string]:any}
    import { getContext } from 'svelte/internal'
    import { actionCreator } from '.'
    import routes from "../../router";
    const { name } = routes.getRoute(window.location.pathname)

    const { setReducer,renderFromStore } = getContext<UtilesContextType>('utiles')

    const addMember:(event:Event) => void = event => {
        const { keyCode } = event as KeyboardEvent;
        const input = event.target as HTMLInputElement;

        if(keyCode === 13){
            setReducer(actionCreator,'setMember',input.value)
            input.value = ''
        }
    }
</script>