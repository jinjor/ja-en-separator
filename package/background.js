chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId == "separate-ja-en") {
    chrome.tabs.sendMessage(tab.id, { type: "modifyText" });
  }
});

chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    id: "separate-ja-en",
    title: "日英分割",
    contexts: ["editable"]
  });
});
