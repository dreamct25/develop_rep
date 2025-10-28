<div class="toast-outer-frame" bind:this={toastOuterFrameRef}></div>
<style lang="scss">
    .toast-outer-frame {
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 95%;
        max-width: 385px;
        z-index: 1000;

        :global(.toast-message-box){
            position: relative;
            margin: 6px;
            opacity: 0;
            transform: translateY(-100%) scale(.5);
            color: white;
            backdrop-filter: blur(10px);
            box-shadow: 0 0 2px 0px rgba(255, 255, 255, .5);
            padding: 12px;
            border-radius: 5px;
            background-color: rgba(30, 30, 30, .5);
            display: grid;
            grid-template-columns: 0fr 1fr;
            gap: 8px;
            align-items: center;
        }

        :global(.toast-message-box .box-text){
            text-align: center;
            word-break: break-word;
            white-space: pre-line;
        }

        :global(.toast-message-box svg.success){
            color: rgb(0,221,0);
            font-size: 20px;
        }

        :global(.toast-message-box svg.error){
            color: rgb(255,51,51);
            font-size: 20px;
        }

        :global(.toast-message-box svg.info){
            color: rgb(0,221,221);
            font-size: 20px;
        }
    }
</style>
<script lang="ts">

    import { 
        faCheckCircle,
        faXmarkCircle,
        faExclamationCircle,
    } from '@fortawesome/free-solid-svg-icons';
    import FontAwesomeIcon from 'svelte-fa';
    import { mount } from 'svelte'

    let { toastMessages = { message: '', status: '' }, duration = 0 } = $props()

    let toastBoxIndex: number = 0

    let toastOuterFrameRef = $state<HTMLDivElement | undefined>(undefined)
    
    const sleep:(time: number) => Promise<void> = async time => 
        await new Promise(resovle => setTimeout(() => resovle() ,time))

    const createDom: () => Promise<void> = async () => {

        if(!toastOuterFrameRef || toastMessages.message === '') return

        const signIcon:Record<string, any> = {
            'success': faCheckCircle,
            'error': faXmarkCircle,
            'info': faExclamationCircle
        }

        toastBoxIndex += 1

        const toastMessageBox = document.createElement('div')

        const toastMessageBoxText = document.createElement('div')

        toastMessageBoxText.textContent = toastMessages.message

        toastMessageBoxText.className = 'box-text'

        toastMessageBox.className = 'toast-message-box'

        toastMessageBox.style.cssText = `z-index:${toastBoxIndex};`

        toastMessageBox.animate(
            { transform: 'translateY(0%) scale(1)', opacity: 1 }, 
            { duration: 400, fill: 'forwards', easing: 'ease' }
        )

        mount(FontAwesomeIcon, {
            target: toastMessageBox,
            props: { icon: signIcon[toastMessages.status], class: toastMessages.status }
        })

        toastMessageBox.appendChild(toastMessageBoxText)

        toastOuterFrameRef.prepend(toastMessageBox)

        await sleep(duration)

        toastMessageBox.animate(
            { transform: 'translateY(-100%) scale(.5)', opacity: 0 }, 
            { duration: 400, fill: 'forwards', easing: 'ease' }
        )

        await sleep(duration)

        toastMessageBox.remove()
    }


    $effect(() => {
        createDom()
    })

</script>