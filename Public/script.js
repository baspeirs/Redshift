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
    console.log(res)
    rosterDataTypes = res.group1.values[0]
    group1 = res.group1.values
    bench = res.bench.values
    raidDetails1 = res.raidDetails1.values
    // raidDetails2 = res.raidDetails2.values
    // either seems to work, leaving both to see if one ever fails
    renderGroup(group1, rosterDataTypes, 1);
    renderGroup(bench, rosterDataTypes, "2");
    renderRaidDetails(raidDetails1[0], 1);
    // renderRaidDetails(raidDetails2[0], 2);
});

// call render group with raid group details, headers for the tables, and an integer for the raid group number
renderGroup = (groupArray, headerArray, x) => {

    // =========== Commented out section will be included if we want table headers
    // groupArray.splice(0, 1)

    // let tableHeader = $("<tr>")
    // headerArray.forEach(item => {
    //     let tableCell = $("<th>")
    //     tableCell.text(item)
    //     tableHeader.append(tableCell)
    // });
    // $(`#group${x}Data`).append(tableHeader);

    groupArray.forEach(character => {
        let tableRow = $("<div>");
        tableRow.attr("class", "tableRow row")
        for (let i = 0; i < character.length; i++) {
            // character[i];
            let tableCell = $("<div>");
            // origional column number is 2 - will change to 0 when style changes are ready for deployment
            if (i === 0) {
                tableCell.attr("class", "cellData cellDataImg col-1")
                let spec = specs[character[i]]
                let icon = $("<img>");

                icon.attr("src", spec.src);
                icon.attr("alt", spec.alt);
                icon.attr("class", "specIcon")
                tableCell.append(icon);
            }
            else {
                tableCell.attr("class", "cellData cellDataTxt col-3")
                tableCell.text(character[i]);
            }
            tableRow.append(tableCell);
        };
        $(`#group${x}Data`).append(tableRow);
    });
};

// call raid details function with an array of data and an integer for group number
renderRaidDetails = (raidDetails, x) => {
    console.log(raidDetails);
    console.log(x);
    console.log(raidDetails[0]);
    console.log(raidDetails[1]);
    console.log(raidDetails[2]);
    console.log(raidDetails[3]);
    console.log(raidDetails[4]);
    // a div for the raidCard class
    let raidCard = $("<div>");
    raidCard.attr("class", "raidCard");
    // a div for the cardContent calss
    let cardContent = $("<div>");
    cardContent.attr("class", "cardContent");
    // a div for the cardHeadder class
    let cardHeadder = $("<h2>");
    cardHeadder.attr("class", "cardHeadder");
    cardHeadder.text(`Group ${x}`)
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