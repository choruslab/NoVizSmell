"use strict";

var breachInformation = [];

/* Get the background page to access its variables (contains the breaches information ) */
const backgroundPage = browser.runtime.getBackgroundPage()

backgroundPage.then(getBreachesInformation).catch((message) => {
    console.log("Something is wrong: " + message);
});

function getBreachesInformation(background) {
    breachInformation = background.desiredBreach;
    
    let title = document.getElementById("title");
    title.innerText = breachInformation.Title + "'s Breach Information";

    document.getElementById("logo").src = breachInformation.LogoPath;
    document.getElementById("logo").alt = breachInformation.Title + "'s logo";

    let company = document.getElementById("companyName");
    company.innerText = breachInformation.Title;

    let description = document.getElementById("description");
    description.innerHTML = breachInformation.Description;

    let compromised = document.getElementById("compromised");
    compromised.innerText = breachInformation.DataClasses.toString();

    let registered = document.getElementById("registered");
    registered.innerText = new Date(breachInformation.AddedDate).toString();

    let update = document.getElementById("update");
    update.innerText = new Date(breachInformation.ModifiedDate).toString();
}