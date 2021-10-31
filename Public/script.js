let group1;
let group2;
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

fetch("./specs.json")
    .then(res => res.json())
    .then(data => specs = data)

getRoster().then(res => {
    rosterDataTypes = res.group1.values[0]
    group1 = res.group1.values
    group2 = res.group2.values
    // either seems to work, leaving both to see if one ever fails
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
            // origional column number is 2 - will change to 0 when style changes are ready for deployment
            if (i === 2) {
                let spec = specs[character[i]]
                let icon = $("<img>");

                console.log(spec)
                console.log(spec.src)
                console.log(spec.alt)

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