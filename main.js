// Egy üres tömb, amely a könyvek adatait tárolja
const array = [];

// Egy függvény, ami létrehoz egy <div> elemet a megadott osztálynévvel
const makeDiv = (className) => { // Létrehoz egy új <div> elemet
    const div = document.createElement('div'); // Létrehoz egy új <div> elemet
    div.className = className; // Beállítja a <div> osztálynevét
    return div; // Visszaadja a létrehozott <div> elemet
};

// Egy függvény, amely szűri a tömb elemeit a megadott callback alapján
const filter = (personArray, callback) => { // Szűri a tömb elemeit a callback függvény alapján
    const result = []; // Létrehoz egy üres tömböt az eredmények tárolására
    for (const element of personArray) { // Végigmegy a tömb elemein
        if (callback(element)) { // Ha a callback igazat ad vissza
            result.push(element); // Hozzáadja az elemet az eredményekhez
        }
    }
    return result; // Visszaadja a szűrt elemeket tartalmazó tömböt
};

// Táblázat létrehozása
const createTable = (container, callback) => {
    const tableDiv = makeDiv('table'); // Létrehoz egy "table" osztályú <div> elemet
    container.appendChild(tableDiv); // Hozzáadja a táblázatot tartalmazó <div>-et a konténerhez

    const tableSim = document.createElement('table'); // Létrehoz egy <table> elemet
    tableDiv.appendChild(tableSim); // Hozzáadja a táblázatot a <div>-hez

    const tableHead = document.createElement('thead'); // Létrehoz egy <thead> elemet
    tableSim.appendChild(tableHead); // Hozzáadja a <thead>-et a táblázathoz

    const tableHeadRow = document.createElement('tr'); // Létrehoz egy <tr> elemet a táblázat fejléce számára
    tableHead.appendChild(tableHeadRow); // Hozzáadja a sort a <thead>-hez

    const theadCells = ['Szerző', 'Műfaj', 'Cím']; // A táblázat fejlécének cellái
    for (const cellContent of theadCells) { // Végigmegy a fejléc celláin
        const thcell = document.createElement('th'); // Létrehoz egy <th> elemet
        thcell.innerText = cellContent; // Beállítja a cella szövegét
        tableHeadRow.appendChild(thcell); // Hozzáadja a cellát a fejléc sorhoz
    }

    const tbody = document.createElement('tbody'); // Létrehoz egy <tbody> elemet
    tableSim.appendChild(tbody); // Hozzáadja a <tbody>-t a táblázathoz

    callback(tbody); // Meghívja a callback függvényt a <tbody>-val
};

// Sor hozzáadása a táblázathoz
const addRow = (object, tablebody) => {
    const tableBodyRow = document.createElement('tr'); // Létrehoz egy új <tr> elemet
    tablebody.appendChild(tableBodyRow); // Hozzáadja a sort a táblázat testhez

    const nameCell = document.createElement('td'); // Létrehoz egy <td> elemet a szerző számára
    nameCell.textContent = object.szerzo; // Beállítja a cella tartalmát
    tableBodyRow.appendChild(nameCell); // Hozzáadja a cellát a sorhoz

    const birthCell = document.createElement('td'); // Létrehoz egy <td> elemet a műfaj számára
    birthCell.textContent = object.mufaj; // Beállítja a cella tartalmát
    tableBodyRow.appendChild(birthCell); // Hozzáadja a cellát a sorhoz

    const zipCodeCell = document.createElement('td'); // Létrehoz egy <td> elemet a cím számára
    zipCodeCell.textContent = object.cim; // Beállítja a cella tartalmát
    tableBodyRow.appendChild(zipCodeCell); // Hozzáadja a cellát a sorhoz
};

// Fájlfeltöltő mező létrehozása
const createFileUpload = (tablebody, container, personArray) => { // Létrehoz egy új "fileUpload" osztályú <div> elemet
    const fileInput = document.createElement('input'); // Létrehoz egy  <input> elemet
    container.appendChild(fileInput); // Hozzáadja az input mezőt a konténerhez
    fileInput.id = 'fileinput'; // Beállítja az input mező azonosítóját
    fileInput.type = 'file'; // Beállítja az input mező típusát fájlfeltöltésre

    fileInput.addEventListener('change', (e) => { // Eseményfigyelő a fájlfeltöltéshez
        const file = e.target.files[0]; // Lekéri a kiválasztott fájlt
        const fileReader = new FileReader(); // Létrehoz egy FileReader példányt

        fileReader.onload = () => { // Amikor a fájl beolvasása befejeződik
            const fileLines = fileReader.result.split('\n'); // Feldarabolja a fájl tartalmát sorokra
            const removedHeadLines = fileLines.slice(1); // Eltávolítja az első sort (fejléc)

            for (const line of removedHeadLines) { // Végigmegy a fájl sorain
                const trimmedLine = line.trim(); // Eltávolítja a felesleges szóközöket
                const fields = trimmedLine.split(';'); // Feldarabolja a sort pontosvesszők mentén
                const pers = { // Létrehoz egy objektumot a sor adataival
                    szerzo: fields[0], // Beállítja a szerzőt
                    mufaj: fields[1], // Beállítja a műfajt
                    cim: fields[2] // Beállítja a címet
                };
                personArray.push(pers); // Hozzáadja az objektumot a tömbhöz
                addRow(pers, tablebody); // Hozzáadja az objektumot a táblázathoz
            }
        };

        fileReader.readAsText(file); // Beolvassa a fájl tartalmát szövegként
    });
};

// Űrlap létrehozása
const createForm = (tablebody, container, personArray) => { // Létrehoz egy új "form" osztályú <div> elemet
    const formDiv = makeDiv('form'); // Létrehoz egy új <div> elemet a formához
    container.appendChild(formDiv); //  Hozzáadja a formát tartalmazó <div>-et a konténerhez

    const formSim = document.createElement('form'); // Létrehoz egy új <form> elemet
    formDiv.appendChild(formSim); // Hozzáadja a formát a <div>-hez

    const fieldElementList = [ // Az űrlap mezőinek konfigurációja
        { fieldid: 'szerzo', fieldLabel: 'Szerző' }, // Az első mező: szerző
        { fieldid: 'mufaj', fieldLabel: 'Műfaj' }, // A második mező: műfaj
        { fieldid: 'cim', fieldLabel: 'Cím' } // // A harmadik mező: cím
    ];

    for (const fieldElement of fieldElementList) { // Végigmegy a mezők listáján
        const field = makeDiv('field'); // Létrehoz egy új <div> elemet a mező számára
        formSim.appendChild(field); // Hozzáadja a mezőt a formához

        const label = document.createElement('label'); // Létrehoz egy új <label> elemet
        label.htmlFor = fieldElement.fieldid; // Beállítja a label htmlFor attribútumát
        label.textContent = fieldElement.fieldLabel; // Beállítja a label szövegét
        field.appendChild(label); // Hozzáadja a label-t a mezőhöz

        field.appendChild(document.createElement('br')); // Létrehoz egy új <br> elemet a mezőhöz

        const input = document.createElement('input'); // Létrehoz egy új <input> elemet
        input.id = fieldElement.fieldid; // Beállítja az input mező azonosítóját
        field.appendChild(input); // Hozzáadja az input mezőt a mezőhöz

        field.appendChild(document.createElement('br')); // Létrehoz egy új <br> elemet a mezőhöz

        const error = document.createElement('span'); // Létrehoz egy új <span> elemet a hibaüzenet számára
        error.className = 'error'; // Beállítja a hibaüzenet osztályát
        field.appendChild(error); // Hozzáadja a hibaüzenetet a mezőhöz
    }

    const buttonFormSim = document.createElement('button'); // Létrehoz egy új <button> elemet
    buttonFormSim.textContent = 'hozzáadás'; // Beállítja a gomb szövegét
    formSim.appendChild(buttonFormSim); // Hozzáadja a gombot a formához

    formSim.addEventListener('submit', (e) => { // Eseményfigyelő a form beküldésére
        e.preventDefault(); // Megakadályozza az alapértelmezett űrlap beküldést

        const valueObject = {}; // Létrehoz egy új objektumot az űrlap értékeinek tárolására
        const inputFields = e.target.querySelectorAll('input'); // Lekéri az összes input mezőt az űrlapból
        let valid = true; // Ellenőrzi, hogy az űrlap érvényes-e

        for (const inputField of inputFields) { // Végigmegy az input mezőkön
            const error = inputField.parentElement.querySelector('.error'); // Lekéri a hibaüzenet mezőt
            if (!error) { // // Ha nincs hibaüzenet mező
                console.error('Nincs hibaüzenet mező definiálva.'); // Kiírja a konzolra
                return; // Kilép a függvényből
            }
            error.textContent = ''; // Törli a hibaüzenetet

            if (inputField.value.trim() === '') { // Ha az input mező üres0
                error.textContent = 'Kötelező megadni'; // Beállítja a hibaüzenetet
                valid = false; // Beállítja az érvényességet hamisra
            }

            valueObject[inputField.id] = inputField.value.trim(); // Beállítja az objektum mezőit az input mezők értékeivel
        }

        if (valid) { // Ha az űrlap érvényes
            personArray.push(valueObject); // Hozzáadja az objektumot a tömbhöz
            addRow(valueObject, tablebody); // Hozzáadja az objektumot a táblázathoz
        }
    });
};

// Fájl letöltés gomb létrehozása
const createFileDownload = (container, personArray) => { // Létrehoz egy új "fileDownload" osztályú <div> elemet
    const exportButton = document.createElement('button'); // Létrehoz egy új <button> elemet
    exportButton.textContent = 'Letöltés'; // Beállítja a gomb szövegét
    container.appendChild(exportButton); // Hozzáadja a gombot a konténerhez

    exportButton.addEventListener('click', () => { // Eseményfigyelő a gomb megnyomására
        const link = document.createElement('a'); // Létrehoz egy új <a> elemet
        const contentArray = ['szerzo;mufaj;cim']; // A CSV fejléc sora

        for (const pers of personArray) { // Végigmegy a személyek tömbjén
            contentArray.push(`${pers.szerzo};${pers.mufaj};${pers.cim}`); // Hozzáadja a személy adatait a CSV-hez
        }

        const content = contentArray.join('\n'); // Összefűzi a sorokat új sor karakterrel
        const file = new Blob([content], { type: 'text/csv' }); // Létrehoz egy új Blob objektumot a CSV tartalommal
        link.href = URL.createObjectURL(file); // Létrehoz egy URL-t a Blob objektumhoz
        link.download = 'newdata.csv'; // Beállítja a letöltési fájl nevét
        link.click(); // Megnyitja a letöltési párbeszédpanelt
        URL.revokeObjectURL(link.href);     // Visszavonja az URL-t, hogy felszabadítsa a memóriát
    });
};

// Szűrési űrlap létrehozása
const createFilterForm = (container, tablebody, personArray) => { // Létrehoz egy új "filterForm" osztályú <div> elemet
    const filterFormDiv = makeDiv('filterForm'); // Létrehoz egy új <div> elemet a szűréshez
    container.appendChild(filterFormDiv);   // Hozzáadja a szűrési űrlapot a konténerhez

    const formForFilter = document.createElement('form');   // Létrehoz egy új <form> elemet a szűréshez
    filterFormDiv.appendChild(formForFilter); // Hozzáadja a szűrési űrlapot a <div>-hez

    const select = document.createElement('select'); // Létrehoz egy új <select> elemet a szűréshez
    formForFilter.appendChild(select); // Hozzáadja a legördülő menüt a szűrési űrlaphoz

    const options = [ // A legördülő menü opciói
        { value: '', innerText: '' }, // Üres opció
        { value: 'szerzo', innerText: 'Szerző' }, // Szerző opció
        { value: 'mufaj', innerText: 'Műfaj' }, // Műfaj opció
        { value: 'cim', innerText: 'Cím' } // Cím opció
    ];

    for (const option of options) { // Végigmegy az opciókon
        const optionElement = document.createElement('option'); // Létrehoz egy új <option> elemet
        optionElement.value = option.value; // Beállítja az opció értékét
        optionElement.innerText = option.innerText; // Beállítja az opció szövegét
        select.appendChild(optionElement); // Hozzáadja az opciót a legördülő menühöz
    }

    const input = document.createElement('input'); // Létrehoz egy új <input> elemet a szűréshez
    input.id = 'filterInput'; // Beállítja az input mező azonosítóját
    formForFilter.appendChild(input); // Hozzáadja az input mezőt a szűrési űrlaphoz

    const button = document.createElement('button'); // // Létrehoz egy új <button> elemet a szűréshez
    button.innerText = 'Szűrés'; //  Beállítja a gomb szövegét
    formForFilter.appendChild(button); // Hozzáadja a gombot a szűrési űrlaphoz

    formForFilter.addEventListener('submit', (e) => { // Eseményfigyelő a szűrési űrlap beküldésére
        e.preventDefault();// Megakadályozza az alapértelmezett űrlap beküldést

        const filterInput = e.target.querySelector('#filterInput'); // Lekéri a szűrő input mezőt
        const select = e.target.querySelector('select'); // Lekéri a legördülő menüt

        const filteredArray = filter(personArray, (element) => { // Szűri a személyeket a kiválasztott mező és érték alapján
            if (select.value === 'szerzo') { // Ha a kiválasztott mező a szerző
                return filterInput.value === element.szerzo; // Ellenőrzi, hogy a szűrő érték megegyezik-e a szerzővel
            } else if (select.value === 'mufaj') { // Ha a kiválasztott mező a műfaj
                return filterInput.value === element.mufaj; // Ellenőrzi, hogy a szűrő érték megegyezik-e a műfajjal
            } else if (select.value === 'cim') { // Ha a kiválasztott mező a cím
                return filterInput.value === element.cim; // Ellenőrzi, hogy a szűrő érték megegyezik-e a címmel
            } else { // Ha nincs kiválasztott mező
                return true; // Visszaadja az összes elemet
            }
        });

        tablebody.innerHTML = ''; // Törli a táblázat testét

        for (const filteredElement of filteredArray) { // Végigmegy a szűrt elemek tömbjén
            addRow(filteredElement, tablebody); // Hozzáadja a szűrt elemet a táblázathoz
        }
    });
};

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