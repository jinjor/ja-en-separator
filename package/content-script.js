var element = null;

document.addEventListener("contextmenu", function(e) {
  element = e.target;
}, true);

chrome.runtime.onMessage.addListener(function(e, sender, cb) {
  if(!element) {
    throw new Error('要素の取得に失敗しました。\n'
    + 'GitHubアカウントをお持ちの場合、以下に状況を添えてバグ報告してください。\n'
    + '\thttps://github.com/jinjor/ja-en-separator/issues/new'
    );
  }
  if(e.type == "getText") {
    cb({ text: typeof element.value === 'string' ? element.value : element.textContent });
  } else if (e.type == "setText") {
    if(typeof element.value === 'string') {
      element.value = e.text;
    } else {
      element.textContent = e.text;
    }
    element = null;
  }
});
