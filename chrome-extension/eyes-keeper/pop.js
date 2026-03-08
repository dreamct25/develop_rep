const swichEnableDelete = document.querySelector('.switch-btn')
const rangerDom = document.querySelector('.ranger')
let swichAction = false

const storeItem =  await chrome.storage.local.get('isEyeKeepActive')

const storeRangeItem =  await chrome.storage.local.get('eyeKeepRange')

swichEnableDelete.classList[storeItem?.isEyeKeepActive ? 'add' : 'remove']('active')

swichAction = storeItem?.isEyeKeepActive ? true : false

rangerDom.disabled = !swichAction
rangerDom.value = storeRangeItem?.eyeKeepRange ? storeRangeItem?.eyeKeepRange : '100'

rangerDom.addEventListener('input',event => {
    const val = parseInt(event.target.value)

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const [currentTab,] = tabs

        if(currentTab){

            if(!swichAction) return

            chrome.tabs.sendMessage(currentTab.id, { valChange: "valChange", val },async (response) => {
                await chrome.storage.local.set({ eyeKeepRange: (response.count * 100).toString() })
            })
        }
    });
})

swichEnableDelete.addEventListener('click', async ({ target }) => {

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const [currentTab,] = tabs

        if(currentTab){

            if(!swichAction) {
                chrome.tabs.sendMessage(currentTab.id, { enableDeleteAction: "enableDeleteAction", val: rangerDom.value },async (response) => {
                    const storeItem =  await chrome.storage.local.get('isEyeKeepActive')

                    target.classList[storeItem?.isEyeKeepActive ? 'add' : 'remove']('active')

                    swichAction = storeItem?.isEyeKeepActive ? true : false

                    rangerDom.disabled = !swichAction
                })

                return
            }

            chrome.tabs.sendMessage(currentTab.id, { disabledDeleteAction: "disabledDeleteAction" }, async (response) => {
                const storeItem =  await chrome.storage.local.get('isEyeKeepActive')

                target.classList[storeItem?.isEyeKeepActive ? 'add' : 'remove']('active')

                swichAction = storeItem?.isEyeKeepActive ? true : false

                rangerDom.disabled = true
            })
        }
    });
})

