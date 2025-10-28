/// <reference types="svelte" />

declare module "*.svelte" {
    import type { ComponentType } from "svelte";
    const component: ComponentType;
    export default component;
}

declare module '*.pem' {
    const content: string
    export default content;
}

declare interface foldersItemType {
    fileName:string,
    fileUrl:string,
    fileCreateTime:string,
    isFolder:boolean,
    fileType:string
    fileLoadStatus?: boolean
}