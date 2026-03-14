chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {

    if (changeInfo.status === "complete") {

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const [currentTab,] = tabs

            chrome.tabs.sendMessage(currentTab.id, { getSetting: "getSetting", val: currentTab.id }, () => {
                if (chrome.runtime.lastError) return
            })
        });
    }

    return true
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if(request?.activeTabId) {
        chrome.tabs.update(request.val, { active: true })
    }

    if(request?.closeTab) {

        chrome.tabs.remove(request.val)

        chrome.tabs.query({ currentWindow: true }, (tabs) => {

            const repackTabList = tabs.filter(row => row.id !== request.val)

            sendResponse({ val: repackTabList })
        });
    }

    if(request?.getTabs) {

        chrome.tabs.query({ currentWindow: true }, (tabs) => {

            chrome.tabs.sendMessage(request.val, { tabList: "tabList", val: tabs },async (response) => {
                if (chrome.runtime.lastError) return;
            })
        });
    }

    return true
})

chrome.tabs.onHighlighted.addListener(async (activeInfo) => {

    const tab = await chrome.tabs.get(activeInfo.tabIds[0])

    chrome.tabs.query({ currentWindow: true }, (tabs) => {

        chrome.tabs.sendMessage(tab.id, { tabList: "tabList", val: tabs },async (response) => {
            if (chrome.runtime.lastError) return;
        })
    });
})



