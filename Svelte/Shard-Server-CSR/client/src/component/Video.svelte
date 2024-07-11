<div class={`video-outer ${useMediaM3U8Path ? 'active' : ''}`}>
    <div class="player-outer">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="close-btn" on:click={closeAction}>
            <FontAwesomeIcon icon={faTimes} />
        </div>
        <div class="player" bind:this={playerDom}></div>
    </div>
</div>
<style lang="scss" scoped>
    .video-outer {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        opacity: 0;
        transition: 0.5s ease;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgba(30,30,30,.7);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        

        &.active {
            z-index: 999;
            opacity: 1;
        }

        .player-outer {
            position: relative;
            width: 95%;
            height: 90%;

            .close-btn {
                position: absolute;
                top: 0;
                right: 0;
                background-color: rgb(255,51,51);
                z-index: 20;
                border-radius: 50%;
                text-align: center;
                transform: translate(13px, -13px);
                padding: 1px 7px 2px 6px;
                color: white;
                cursor: pointer;
                user-select: none;
            }

            .player {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
            }
        }
    }
</style>
<script lang="ts">
    // export let loadingStatus:boolean = false
    export let useMediaM3U8Path: string = ''
    export let closeAction

    import ArtPlayers from 'artplayer'
    import HLS from 'hls.js'
    import { faTimes } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from 'fontawesome-svelte';

    let player: ArtPlayers | undefined = undefined
    let playerDom: HTMLDivElement | undefined = undefined

    $:{
        if(useMediaM3U8Path){

            player = new ArtPlayers.default({
                container: playerDom!,
                url: useMediaM3U8Path,
                type: 'm3u8',
                // autoSize: true,
                playbackRate: true,
                aspectRatio: true,
                fullscreen: true,
                fullscreenWeb: true,
                playsInline: true,
                miniProgressBar: true,
                setting: true,
                customType: {
                    m3u8: (video, url, art) => {
                        if (HLS.isSupported()) {
                            if (art.hls) art.hls.destroy();
                            const hls = new HLS();
                            hls.loadSource(url);
                            hls.attachMedia(video);
                            art.hls = hls;
                            art.on('destroy', () => hls.destroy());

                            return
                        }

                        if (video.canPlayType('application/vnd.apple.mpegurl')) {
                            video.src = url;
                            return
                        }

                        art.notice.show = 'Unsupported playback format: m3u8';
                    }
                }
            })
        }

        if(!useMediaM3U8Path && player){
            player.destroy()
        }
    }
</script>