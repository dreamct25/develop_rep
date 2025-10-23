<div class={fileIn ? 'file-frame-outer active' : 'file-frame-outer'}>
    <div class="file-frame">
        <div class="file-frame-text">
            Upload File
        </div>
    </div>
</div>
<style lang="scss" scoped>
    .file-frame-outer{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(30,30,30,.5);
        opacity: 0;
        z-index: -1;
        backdrop-filter: blur(10px);
        transition: .5s ease;

        .file-frame{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: 20px;
            border: #ddd 4px dashed;
            border-radius: 2px;

            .file-frame-text{
                position: absolute;
                top: 50%;
                left: 50%;
                transform:translate(-50%,-50%);
                color: white;
                font-size: 30px;
                font-weight: bold;
                letter-spacing: 5px;
            }
        }


        &.active{
            opacity: 1;
            z-index: 10;
        }
    }
</style>
<script lang="ts">
    export let fileIn:boolean = false
</script>