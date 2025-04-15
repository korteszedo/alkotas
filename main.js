// Egy üres tömb, amely a könyvek adatait tárolja
const array = [];


// Fő konténer létrehozása és az alkalmazás inicializálása
const containerDiv = makeDiv('container'); // Létrehoz egy "container" osztályú <div> elemet
document.body.appendChild(containerDiv); // Hozzáadja a <div> elemet a dokumentum törzséhez

// Táblázat létrehozása és az alkalmazás inicializálása
createTable(containerDiv, (bodyOfTable) => { // Létrehozza a táblázatot
    createForm(bodyOfTable, containerDiv, array); // Űrlap létrehozása
    createFileUpload(bodyOfTable, containerDiv, array); // Fájlfeltöltő mező létrehozása
    createFileDownload(containerDiv, array); // Fájl letöltés gomb létrehozása
    createFilterForm(containerDiv, bodyOfTable, array); // Szűrési űrlap létrehozása
});