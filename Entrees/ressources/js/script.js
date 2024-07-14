//Définition d'un évènement lorsque la page web est entièrement chargée
document.addEventListener("DOMContentLoaded", function() {
    // Fonction pour envoyer la requête fetch au serveur et recevoir la réponse du serveur
    function envoyerRequete() {
        /********************/
        /* Appel au serveur */
        /********************/
        fetch('ajax-recupere-donnees', {
            //Spécifier la méthode HTTP
            method: 'POST', 
            //Type de contenu JSON pour la requête
            headers: {
                'Content-Type': 'application/json' 
            },
            //Si des données sont à envoyer
            body: JSON.stringify({}) 
        })
        /**********************/
        /* Réponse du serveur */
        /**********************/
        //Recevoir la réponse comme texte 
        .then(function(reponse) { return reponse.text(); })
        //Traitement de la réponse (mise à jour de l'interface graphique)(reponseTexte est le résultat du précédent then)
        .then(function(reponseTexte) { 

            //Déclaration d'une variable donnees
            var donnee_tab;

            // Convertir la chaîne de caractères en objet JavaScript
            try { donnee_tab = JSON.parse(reponseTexte); } catch (e) {console.error('Erreur de parsing JSON:', e); return;}
            
            // Vérifiez si donnee_tab est un tableau
            if (Array.isArray(donnee_tab)) {
                //Parcours des données
                donnee_tab.forEach(function(element) {
                    //Permet de diriger vers le bon traitement en fonction element.identifiant
                    aiguilleur(element);
                });
            } else {
                console.error('La réponse n\'est pas un tableau:', donnee_tab);
            }
        })
    }

    // Appeler la fonction envoyerRequete à intervalle régulier (par exemple, toutes les secondes)
    setInterval(envoyerRequete, 1000); 
});



/**************/
/* Aiguilleur */
/**************/

function aiguilleur(element){
    switch(element.identifiant) {
        case "cuve-contenu":
            gestionGraphiqueCuve(element);
            break;
        case "cuve-courbe":
            gestionCourbeGraphiqueCuve(element);
            break;
      }
 
}

/********************/
/* Données globales */
/********************/
var courbeCuveChart;

/*********************************************/
/* Gestion des différents éléments graphique */
/*********************************************/

function gestionGraphiqueCuve(element){
    var elementHTML = document.getElementById(element.identifiant);
    if (elementHTML && element.valeur !== undefined) {
        elementHTML.style.transform = 'scaleY(' + element.valeur + ')';
    }
}


function gestionCourbeGraphiqueCuve(element){

    //Constitution des données (x,y)
    //-Création du tableau de données
    var donneesXY = [];

    //-Combinaison des valeurs de x et y pour former donnees
    for (var i = 0; i < element.valeurX.length; i++) {
        donneesXY.push({ x: element.valeurX[i], y: element.valeurY[i] });
    }


    //Si le graphique existe déjà => on le met à jour
    if (courbeCuveChart) {
        // Mettre à jour les données du premier dataset
        courbeCuveChart.data.datasets[0].data = donneesXY;
        // Mettre à jour le graphique
        courbeCuveChart.update();
    }
    //Sinon => on le crée
    else {
        //Création du graphe
        var ctx = document.getElementById('graphique').getContext('2d');
        courbeCuveChart = new Chart(ctx, {
            type: 'line', // ou 'bar', 'pie', 'doughnut', etc.
            data: {
                datasets: [{
                    label: 'Niveau de la cuve (%)',
                    data: donneesXY,
                    backgroundColor: 'rgba(75, 192, 192, 1)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                animation: false,
                scales: {
                    x: {
                        type: 'linear',
                    },
                    y: {
                        beginAtZero: true,
                        min: 0,
                        max: 100,
                        ticks: {
                            stepSize: 10 // échelle de 10 en 10
                        },
                        grid: {
                            display: true,
                            drawBorder: false, // ne pas dessiner la bordure de l'axe
                            color: 'rgba(255, 255, 255, 0.1)', // couleur des lignes de grille
                            lineWidth: 1 // largeur des lignes de grille
                        }
                    }
                }//Fin scales
            }//Fin options
        });//Fin new Chart
    }
}
