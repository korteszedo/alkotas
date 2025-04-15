/**
 * Létrehoz egy <hr> elemet, amely vizuális elválasztóként szolgál az OOP és a sima részek között.
 */
const separator = document.createElement('hr'); // Létrehoz egy <hr> elemet
document.body.appendChild(separator); // Hozzáadja a <hr> elemet a dokumentum törzséhez

/**
 * A Manager osztály példányosítása, amely a személyek kezelésére szolgál.
 * A Manager felelős a személyek hozzáadásáért és a callback-ek kezeléséért.
 */
const manager = new Manager(); // Létrehozza a Manager példányt

/**
 * Az űrlap mezőinek konfigurációja.
 * Ez egy tömb, amely az űrlap mezőinek azonosítóit és címkéit tartalmazza.
 * @type {Array<{fieldid: string, fieldLabel: string}>}
 */
const fieldConfig = [
    { fieldid: 'szerzo', fieldLabel: 'Szerző' }, // Az első mező: szerző
    { fieldid: 'mufaj', fieldLabel: 'Műfaj' },  // A második mező: műfaj
    { fieldid: 'cim', fieldLabel: 'Cím' }       // A harmadik mező: cím
];

/**
 * Létrehoz egy új "table" osztályú <div> elemet az Area osztály segítségével.
 * A Table osztály felelős a táblázat megjelenítéséért és frissítéséért.
 */
const table = new Table('table', manager); // Létrehozza a Table példányt, és átadja a manager-t

/**
 * Létrehoz egy új "form" osztályú <div> elemet az Area osztály segítségével.
 * A Form osztály felelős az űrlap megjelenítéséért és az adatok beküldéséért.
 */
const form = new Form('form', fieldConfig, manager); // Létrehozza a Form példányt, és átadja a mezőket és a manager-t