<template lang="pug">
.error-page 
    .title
        i.far.fa-times-circle
        |Error 404
        br
        |操作錯誤
</template>
<style lang="scss" scoped>
    .error-page{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgb(30,30,30);

        .title{
            color: white;
            font-size: 33px;
            font-weight: bold;
            text-align: center;

            i{
                margin-right: 10px;
                color: rgb(255,51,0);
            }
        }
    }
</style>