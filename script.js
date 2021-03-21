/* Définition des variables d'adressage des scores*/
const Imagedes = $('#imagedes') /* image du dés */
var Joueur = [0,0] /* tableau contenant le score global des joueurs */
var compteur = 0 /* variable servant de compteur pour les routines de boucle" */
var scorecourant = 0 /* variable contenant le score courant du joueur en cours*/
var Joeurencours = 1 /* variable contenant le numéro du joeur en cours */
var addressescore /* variable contenant l'id de la balise du score à modifier */
var scoreglobaljoueurencours /* variable contenant le score global du joueur en cours */

/* Initialisation du jeux */
function Remiseazero() {
    /* Remet tous les scores à 0 */
    for (compteur=1;compteur <=2; compteur++) {
        addressescore = '#Scourant'+compteur
        Affichagescore (addressescore,0) /* affiche le score courant du joueur */ 
        addressescore = '#Global'+compteur
        Affichagescore (addressescore,70) /* affiche le score global du joueur */
        Joueur [compteur-1]  = 70 /* a modifier à 0 quand la fonction joueur gagnant focntionnera */
    }
    
    Imagedes.attr('src','/image/Image des 1.png') /* affiche l'image du dé par défaut, en l'occurence 1 */
    Joeurencours = Generernombre(2) /* choisit au hasard le joueur quii commence */
    scorecourant = 0 /* met le score courant à 0 */
    $("#btnRollDice").attr('disabled',false) /* valide le bouton Roll Dice */
    $("#btnHold").attr('disabled',false) /* valide le bouton Hold */
    $("#zoneGagnant").hide()


} 
/* Génération d'un nombre aléatoire compris entre 1 et la borne supérieure passée en paramètre */
function Generernombre (bornemax) {    
    return Math.floor(Math.random() * (bornemax - .5) + 1);
}
/* Affichage d'un score */
function Affichagescore (adresse, score) {
    $(adresse).text(score)
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
/* Echange des joueurs  */
function Echangejoueur () {
    addressescore = '#Scourant'+Joeurencours /* Génére l'adresse du score courant du joueur en cours */
    Affichagescore (addressescore,0) /* Efface le score courant du joueur en cours*/
    /* Echange les joueur en cours */
        if (Joeurencours == 1) Joeurencours = 2
        else {
            Joeurencours = 1
        }
    scorecourant=0 /* efface le score courant */
    addressescore = '#Scourant'+Joeurencours /* Génére l'adresse du score courant du joueur en cours */
    Affichagescore (addressescore,0) /* Efface le score courant du joueur */
    /* change le point et le cadre signalant le joueur en cours */ 

}
/* Joueur Gagnant */
function Gagnant () {
    $("#btnRollDice").attr('disabled',true) /* invalide le bouton Roll Dice */
    $("#btnHold").attr('disabled',true) /* invalide le bouton Hold */
    $("#zoneGagnant").show()
    var message="Joueur "+Joeurencours
    $("#nomGagnant").text(message)

} 
/* ---------------------------------------------------------------------------------------------------------------------------*/
/* Déroulement du jeu */
Remiseazero() /* Initialisation du jeu */

/* Attente que le joueur en cours click sur le bouton RollDice */
$("#btnRollDice").on("click", function() {
    $("#btnHold").attr('disabled',true)
    const nombreAleatoire = Generernombre(6); /* Génére un nombre aléatoire entre 1 et 6 */
   Rotationde () /* Fait tourner le dés */
   setTimeout ( () => { /* Génére un intervalle de temps pour laisser au dé le temps de tourner avant de continuer le reste du programme */
   Affichageimagede (nombreAleatoire) /* Affiche le dé correspondant au nombre tiré */
   if (nombreAleatoire == 1) { /* si le 1 est tiré, on annule tout et on change de joueur */
       Echangejoueur() /* echange les joeurs et met à 0 les scores courants */
   } else { /* sinon on augmente le score courant du joueur en cours */
       scorecourant += nombreAleatoire /* augmente le score courant du joueur */
       addressescore = '#Scourant'+Joeurencours
       Affichagescore (addressescore,scorecourant) /* affiche le score courant du joueur */
       /* score courant devient supérieur à 100 alors declare le joueur gagnant */
   }
   $("#btnHold").attr('disabled',false)
},1500)
})



/* Attente que le joueur en cours click sur le bouton Newgame */
$("#btnNewGame").on("click", function() {
    Remiseazero()
})

/* Attente que le joueur en cours click sur le bouton Hold */
$("#btnHold").on("click", function() {
    scoreglobaljoueurencours = Joueur [Joeurencours-1] 
    scoreglobaljoueurencours += scorecourant
    addressescore = '#Global'+ Joeurencours
    Joueur [Joeurencours-1] = scoreglobaljoueurencours
    Affichagescore (addressescore,scoreglobaljoueurencours) /* affiche le score courant du joueur */
    if (scoreglobaljoueurencours >= 100) {
        Gagnant()
    }
    Echangejoueur()
})