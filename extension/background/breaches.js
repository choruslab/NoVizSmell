"use strict";

async function getBreachData(details) {
    console.log(details);
    // Format the URL sent by the extension
    let domainName = (new URL(details.url)).hostname.replace('www.','');
    // Send breach data to server (just testing XMLHttpRequest for now)
    try {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                let xhr_Server = new XMLHttpRequest();
                xhr_Server.open("POST", "http://localhost:3000/smell");
                xhr_Server.setRequestHeader("Content-Type", "application/json");
                xhr_Server.send(JSON.stringify({"data":JSON.parse(this.responseText)}));

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

browser.webRequest.onHeadersReceived.addListener(getBreachData,
    // Trigger events for all the main pages (not their resources)
    {urls: ["<all_urls>"], types: ["main_frame"]},

    ["blocking"]
);