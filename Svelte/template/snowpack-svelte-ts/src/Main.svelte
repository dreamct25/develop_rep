<div class="container">
    <div class="title">Main component</div>
    <div>{num}</div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={goPage.bind(undefined,'/pageI')}>Go Page I</div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={goPage.bind(undefined,'/pageII')}>Go Page II</div>
    <div class="route-container">
        <Router {routes} />
    </div>
</div>
<style lang="scss" scoped>
.container{
    .title{
        color: red;
    }
}
</style>
<script lang="ts">
    export let num:number = 0
    import Router,{ push } from 'svelte-spa-router'
    import routes from './router'
    
    const goPage:(path:string) => void = path => {
        push(path)
    }
</script>