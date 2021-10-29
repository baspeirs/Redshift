let group1;
let group2;
let rosterDataTypes;
let specs;
// import * as specs from "./specs.json";
// const specs = require("./specs")

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

fetch("./specs.json")
    .then(res => res.json())
    .then(data => specs = data)

// const specs = {
//     "Arcane": {
//         "src": "./Icons/Arcane_mage.png",
//         "alt": "Arcane Mage Icon"
//     },
//     "Frost": {
//         "src": "./Icons/Frost_mage.png",
//         "alt": "Frost Mage Icon"
//     },
//     "Fire": {
//         "src": "./Icons/Frost_mage.png",
//         "alt": "Fire Mage Icon"
//     },
//     "Protection": {
//         "src": "./Icons/Prot_Warior.png",
//         "alt": "Prot Warior Icon"
//     },
//     "Arms": {
//         "src": "./Icons/Arms_Warior.png",
//         "alt": "Prot_Warior Icon"
//     },
//     "Fury": {
//         "src": "./Icons/Fury_Warior.png",
//         "alt": "Prot_Warior Icon"
//     },
//     "Assassination": {
//         "src": "./Icons/Assassination_Rogue",
//         "alt": "Assassination Rogue Icon"
//     },
//     "Subtlety": {
//         "src": "./Icons/Subtlety_Rogue.png",
//         "alt": "Subtlety Rogue Icon"
//     },
//     "Combat": {
//         "src": "",
//         "alt": "Combat Rogue Icon"
//     }
// }

getRoster().then(res => {
    rosterDataTypes = res.group1.values[0]
    group1 = res.group1.values
    group2 = res.group2.values

    renderGroup(group1, rosterDataTypes, 1);
    renderGroup(group2, rosterDataTypes, "2")
});
renderGroup = (groupArray, headerArray, x) => {
    groupArray.splice(0, 1)

    let tableHeader = $("<tr>")
    headerArray.forEach(item => {
        let tableCell = $("<th>")
        tableCell.text(item)
        tableHeader.append(tableCell)
    });
    $(`#group${x}Data`).append(tableHeader);

    groupArray.forEach(character => {
        console.log(character)
        let tableRow = $("<tr>");
        for (let i = 0; i < character.length; i++) {
            // character[i];
            let tableCell = $("<td>");
            if (i === 2) {
                let spec = specs[character[i]]
                let icon = $("<img>");
                icon.attr("src", spec.src);
                icon.attr("alt", spec.alt);
                tableCell.append(icon);
            }
            else {
                tableCell.text(character[i]);
            }
            tableRow.append(tableCell);
        };
        $(`#group${x}Data`).append(tableRow);
    });
};