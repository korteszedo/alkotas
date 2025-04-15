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

// A "table" elemet hozzáadja a "container" elemhez
containerDiv.appendChild(tableDiv);
// A "form" elemet is hozzáadja a "container" elemhez
containerDiv.appendChild(formDiv);