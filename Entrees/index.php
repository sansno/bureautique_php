<?php
// Définition des routes
$routes = [
    '/' => 'niveau-cuve.html',
    '/ajax-recupere-donnees' => 'ajax-recupere-donnees.php',
];


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