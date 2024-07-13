REM Démarrer le serveur interne PHP sur le port 1234 pointant vers le dossier public non accessible par l'extérieur
start "" php8.3.6\php.exe -S localhost:1234 -t Entrees -d Entrees

REM Attendre un peu pour s'assurer que le serveur démarre avant de lancer le navigateur
ping 127.0.0.1 -n 5 > nul

REM Ouvrir l'URL dans le navigateur par défaut
start "" http://localhost:1234


REM --------------------------------------- 

REM Démarrer le serveur interne PHP sur le port 1234 pointant vers le dossier public. Mettre l'ipv4 de l'hôte pour le rendre accessible de l'extérieur avec un réseau local
REM start "" php8.3.6\php.exe -S ipv4:1234 -t Entrees -d Entrees
REM ping ipv4:1234 -n 5 > nul
REM start "" http://ipv4:1234