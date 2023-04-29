<div>
    mains
    {num}
    <div class="go-page-btn" on:click={goPage.bind(undefined,'Page_I')}>Go PageI</div>
    <div class="go-page-btn" on:click={goPage.bind(undefined,'Page_II')}>Go PageII</div>
    <div class="routes">
        <div class="title">Route Layout</div>
        <Viewport {router} />
    </div>
</div>
<style lang="scss" scoped>
    .routes{
        .title{
            margin-bottom: 10px;
            font-size: 20px;
        }
        margin: 10px 0;
        padding: 5px 10px;
        background-color: blue;
        border-radius: 5px;
        width: 50%;
        color: white;
    }
    .go-page-btn{
        padding: 5px 0;
        width: 100px;
        text-align: center;
        background-color: black;
        border-radius: 5px;
        color: white;
        cursor: pointer;
        user-select: none;
        &:nth-of-type(1){
            margin-bottom: 5px;
        }
    }
</style>
<script lang="ts">
    export let num:number | undefined = 99
    import { Viewport } from '@danielsharkov/svelte-router/src/'
    import router from '../router'

    const goPage:(pathName:string) => void = pathName => {
        if(pathName === 'pageII'){
            router.push(pathName,undefined,{ a:9999 } as any)
        } else {
            router.push(pathName,{ a:10 } as any,{ a:20 } as any)
        }
        
    }
</script>