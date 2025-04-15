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

// A "table" elemet hozzáadja a "container" elemhez
containerDiv.appendChild(tableDiv);
// A "form" elemet is hozzáadja a "container" elemhez
containerDiv.appendChild(formDiv);