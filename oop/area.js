/**
 * Az Area osztály felelős egy adott osztálynévvel rendelkező <div> elem létrehozásáért,
 * és annak hozzáadásáért egy "containeroop" osztályú konténerhez.
 */
class Area {
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
        const div = document.createElement('div');
        // Beállítja az osztálynevét a megadott értékre
        div.className = className;
        // Hozzáadja az új <div> elemet a "containeroop" konténerhez
        containerDiv.appendChild(div);
    }
}