/* Définition des variables d'adressage des scores*/
const Scoreglob1 = $('#Global1') /* score global du joueur 1 */
const Scorecoub1 = $('#Scourant1') /* score courant du joueur 1 */
const Scoreglob2 = $('#Global2') /* score global du joueur 2 */
const Scorecoub2 = $('#Scourant2') /* score courant du joueur 2 */
const Imagedes = $('imagedes')


function remiseazero() {
    Scoreglob1.text('0')
    Scorecoub1.text('0')
    Scoreglob2.text('0')
    Scorecoub2.text('0')
    
} 

remiseazero()
$('imagedes').attr('src','image/Image des 3.png');