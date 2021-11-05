# Redshift - World of Warcraft TBC Guild Promotional Page
![GitHub license](https://img.shields.io/badge/license-None-blue.svg)

Check out the porject [here](https://redshift-guild.herokuapp.com/)!
 
Redshift - World of Warcraft TBC Guild Promotional Page

## Table of Contents
* [License](#license)
* [Installation](#installation)
* [Useage](#useage)
* [Contribute](#contribute)

## Installation
Use the package manager 
```bash
npm i
    -express
    -googleapis
    -dotenv
```

## Useage
```bash
To view the Red Shift promotional page, visit https://redshift-guild.herokuapp.com/

The live roster functionality can easily be applied to other guilds, other expansions, and even other games. Using
googleapis, you are able to pull data from and Google Sheets spreadsheet via api provided from your Google Cloud Platform.

To increase or decrease the amount of tables on your application, make modifications in the server.js file under the 
.get(/api/roster) query, and make sure to specify the data you would like to obtain. Store your api key in a .env file
and name it GOOGLE_ACCOUNT_API_KEY then store your spreadsheet id in the same .env file and name it SPREADSHEET_ID

Rendering the data onto a web page includes rendering the first column into icons. This will match a string coming from 
the spreadsheet (for example "Arcane") and match it to the name of an object in the specs.json file, then write the data to
an html image element. removal of this functionality will require a moderate tweak to the script.js functionality. To
add remove or change icons, make edits in the specs.json file. Follow this format: 

"Name matching cell from spreadsheet": {"src": "file path to image/icon", "alt": "description of image/icon"}

Alternative data can easily be rendered from the Google Sheets spreadsheets. For additional data, simply add rows or columns
and for less data, simply remove rows or columns. You can even replace data, or move data points around in your own table 
to configure to your liking.
```

## Contribute
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
For any additional questions about the repo, contact [baspeirs](undefined) at baspeirs@gmail.com
