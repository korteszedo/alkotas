const array = []; // Egy üres tömb, amely a könyvek adatait tárolja

// Egy függvény, ami létrehoz egy <div> elemet a megadott osztálynévvel
const makeDiv = (className) => {
    // Létrehoz egy új <div> elemet
    const div = document.createElement('div');
    // Beállítja az osztály nevét
    div.className = className;
    // Visszaadja a létrehozott elemet
    return div;
}

// Létrehoz egy "container" osztályú <div> elemet
const containerDiv = makeDiv('container');
// Hozzáadja a "container" elemet a dokumentum <body> részéhez
document.body.appendChild(containerDiv);

// Létrehoz egy "table" osztályú <div> elemet
const tableDiv = makeDiv('table');

// Létrehoz egy "form" osztályú <div> elemet
const formDiv = makeDiv('form');

// Létrehoz egy <table> elemet
const tableSim = document.createElement('table');
// Hozzáadja a <table> elemet a "table" osztályú <div>-hez
tableDiv.appendChild(tableSim);

// Létrehoz egy <thead> elemet
const tableHead = document.createElement('thead');
// Hozzáadja a <thead> elemet a <table>-hez
tableSim.appendChild(tableHead);

// Létrehoz egy <tr> elemet a táblázat fejléce számára
const tableHeadRow = document.createElement('tr');
// Hozzáadja a <tr> elemet a <thead>-hez
tableHead.appendChild(tableHeadRow);

// A táblázat fejléceinek szövegeit tartalmazó tömb
const theadCells = ['Szerző', 'Műfaj', 'Cím'];
// Végigmegy a fejlécek szövegein
for (const cellContent of theadCells) {
    // Létrehoz egy <th> elemet
    const thcell = document.createElement('th');
    // Beállítja a <th> elem szövegét
    thcell.innerText = cellContent;
    // Hozzáadja a <th> elemet a fejléc sorához
    tableHeadRow.appendChild(thcell);
}

// Létrehoz egy <tbody> elemet
const tbody = document.createElement('tbody');
// Hozzáadja a <tbody> elemet a <table>-hez
tableSim.appendChild(tbody);

// Létrehoz egy <form> elemet
const formSim = document.createElement('form');
// Hozzáadja a <form> elemet a "form" osztályú <div>-hez
formDiv.appendChild(formSim);

// Egy tömb, amely az űrlap mezőinek azonosítóit és címkéit tartalmazza
const fieldElementList = [
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

// Végigmegy az űrlap mezőinek listáján
for (const fieldElement of fieldElementList) {
    // Létrehoz egy "field" osztályú <div> elemet
    const field = makeDiv('field');
    // Hozzáadja a "field" elemet az űrlaphoz
    formSim.appendChild(field);

    // Létrehoz egy <label> elemet
    const label = document.createElement('label');
    // Beállítja a <label> elem "for" attribútumát az aktuális mező azonosítójára
    label.htmlFor = fieldElement.fieldid;
    // Beállítja a <label> elem szövegét az aktuális mező címkéjére
    label.textContent = fieldElement.fieldLabel;
    // Hozzáadja a <label> elemet a "field" <div>-hez
    field.appendChild(label);

    // Létrehoz egy <input> elemet
    const input = document.createElement('input');
    // Beállítja az <input> elem azonosítóját
    input.id = fieldElement.fieldid;
    // Hozzáad egy sortörést a "field" <div>-hez
    field.appendChild(document.createElement('br'));
    // Hozzáadja az <input> elemet a "field" <div>-hez
    field.appendChild(input);
}

// Létrehoz egy <button> elemet az űrlaphoz
const buttonFormSim = document.createElement('button');
// Beállítja a gomb szövegét
buttonFormSim.textContent = 'hozzáadás';
// Hozzáadja a gombot az űrlaphoz
formSim.appendChild(buttonFormSim);

// Hozzáad egy eseményfigyelőt az űrlaphoz, amely a "submit" eseményre reagál
formSim.addEventListener('submit', (e) => {
    // Megakadályozza az alapértelmezett űrlapküldési viselkedést
    e.preventDefault();

    // Létrehoz egy üres objektumot az űrlap mezőinek értékeihez
    const valueObject = {};

    // Kiválasztja az összes <input> elemet az űrlapban
    const inputFields = e.target.querySelectorAll('input');

    // Végigmegy az összes <input> elemeken
    for (const inputField of inputFields) {
        // Hozzáadja az <input> elem azonosítóját és értékét az objektumhoz
        valueObject[inputField.id] = inputField.value;
    }

    // Hozzáadja az objektumot a "könyvek adatait" tároló tömbhöz
    array.push(valueObject);

    // Létrehoz egy új <tr> elemet a táblázat törzséhez
    const tableBodyRow = document.createElement('tr');
    // Hozzáadja a <tr> elemet a <tbody>-hoz
    tbody.appendChild(tableBodyRow);

    // Létrehoz egy <td> elemet a névhez
    const nameCell = document.createElement('td');
    // Beállítja a <td> elem szövegét a "name" mező értékére
    nameCell.textContent = valueObject.szerzo;
    // Hozzáadja a <td> elemet a <tr>-hez
    tableBodyRow.appendChild(nameCell);

    // Létrehoz egy <td> elemet a születési dátumhoz
    const birthCell = document.createElement('td');
    // Beállítja a <td> elem szövegét a "birth" mező értékére
    birthCell.textContent = valueObject.mufaj;
    // Hozzáadja a <td> elemet a <tr>-hez
    tableBodyRow.appendChild(birthCell);

    // Létrehoz egy <td> elemet az irányítószámhoz
    const zipCodeCell = document.createElement('td');
    // Beállítja a <td> elem szövegét a "zipcode" mező értékére
    zipCodeCell.textContent = valueObject.cim;
    // Hozzáadja a <td> elemet a <tr>-hez
    tableBodyRow.appendChild(zipCodeCell);
});

// A "table" elemet hozzáadja a "container" elemhez
containerDiv.appendChild(tableDiv);
// A "form" elemet is hozzáadja a "container" elemhez
containerDiv.appendChild(formDiv);