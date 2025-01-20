/* eslint-disable no-undef */
chrome.runtime.onInstalled.addListener(() => {
    // console.dir(chrome);
    console.log(chrome)

    // chrome.devtools.panels.create(
    //     "Your Panel Name",
    //     "icon.png",
    //     "devtools-panel.html",
    //     function(panel) {
    //       // Code to be executed when the panel is created
    //     }
    // );
});

chrome.runtime.onMessage.addListener((message,sender,senderResp) => {
    const actions = {
        [message.action]: () => (void 0),
        saySome: () => {
            console.log('trigger from front')
            senderResp('aaa')
        },
        saySomeA: () => {
            console.log('trigger from xxx front')
            senderResp({ a:10 })
        }
    }

    actions[message.action]()
})