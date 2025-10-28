<div class={loadingStatus ? 'loading-outer active' : 'loading-outer'}>
    <div class="loading">
        <svg class="fsg" width="100%" height="100%">
            <defs>
              <linearGradient id="a1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="10%" stop-color="rgb(0,162,250)" />
                <stop offset="50%" stop-color="rgb(0,90,250)" stop-opacity=".5" />
                <stop offset="70%" stop-color="rgb(0,0,0)" stop-opacity="0" />
                <stop offset="90%" stop-color="rgb(0,0,0)" stop-opacity="0" />
                <stop offset="100%" stop-color="rgb(0,0,0)" stop-opacity="0" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="80" stroke-width="6" stroke="url(#a1)" fill="none">
            </circle>
        </svg>
        <div class="loading-text">Loading</div>
    </div>
</div>
<style lang="scss" scoped>
    .loading-outer{
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

        .loading{
            svg{
                position: absolute;
                top: 50%;
                left: 50%;
                width: 200px;
                height: 198px;
                transform:translate(-50%,-50%) rotate(0deg);
                animation: loadingFram 1s linear infinite;
            }

            @keyframes loadingFram {
                0%{
                    transform:translate(-50%,-50%) rotate(0deg);
                }
                100%{
                    transform:translate(-50%,-50%) rotate(360deg);
                }
            }
        }

        .loading-text{
            position: absolute;
            top: 50%;
            left: 50%;
            transform:translate(-50%,-50%);
            color: white;
            font-size: 18px;
        }

        &.active{
            opacity: 1;
            z-index: 10;
        }
    }
</style>
<script lang="ts">
    let { loadingStatus = false } = $props()
</script>