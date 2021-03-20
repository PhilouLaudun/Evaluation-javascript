/* Définition des variables d'adressage des scores*/
const Scoreglob1 = $('#Global1') /* score global du joueur 1 */
const Scorecoub1 = $('#Scourant1') /* score courant du joueur 1 */
const Scoreglob2 = $('#Global2') /* score global du joueur 2 */
const Scorecoub2 = $('#Scourant2') /* score courant du joueur 2 */
const Imagedes = $('#imagedes') /* image du dés */
var scorecouranttest = 0


/* Initialisation du jeux */
function Remiseazero() {
    Scoreglob1.text('0') /* met le score global du joueur 1 à zéro */
    Scorecoub1.text('0') /* met le score courant du joueur 1 à zéro */
    Scoreglob2.text('0') /* met le score global du joueur 2 à zéro */
    Scorecoub2.text('0') /* met le score courant du joueur 1 à zéro */
    Imagedes.attr('src','/image/Image des 3.png'); /* ! pour les essais on laisse à 3 mais pour le jeu on remettra à 1, on utilse la focntion affichage */

    /* pour l'heure on fait comme cela mais par la suite on utilisera les propriétés des joueurs qu'on affichera */
} 
/* Génération d'un nombre aléatoire compris entre 1 et la borne supérieure passée en paramètre */
function Generernombre (bornemax) {    
    return Math.floor(Math.random() * (bornemax - .5) + 1);
}
/* Affichage d'un score */
function Affichagescore (adresse, score) {
    adresse.text(score)
}
/* Affichage de l'image du dé en fonction du nombre généré */
function Affichageimagede (numero) {
    const lienImageDe = "/image/Image des "+ numero + '.png'; /* construit l'adresse sur le disque de l'image à charger */
    Imagedes.attr('src',lienImageDe); /* inserre l'adresse à charger dans l'attribut de la balise image */
}
/* Rotation de l'image du dé  */
function Rotationde () {
        var angle=0
        var compteur = 136
        var tempsrotation = setInterval(() => {
           compteur--
           if (compteur == 0) {clearTimeout(tempsrotation)
           } else {
              angle=angle+10
              var rotation= "rotate(" + angle + "deg)"
              $('#imagedes').css("transform",rotation)
           }
        },10)
        
    }
/* ---------------------------------------------------------------------------------------------------------------------------*/
/* Déroulement du jeu */
/* Remiseazero() */
/* Attente que le joueur en cours click sur le bouton RollDice */
$("#btnRollDice").on("click", function() {
   const nombreAleatoire = Generernombre(6); /* Génére un nombre aléatoire entre 1 et 6 */
   Rotationde () /* Fait tourner le dés */
   setTimeout ( () => { /* Génére un intervalle de temps pour laisser au dé le temps de tourner avant de continuer le reste du programme */
   Affichageimagede (nombreAleatoire) /* Affiche le dé correspondant au nombre tiré */
   if (nombreAleatoire == 1) { /* si le 1 est tiré, on annule tout et on change de joueur */
       /* compteur courant joueur en cours à zéro
       compteur courant autre joueur à 0
       change le joueur
       change le point et le cadre signalant le joueur en cours */ 
   } else {
       scorecouranttest += nombreAleatoire /* augmente le score courant du joueur */
       Affichagescore (Scorecoub1,scorecouranttest) /* affiche le score courant du joueur */
       /* score courant devient supérieur à 100 alors declare le joueur gagnant */
   }
},1500)
})