const swichEnableDelete = document.querySelector('.switch-btn')
let swichAction = false

const storeItem = await chrome.storage.local.get('isSideTabsActive')

swichEnableDelete.classList[storeItem?.isSideTabsActive ? 'add' : 'remove']('active')

swichAction = storeItem?.isSideTabsActive ? true : false

document.querySelector('.info').textContent = swichAction ? 'Info：Slide bar is working !' : 'Info：Slide bar is deactive !'

swichEnableDelete.addEventListener('click', async ({ target }) => {

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const [currentTab,] = tabs

        if(currentTab){

            if(!swichAction) {

                chrome.tabs.sendMessage(currentTab.id, { enableAction: "enableAction", val: currentTab.id },async (response) => {
                    const storeItem = await chrome.storage.local.get('isSideTabsActive')

                    target.classList[storeItem?.isSideTabsActive ? 'add' : 'remove']('active')

                    swichAction = storeItem?.isSideTabsActive ? true : false

                    document.querySelector('.info').textContent = 'Info：Slide bar is working !'

                    if (chrome.runtime.lastError) return;
                })

                return
            }

            chrome.tabs.sendMessage(currentTab.id, { disabledAction: "disabledAction" }, async (response) => {
                const storeItem =  await chrome.storage.local.get('isSideTabsActive')

                target.classList[storeItem?.isSideTabsActive ? 'add' : 'remove']('active')

                swichAction = storeItem?.isSideTabsActive ? true : false

                document.querySelector('.info').textContent = 'Info：Slide bar is deactive !'

                if (chrome.runtime.lastError) return;
            })
        }
    });
})