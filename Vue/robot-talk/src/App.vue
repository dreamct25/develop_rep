<template lang="pug">
.layout
    .header
        .menu-btn(@click="toggleChatListStatus = true")
            .line
            .line
            .line
        BotIcon(:size="50", :stroke-width="'1.5px'")
        h1 聊天機器人
    .main
        .chat-outer(
            ref="chatOuterRef"
            :style="{ '--rows': 'auto 0fr 69px' }"
        )
            .top
                .message-board(
                    :class="{ empty: messageList.length === 0 }" 
                )
                    
                    template(v-if="messageList.length > 0")
                        .message-outer-frame-box(
                            ref="messageBoxRef"
                            @scroll="messageBoxSrollEventHandler"
                        )
                            .message-outer-frame( 
                                v-for="(item, index) in messageList" 
                                :key="index"
                                :class=`{ 
                                    agent: item.role === 'agent',
                                    me: item.role === 'me'
                                }`
                            )
                                .message-outer
                                    template(v-if="item.role === 'agent'")
                                        .who 
                                            BotIcon
                                    template(v-else)
                                        .who 
                                            UserRoundIcon
                                    .inside(
                                        :class="{ 'when-thinking' : !item.content && item.role === 'agent' }"
                                    )
                                        template(v-if="item.content")
                                            .arrow
                                                .outer
                                                .inner
                                            .message
                                                template(v-if="item.role === 'agent'")
                                                    span(v-for="(word, index) in item.content.split('')", :key="index") {{ word }}
                                                template(v-else)
                                                    span {{ item.content }}
                                        template(v-else)
                                            .thinking
                    template(v-else)
                        .no-message 等待您的輸入 ~
                    .go-top-btn(
                        :class="{ toggle: toggleMessageBoxScrollToTopStatus }"
                        @click="goTopHandler"
                    )
                        ChevronUpIcon
            .middle
                .left
                    .model-list-outer(
                        :class="{ toggle: toggleModelListStatus }"
                    )
                        .display(@click="toggleModelListStatus = !toggleModelListStatus")
                            |模型：{{ modelListMapping[selectedModelType] || '無' }}
                            ChevronUpIcon
                        template(v-if="modelList.length > 0")
                            .list-outer(
                                :style="{ '--total': `${singleListItemHeight}px` }"
                            )
                                .list-item(
                                    ref="listItemRef"
                                    v-for="(item, index) in modelList"
                                    :key="index"
                                    :class="{ active: item.type === selectedModelType }"
                                    @click=`() => {
                                        selectedModelType = item.type
                                        toggleModelListStatus = false
                                    }`
                                )
                                    |{{ item.name }}
                                
                .right 
                    .export-btn-outer(
                        :class="{ toggle: toggleExportListStatus }"
                    )
                        .btn(@click="toggleExportListStatus = !toggleExportListStatus") 
                            |匯出對話
                            ChevronUpIcon
                        .list-outer
                            .list-item(@click="exportTalkData('txt')") 文字檔
                            .list-item(@click="exportTalkData('bak', false)") 備份
                    .import-btn-outer
                        .btn(@click="importTalkData(false)") 匯入對話
            .bottom
                textarea(
                    rows="2"
                    cols="40" 
                    :disabled="isTalkLoading"
                    @input="resizeTextAreaHeightDynanic"
                    @keydown.enter="keydownEnterHandler"
                    v-model="promptVal"
                    placeholder="請輸入對話內容"
                )
        .chat-list-outer-frame(
            :class="{ toggle: toggleChatListStatus }"
            @click=`e => {
                if(!e.target.classList.contains('chat-list-outer-frame')) return
                toggleChatListStatus = false
            }`
        )
            .chat-list-outer
                .top
                    template(v-if="messageGroupList.length > 0")
                        .chat-item(
                            v-for="(item, index) in messageGroupList"
                            :key="index"
                            @click="settingChatHandler('select', item.rowId)"
                        )
                            div {{ item.title }}
                            .delete-btn(
                                @click.stop="settingChatHandler('delete', item.rowId)"
                            ) 
                                CircleXIcon(:size="20")
                    template(v-else)
                        .no-data 無對話
                .bottom
                    .btn-group
                        .group-top
                            .export-btn(@click="exportTalkData('bak',true)") 匯出所有
                            .import-btn(@click="importTalkData(true)") 匯入所有
                        .group-bottom
                            .add-chat-btn(@click="settingChatHandler('new')")
                                PlusIcon(:size="20")
                                |新對話
    .footer
        h6 CopyRight &copy; 2026-09 Alex Chen
    .alert-modal-outer(
        :class="{ toggle: toggleAlertModalStatus }"
    )
        .alert-modal
            .alert-modal-header 提示
            .alert-modal-body 
                |請勿在對話內容中輸入任意敏感字詞或隱私資料，該對話紀錄會被 Google 審查或是訓練模型使用
            .alert-modal-footer(@click="toggleAlertModalHandler(false)") 確定
    .delete-modal-outer(
        :class="{ toggle: toggleDeleteModalStatus }"
    )
        .delete-modal
            .delete-modal-header 確認刪除
            .delete-modal-body 
                |確定要刪除 {{ deleteChatTitle }}
                br
                |這個對話 ？
            .delete-modal-footer
                .confirm(@click="deleteChatActionHandler('confirm')") 確定
                .cancel(@click="deleteChatActionHandler('cancel')") 取消
    .toast-outer-frame(ref="toastOuterFrameRef")
    .loading-outer(
        :class="{ toggle: isLoading }"
    )
        .loading-icon
</template>
<style lang="scss" scoped>
    @import url('./styles.scss');
</style>
<script lang="ts">

    import { 
        defineComponent, 
        ref, 
        type Ref,
        nextTick, 
        onMounted, 
        watch, 
        render,
        h,
        Fragment,
        toRaw
    } from "vue";
    import { 
        type LucideIcon,
        Bot as BotIcon, 
        UserRound as UserRoundIcon, 
        ChevronUp as ChevronUpIcon, 
        CircleCheck as CircleCheckIcon, 
        CircleX as CircleXIcon, 
        Info as InfoIcon,
        Plus as PlusIcon
    } from '@lucide/vue'
    import $ from 'self-libraries'
    import { IndexedDB } from './utiles'
    import type { StateType, MethodType } from './types'

    export default defineComponent({
        components: {
            BotIcon,
            UserRoundIcon,
            ChevronUpIcon,
            CircleXIcon,
            PlusIcon
        },
        setup() {

            const state: StateType = {
                promptVal: ref(''),
                isTalkLoading: ref(false),
                isLoading: ref(false),
                chatOuterRef: ref(null),
                messageList: ref([]),
                messageGroupList: ref([]),
                messageBoxRef: ref(null),
                toastOuterFrameRef: ref(null),
                listItemRef: ref(null),
                singleListItemHeight: ref(0),
                chatRowId: ref(0),
                chatId: ref(''),
                modelList: ref([]),
                modelListMapping: ref({ [-1]: '' }),
                toggleModelListStatus: ref(false),
                toggleExportListStatus: ref(false),
                toggleMessageBoxScrollToTopStatus: ref(false),
                toggleAlertModalStatus: ref(false),
                toggleDeleteModalStatus: ref(false),
                toggleChatListStatus: ref(false),
                selectedModelType: ref(-1),
                indexDB: ref(undefined),
                isReFetch: ref(false),
                deleteChatRowId: ref(0),
                deleteChatTitle: ref('')
            }

            const method: MethodType = {
                deriveKey: async (ps, salt) => {
                    const encoder = new TextEncoder();
                    const baseKey = await crypto.subtle.importKey(
                        "raw", encoder.encode(ps), "PBKDF2", false, ["deriveKey"]
                    );
                    return crypto.subtle.deriveKey(
                        { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
                        baseKey, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]
                    );
                },
                encryptData: async (text, ps) => {
                    const encoder = new TextEncoder();
                    
                    const salt = crypto.getRandomValues(new Uint8Array(16));
                    const iv = crypto.getRandomValues(new Uint8Array(12));
                    const aesKey = await method.deriveKey(ps, salt);
                    
                    const encrypted = await crypto.subtle.encrypt(
                        { name: "AES-GCM", iv }, aesKey, encoder.encode(text)
                    );

                    const result = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
                    result.set(salt, 0);
                    result.set(iv, salt.length);
                    result.set(new Uint8Array(encrypted), salt.length + iv.length);

                    const rawString = String.fromCharCode(...result);

                    return btoa(rawString);
                },
                decryptData: async (context, ps) => {
                    const decoder = new TextDecoder();

                    const binaryStr = atob(context);
                    const combined = new Uint8Array(binaryStr.length).map((_, i) => binaryStr.charCodeAt(i));

                    const salt = combined.slice(0, 16);
                    const iv = combined.slice(16, 28);
                    const ciphertext = combined.slice(28);

                    const aesKey = await method.deriveKey(ps, salt);
                    const decrypted = await crypto.subtle.decrypt(
                        { name: "AES-GCM", iv }, aesKey, ciphertext
                    );

                    return decoder.decode(decrypted);
                },
                exportTalkData: async (exportType, isMultipleTalk) => {

                    const result = isMultipleTalk ? 
                        state.messageGroupList.value : 
                        state.messageList.value

                    state.toggleExportListStatus.value = false

                    if(result.length === 0) {

                        method.showToast({
                            status: 'error',
                            message: '無可匯出對話'
                        })

                        return
                    }

                    const currentTime = $.formatDateTime({ formatDate: new Date(), formatType: 'yyyyMMdd_HHmmss' })

                    let outputResult = ''

                    if(exportType === 'txt') {

                        outputResult = $.maps(state.messageList.value, row => 
                            `${row.role === 'agent' ? '機器人' : '我'}：${row.content}`
                        ).join('\n')
                    }

                    if(exportType === 'bak') {

                        const [singleResult, ] = state.messageList.value

                        const repackResult = isMultipleTalk ? 
                            state.messageGroupList.value : [{
                                rowId: state.chatRowId.value,
                                chatId: state.chatId.value,
                                title: singleResult.content,
                                data: result
                            }]

                        const outputJson = JSON.stringify(repackResult, null, 2);
                        const encodeJson = await method.encryptData(outputJson, '#talkks')

                        outputResult = encodeJson
                    }

                    const blob = new Blob([outputResult], { type: "text/plain" });

                    const fileName = `talk_${isMultipleTalk ? '_all_' : '_single_'}${currentTime}.${exportType}`

                    const link = $.createDom({
                        elementTag: 'a',
                        href: URL.createObjectURL(blob),
                        download: fileName
                    })

                    link.click()

                    URL.revokeObjectURL(link.href);

                    method.showToast({
                        status: 'success',
                        message: `匯出完成\n檔名：${fileName}`
                    })
                },
                importTalkDataInputEventHandler: async (isMultipleTalk, event) => {

                    try {

                        const element = event.target as HTMLInputElement

                        if(!element.files) return

                        const { length, [length - 1]: file } = element.files;
                        
                        if(file.name.includes('_single') && isMultipleTalk) throw new Error()

                        if(file.name.includes('_all') && !isMultipleTalk) throw new Error()

                        const fileText = await file.text();
                        
                        const decodeText = await method.decryptData(fileText, '#talkks')

                        const decodeJsonData = JSON.parse(decodeText) as typeof state.messageGroupList.value

                        await method.getIndexDBResult(false)

                        const result = state.messageGroupList.value

                        const filterNotTheSameData = $.filter(
                            $.maps(decodeJsonData, row => {
                                const [filterItem] = $.filter(result, filterRow => row.rowId === filterRow.rowId)

                                if(filterItem) return undefined

                                return row
                            }),
                            row => row !== undefined
                        )

                        if(filterNotTheSameData.length === 0) {

                            method.showToast({
                                status: 'success',
                                message: `匯入完成\n無更新的對話`
                            })

                            return
                        }

                        await $.createPromiseAll(
                            $.maps(filterNotTheSameData, async row => await state.indexDB.value!.add(row))
                        )

                        await method.getIndexDBResult(false)

                        method.showToast({
                            status: 'success',
                            message: isMultipleTalk ? `匯入完成\n共匯入 ${filterNotTheSameData.length} 筆對話` : '匯入完成'
                        })

                        if(isMultipleTalk) return

                        const [{ chatId, data }] = decodeJsonData

                        state.chatId.value = chatId
                        state.messageList.value = data

                        await nextTick()

                        if(!state.messageBoxRef.value) return

                        $(state.messageBoxRef.value).scrollToPos({
                            direction: 'top',
                            scrollPos: state.messageBoxRef.value.scrollHeight,
                            duration: 1200
                        })
                        
                    } catch(err: any) {

                        await method.showToast({
                            status: 'error',
                            message: '匯入失敗'
                        })
                    }
                },
                importTalkData: async isMultipleTalk => {

                    const input = $.createDom({
                        elementTag: 'input',
                        type: 'file',
                        accept: '.bak',
                        onchange: method.importTalkDataInputEventHandler.bind(undefined, isMultipleTalk)
                    })

                    input.click();
                },
                getModelList: async () => {

                    const res = await $.fetch.get<{ 
                        message: string, 
                        data: { type: string, name: string }[]
                    }>('https://proxy-service-three.vercel.app/test/talk/list')

                    if(res.status >= 200 && res.status <= 399) {
                    
                        const result = res.data

                        state.modelList.value = $.maps(result.data, row => {

                            const [f, nd, ] = row.name.split(' ')

                            return {
                                type: parseInt(row.type),
                                name: `${f} ${nd}`
                            }
                        })

                        state.modelListMapping.value = {
                            ...state.modelListMapping.value,
                            ...Object.fromEntries(
                                $.maps(state.modelList.value, row => ([row.type, row.name]))
                            ) as typeof state.modelListMapping.value
                        }

                        state.selectedModelType.value = 1
                    }
                },
                settingChatHandler: async (action, rowId) => {

                    if(action === 'new') {
                        state.chatId.value = ''
                        state.chatRowId.value = +new Date()
                        state.messageList.value = []
                        state.toggleChatListStatus.value = false
                        state.promptVal.value = ''
                    }

                    if(action === 'select' && rowId) {

                        const [filterItem] = $.filter(state.messageGroupList.value, row => row.rowId === rowId)
                    
                        if(!filterItem) return

                        state.chatId.value = filterItem.chatId
                        state.chatRowId.value = filterItem.rowId
                        state.messageList.value = []
                        state.messageList.value = filterItem.data

                        await nextTick()

                        if(!state.messageBoxRef.value) return

                        $(state.messageBoxRef.value).scrollToPos({
                            direction: 'top',
                            scrollPos: state.messageBoxRef.value.scrollHeight,
                            duration: 2500
                        })

                        state.toggleChatListStatus.value = false
                    }

                    if(action === 'delete' && rowId) {
                        const [filterItem] = $.filter(state.messageGroupList.value, row => row.rowId === rowId)
                    
                        if(!filterItem) return

                        state.deleteChatRowId.value = rowId
                        state.deleteChatTitle.value = filterItem.title

                        state.toggleDeleteModalStatus.value = true
                    }
                },
                deleteChatActionHandler: async action => {

                    if(!state.indexDB.value) return

                    if(action === 'confirm') {
                        await state.indexDB.value.delete(state.deleteChatRowId.value)
                        await method.getIndexDBResult(false)
                    }

                    state.toggleDeleteModalStatus.value = false

                    await $.useSleep(500)

                    state.deleteChatRowId.value = 0

                    state.deleteChatTitle.value = ''
                },
                getMessage: async () => {

                    try {
                        
                        const res = await $.fetch.post<{ 
                            g?: string, 
                            outputText?: string,
                            message: string
                        }>('https://proxy-service-three.vercel.app/test/talk', {
                            headers: { 'Content-Type': 'application/json' },
                            data: {
                                prompt: state.promptVal.value,
                                g: state.chatId.value,
                                type: state.selectedModelType.value
                            }
                        })

                        if(res.status <= 399) {

                            if(res.data?.g) {
                                state.chatId.value = res.data.g
                            }
                        }

                        let outputText = res.data?.outputText

                        if(res.data.message.includes('429')) {

                            outputText = '本日已達對話次數上限'
                        }

                        if(state.isReFetch.value) state.isReFetch.value = false

                        return outputText

                    } catch (error) {

                        state.isReFetch.value = true

                        await $.useSleep(500)

                        await method.sendMessage()

                        return undefined
                    }
                },
                sendMessage: async () => {

                    const input = state.promptVal.value;

                    if(!state.isReFetch.value) {

                        if(!input) {

                            await method.showToast({
                                status: 'error',
                                message: '請輸入文字'
                            })

                            return
                        }

                        state.messageList.value = [
                            ...state.messageList.value,
                            {
                                role: 'me',
                                content: input
                            }, {
                                role: 'agent',
                                content: ''
                            }
                        ]

                        await nextTick()

                        if(!state.messageBoxRef.value) return
                        
                        const messageBox = state.messageBoxRef.value

                        if(messageBox.scrollTop < messageBox.scrollHeight) {
                            messageBox.scrollTo({ top: messageBox.scrollHeight, behavior: 'smooth' })
                        }

                        state.isTalkLoading.value = true
                    }

                    const outputText = await method.getMessage()

                    if(!outputText) return

                    const { length, [length - 1]: textAreaHeight } = getComputedStyle(state.chatOuterRef.value!).gridTemplateRows.split(' ')

                    if(parseInt(textAreaHeight.replace('px', '')) > 69) {
                        state.chatOuterRef.value!.style.cssText = '--rows: auto 0fr 69px;'
                    }

                    await method.typingAgentMessage(outputText)

                    const [filterItem] = $.filter(state.messageGroupList.value, row => row.rowId === state.chatRowId.value)

                    if(!filterItem && state.chatId.value) {

                        const addItem = {
                            rowId: state.chatRowId.value,
                            title: input,
                            chatId: state.chatId.value,
                            data: JSON.parse(JSON.stringify(toRaw(state.messageList.value)))
                        }

                        state.messageGroupList.value = [
                            ...state.messageGroupList.value,
                            addItem
                        ]

                        state.indexDB.value!.add(addItem)
                    }

                    if(filterItem && state.chatId.value) {

                        filterItem.chatId = state.chatId.value

                        const toRawData = JSON.parse(JSON.stringify(toRaw(filterItem)))

                        const updateItem = {
                            ...toRawData,
                            data: JSON.parse(JSON.stringify(toRaw(state.messageList.value)))
                        }

                        state.indexDB.value!.put(updateItem)
                    }

                    state.promptVal.value = ''

                    state.isTalkLoading.value = false
                },
                typingAgentMessage: async fullText => await new Promise((resolve) => {

                    const targetIndex = state.messageList.value.length - 1
                    let index = 0

                    const timer = setInterval(() => {

                        if (index >= fullText.length) {
                            clearInterval(timer)
                            resolve()
                            return
                        }

                        const messageBox = state.messageBoxRef.value!

                        if(messageBox.scrollTop < messageBox.scrollHeight) {
                            messageBox.scrollTo({ top: messageBox.scrollHeight, behavior: 'smooth' })
                        }

                        state.messageList.value[targetIndex].content += fullText[index]
                        index++

                    }, 40) // 每 40ms 一個字
                }),
                keydownEnterHandler: async event => {

                    if(event.shiftKey) return

                    event.preventDefault();

                    if(!state.promptVal.value) {

                        await method.showToast({
                            status: 'error',
                            message: '請輸入文字'
                        })
                        
                        return
                    }

                    await method.sendMessage()

                    await nextTick();

                    (event.target as HTMLTextAreaElement).focus()
                },
                toggleAlertModalHandler: async status => {

                    if(status) {
                        state.toggleAlertModalStatus.value = status
                        return
                    }

                    state.toggleAlertModalStatus.value = status
                },
                messageBoxSrollEventHandler: event => {
                    
                    const element = event.target as HTMLDivElement

                    state.toggleMessageBoxScrollToTopStatus.value = element.scrollTop > 50
                },
                goTopHandler: () => {

                    $(state.messageBoxRef.value).scrollToPos({
                        direction: 'top',
                        scrollPos: 0,
                        duration: 2500
                    })
                },
                showToast: async ({ status, message }) => {

                    await nextTick()

                    if(!state.toastOuterFrameRef.value) return

                    if(message === '') return

                    const duration = 2500

                    const signIcon: Record<string, LucideIcon> = {
                        'success': CircleCheckIcon,
                        'error': CircleXIcon,
                        'info': InfoIcon
                    }

                    const toastMessageBox = $.createDom({
                        elementTag: 'div',
                        className: 'toast-message-box'
                    })

                    render(
                        h(Fragment, null, [
                            h(signIcon[status], { class: status }),
                            h('div', {
                                class: 'box-text',
                                textContent: message
                            })
                        ]),
                        toastMessageBox
                    )

                    state.toastOuterFrameRef.value.prepend(toastMessageBox)

                    toastMessageBox.animate(
                        { transform: window.innerWidth <= 430 ? 'translateY(0%) scale(1)' : 'translateX(0%) scale(1)', opacity: 1 }, 
                        { duration: 500, fill: 'forwards', easing: 'ease' }
                    )

                    await $.useSleep(duration)

                    toastMessageBox.animate(
                        { transform: window.innerWidth <= 430 ? 'translateY(-100%) scale(.5)' : 'translateX(100%) scale(.5)', opacity: 0 }, 
                        { duration: 500, fill: 'forwards', easing: 'ease' }
                    )

                    await $.useSleep(duration)

                    toastMessageBox.remove()
                },
                resizeTextAreaHeightDynanic: event => {

                    if(!state.chatOuterRef.value) return

                    const element = event.target as HTMLTextAreaElement

                    state.chatOuterRef.value.style.cssText = `--rows: auto 0fr 69px;`
                    state.chatOuterRef.value.style.cssText = `--rows: auto 0fr ${
                        element.scrollHeight <= 69 ? 
                            69 : element.scrollHeight > 130 ? 
                                130 : element.value.length === 0 ? 69 : element.scrollHeight
                    }px;`
                },
                getIndexDBResult: async isInit => {

                    if(isInit) {

                        state.indexDB.value = new IndexedDB('temp', 'messageList')

                        await state.indexDB.value.init()
                    }

                    if(!state.indexDB.value) return

                    const result = await state.indexDB.value.getAll<typeof state.messageGroupList.value>()

                    state.messageGroupList.value = result
                },
                init: async () => {

                    state.isLoading.value = true

                    await method.getModelList()

                    await method.getIndexDBResult(true)

                    state.isLoading.value = false

                    state.chatRowId.value = +new Date()

                    state.toggleAlertModalStatus.value = true
                }
            }

            watch(state.listItemRef, elements => {
                
                if(!elements) return

                const total = $.sum(
                    $.maps(
                        Array.from(elements),
                        element => element.offsetHeight
                    )
                , (a, b) => a + b, 0)

                state.singleListItemHeight.value = total
            })

            onMounted(method.init)

            return { ...state, ...method }
        }
    })

</script>