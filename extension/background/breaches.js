"use strict";

async function getBreachData() {


}

browser.webRequest.onHeadersReceived.addListener(getBreachData,
    // Trigger events for all the main pages (not their resources)
    {urls: ["<all_urls>"], types: ["main_frame"]},

    ["blocking"]
);