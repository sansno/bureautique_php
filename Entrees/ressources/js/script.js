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
                    //
                    aiguilleur(element);
                });
            } else {
                console.error('La réponse n\'est pas un tableau:', donnee_tab);
            }
        })
    }

    // Appeler la fonction envoyerRequete à intervalle régulier (par exemple, toutes les 10 secondes)
    setInterval(envoyerRequete, 10000); 
});



/**************/
/* Aiguilleur */
/**************/

function aiguilleur(element){

}

/*********************************************/
/* Gestion des différents éléments graphique */
/*********************************************/

function gestionGraphiqueCurve(element){
    var elementHTML = document.getElementById(element.identifiant);
    if (elementHTML && element.valeur !== undefined) {
        elementHTML.style.transform = 'scaleY(' + element.valeur + ')';
    }
}

//Création du graphe
var ctx = document.getElementById('graphique').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line', // ou 'bar', 'pie', 'doughnut', etc.
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
            label: 'Dataset 1',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
