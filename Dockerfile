# Utilise l'image de base officielle PHP avec Apache
FROM php:8.1-apache

# Copie les fichiers de l'application dans le dossier /var/www/html du conteneur
COPY ./index.html /var/www/html/
COPY ./jam.css /var/www/html/
COPY ./jam.js /var/www/html/
COPY ./crashs.php /var/www/html/

# (Optionnel) Ajuste les permissions des fichiers
RUN chown -R www-data:www-data /var/www/html/ && chmod -R 755 /var/www/html/

# Expose le port 80 pour permettre l'accès à l'application
EXPOSE 80