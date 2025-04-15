const array = []; // Egy üres tömb, amely a könyvek adatait tárolja

// Egy függvény, ami létrehoz egy <div> elemet a megadott osztálynévvel
const makeDiv = (className) => {
    const div = document.createElement('div');
    div.className = className;
    return div;
};

// Létrehoz egy "container" osztályú <div> elemet
const containerDiv = makeDiv('container');
document.body.appendChild(containerDiv);

// Létrehoz egy "table" osztályú <div> elemet
const tableDiv = makeDiv('table');

// Létrehoz egy <table> elemet
const tableSim = document.createElement('table');
tableDiv.appendChild(tableSim);

// Létrehoz egy <thead> elemet
const tableHead = document.createElement('thead');
tableSim.appendChild(tableHead);

// Létrehoz egy <tr> elemet a táblázat fejléce számára
const tableHeadRow = document.createElement('tr');
tableHead.appendChild(tableHeadRow);

// A táblázat fejléceinek szövegeit tartalmazó tömb
const theadCells = ['Szerző', 'Műfaj', 'Cím'];
for (const cellContent of theadCells) {
    const thcell = document.createElement('th'); // Létrehoz egy <th> elemet
    thcell.innerText = cellContent; // Beállítja a cella tartalmát
    tableHeadRow.appendChild(thcell); // Hozzáadja a cellát a fejléc sorhoz
}

// Létrehoz egy <tbody> elemet
const tbody = document.createElement('tbody');
tableSim.appendChild(tbody);

// Létrehoz egy "form" osztályú <div> elemet
const formDiv = makeDiv('form');

// Létrehoz egy <form> elemet
const formSim = document.createElement('form');
formDiv.appendChild(formSim);

// Egy tömb, amely az űrlap mezőinek azonosítóit és címkéit tartalmazza
const fieldElementList = [
    { fieldid: 'szerzo', fieldLabel: 'Szerző' }, // Az első mező: szerző
    { fieldid: 'mufaj', fieldLabel: 'Műfaj' },  // A második mező: műfaj
    { fieldid: 'cim', fieldLabel: 'Cím' }       // A harmadik mező: cím
];

// Végigmegy az űrlap mezőinek listáján
for (const fieldElement of fieldElementList) {
    const field = makeDiv('field'); // Létrehoz egy "field" osztályú <div> elemet
    formSim.appendChild(field); // Hozzáadja a mezőt az űrlaphoz

    const label = document.createElement('label'); // Létrehoz egy <label> elemet
    label.htmlFor = fieldElement.fieldid; // Beállítja a "for" attribútumot
    label.textContent = fieldElement.fieldLabel; // Beállítja a címkét
    field.appendChild(label); // Hozzáadja a címkét a mezőhöz

    field.appendChild(document.createElement('br')); // Hozzáad egy sortörést

    const input = document.createElement('input'); // Létrehoz egy <input> elemet
    input.id = fieldElement.fieldid; // Beállítja az azonosítót
    field.appendChild(input); // Hozzáadja az input mezőt a mezőhöz

    field.appendChild(document.createElement('br')); // Hozzáad egy sortörést

    const error = document.createElement('span'); // Hibaüzenet helye
    error.className = 'error'; // Beállítja a hibaüzenet osztályát
    field.appendChild(error); // Hozzáadja a hibaüzenet mezőt a mezőhöz
}

// Létrehoz egy <button> elemet az űrlaphoz
const buttonFormSim = document.createElement('button');
buttonFormSim.textContent = 'hozzáadás'; // Beállítja a gomb szövegét
formSim.appendChild(buttonFormSim); // Hozzáadja a gombot az űrlaphoz

// Létrehoz egy fájlfeltöltő mezőt
const fileInput = document.createElement('input'); // Létrehoz egy <input> elemet
fileInput.id = 'fileinput'; // Beállítja az azonosítót
fileInput.type = 'file'; // Beállítja a típusát fájlfeltöltésre

// Hozzáadja a fájlfeltöltő mezőt a "hozzáadás" gomb mellé
formSim.appendChild(fileInput); // Hozzáadja a fájlfeltöltő mezőt az űrlaphoz

// Hozzáad egy eseményfigyelőt az űrlaphoz, amely a "submit" eseményre reagál
formSim.addEventListener('submit', (e) => {
    e.preventDefault(); // Megakadályozza az alapértelmezett űrlapküldési viselkedést

    const valueObject = {}; // Egy objektum az űrlap mezőinek értékeinek tárolására
    const inputFields = e.target.querySelectorAll('input:not([type="file"])'); // Kiválasztja az összes <input> elemet, kivéve a fájlfeltöltő mezőt
    let valid = true; // Validációs állapot

    // Végigmegy az összes <input> elemeken
    for (const inputField of inputFields) {
        const error = inputField.parentElement.querySelector('.error'); // Hibaüzenet helye
        if (!error) {
            console.error('Nincs hibaüzenet mező definiálva.'); // Hiba, ha nincs hibaüzenet mező
            return;
        }
        error.textContent = ''; // Törli az előző hibaüzenetet

        if (inputField.value.trim() === '') { // Ellenőrzi, hogy az érték üres-e (szóközöket is figyelembe véve)
            error.textContent = 'Kötelező megadni'; // Hibaüzenet, ha az érték üres
            valid = false; // A validáció sikertelen
        }

        valueObject[inputField.id] = inputField.value.trim(); // Hozzáadja az értéket az objektumhoz
    }

    if (valid) { // Ha minden mező érvényes
        array.push(valueObject); // Hozzáadja az objektumot a tömbhöz

        const tableBodyRow = document.createElement('tr'); // Létrehoz egy új <tr> elemet
        tbody.appendChild(tableBodyRow); // Hozzáadja a sort a táblázathoz

        const nameCell = document.createElement('td'); // Létrehoz egy új <td> elemet a szerző számára
        nameCell.textContent = valueObject.szerzo; // Beállítja a cella tartalmát
        tableBodyRow.appendChild(nameCell); // Hozzáadja a cellát a sorhoz

        const birthCell = document.createElement('td'); // Létrehoz egy új <td> elemet a műfaj számára
        birthCell.textContent = valueObject.mufaj; // Beállítja a cella tartalmát
        tableBodyRow.appendChild(birthCell); // Hozzáadja a cellát a sorhoz

        const zipCodeCell = document.createElement('td'); // Létrehoz egy új <td> elemet a cím számára
        zipCodeCell.textContent = valueObject.cim; // Beállítja a cella tartalmát
        tableBodyRow.appendChild(zipCodeCell); // Hozzáadja a cellát a sorhoz
    }
});

// Hozzáad egy eseményfigyelőt a fájlfeltöltő mezőhöz
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0]; // Lekéri a kiválasztott fájlt
    const fileReader = new FileReader(); // Létrehoz egy FileReader példányt

    fileReader.onload = () => {
        const fileLines = fileReader.result.split('\n'); // Feldarabolja a fájl tartalmát sorokra
        const removedHeadLines = fileLines.slice(1); // Eltávolítja az első sort (fejléc)
        for (const line of removedHeadLines) {
            const trimmedLine = line.trim(); // Eltávolítja a felesleges szóközöket
            const fields = trimmedLine.split(';'); // Feldarabolja a sort pontosvesszők mentén
            const pers = {
                szerzo: fields[0], // A fájl első oszlopa a szerző
                mufaj: fields[1],  // A fájl második oszlopa a műfaj
                cim: fields[2]     // A fájl harmadik oszlopa a cím
            };
            array.push(pers); // Hozzáadja az objektumot a tömbhöz

            const tableBodyRow = document.createElement('tr'); // Létrehoz egy új <tr> elemet
            tbody.appendChild(tableBodyRow); // Hozzáadja a sort a táblázathoz

            const nameCell = document.createElement('td'); // Létrehoz egy új <td> elemet a név számára
            nameCell.textContent = pers.szerzo; // Beállítja a cella tartalmát
            tableBodyRow.appendChild(nameCell); // Hozzáadja a cellát a sorhoz

            const birthCell = document.createElement('td'); // Létrehoz egy új <td> elemet a születési dátum számára
            birthCell.textContent = pers.mufaj; // Beállítja a cella tartalmát
            tableBodyRow.appendChild(birthCell); // Hozzáadja a cellát a sorhoz

            const zipCodeCell = document.createElement('td'); // Létrehoz egy új <td> elemet az irányítószám számára
            zipCodeCell.textContent = pers.cim; // Beállítja a cella tartalmát
            tableBodyRow.appendChild(zipCodeCell); // Hozzáadja a cellát a sorhoz
        }
    };
    fileReader.readAsText(file); // Beolvassa a fájl tartalmát szövegként
});



// A "table" elemet hozzáadja a "container" elemhez
containerDiv.appendChild(tableDiv);
// A "form" elemet is hozzáadja a "container" elemhez
containerDiv.appendChild(formDiv);

// Létrehoz egy "Letöltés" gombot
const exportButton = document.createElement('button'); // Létrehoz egy <button> elemet
exportButton.textContent = 'Letöltés'; // Beállítja a gomb szövegét
containerDiv.appendChild(exportButton); // Hozzáadja a gombot a konténerhez

// Hozzáad egy eseményfigyelőt a "Letöltés" gombhoz
exportButton.addEventListener('click', () => {
    const link = document.createElement('a'); // Létrehoz egy <a> elemet
    const contentArray = ['szerzo;mufaj;cim']; // A CSV fejléc sora

    // Végigmegy az array tömb elemein, és hozzáadja az adatokat a CSV tartalomhoz
    for (const pers of array) {
        contentArray.push(`${pers.szerzo};${pers.mufaj};${pers.cim}`); // Hozzáadja az objektum adatait
    }

    const content = contentArray.join('\n'); // Összefűzi a sorokat új sor karakterrel
    const file = new Blob([content], { type: 'text/csv' }); // Létrehoz egy új Blob objektumot a tartalommal
    link.href = URL.createObjectURL(file); // Beállítja a letöltési linket
    link.download = 'newdata.csv'; // Beállítja a letöltendő fájl nevét
    link.click(); // Kattintást szimulál a letöltés elindításához
    URL.revokeObjectURL(link.href); // Felszabadítja az URL-t
});
