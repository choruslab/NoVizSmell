"use strict";

var breachInformation = [];

/* Get the background page to access its variables (contains the breaches information ) */
const backgroundPage = browser.runtime.getBackgroundPage()

backgroundPage.then(getBreachesInformation).catch((message) => {
    console.log("Something is wrong: " + message);
});

function getBreachesInformation(background) {
    breachInformation = background.breachesForCurrentWebsite;
    
    if (breachInformation.length > 0) {
        // Create a table
        let table = document.createElement("table");
        table.className = "table table-striped";
        table.style.margin = "0pt";

        // Create a caption
        let caption = document.createElement("caption");
        caption.className = "fs-6";
        caption.style.textAlign = "right";
        caption.innerHTML = "Data from haveibeenpwned.com ".small();

        // Create the headers
        let headers = document.createElement("thead");

        // Set the header row
        let headerRow = document.createElement("tr");

        let dateHeader = document.createElement("td");
        dateHeader.innerText = "Last Update";
        dateHeader.style.textAlign = "center";
        
        let dataHeader = document.createElement("td");
        dataHeader.innerText = "Compromised Data";
        dataHeader.style.textAlign = "center";

        headerRow.appendChild(dateHeader);
        headerRow.appendChild(dataHeader);

        headers.appendChild(headerRow);

        // Create the body of the table
        let body = document.createElement("tbody");

        breachInformation.forEach( (element, index) => {
            let date = document.createElement("td")
            let data = document.createElement("td")

            let dateText = new Date(element.ModifiedDate);
            date.innerText = dateText.toString();
            data.innerText = element.DataClasses;
    
            let newRow = document.createElement("tr");
            newRow.appendChild(date);
            newRow.appendChild(data);
            newRow.id = index;

            newRow.addEventListener("click", event => sendDataToBackgroundScript(event));

            body.appendChild(newRow);
        });

        // Add all elements to table
        table.appendChild(caption);
        table.appendChild(body);
        table.appendChild(headers);

        // Add table to document
        document.getElementsByTagName("body")[0].appendChild(table);

    } else {
        // There is no data in the breaches variable
        let warning = document.createElement("h1");
        warning.className = "display-1";
        warning.style.textAlign = "center";
        warning.innerText = "No Known Breaches";

        document.getElementsByTagName("body")[0].appendChild(warning);
    }
}

function sendDataToBackgroundScript(element) {
    let id = "";

    // Element in the event object may not be the row (it could be one of the elements in the row).
    if (element.target.id === "") {
        id = element.target.parentNode.id;
    } else {
        id = element.target.id;
    }

    var port = browser.runtime.connect("background@addon");
    port.postMessage({"id": id}); 
}