const express = require("express");
const {google} = require("googleapis");
const path = require("path");
let returnData;
// supported google apis
const apis = google.getSupportedAPIs();
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname + "/Public/index.html"));
});

require("dotenv").config();

app.get("/api/roster", async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "secrets.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    // create client instance for auth
    const client = await auth.getClient();
    // create instance of google sheets API
    const sheets = google.sheets({version: "v4", auth: client});
    // read rows from spreadsheet
    const getGroup1 = await sheets.spreadsheets.values.get({
        auth,
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: "Group1!A1:Z1000"
    });
    const getGroup2 = await sheets.spreadsheets.values.get({
        auth,
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: "Group2!A1:Z1000"
    });
    // add all returned data into one object
    returnData = {
        group1: getGroup1.data,
        group2: getGroup2.data
    };

    res.json(returnData);
})

app.listen(PORT, (req, res) => console.log(`Redshift-Guild is listening on PORT ${PORT}`));