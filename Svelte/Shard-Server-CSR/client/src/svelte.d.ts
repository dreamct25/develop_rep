/// <reference types="svelte" />

declare module "*.svelte" {
    import type { ComponentType } from "svelte";
    const component: ComponentType;
    export default component;
}

declare module 'fontawesome-svelte'

declare module '*.pem' {
    const content: string
    export default content;
}