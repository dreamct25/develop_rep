chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {

    chrome.tabs.sendMessage(tabId, { getSetting: "getSetting" })
  }

  return true
});