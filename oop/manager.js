/**
 * A Manager osztály felelős a személyek kezeléséért.
 * Tárolja a személyeket, és lehetőséget biztosít callback függvények beállítására,
 * amelyeket a személyek hozzáadásakor hív meg.
 */
class Manager {
    /**
     * A Manager osztály konstruktora.
     * Inicializálja a személyek tárolására szolgáló tömböt.
     */
    constructor() {
        this.persons = []; // Egy tömb a személyek tárolására
    }

    /**
     * Új személy hozzáadása a listához.
     * A személy hozzáadása után meghívja a beállított callback függvényt, ha van ilyen.
     * @param {Person} person - A hozzáadandó személy objektuma.
     */
    addPerson(person) {
        this.persons.push(person); // Hozzáadja a személyt a tömbhöz

        // Meghívja a callback függvényt, ha be van állítva
        if (this.addPersonCallback) {
            this.addPersonCallback(person); // Meghívja a callback-et a hozzáadott személy objektummal
        }
    }

    /**
     * Callback beállítása, amelyet a személyek hozzáadásakor hív meg.
     * Ez a callback például a táblázat frissítésére használható.
     * @param {Function} callback - A callback függvény, amelyet a személyek hozzáadásakor hív meg.
     */
    setAddPersonCallback(callback) {
        this.addPersonCallback = callback; // Beállítja a callback függvényt
    }

    /**
     * Generál egy exportálható CSV formátumú szöveget a személyek adataiból.
     * @returns {string} A személyek adatait tartalmazó CSV formátumú szöveg.
     */
    generateExportString() {
        const result = ['szerzo;mufaj;cim']; // A CSV fejléc sora
        for (const person of this.persons) {
            result.push(`${person.szerzo};${person.mufaj};${person.cim}`); // Hozzáadja a személy adatait
        }
        return result.join('\n'); // Összefűzi a sorokat új sor karakterrel
    }
}