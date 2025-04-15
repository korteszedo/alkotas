/**
 * A Filter osztály felelős a szűrési funkciók megvalósításáért.
 * Egy űrlapot hoz létre, amely lehetővé teszi a felhasználó számára, hogy a táblázat adatait szűrje.
 * Az osztály az Area osztályból származik.
 */
class Filter extends Area {
    /**
     * A Filter osztály konstruktora.
     * @param {string} cssclass - Az osztályhoz rendelendő CSS osztály neve.
     * @param {Object} manager - A Manager példány, amely az adatok kezeléséért felelős.
     */
    constructor(cssclass, manager) {
        super(cssclass, manager); // Meghívja az Area osztály konstruktorát

        // Létrehoz egy <form> elemet, amely tartalmazza a szűrési mezőket
        const form = document.createElement('form');
        this.div.appendChild(form); // Hozzáadja az űrlapot az Area által létrehozott <div>-hez

        // Létrehoz egy <select> elemet a szűrési opciókhoz
        const select = document.createElement('select');
        form.appendChild(select); // Hozzáadja a legördülő menüt az űrlaphoz

        // A szűrési opciók listája
        const options = [
            { value: '', innerText: '' }, // Üres opció
            { value: 'szerzo', innerText: 'Szerző' }, // Szerző szerint
            { value: 'mufaj', innerText: 'Műfaj' }, // Műfaj szerint
            { value: 'cim', innerText: 'Cím' } // Cím szerint
        ];

        // Hozzáadja az opciókat a legördülő menühöz
        for (const option of options) {
            const optionElement = document.createElement('option'); // Létrehoz egy <option> elemet
            optionElement.value = option.value; // Beállítja az opció értékét
            optionElement.innerText = option.innerText; // Beállítja az opció szövegét
            select.appendChild(optionElement); // Hozzáadja az opciót a legördülő menühöz
        }

        // Létrehoz egy <input> elemet a szűrési érték megadásához
        const input = document.createElement('input');
        input.id = 'filterInput'; // Beállítja az input mező azonosítóját
        form.appendChild(input); // Hozzáadja az input mezőt az űrlaphoz

        // Létrehoz egy <button> elemet a szűrés indításához
        const button = document.createElement('button');
        button.innerText = 'Szűrés'; // Beállítja a gomb szövegét
        form.appendChild(button); // Hozzáadja a gombot az űrlaphoz

        /**
         * Eseményfigyelő az űrlap beküldéséhez.
         * A szűrési feltételek alapján meghívja a Manager osztály `filter` metódusát.
         */
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Megakadályozza az alapértelmezett űrlapküldést

            // Kiválasztja az input mezőt és a legördülő menüt
            const filterInput = e.target.querySelector('#filterInput'); // Kiválasztja a szűrési érték mezőt
            const select = e.target.querySelector('select'); // Kiválasztja a legördülő menüt

            // Meghívja a Manager osztály `filter` metódusát a szűrési feltételekkel
            this.manager.filter((element) => {
                if (select.value == 'szerzo') { // Ha a szűrési feltétel "szerzo"
                    return filterInput.value === element.szerzo; // Ellenőrzi, hogy az input értéke megegyezik-e az elem szerzőjével
                } else if (select.value == 'mufaj') { // Ha a szűrési feltétel "mufaj"
                    return filterInput.value === element.mufaj; // Ellenőrzi, hogy az input értéke megegyezik-e az elem műfajával
                } else if (select.value == 'cim') { // Ha a szűrési feltétel "cim"
                    return filterInput.value === element.cim; // Ellenőrzi, hogy az input értéke megegyezik-e az elem címével
                } else {
                    return true; // Ha nincs szűrési feltétel, minden elem megjelenik
                }
            });
        });
    }
}