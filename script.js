/* Définition des variables d'adressage des scores*/
const Imagedes = $('#imagedes') /* image du dés */
var $window = $(window) /* constante contenant l'adresse en jquery de la fenêtre contenant le document en cours"*/
var Joueur = [0,0] /* tableau contenant le score global des joueurs */
var compteur = 0 /* variable servant de compteur pour les routines de boucle" */
var scorecourant = 0 /* variable contenant le score courant du joueur en cours*/
var addressescore /* variable contenant l'id de la balise du score à modifier */
var joueurencours=1 /* variable contenant le numéro du joueur en cours*/
var scoreglobaljoueurencours /* variable contenant le score global du joueur en cours */
var modeecran = 1 /* variable contenant le mode d'affichhage de l'écran : 1 - smartphone en mode portrait , 2 - autre écran en mode paysage */
var oldmodeecran = modeecran /* variable contenant l'ancien mode d'affichage de l'écran avant le redimensionnement */
var index /* varaible contenant l'index permettant de charger les références de positionnement du rectangle de sélection en focntion du mode d'affichage
            et du joueur en cours: mode 1- joueur 1 : 0 ; mode 1- joueur 2 : 1; mode 2- joueur 1 : 2 ; mode 2- joueur 2 : 3 */
const modeecrancssrectangle = [{top : "0px", left : "0px", height : "55vh", width : "100%", right : "auto"},
{bottom : "0px" , left : "0px", height : "45vh", width : "100%", top : "auto"}, 
{top : "0px", left : "0px", height : "100%", width : "50vw", right : "auto"},
{top : "0px", right : "0px", height : "100%", width : "50vw", left : "auto"}] /* tableau contenant les coordonnées de positionnement du rectangle de sélection
                                                                                 en fonction du mode d'affichage et du joueur: certaines coordonnées doivent être positionnées
                                                                                 à auto pour que cela fonctionne*/


/* Initialisation du jeux */
/* fonction appelée si on redimensionne l'écran, sert surtout lors du passage de portrait à paysage*/
$window.resize(function () {
    dimensionecran () /* charge les nouvelles dimensions de l'écran ainsi que le mode d'affichage */
    if (modeecran !== oldmodeecran) { /* si le nouveau mode est différent de celui sauvegardé */
        oldmodeecran=modeecran /*  sauvegarde le nouveau mode d'affichage */
        affichagerectangle()  /* on affiche le rectangle de sélection à sa nouvelle position*/
    }
});
/* fonction : charge les dimension de l'écran et génére le mode d'affichage */
function dimensionecran () { 
  
    var largeur = window.outerWidth /* charge la largeur de l'écran */
    var hauteur = window.outerHeight /* charge la hauteur de l'écran */
    if ((largeur < hauteur) & largeur < 768) { /* test si on est sur un smartphon en mode portrait : largeur < hauteur */
      modeecran=1 /* si smartphone en mode portrait, alors mode d'affichage à 1 */
    } else {
      modeecran=2 /* si autre écran, alors mode d'affichage à 2 */
    }
  }
/* fonction : affiche le rectangle de selection en fonction du mode d'affichage et du joueur */
  function affichagerectangle () {
    index = (modeecran-1)*2+(joueurencours-1) /* génére l'index servant à extraire du tableau la chaine correspondent au mode d'affichage et au joueur*/
    $("#Rectangle").css(modeecrancssrectangle[index]); /* affiche le rectangle de sélection à la position correcte*/
    $("#cerclejoueur1").css('visibility','hidden')
    $("#cerclejoueur2").css('visibility','hidden')
    var adressepointselection = "#cerclejoueur"+joueurencours
    $(adressepointselection).css('visibility','visible')
  }
/* fonction : remise à zéro de l'interface, des scores et du joueur en cours */
function Remiseazero() {
    /* Remet tous les scores à 0 */
    
    for (compteur=1;compteur <=2; compteur++) { 
        addressescore = '#Scourant'+compteur
        Affichagescore (addressescore,0) /* affiche le score courant du joueur */ 
        addressescore = '#Global'+compteur
        Affichagescore (addressescore,0) /* affiche le score global du joueur */
        Joueur [compteur-1]  = 0 /* a modifier à 0 quand la fonction joueur gagnant focntionnera */
    }
    Imagedes.attr('src','/image/Image des 1.png') /* affiche l'image du dé par défaut, en l'occurence 1 */
    joueurencours = Generernombre(2) /* choisit au hasard le joueur qui commence */
    dimensionecran() /* recherche les dimension de l'écran et le mode d'affichage */
    affichagerectangle() /* affiche le rectangle de sélection */
    scorecourant = 0 /* met le score courant à 0 */
    $("#btnRollDice").attr('disabled',false) /* valide le bouton Roll Dice */
    $("#btnHold").attr('disabled',false) /* valide le bouton Hold */
    $("#zoneGagnant").hide() /* Cache la zone pour l'affichage du joueur gagnant */
} 
/* Génération d'un nombre aléatoire compris entre 1 et la borne supérieure passée en paramètre */
function Generernombre (bornemax) {    
    return Math.floor(Math.random() * (bornemax - .5) + 1); /* Retourne un nombre entre 1 et 6 (le -0.5 le permet pas le -1 */
}

/* Affichage d'un score */
function Affichagescore (adresse, score) {
    $(adresse).text(score) /* Affiche le score à l'id passée en argument : score global ou courant pour les joueurs 1 ou 2 */
}
/* Affichage de l'image du dé en fonction du nombre généré */
function Affichageimagede (numero) {
    const lienImageDe = "/image/Image des "+ numero + '.png'; /* construit l'adresse sur le disque de l'image à charger */
    Imagedes.attr('src',lienImageDe); /* inserre l'adresse à charger dans l'attribut de la balise image */
}
/* Rotation de l'image du dé  */
function Rotationde () {
        var angle=0 /* Variable incrémentée servant à faire tourner l'image du dé */
        var compteur = 136 /* Variable décrémentée servant de compte à rebours pour que l'animation dure environ 4s */
        var tempsrotation = setInterval(() => { /* timer appelé toute les 10 s pour faire touner de 10° le dés*/
           compteur-- /* Décrément le compteur servant de minuterie */
           if (compteur == 0) {clearTimeout(tempsrotation) /* Quand le compteur est à 0 on arrête le timer */
           } else {
              angle=angle+10 /* Augmentel'angle de 10 ° */
              var rotation= "rotate(" + angle + "deg)" /* Créé la fonction de rotation */
              $('#imagedes').css("transform",rotation) /* Fait tourner l'image de l'angle désiré */
           }
        },10)   
    }
/* Echange des joueurs  */
function Echangejoueur () {
    addressescore = '#Scourant'+joueurencours /* Génére l'adresse du score courant du joueur en cours */
    Affichagescore (addressescore,0) /* Efface le score courant du joueur en cours*/
    /* Echange les joueur en cours */
        if (joueurencours == 1) {joueurencours = 2
        } else {
            joueurencours = 1
        }
    scorecourant=0 /* efface le score courant */
    addressescore = '#Scourant'+joueurencours /* Génére l'adresse du score courant du joueur en cours */
    Affichagescore (addressescore,0) /* Efface le score courant du joueur */
    dimensionecran() /* recherche les dimension de l'écran et le mode d'affichage */
    affichagerectangle() /* affiche le rectangle de sélection */
    /* change le point et le cadre signalant le joueur en cours */ 

}
/* Affichage joueur Gagnant */
function Gagnant () {
    $("#btnRollDice").attr('disabled',true) /*invalide le bouton Roll Dice */
    $("#btnHold").attr('disabled',true) /*invalide le bouton Hold */
    $("#zoneGagnant").show() /* Affiche la zone du message pour le joueur vainqueur */
    var message="Joueur "+joueurencours /* Créé le message désignant le joueur gagnant */
    $("#nomGagnant").text(message) /* Affiche le joueur gagnant */
} 
/* ---------------------------------------------------------------------------------------------------------------------------*/
/* Déroulement du jeu */

Remiseazero() /* Initialisation du jeu */

/* Attente que le joueur en cours click sur le bouton RollDice */
$("#btnRollDice").on("click", function() {
    $("#btnHold").attr('disabled',true) /* Désactive le bouton Hold pour éviter de sauver pendant l'animation du bouton Roll DIce */
    const nombreAleatoire = Generernombre(6); /* Génére un nombre aléatoire entre 1 et 6 */
   Rotationde () /* Fait tourner le dés */
   setTimeout ( () => { /* Génére un intervalle de temps pour laisser au dé le temps de tourner avant de continuer le reste du programme */
   Affichageimagede (nombreAleatoire) /* Affiche le dé correspondant au nombre tiré */
   if (nombreAleatoire == 1) { /* si le 1 est tiré, on annule tout et on change de joueur */
       Echangejoueur() /* echange les joueurs et met à 0 les scores courants */
   } else { /* sinon on augmente le score courant du joueur en cours */
       scorecourant += nombreAleatoire /* augmente le score courant du joueur */
       addressescore = '#Scourant'+joueurencours /* variable contenant le numéro du joueur en cours*/
       /* Génére l'adresse pour l'affcihage du score courant pour le joueur en cours */
       Affichagescore (addressescore,scorecourant) /* affiche le score courant du joueur en cours*/
       /* teste si le joueur en cours a atteind 100 points sur le score courant pour le déclarer vainqueur */
        if (scorecourant >= 100) {
        Gagnant() /* affiche le joueur gagnant */
        }
   }
   $("#btnHold").attr('disabled',false) /* Active le bouton Hold pour pouvoir sauvegarder le score*/
},1500)
})

/* Attente que le joueur en cours click sur le bouton Newgame */
$("#btnNewGame").on("click", function() {
    Remiseazero() /* Reinitialise le jeu */
})

/* Attente que le joueur en cours clique sur le bouton Hold */
$("#btnHold").on("click", function() { 
    scoreglobaljoueurencours = Joueur [joueurencours-1]  /* Récupére le score global du joueur en cours */
    scoreglobaljoueurencours += scorecourant /* Ajoute le score courant au score global enregistré */
    addressescore = '#Global'+ joueurencours /* Génére l'adresse pour l'affichage du score global du joueur en cours */
    Joueur [joueurencours-1] = scoreglobaljoueurencours /* Sauvegarde le nouveau score global pour le joueur en cours */  
    Affichagescore (addressescore,scoreglobaljoueurencours) /* affiche le score global du joueur en cours */ 
    /* teste si le joueur en cours a atteind 100 points pour le déclarer vainqueur */
    if (scoreglobaljoueurencours >= 100) {
        Gagnant() /* affiche le joueur gagnant */
    } else {    
        Echangejoueur() /* Donne la main au joueur suivant */
    }
})