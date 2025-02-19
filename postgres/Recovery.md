# В случае если база накрылась и нужно вручную загрузить бэкап

Запустить контейнер postgres, но снять комментарий с команды в *docker-compose.yml*:

```
postgres:
    command: ["sleep", "infinity"]
```

Заходим в контейнер:

```
docker exec -it berezovskoye-postgres-1 /bin/bash
```

Дальше вставить следующие 2 команды

```
# скачиваем резервную копию и разархивируем её
su - postgres -c '/usr/local/bin/wal-g backup-fetch /var/lib/postgresql/data LATEST'
# помещаем рядом с базой специальный файл-сигнал для восстановления (см. https://postgrespro.ru/docs/postgresql/12/runtime-config-wal#RUNTIME-CONFIG-WAL-ARCHIVE-RECOVERY ), он обязательно должен быть создан от пользователя postgres
su - postgres -c 'touch /var/lib/postgresql/data/recovery.signal'
```

Закоментить команду сна и перезапустить контейнер.
