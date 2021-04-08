"use strict";

var breachesForCurrentWebsite = [];

async function getBreachData(details) {
    // Format the URL sent by the extension
    let domainName = (new URL(details.url)).hostname.replace('www.','');
    console.log("URL: " + details.url + ", FromCache: " + details.fromCache);

    if (!details.url.startsWith("http://localhost:3000/")) {
        try {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    breachesForCurrentWebsite = JSON.parse(this.responseText)
                    let xhr_Server = new XMLHttpRequest();
                    xhr_Server.open("POST", "http://localhost:3000/smell");
                    xhr_Server.setRequestHeader("Content-Type", "application/json");
                    xhr_Server.send(JSON.stringify({"Data": breachesForCurrentWebsite, "generator": details.url}));

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
        browser.tabs.create({url : "http://localhost:3000/displayInformation/" + m.id});          
    });
}

browser.runtime.onConnect.addListener(displayInformation);

// var tabId;

// browser.tabs.onActivated.addListener(activated)

// function activated(info) {
//     console.log(browser.tabs.query({active:true}));

//     // const filter = {
//     //     properties : ["status"],
//     //     tabId : info.tabId
//     // };

//     // browser.tabs.onUpdated.addListener(
//     //     updated,
//     //     filter
//     //     );
// }

// function updated(tabId, changeInfo, tabInfo) {
//     console.log(changeInfo)
// }