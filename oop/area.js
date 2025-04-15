/**
 * Az Area osztály felelős egy adott osztálynévvel rendelkező <div> elem létrehozásáért,
 * és annak hozzáadásáért egy "containeroop" osztályú konténerhez.
 */
class Area {

    // Privát változó, amely az osztály által létrehozott <div> elemet tárolja
    #div;

    /**
     * Getter a privát #div változóhoz.
     * @returns {HTMLDivElement} - A létrehozott <div> elem.
     */
    get div() {
        return this.#div;
    }

    /**
     * Az Area osztály konstruktora.
     * @param {string} className - Az új <div> elemhez rendelendő osztálynév.
     */
    constructor(className) {
        const container = this.#getContainerDiv(); //
         this.#div = document.createElement('div');
         this.#div.className = className;
         container.appendChild(this.#div);
    }

    #getContainerDiv() {
        // Megkeresi a dokumentumban a "containeroop" osztályú <div> elemet
        let containerDiv = document.querySelector('.containeroop');
        
        // Ha nem található ilyen elem, létrehoz egyet
        if (!containerDiv) {
            // Létrehoz egy új <div> elemet
            containerDiv = document.createElement('div');
            // Beállítja az osztálynevét "containeroop"-ra
            containerDiv.className = 'containeroop';
            // Hozzáadja a dokumentum <body> részéhez
            document.body.appendChild(containerDiv);
        }
        // Visszaadja a megtalált vagy létrehozott <div> elemet
        return containerDiv;

    }


}

/**
 * A Table osztály az Area osztályból származik, és egy táblázatot hoz létre a megadott osztálynévvel.
 */
class Table extends Area {

    /**
     * A Table osztály konstruktora.
     * @param {string} cssClass - Az új táblázatot tartalmazó <div> elemhez rendelendő osztálynév.
     */
    constructor(cssClass) {
        // Meghívja az Area osztály konstruktorát
        super(cssClass);

        // Létrehozza a táblázatot és visszaadja a <tbody> elemet
        const tbody = this.#createTable();
        // A <tbody> elem későbbi használatra elérhető lesz
    }

    /**
     * Privát metódus, amely létrehozza a táblázatot.
     * @returns {HTMLTableSectionElement} - A létrehozott <tbody> elem.
     */
    #createTable() {
        // Létrehoz egy <table> elemet
        const table = document.createElement('table');
        // Hozzáadja a <table> elemet az Area által létrehozott <div>-hez
        this.div.appendChild(table);

        // Létrehoz egy <thead> elemet
        const thead = document.createElement('thead');
        // Hozzáadja a <thead> elemet a <table>-hez
        table.appendChild(thead);

        // Létrehoz egy <tr> elemet a táblázat fejléce számára
        const theadRow = document.createElement('tr');
        // Hozzáadja a <tr> elemet a <thead>-hez
        thead.appendChild(theadRow);

        // A táblázat fejléceinek szövegeit tartalmazó tömb
        const theadCells = ['Szerző', 'Műfaj', 'Cím'];
        // Végigmegy a fejlécek szövegein
        for (const cellContent of theadCells) {
            // Létrehoz egy <th> elemet
            const thcell = document.createElement('th');
            // Beállítja a <th> elem szövegét
            thcell.innerText = cellContent;
            // Hozzáadja a <th> elemet a fejléc sorához
            theadRow.appendChild(thcell);
        }

        // Létrehoz egy <tbody> elemet
        const tbody = document.createElement('tbody');
        // Hozzáadja a <tbody> elemet a <table>-hez
        table.appendChild(tbody);

        // Visszaadja a létrehozott <tbody> elemet
        return tbody;
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
     */
    constructor(cssClass, fieldElementList) {
        // Meghívja az Area osztály konstruktorát
        super(cssClass);

        // Létrehoz egy <form> elemet
        const form = document.createElement('form');
        // Hozzáadja a <form> elemet az Area által létrehozott <div>-hez
        this.div.appendChild(form);

        // Végigmegy az űrlap mezőinek listáján
        for (const fieldElement of fieldElementList) {
            // Létrehoz egy "field" osztályú <div> elemet
            const field = makeDiv('field');
            // Hozzáadja a "field" elemet az űrlaphoz
            form.appendChild(field);

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
        const button = document.createElement('button');
        // Beállítja a gomb szövegét
        button.textContent = 'hozzáadás';
        // Hozzáadja a gombot az űrlaphoz
        form.appendChild(button);
    }
}