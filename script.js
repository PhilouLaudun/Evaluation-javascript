/* Définition des variables d'adressage des scores*/
const Scoreglob1 = $('#Global1') /* score global du joueur 1 */
const Scorecoub1 = $('#Scourant1') /* score courant du joueur 1 */
const Scoreglob2 = $('#Global2') /* score global du joueur 2 */
const Scorecoub2 = $('#Scourant2') /* score courant du joueur 2 */
const Imagedes = $('#imagedes') /* image du dés */

function generernombre (bornemax) {    
    return Math.floor(Math.random() * (bornemax - .5) + 1);
}
function remiseazero() {
    Scoreglob1.text('0') /* met le score global du joueur 1 à zéro */
    Scorecoub1.text('0') /* met le score courant du joueur 1 à zéro */
    Scoreglob2.text('0') /* met le score global du joueur 2 à zéro */
    Scorecoub2.text('0') /* met le score courant du joueur 1 à zéro */
    Imagedes.attr('src','/image/Image des 3.png'); /* ! pour les essais on laisse à 3 mais pour le jeu on remettra à 1 */

    /* pour l'heure on fait comme cela mais par la suite on utilisera les propriétés des joueurs qu'on affichera */
} 

/* remiseazero() */
$("#btnRollDice").on("click", function() {
    /* alert("The paragraph was clicked.");*/
    const nombreAleatoire = generernombre(6);
    alert(nombreAleatoire);
})