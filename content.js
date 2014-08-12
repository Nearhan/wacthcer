//Create Listners

/*
runtime.OnMessage.addListner(
    function(request, sender, sendResponse) {
        console.log(request);
});
*/

var runtime = chrome.runtime;
runtime.sendMessage({ping: 'Request From Tab'}, function(response) {
    console.log(response);
});
