var element = null;

document.addEventListener("contextmenu", function(e) {
  element = e.target;
}, true);

chrome.runtime.onMessage.addListener(function(e, sender, sendResponse) {
  if(e.type == "getText") {
    sendResponse({ text: typeof element.value === 'string' ? element.value : element.textContent });
  } else if (e.type == "setText") {
    if(typeof element.value === 'string') {
      element.value = e.text;
    } else {
      element.textContent = e.text;
    }
    element = null;
  }
});
