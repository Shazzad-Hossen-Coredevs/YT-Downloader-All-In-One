chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "getTabUrl") {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var currentTab = tabs[0];
        var tabUrl = currentTab ? currentTab.url : null;
  
        sendResponse({ url: tabUrl });
      });
    }
  
    // Note: Ensure sendResponse is not called asynchronously.
    return true;
  });