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

        // Létrehoz egy új <div> elemet
        this.#div = document.createElement('div');
        // Beállítja az osztálynevét a megadott értékre
        this.#div.className = className;
        // Hozzáadja az új <div> elemet a "containeroop" konténerhez
        containerDiv.appendChild(this.#div);
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
    }
}