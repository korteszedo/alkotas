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

        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Megakadályozza az alapértelmezett űrlapküldést

            
            const valueObject = {}; // Létrehoz egy objektumot az értékek tárolására

            let valid = true;
             for(const formField of this.#formFieldArray){
                 formField.error = '';
                 if(formField.value === ''){
                     formField.error = 'Kotelezo megadni';
                     valid = false;
                    }
                    valueObject[formField.id] = formField.value;
                }
                if(valid){
                    const person = new Person(valueObject.szerzo, valueObject.mufaj, valueObject.cim);
                    this.manager.addPerson(person);
                } 
        });
    }
}

class FormField {
    #id; // Privát mező az űrlapmező azonosítójának tárolására
    #inputElement; // Privát mező az input elem tárolására
    #labelElement; // Privát mező a label elem tárolására
    #errorElement; // Privát mező a hibaüzenet elem tárolására

    /**
     * Az id getter metódusa.
     * @returns {string} Az űrlapmező azonosítója.
     */
    get id() {
        return this.#id;
    }

    /**
     * A value getter metódusa.
     * @returns {string} Az input mező aktuális értéke.
     */
    get value() {
        return this.#inputElement.value; // Visszaadja az input mező értékét
    }

    /**
     * Az error setter metódusa.
     * Beállítja a hibaüzenet szövegét.
     * @param {string} value - A hibaüzenet szövege.
     */
    set error(value) {
        this.#errorElement.textContent = value; // Beállítja a hibaüzenet szövegét
    }

    /**
     * A FormField osztály konstruktora.
     * Inicializálja az űrlapmezőhöz tartozó elemeket.
     * @param {string} id - Az űrlapmező azonosítója.
     * @param {string} labelContent - Az űrlapmező címkéjének szövege.
     */
    constructor(id, labelContent) {
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
    getDiv() {
        const div = makeDiv('field'); // Létrehoz egy "field" osztályú <div> elemet
        const br1 = document.createElement('br'); // Létrehoz egy sortörést
        const br2 = document.createElement('br'); // Létrehoz egy második sortörést
        const htmlElements = [this.#labelElement, br1, this.#inputElement, br2, this.#errorElement]; // Az űrlapmező elemei
        for (const element of htmlElements) {
            div.appendChild(element); // Hozzáadja az elemeket a <div>-hez
        }
        return div; // Visszaadja a <div> elemet
    }
}