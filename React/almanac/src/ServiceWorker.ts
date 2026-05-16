/// <reference lib="webworker" />

import { precacheAndRoute } from 'workbox-precaching'

declare let self: ServiceWorkerGlobalScope

let messageTitle: string = ''

precacheAndRoute(self.__WB_MANIFEST)

self.addEventListener('message', event => {
    
    if(event.data.type === 'init') {
        messageTitle = event.data.messageTitle
        return
    }

    self.registration.showNotification(messageTitle, {
        body: event.data.msg,
        icon: '/pwa-icon/192.png'
    })
})