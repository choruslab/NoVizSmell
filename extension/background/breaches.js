"use strict";

var breachesForCurrentWebsite = [];
var desiredBreach = [];

async function getBreachData(details) {
    // Format the URL sent by the extension
    let domainName = (new URL(details.url)).hostname.replace('www.','');
    console.log("URL: " + details.url + ", FromCache: " + details.fromCache);

    if (!details.url.startsWith("http://localhost:3000/")) {
        try {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    breachesForCurrentWebsite = JSON.parse(this.responseText);
                } else if (this.readyState === 4 && this.status !== 200) {
                    console.log("ERROR :(");
                }
            };
            xhr.open("GET", "https://haveibeenpwned.com/api/v3/breaches?domain=" + domainName);
            xhr.send();
        } catch (err) {
            console.log("ERROR: " + err);
        }
    }
}

browser.webRequest.onHeadersReceived.addListener(getBreachData,
    // Trigger events for all the main pages (not their resources)
    {urls: ["<all_urls>"], types: ["main_frame"]},

    ["blocking"]
);


function displayInformation(port) {
    port.onMessage.addListener(function(m) {
        desiredBreach = breachesForCurrentWebsite[m.id];
        
        browser.tabs.create({url: "/display/tab.html"});     
    });
}

browser.runtime.onConnect.addListener(displayInformation);