"use strict";

var information = {
    "test" : 1
}

async function getBreachData() {
    // Send breach data to server (just testing XMLHttpRequest for now)
    try {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3000/");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(information));
    } catch (err) {
        console.log("ERROR: " + err);
    }
}

browser.webRequest.onHeadersReceived.addListener(getBreachData,
    // Trigger events for all the main pages (not their resources)
    {urls: ["<all_urls>"], types: ["main_frame"]},

    ["blocking"]
);