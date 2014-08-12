//Setup Globals
var runtime = chrome.runtime;
var tabs = chrome.tabs;


// Timer ========================================

function Timer() {

    this.intervals = [];
}


Timer.prototype.addInterval = function() {
    var interval = new Date() - this.time;
    this.intervals.push(interval);
    return true;

};

Timer.prototype.getTotal = function() {
    var total = this.intervals.reduce(function(a, b) {
        return a + b;
    });
    return total;
};

Timer.prototype.toggle = function() {

    if (this.active) {
        this.addInterval();
        console.log('5');
        return delete this.active;
    }
    this.time = new Date();
    this.active = true;
    return true;


};

// SITES ============================================


function SITES() {}

SITES.prototype.registerTab = function(tab) {

    console.log('2');

    //toggle current watcher  
    if (this.currentTimer) {

        this.currentTimer.toggle();
    }

    console.log('3');

    //check if tab is registered 
    var url = new URL(tab.url);
    if (this.hasOwnProperty(url.host)) {

        this.currentTimer = this[url.host]['timer'];
        this.currentTimer.toggle();
        this[url.host]['count'] += 1;
        sendToServer();
        return true;
    }
    console.log('4');

    // New tab then craete Timer and toggle
    this.currentTimer = new Timer();
    this.currentTimer.toggle();
    this[url.host] = {
        timer: this.currentTimer,
        count: 1
    };
    console.log('5');

    sendToServer();
    return true;
};


// Server Calls ============================
 
function sendToServer() {

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:5000', true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {

        // JSON.parse does not evaluate the attacker's scripts.
       console.log(xhr.responseText);
        }
    };

    var data = JSON.stringify(sites);
    xhr.send(data);
}

// EVENTS ========================================

tabs.onActivated.addListener(
    //other logic here
    function(activeInfo) {
        console.log('1');
        console.log(this.arguments);
        console.log(activeInfo);
        tabs.get(activeInfo.tabId, function(tab) {
                console.log('here we go');
                sites.registerTab(tab);
                console.log('after this');
        });

});

tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
        if(changeInfo.url) {
            sites.registerTab(tab);
            console.log('7');
        }
    });


// INIT =============================================

var sites = new SITES();
