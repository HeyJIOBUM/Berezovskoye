FROM alpine:latest as downloader
WORKDIR /downloads
RUN wget https://github.com/wal-g/wal-g/releases/download/v3.0.5/wal-g-pg-ubuntu-22.04-amd64.tar.gz


FROM postgres:17.3

ENV POSTGRES_DB=berezovskoye_database
ENV POSTGRES_USER=user
ENV POSTGRES_PASSWORD=password
ENV PGDATA=/var/lib/postgresql/data

# Doesn't work, but good ref for changes in postgresql.conf
# RUN echo "wal_level=replica" >> /var/lib/postgresql/data/postgresql.conf \
#     && echo "archive_mode=on" >> /var/lib/postgresql/data/postgresql.conf \
#     && echo "archive_command='/usr/local/bin/wal-g wal-push \"%p\" >> /var/log/postgresql/archive_command.log 2>&1' " >> /var/lib/postgresql/data/postgresql.conf \
#     #&& echo “archive_timeout=60” >> /etc/postgresql/12/main/postgresql.conf \
#     && echo "restore_command='/usr/local/bin/wal-g wal-fetch \"%f\" \"%p\" >> /var/log/postgresql/restore_command.log 2>&1' " >> /var/lib/postgresql/data/postgresql.conf
# Instead:
COPY ./postgresql.conf /etc/postgresql/postgresql.conf

ENV PGHOST=/var/run/postgresql
#ENV PGPORT=5432
ENV PGUSER=user
ENV PGPASSWORD=password
ENV PGDATABASE=berezovskoye_database

# supervisor for cron and postgresql launch
RUN apt-get update && \
    apt-get install -y supervisor cron && \ 
    mkdir /etc/supervisor.d

COPY supervisord.conf /etc/supervisord.conf
COPY postgres_cron.ini /etc/supervisor.d/postgres_cron.ini

COPY ./cron_backup.conf /etc/cron.d/postgres_backup
RUN chmod 0644 /etc/cron.d/postgres_backup


ENV WALG_FILE_PREFIX=/wal-g-backups
#ENV WALG_SSH_PREFIX=
#ENV SSH_PORT=
#ENV SSH_USERNAME=
#ENV SSH_PASSWORD=
#ENV SSH_PRIVATE_KEY_PATH=

ENV WALG_COMPRESSION_METHOD=brotli

#COPY ./wal-g-pg-ubuntu-22.04-amd64.tar.gz /wal-g-pg-ubuntu-22.04-amd64.tar.gz
COPY --from=downloader /downloads/wal-g-pg-ubuntu-22.04-amd64.tar.gz /wal-g-pg-ubuntu-22.04-amd64.tar.gz
RUN tar -zxvf wal-g-pg-ubuntu-22.04-amd64.tar.gz \
    && mv wal-g-pg-ubuntu-22.04-amd64 /usr/local/bin/wal-g

RUN mkdir /wal-g-backups \
    && chown -R postgres:postgres /wal-g-backups


# 'printenv > /etc/environment' is needed for cronjobs, since cron reads environment from /etc/environment.
ENTRYPOINT printenv > /etc/environment && /usr/bin/supervisord -c /etc/supervisord.conf
