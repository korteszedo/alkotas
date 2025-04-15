/**
 * A Person osztály egy személyt reprezentál, amely tartalmazza a szerző, műfaj és cím adatait.
 */
class Person {
    #szerzo; // Privát mező a szerző tárolására
    #mufaj;  // Privát mező a műfaj tárolására
    #cim;    // Privát mező a cím tárolására

    /**
     * A cím getter metódusa.
     * @returns {string} A személyhez tartozó cím.
     */
    get cim() {
        return this.#cim;
    }

    /**
     * A szerző getter metódusa.
     * @returns {string} A személyhez tartozó szerző.
     */
    get szerzo() {
        return this.#szerzo;
    }

    /**
     * A műfaj getter metódusa.
     * @returns {string} A személyhez tartozó műfaj.
     */
    get mufaj() {
        return this.#mufaj;
    }

    /**
     * A Person osztály konstruktora.
     * Inicializálja a szerző, műfaj és cím mezőket.
     * @param {string} szerzo - A személy szerzője.
     * @param {string} mufaj - A személy műfaja.
     * @param {string} cim - A személy címe.
     */
    constructor(szerzo, mufaj, cim) {
        this.#szerzo = szerzo; // Beállítja a szerzőt
        this.#mufaj = mufaj;   // Beállítja a műfajt
        this.#cim = cim;       // Beállítja a címet
    }
}