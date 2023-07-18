<!-- svelte-ignore a11y-click-events-have-key-events -->
<template lang="pug">
    div Color has { isColorChange ? 'changed' : 'recovered' }
    .routes-layout
        +if('router.length > 0')
            Router(url="/")
                +each('router as item')
                    Route(path="{item.path}",component="{item.component}")
    .btn-group
        div(on:click="{goPage.bind(this,'/pageI')}") Go PageI
        div(on:click="{goPage.bind(this,'/pageII')}") Go PageII
</template>
<script lang="ts">
    import { Router,Route,navigate } from 'svelte-routing'
    import router from './router'
    export let isColorChange:boolean = false

    const goPage:(path:string) => void = path => {
        navigate(path,{ replace:true })
    }

</script>