<?php
// Définition des routes
$routes = [
    '/' => 'niveau-cuve.html',
    '/ajax-recupere-donnees' => 'ajax-recupere-donnees.php',
];


/********************************* */
/*
//Lecture du fichier d'entrée PHP
$cheminFichierEntreePHP = '../Fichiers_communication/EntreePHP/fichierEntreePHP.PasToutAFaitjson';
$fichierEntreePHP = file_get_contents($cheminFichierEntreePHP);

echo "<div>$fichierEntreePHP</div></br>";

//Segmentation de la chaîne par bloque {}
preg_match_all('/\{[^{}]*\}/', $fichierEntreePHP, $correspondances);

$segment_tab = $correspondances[0];

$donneesJSON = "[";
foreach ($segment_tab as $segment) {
    //Concaténation des segments complets
    $donneesJSON .= $segment .",";   
}

//Suppression de la dernière virgule
$donneesJSON = mb_substr($donneesJSON, 0, -1);

//Fermeture du tableau
$donneesJSON .= "]";

echo "<div>$donneesJSON</div></br>";
die;
*/

/********************************* */


// Récupération de l'URL demandée
$request_uri = $_SERVER['REQUEST_URI'];

// Supprimer la partie de l'URL après le point d'interrogation (query string)
$request_uri = explode('?', $request_uri)[0];

// Vérifier si l'URL correspond à une route connue
if (array_key_exists($request_uri, $routes)) {
    // Inclure le script correspondant à la route demandée
    $cheminHTML = "../Sorties/" . $routes[$request_uri];
    include $cheminHTML;
} else {
    // Si la route n'est pas trouvée, retourner une erreur 404
    http_response_code(404);
    echo 'Erreur 404 - Page non trouvée';
}