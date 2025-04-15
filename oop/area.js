/**
 * Az Area osztály felelős egy adott osztálynévvel rendelkező <div> elem létrehozásáért,
 * és annak hozzáadásáért egy "containeroop" osztályú konténerhez.
 */
class Area {
    #div; // Privát változó a létrehozott <div> elem tárolására
    #manager; // Privát változó a manager objektum tárolására

    /**
     * A div getter, amely visszaadja a létrehozott <div> elemet.
     * @returns {HTMLDivElement} A létrehozott <div> elem.
     */
    get div() { // Getter metódus a <div> elemhez
        return this.#div; // Visszaadja a létrehozott <div> elemet
    }

    /**
     * A manager getter, amely visszaadja a manager objektumot.
     * @returns {Object} A manager objektum.
     */
    get manager() { // Getter metódus a manager objektumhoz
        return this.#manager; // Visszaadja a manager objektumot
    }

    /**
     * Az Area osztály konstruktora.
     * @param {string} className - Az új <div> elemhez rendelendő osztálynév.
     * @param {Object} manager - A manager objektum, amely a könyvek kezelésére szolgál.
     */
    constructor(className, manager) { // Konstruktormódszer
        this.#manager = manager; // Inicializálja a manager-t
        const container = this.#getContainerDiv(); // Lekéri vagy létrehozza a "containeroop" konténert
        this.#div = document.createElement('div'); // Létrehoz egy új <div> elemet
        this.#div.className = className; // Beállítja az osztálynevet
        container.appendChild(this.#div); // Hozzáadja a <div> elemet a konténerhez
    }

    /**
     * Lekéri vagy létrehozza a "containeroop" osztályú konténer <div> elemet.
     * @returns {HTMLDivElement} A "containeroop" osztályú konténer <div> elem.
     */
    #getContainerDiv() { // Privát metódus a konténer <div> elem lekérésére vagy létrehozására
        let containerDiv = document.querySelector('.containeroop'); // Megkeresi a "containeroop" osztályú elemet
        if (!containerDiv) { // Ha nem található, létrehozza
            containerDiv = document.createElement('div'); // Létrehoz egy új <div> elemet
            containerDiv.className = 'containeroop'; // Beállítja az osztálynevet
            document.body.appendChild(containerDiv); // Hozzáadja a dokumentum törzséhez
        }
        return containerDiv; // Visszaadja a konténer elemet
    }
}

/**
 * A Table osztály az Area osztályból származik, és egy táblázatot hoz létre a megadott osztálynévvel.
 */
class Table extends Area {
    /**
     * A Table osztály konstruktora.
     * @param {string} cssClass - Az új táblázatot tartalmazó <div> elemhez rendelendő osztálynév.
     * @param {Object} manager - A manager objektum, amely a könyvek kezelésére szolgál.
     */
    constructor(cssClass, manager) { // konstruktor létrehozása
        super(cssClass, manager); // Meghívja az Area osztály konstruktorát
        const tbody = this.#createTable();
        this.manager.setAddPersonCallback((person) => {
            this.#createPersonRow(person, tbody); // Hozzáad egy új sort a táblázathoz, amikor egy személyt hozzáadnak
        });
        this.manager.setRenderTableCallback((personArray) => {
            tbody.innerHTML = ''; // Törli a táblázat tartalmát
            for (const person of personArray) { // Végigmegy a szűrt személyek listáján
                this.#createPersonRow(person, tbody); // Új sorokat hoz létre a táblázatban a szűrt személyek alapján
            }
        });
    }

    #createPersonRow(person, tablebody) { // Létrehoz egy új sort a táblázatban a megadott személy adatai alapján
        const tableBodyRow = document.createElement('tr'); // Létrehoz egy új <tr> elemet a táblázat sorához

        const szerzoCell = document.createElement('td'); // Létrehoz egy <td> elemet a szerző számára
        szerzoCell.textContent = person.szerzo; // Beállítja a cella tartalmát a szerző nevére
        tableBodyRow.appendChild(szerzoCell); // Hozzáadja a cellát a sorhoz

        const mufajCell = document.createElement('td'); // Létrehoz egy <td> elemet a műfaj számára
        mufajCell.textContent = person.mufaj; // Beállítja a cella tartalmát a műfaj nevére
        tableBodyRow.appendChild(mufajCell); // Hozzáadja a cellát a sorhoz

        const cimCell = document.createElement('td'); // Létrehoz egy <td> elemet a cím számára
        cimCell.textContent = person.cim; // Beállítja a cella tartalmát a címre
        tableBodyRow.appendChild(cimCell); // Hozzáadja a cellát a sorhoz

        tablebody.appendChild(tableBodyRow); // Hozzáadja a sort a táblázat <tbody> eleméhez
    }

    /**
     * Létrehozza a táblázatot, és visszaadja a <tbody> elemet.
     * @returns {HTMLTableSectionElement} A táblázat <tbody> eleme.
     */
    #createTable() { // Létrehozza a táblázatot
        const table = document.createElement('table'); // Létrehoz egy új <table> elemet
        this.div.appendChild(table); // Hozzáadja a táblázatot az Area által létrehozott <div>-hez

        const thead = document.createElement('thead'); // Létrehoz egy új <thead> elemet
        table.appendChild(thead); // Hozzáadja a táblázathoz

        const theadRow = document.createElement('tr'); // Létrehoz egy új <tr> elemet a fejléc számára
        thead.appendChild(theadRow); // Hozzáadja a <thead>-hez

        const theadCells = ['Szerző', 'Műfaj', 'Cím']; // A fejléc celláinak tartalma
        for (const cellContent of theadCells) { // Végigmegy a fejléc cellák tartalmán
            const thcell = document.createElement('th'); // Létrehoz egy új <th> elemet
            thcell.innerText = cellContent; // Beállítja a cella tartalmát
            theadRow.appendChild(thcell); // Hozzáadja a cellát a fejléc sorhoz
        }

        const tbody = document.createElement('tbody'); // Létrehoz egy új <tbody> elemet
        table.appendChild(tbody); // Hozzáadja a táblázathoz
        return tbody; // Visszaadja a <tbody> elemet
    }
}

/**
 * A Form osztály az Area osztályból származik, és egy űrlapot hoz létre a megadott osztálynévvel.
 */
class Form extends Area {
    #formFieldArray; // Privát mező a FormField objektumok tárolására

    /**
     * A Form osztály konstruktora.
     * @param {string} cssClass - Az új űrlapot tartalmazó <div> elemhez rendelendő osztálynév.
     * @param {Array} fieldElementList - Az űrlap mezőinek azonosítóit és címkéit tartalmazó tömb.
     * @param {Object} manager - A manager objektum, amely a könyvek kezelésére szolgál.
     */
    constructor(cssClass, fieldElementList, manager) {
        super(cssClass, manager); // Meghívja az Area osztály konstruktorát
        this.#formFieldArray = []; // Inicializálja a FormField objektumok tömbjét

        const form = document.createElement('form'); // Létrehoz egy új <form> elemet
        this.div.appendChild(form); // Hozzáadja az űrlapot az Area által létrehozott <div>-hez

        for (const fieldElement of fieldElementList) { // Végigmegy az űrlap mezőinek listáján
            const formField = new FormField(fieldElement.fieldid, fieldElement.fieldLabel); // Létrehoz egy új FormField objektumot
            this.#formFieldArray.push(formField); // Hozzáadja a FormField objektumot a tömbhöz
            form.appendChild(formField.getDiv()); // Hozzáadja a FormField <div> elemét az űrlaphoz
        }

        const button = document.createElement('button'); // Létrehoz egy új <button> elemet
        button.textContent = 'hozzáadás'; // Beállítja a gomb szövegét
        form.appendChild(button); // Hozzáadja a gombot az űrlaphoz

        form.addEventListener('submit', (e) => { // Hozzáad egy eseményfigyelőt az űrlap küldéséhez
            e.preventDefault(); // Megakadályozza az alapértelmezett űrlapküldést

            const valueObject = {}; // Létrehoz egy objektumot az értékek tárolására
            let valid = true; // Validációs állapot

            for (const formField of this.#formFieldArray) {
                formField.error = ''; // Törli az előző hibaüzenetet
                if (formField.value === '') { // Ellenőrzi, hogy az érték üres-e
                    formField.error = 'Kötelező megadni'; // Hibaüzenet, ha az érték üres
                    valid = false; // A validáció sikertelen
                }
                valueObject[formField.id] = formField.value; // Hozzáadja az értéket az objektumhoz
            }

            if (valid) { // Ha minden mező érvényes
                const person = new Person(valueObject.szerzo, valueObject.mufaj, valueObject.cim); // Létrehoz egy új Person objektumot
                this.manager.addPerson(person); // Hozzáadja a személyt a manager-hez
            }
        });
    }
}

/**
 * A FormField osztály egy űrlapmezőt reprezentál, amely tartalmaz egy címkét, egy input mezőt és egy hibaüzenetet.
 */
class FormField {
    #id; // Privát mező az űrlapmező azonosítójának tárolására
    #inputElement; // Privát mező az input elem tárolására
    #labelElement; // Privát mező a label elem tárolására
    #errorElement; // Privát mező a hibaüzenet elem tárolására

    /**
     * Az id getter metódusa.
     * @returns {string} Az űrlapmező azonosítója.
     */
    get id() { // Visszaadja az űrlapmező azonosítóját
        return this.#id; // Visszaadja az űrlapmező azonosítóját
    }

    /**
     * A value getter metódusa.
     * @returns {string} Az input mező aktuális értéke.
     */
    get value() { // Visszaadja az input mező értékét
        return this.#inputElement.value; // Visszaadja az input mező értékét
    }

    /**
     * Az error setter metódusa.
     * Beállítja a hibaüzenet szövegét.
     * @param {string} value - A hibaüzenet szövege.
     */
    set error(value) { // Beállítja a hibaüzenetet
        this.#errorElement.textContent = value; // Beállítja a hibaüzenet szövegét
    }

    /**
     * A FormField osztály konstruktora.
     * Inicializálja az űrlapmezőhöz tartozó elemeket.
     * @param {string} id - Az űrlapmező azonosítója.
     * @param {string} labelContent - Az űrlapmező címkéjének szövege.
     */
    constructor(id, labelContent) { //konstruktor létrehozása
        this.#id = id; // Beállítja az azonosítót
        this.#labelElement = document.createElement('label'); // Létrehoz egy <label> elemet
        this.#labelElement.htmlFor = id; // Beállítja a "for" attribútumot
        this.#labelElement.textContent = labelContent; // Beállítja a címke szövegét
        this.#inputElement = document.createElement('input'); // Létrehoz egy <input> elemet
        this.#inputElement.id = id; // Beállítja az input elem azonosítóját
        this.#errorElement = document.createElement('span'); // Létrehoz egy <span> elemet a hibaüzenethez
        this.#errorElement.className = 'error'; // Beállítja a hibaüzenet osztályát
    }

    /**
     * Létrehoz egy <div> elemet, amely tartalmazza az űrlapmező összes elemét.
     * @returns {HTMLDivElement} A létrehozott <div> elem.
     */
    getDiv() { // Létrehozza a <div> elemet
        const div = makeDiv('field'); // Létrehoz egy "field" osztályú <div> elemet
        const br1 = document.createElement('br'); // Létrehoz egy sortörést
        const br2 = document.createElement('br'); // Létrehoz egy második sortörést
        const htmlElements = [this.#labelElement, br1, this.#inputElement, br2, this.#errorElement]; // Az űrlapmező elemei
        for (const element of htmlElements) { // Végigmegy az elemek listáján
            div.appendChild(element); // Hozzáadja az elemeket a <div>-hez
        }
        return div; // Visszaadja a <div> elemet
    }
}

/**
 * Az Upload osztály az Area osztályból származik, és egy fájlfeltöltő mezőt hoz létre.
 * A feltöltött fájl tartalmát feldolgozza, és a manager objektumon keresztül hozzáadja a személyeket.
 */
class Upload extends Area { // Az Upload osztály az Area osztályból származik
    /**
     * Az Upload osztály konstruktora.
     * @param {string} cssClass - Az új fájlfeltöltőt tartalmazó <div> elemhez rendelendő osztálynév.
     * @param {Object} manager - A manager objektum, amely a személyek kezelésére szolgál.
     */
    constructor(cssClass, manager) { // konstruktor létrehozása
        super(cssClass, manager); // Meghívja az Area osztály konstruktorát

        const input = document.createElement('input'); // Létrehoz egy <input> elemet
        input.id = 'fileinput'; // Beállítja az input elem azonosítóját
        input.type = 'file'; // Beállítja az input elem típusát fájlfeltöltésre
        this.div.appendChild(input); // Hozzáadja az input elemet az Area által létrehozott <div>-hez

        // Hozzáad egy eseményfigyelőt a fájlfeltöltő mezőhöz
        input.addEventListener('change', (e) => { // Fájl kiválasztás esemény
            const file = e.target.files[0]; // Lekéri a kiválasztott fájlt
            const fileReader = new FileReader(); // Létrehoz egy FileReader példányt

            fileReader.onload = () => { // Eseményfigyelő, amely akkor fut le, amikor a fájl beolvasása befejeződik
                const fileLines = fileReader.result.split('\n'); // Feldarabolja a fájl tartalmát sorokra
                const removedHeadLines = fileLines.slice(1); // Eltávolítja az első sort (fejléc)
                for (const line of removedHeadLines) { // Végigmegy a fájl sorain
                    const trimmedLine = line.trim(); // Eltávolítja a felesleges szóközöket
                    const fields = trimmedLine.split(';'); // Feldarabolja a sort pontosvesszők mentén
                    const person = new Person(fields[0], fields[1], fields[2]); // Létrehoz egy új Person objektumot
                    this.manager.addPerson(person); // Hozzáadja a személyt a manager-hez
                }
            };
            fileReader.readAsText(file); // Beolvassa a fájl tartalmát szövegként
        });

        // Létrehoz egy "Letöltés" gombot
        const exportButton = document.createElement('button'); // Létrehoz egy <button> elemet
        exportButton.textContent = 'Letöltés'; // Beállítja a gomb szövegét
        this.div.appendChild(exportButton); // Hozzáadja a gombot az Area által létrehozott <div>-hez

        // Hozzáad egy eseményfigyelőt a "Letöltés" gombhoz
        exportButton.addEventListener('click', () => { // Kattintás esemény
            const link = document.createElement('a'); // Létrehoz egy <a> elemet
            const content = this.manager.generateExportString(); // Lekéri az exportálandó tartalmat a manager-től
            const file = new Blob([content], { type: 'text/csv' }); // Létrehoz egy új Blob objektumot a tartalommal
            link.href = URL.createObjectURL(file); // Beállítja a letöltési linket
            link.download = 'newdata.csv'; // Beállítja a letöltendő fájl nevét
            link.click(); // Kattintást szimulál a letöltés elindításához
            URL.revokeObjectURL(link.href); // Felszabadítja az URL-t
        });
    }
}