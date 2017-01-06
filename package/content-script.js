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
  if(e.type == "modifyText") {
    var text = typeof element.value === 'string' ? element.value : element.textContent;
    var result = text.split(/\r\n|\r|\n/).map(replace).join('\n');
    if(typeof element.value === 'string') {
      element.value = result;
    } else {
      element.textContent = result;
    }
    element = null;
  }
});

function replace(s) {
  return s
    .replace(/ ?([^\x01-\x7E]+) ?/g,' $1 ')
    .replace(/^ /, '')
    .replace(/ $/, '');
}
