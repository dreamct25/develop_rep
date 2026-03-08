chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {

    const fontUrl = await chrome.runtime.getURL("fonts/to-c.woff2");

    chrome.tabs.sendMessage(tabId, { getSetting: "getSetting", url: fontUrl })
  }

  return true
});