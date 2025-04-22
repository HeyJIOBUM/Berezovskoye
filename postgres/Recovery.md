# В случае если база накрылась и нужно вручную загрузить бэкап

Запустить контейнер postgres, но снять комментарий с команды в *docker-compose.yml* (чтобы не создавать новую пустую базу):

```
postgres:
    entrypoint: ["sleep", "infinity"]
```

Заходим в контейнер:

```
docker exec -it berezovskoye-postgres-1 /bin/bash
```

Дальше вставить следующие 2 команды

```
# скачиваем резервную копию и разархивируем её (wal-g backup-fetch)

wal-g backup-fetch $PGDATA LATEST

# помещаем рядом с базой специальный файл-сигнал для восстановления 
# (см. https://postgrespro.ru/docs/postgresql/12/runtime-config-wal#RUNTIME-CONFIG-WAL-ARCHIVE-RECOVERY),
# он обязательно должен быть создан от пользователя postgres

su - postgres -c 'touch $PGDATA/recovery.signal'
```

Закоментировать команду сна обратно и перезапустить контейнер.
