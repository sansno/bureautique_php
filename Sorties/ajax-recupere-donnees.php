<?php
// Vérifier si la requête est une requête AJAX envoyée avec fetch
if (   $_SERVER['REQUEST_METHOD'] === 'POST' 
    && isset($_SERVER['HTTP_CONTENT_TYPE']) 
    && strtolower($_SERVER['HTTP_CONTENT_TYPE']) === 'application/json') {

    //Lecture du fichier d'entrée PHP
    $cheminFichierEntreePHP = '../Fichiers_communication/EntreePHP/fichierEntreePHP.txt';
    $fichierEntreePHP = file_get_contents($cheminFichierEntreePHP);

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

    // Envoyer la réponse au format JSON
    header('Content-Type: application/json');
    //echo json_encode($donneesJSON);
    echo $donneesJSON;
} else {
    // Si la requête n'est pas une requête AJAX envoyée avec fetch, renvoyer une erreur
    header("HTTP/1.1 403 Forbidden");
    exit('Accès interdit');
}
?>