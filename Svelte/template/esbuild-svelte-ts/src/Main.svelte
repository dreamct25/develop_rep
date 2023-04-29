<!-- svelte-ignore a11y-click-events-have-key-events -->
<template lang="pug">
    div Color has { isColorChange ? 'changed' : 'recovered' }
    .routes-layout
        Viewport("{router}")
    .btn-group
        div(on:click="{goPage.bind(this,'/pageI')}") Go PageI
        div(on:click="{goPage.bind(this,'/pageII')}") Go PageII
</template>
<script lang="ts">
    import { Viewport } from '@danielsharkov/svelte-router/src/'
    import router from './router'
    export let isColorChange:boolean = false

    const goPage:(path:string) => void = path => {}

</script>