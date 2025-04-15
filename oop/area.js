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
    get div() {
        return this.#div;
    }

    /**
     * A manager getter, amely visszaadja a manager objektumot.
     * @returns {Object} A manager objektum.
     */
    get manager() {
        return this.#manager;
    }

    /**
     * Az Area osztály konstruktora.
     * @param {string} className - Az új <div> elemhez rendelendő osztálynév.
     * @param {Object} manager - A manager objektum, amely a könyvek kezelésére szolgál.
     */
    constructor(className, manager) {
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
    #getContainerDiv() {
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
    constructor(cssClass, manager) {
        super(cssClass, manager); // Meghívja az Area osztály konstruktorát

        const tbody = this.#createTable(); // Létrehozza a táblázatot és visszaadja a <tbody> elemet

        // Beállítja a callback függvényt a manager-ben
        this.manager.setAddPersonCallback((person) => {
            const tableBodyRow = document.createElement('tr'); // Létrehoz egy új <tr> elemet

            const szerzoCell = document.createElement('td'); // Létrehoz egy új <td> elemet a szerző számára
            szerzoCell.textContent = person.szerzo; // Beállítja a cella tartalmát
            tableBodyRow.appendChild(szerzoCell); // Hozzáadja a cellát a sorhoz

            const mufajCell = document.createElement('td'); // Létrehoz egy új <td> elemet a műfaj számára
            mufajCell.textContent = person.mufaj; // Beállítja a cella tartalmát
            tableBodyRow.appendChild(mufajCell); // Hozzáadja a cellát a sorhoz

            const cimCell = document.createElement('td'); // Létrehoz egy új <td> elemet a cím számára
            cimCell.textContent = person.cim; // Beállítja a cella tartalmát
            tableBodyRow.appendChild(cimCell); // Hozzáadja a cellát a sorhoz

            tbody.appendChild(tableBodyRow); // Hozzáadja a sort a <tbody>-hoz
        });
    }

    /**
     * Létrehozza a táblázatot, és visszaadja a <tbody> elemet.
     * @returns {HTMLTableSectionElement} A táblázat <tbody> eleme.
     */
    #createTable() {
        const table = document.createElement('table'); // Létrehoz egy új <table> elemet
        this.div.appendChild(table); // Hozzáadja a táblázatot az Area által létrehozott <div>-hez

        const thead = document.createElement('thead'); // Létrehoz egy új <thead> elemet
        table.appendChild(thead); // Hozzáadja a táblázathoz

        const theadRow = document.createElement('tr'); // Létrehoz egy új <tr> elemet a fejléc számára
        thead.appendChild(theadRow); // Hozzáadja a <thead>-hez

        const theadCells = ['Szerző', 'Műfaj', 'Cím']; // A fejléc celláinak tartalma
        for (const cellContent of theadCells) {
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
    /**
     * A Form osztály konstruktora.
     * @param {string} cssClass - Az új űrlapot tartalmazó <div> elemhez rendelendő osztálynév.
     * @param {Array} fieldElementList - Az űrlap mezőinek azonosítóit és címkéit tartalmazó tömb.
     * @param {Object} manager - A manager objektum, amely a könyvek kezelésére szolgál.
     */
    constructor(cssClass, fieldElementList, manager) {
        super(cssClass, manager); // Meghívja az Area osztály konstruktorát

        const form = document.createElement('form'); // Létrehoz egy új <form> elemet
        this.div.appendChild(form); // Hozzáadja az űrlapot az Area által létrehozott <div>-hez

        for (const fieldElement of fieldElementList) {
            const field = document.createElement('div'); // Létrehoz egy új <div> elemet a mező számára
            field.className = 'field'; // Beállítja az osztálynevet
            form.appendChild(field); // Hozzáadja a mezőt az űrlaphoz

            const label = document.createElement('label'); // Létrehoz egy új <label> elemet
            label.htmlFor = fieldElement.fieldid; // Beállítja a "for" attribútumot
            label.textContent = fieldElement.fieldLabel; // Beállítja a címkét
            field.appendChild(label); // Hozzáadja a címkét a mezőhöz

            const input = document.createElement('input'); // Létrehoz egy új <input> elemet
            input.id = fieldElement.fieldid; // Beállítja az azonosítót
            field.appendChild(document.createElement('br')); // Hozzáad egy sortörést
            field.appendChild(input); // Hozzáadja az input mezőt a mezőhöz
        }

        const button = document.createElement('button'); // Létrehoz egy új <button> elemet
        button.textContent = 'hozzáadás'; // Beállítja a gomb szövegét
        form.appendChild(button); // Hozzáadja a gombot az űrlaphoz

        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Megakadályozza az alapértelmezett űrlapküldést

            const inputFieldList = e.target.querySelectorAll('input'); // Kiválasztja az összes input mezőt
            const valueObject = {}; // Létrehoz egy objektumot az értékek tárolására

            for (const inputField of inputFieldList) {
                valueObject[inputField.id] = inputField.value; // Hozzáadja az input mező értékét az objektumhoz
            }

            const person = new Person(valueObject.szerzo, valueObject.mufaj, valueObject.cim); // Létrehoz egy új Person objektumot
            this.manager.addPerson(person); // Hozzáadja a személyt a manager-hez
        });
    }
}