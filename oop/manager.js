/**
 * A Manager osztály felelős a személyek kezeléséért.
 * Tárolja a személyeket, és lehetőséget biztosít callback függvények beállítására,
 * amelyeket a személyek hozzáadásakor vagy szűréskor hív meg.
 */
class Manager {

    #renderTableCallback; // Privát mező deklarálása a táblázat frissítésére szolgáló callback tárolására

    /**
     * A Manager osztály konstruktora.
     * Inicializálja a személyek tárolására szolgáló tömböt és a privát mezőket.
     */
    constructor() { // konstruktor
        this.persons = []; // Inicializálja a személyek tömbjét, amely a hozzáadott személyeket tárolja
        this.#renderTableCallback = null; // Inicializálja a privát mezőt, amely a táblázat frissítésére szolgáló callback-et tárolja
    }

    /**
     * Új személy hozzáadása a listához.
     * A személy hozzáadása után meghívja a beállított callback függvényt, ha van ilyen.
     * @param {Person} person - A hozzáadandó személy objektuma.
     */
    addPerson(person) {
        this.persons.push(person); // Hozzáadja a személyt a tömbhöz

        // Meghívja a callback függvényt, ha be van állítva
        if (this.addPersonCallback) { // Ellenőrzi, hogy a callback függvény be van-e állítva
            this.addPersonCallback(person); // Meghívja a callback-et a hozzáadott személy objektummal
        }
    }

    /**
     * Callback beállítása, amelyet a személyek hozzáadásakor hív meg.
     * Ez a callback például a táblázat frissítésére használható.
     * @param {Function} callback - A callback függvény, amelyet a személyek hozzáadásakor hív meg.
     */
    setAddPersonCallback(callback) { // Beállítja a callback függvényt
        this.addPersonCallback = callback; // Beállítja a callback függvényt
    }

    /**
     * Callback beállítása, amelyet a táblázat frissítésére használ a szűrési eredmények alapján.
     * @param {Function} callback - A callback függvény, amelyet a szűrt adatok megjelenítésére hív meg.
     */
    setRenderTableCallback(callback) { // Beállítja a táblázat frissítésére szolgáló callback-et
        this.#renderTableCallback = callback; // Beállítja a privát mezőt a táblázat frissítésére szolgáló callback-kel
    }

    /**
     * Generál egy exportálható CSV formátumú szöveget a személyek adataiból.
     * @returns {string} A személyek adatait tartalmazó CSV formátumú szöveg.
     */
    generateExportString() { // Generál egy CSV formátumú szöveget a személyek adataiból
        const result = ['szerzo;mufaj;cim']; // A CSV fejléc sora
        for (const person of this.persons) { // Végigmegy a személyek listáján
            result.push(`${person.szerzo};${person.mufaj};${person.cim}`); // Hozzáadja a személy adatait a CSV sorokhoz
        }
        return result.join('\n'); // Összefűzi a sorokat új sor karakterrel
    }

    /**
     * Szűrési funkció, amely a megadott callback alapján szűri a személyeket.
     * A szűrési eredményeket a táblázat frissítésére szolgáló callback-nek adja át.
     * @param {Function} callback - A szűrési feltételeket tartalmazó függvény.
     */
    filter(callback) {
        const result = []; // Inicializál egy üres tömböt a szűrési eredmények tárolására
        for (const person of this.persons) { // Végigmegy a személyek listáján
            if (callback(person)) { // Ellenőrzi, hogy a személy megfelel-e a szűrési feltételeknek
                result.push(person); // Ha megfelel, hozzáadja az eredményekhez
            }
        }
        if (this.#renderTableCallback) { // Ellenőrzi, hogy a táblázat frissítésére szolgáló callback be van-e állítva
            this.#renderTableCallback(result); // Meghívja a callback-et a szűrt adatokkal
        }
    }
}