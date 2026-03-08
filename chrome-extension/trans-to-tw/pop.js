const swichEnableDelete = document.querySelector('.switch-btn')
let swichAction = false

const storeItem =  await chrome.storage.local.get('isToCTranslateActive')

swichEnableDelete.classList[storeItem?.isToCTranslateActive ? 'add' : 'remove']('active')

swichAction = storeItem?.isToCTranslateActive ? true : false

swichEnableDelete.addEventListener('click', async ({ target }) => {

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const [currentTab,] = tabs

        if(currentTab){

            const fontUrl = chrome.runtime.getURL("fonts/to-c.woff2");

            if(!swichAction) {
                chrome.tabs.sendMessage(currentTab.id, { enableDeleteAction: "enableDeleteAction", url: fontUrl },async (response) => {
                    const storeItem =  await chrome.storage.local.get('isToCTranslateActive')

                    target.classList[storeItem?.isToCTranslateActive ? 'add' : 'remove']('active')

                    swichAction = storeItem?.isToCTranslateActive ? true : false
                })

                return
            }

            chrome.tabs.sendMessage(currentTab.id, { disabledDeleteAction: "disabledDeleteAction" }, async (response) => {
                const storeItem =  await chrome.storage.local.get('isToCTranslateActive')

                target.classList[storeItem?.isToCTranslateActive ? 'add' : 'remove']('active')

                swichAction = storeItem?.isToCTranslateActive ? true : false
            })
        }
    });
})

