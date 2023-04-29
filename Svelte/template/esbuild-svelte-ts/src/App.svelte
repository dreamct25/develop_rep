<!-- svelte-ignore a11y-click-events-have-key-events -->
<template lang="pug">
    .container
        h1 Hello Svelte & Esbuild !
        .count(class="{toggleColor ? 'toggle' : ''}") {count}
        |{ count }{ (count % 2) !== 0 ? ' is odd number' : " is't odd number" }
        br
        |{ count }{ (count % 2) === 0 ? ' is even number' : " is't even number" }
        Main(isColorChange="{toggleColor}")
        .add-btn(on:click="{addCount}") AddCount
</template>
<style lang="scss">
    .container{
        h1{
            color: red;
        }
        .count{
            color: red;
            transition: .5s ease;

            &.toggle{
                color: blue;
            }
        }
    }
</style>
<script lang="ts">
import Main from './Main.svelte'

let count:number = 0
let toggleColor:boolean = false

const addCount:() => void = () => {
    count++
    toggleColor = !toggleColor
}
</script>