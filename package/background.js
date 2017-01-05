chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId == "separate-ja-en") {
    chrome.tabs.sendMessage(tab.id, { type: "getText" }, function(e) {
      var result = e.text.replace(/[^\x01-\x7E]+/g,' $& ').replace(/[\s]+/g,' ').trim();
      chrome.tabs.sendMessage(tab.id, { type: "setText", text: result });
    });
  }
});

chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    id: "separate-ja-en",
    title: "日英分割",
    contexts: ["editable"]
  });
});
