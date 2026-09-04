import { type Ref } from 'vue'
import { IndexedDB } from './utiles'

export interface StateType {
    promptVal: Ref<string>,
    isTalkLoading: Ref<boolean>,
    isLoading: Ref<boolean>,
    chatOuterRef: Ref<HTMLDivElement | null>,
    messageList: Ref<{ role: string, content: string }[]>,
    messageGroupList: Ref<{
        rowId: number,
        title: string,
        chatId: string,
        data: { role: string, content: string }[]
    }[]>
    messageBoxRef: Ref<HTMLDivElement | null>,
    toastOuterFrameRef: Ref<HTMLDivElement | null>
    listItemRef: Ref<HTMLDivElement[] | null>,
    singleListItemHeight: Ref<number>,
    chatRowId: Ref<number>,
    chatId: Ref<string>,
    modelList: Ref<{ type: number, name: string }[]>
    modelListMapping: Ref<Record<number, string>>,
    toggleModelListStatus: Ref<boolean>,
    toggleExportListStatus: Ref<boolean>,
    toggleMessageBoxScrollToTopStatus: Ref<boolean>,
    toggleAlertModalStatus: Ref<boolean>,
    toggleDeleteModalStatus: Ref<boolean>,
    toggleChatListStatus: Ref<boolean>,
    selectedModelType: Ref<number>,
    indexDB: Ref<IndexedDB | undefined>,
    isReFetch: Ref<boolean>,
    deleteChatRowId: Ref<number>,
    deleteChatTitle: Ref<string>
}

export interface MethodType {
    deriveKey(ps: string, salt: Uint8Array<ArrayBuffer>): Promise<CryptoKey>
    encryptData(text: string, ps: string): Promise<string>,
    decryptData(context: string, ps: string): Promise<string>,
    exportTalkData(exportType: 'txt' | 'bak', isMultipleTalk: boolean): Promise<void>,
    importTalkData(isMultipleTalk: boolean): Promise<void>,
    importTalkDataInputEventHandler(isMultipleTalk: boolean, event: Event): Promise<void>
    getModelList(): Promise<void>,
    settingChatHandler(action: 'new' | 'select' | 'delete',rowId?: number): Promise<void>
    deleteChatActionHandler(action: 'confirm' | 'cancel'): Promise<void>
    getMessage(): Promise<string | undefined>,
    sendMessage(): Promise<void>,
    typingAgentMessage(fullText: string): Promise<void>,
    keydownEnterHandler(event: KeyboardEvent): void,
    toggleAlertModalHandler(status: boolean): Promise<void>,
    messageBoxSrollEventHandler(event: Event): void
    goTopHandler(): void
    showToast(setting: { status: 'success' | 'error' | 'info', message: string }): Promise<void>
    resizeTextAreaHeightDynanic(event: Event): void,
    getIndexDBResult(isInit: boolean): Promise<void>,
    init(): Promise<void>
}