FROM php:8.3.17-alpine

RUN apk add libpq-dev \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pdo pdo_pgsql pgsql

COPY ./adminer-4.14-pgsql.php /app/adminer.php
COPY ./security.php /app/public/index.php

ARG PASSWORD
ENV ADMINER_PASSWORD ${PASSWORD}

CMD ["/usr/local/bin/php", "-S", "[::]:8081", "-t", "/app/public/"]
