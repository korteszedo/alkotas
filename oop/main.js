// Létrehoz egy <hr> elemet, amely vizuális elválasztóként szolgál az OOP és a sima részek között
const separator = document.createElement('hr');
// Hozzáadja az elválasztót a dokumentum <body> részéhez
document.body.appendChild(separator);

// Új név a mezőlistának, hogy elkerüljük az ütközést
const fieldElementListOOP = [
    {
        fieldid: 'szerzo', // Azonosító: szerző
        fieldLabel: 'Szerző' // Címke: Szerző
    },
    {
        fieldid: 'mufaj', // Azonosító: műfaj
        fieldLabel: 'Műfaj' // Címke: Műfaj
    },
    {
        fieldid: 'cim', // Azonosító: cím
        fieldLabel: 'Cím' // Címke: Cím
    }
];

// Létrehoz egy új "table" osztályú <div> elemet az Area osztály segítségével
const table = new Table('table');

// Létrehoz egy új "form" osztályú <div> elemet az Area osztály segítségével
const form = new Form('form', fieldElementListOOP);