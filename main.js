//Grab Tabbed information

chrome.tabs.query({}, function(results) {
    results.forEach(function(tab) {
        var url = tab.url;
        insertToHtml(url);
    });
    alert('done!');
});

function insertToHtml(url) {
    var body = document.getElementId('main');
    var el = document.createElement('div');
    var node = document.createTextNode(url);
    el.appendNode(node);
    document.body(
