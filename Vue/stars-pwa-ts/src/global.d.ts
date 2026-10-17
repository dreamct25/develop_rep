import { pages } from '@/router'

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare global {
    
    type UnwrapRefStoreType<T> = {
        [K in keyof T]: T[K] extends Ref<infer U> ? U : T;
    };

    type PageName = keyof typeof pages

    interface Navigator {
        /** iOS Safari 專有：判斷 PWA 是否以全螢幕獨立模式開啟 */
        standalone?: boolean;
    }
}

export {}