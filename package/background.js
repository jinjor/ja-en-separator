function replace(s) {
  return s
    .replace(/[\x01-\x7E]+/g,' $& ')
    .replace(/^ ([\x01-\x7E])|([\x01-\x7E]) $/m, '$&');
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId == "separate-ja-en") {
    chrome.tabs.sendMessage(tab.id, { type: "getText" }, function(e) {
      var result = e.text.split(/\r\n|\r|\n/).map(replace).join('\n');
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
