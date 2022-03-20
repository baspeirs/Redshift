let group1;
let group2;
let raidDetails1;
let raidDetails2;
let rosterDataTypes;
let specs;

$(document).ready(function () {
    $("#readHeader").fadeIn(2000);
});

setTimeout(() => {
    $("#gameTitle").fadeIn(2000);
}, 1500);

setTimeout(() => {
    $("#server").fadeIn(2000);
}, 3000);

const getRoster = () => {
    return $.ajax({
        url: "/api/roster",
        method: "GET",
    });
};

//get the icons from json file
fetch("./specs.json")
    .then(res => res.json())
    .then(data => specs = data)

getRoster().then(res => {
    rosterDataTypes = res.group1.values[0]
    group1 = res.group1.values
    bench = res.bench.values
    raidDetails1 = res.raidDetails1.values
    // raidDetails2 = res.raidDetails2.values
    renderGroup(group1, 1);
    renderGroup(bench, "Bench");
    renderRaidDetails(raidDetails1[0], 1);
    // renderRaidDetails(raidDetails2[0], 2);
});

// call render group with raid group details and Group Name for the raid group number
renderGroup = (groupArray, groupName) => {
    console.log(groupArray)
    if (groupArray != null) {
        groupArray.forEach(character => {
            let tableRow = $("<div>");
            
            if (character.length === 0) {
                tableRow.attr("class", "tableRowAvailability cellDataText col-xl-5")
                console.log("empty slot")
                let tableCell = $("<div>");
                tableCell.attr("class", "cellData")
                let available = $("<p>")
                available.text("Open Slot")
                tableCell.append(available);
                tableRow.append(tableCell);
            }
            else {
                tableRow.attr("class", "tableRow col-xl-5")
                for (let i = 0; i < character.length; i++) {
                    // character[i];
                    let tableCell = $("<div>");
                    // origional column number is 2 - will change to 0 when style changes are ready for deployment
                    if (i === 0) {
                        tableCell.attr("class", "cellData cellDataImg")
                        let spec = specs[character[i]]
                        let icon = $("<img>");
    
                        icon.attr("src", spec.src);
                        icon.attr("alt", spec.alt);
                        icon.attr("class", "specIcon")
                        tableCell.append(icon);
                    }
                    else {
                        tableCell.attr("class", "cellData cellDataTxt")
                        tableCell.text(character[i]);
                    }
                    tableRow.append(tableCell);
                };
            }
            $(`#group${groupName}Roster`).append(tableRow);
        });
    }

};






// call raid details function with an array of data and the group name
renderRaidDetails = (raidDetails, groupName) => {
    // a div for the raidCard class
    let raidCard = $("<div>");
    raidCard.attr("class", "raidCard");
    // a div for the cardContent calss
    let cardContent = $("<div>");
    cardContent.attr("class", "cardContent");
    // a div for the cardHeadder class
    let cardHeadder = $("<h2>");
    cardHeadder.attr("class", "cardHeadder");
    cardHeadder.text(`Group ${groupName}`)
    // a div for the cardText class
    let cardText = $("<div>");
    cardText.attr("class", "cardText");

    const raidBosses = $("<h3>").text("Gruul || Mag || SSC || TK");
    const dayString = $("<h3>").text(`${raidDetails[0]} & ${raidDetails[1]} ${raidDetails[2]} ST - ${raidDetails[3]} ST`);
    const invitesString = $("<h4>").text(`Invites @ ${raidDetails[4]} ST`);

    cardText.append(raidBosses, dayString, invitesString)
    cardContent.append(cardHeadder, cardText);
    raidCard.append(cardContent);

    $("#topRaidInfo").append(raidCard)
}