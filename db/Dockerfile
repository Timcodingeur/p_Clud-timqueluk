FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=db_monagenda

EXPOSE 3306

COPY ./db_monagenda_setup.sql /docker-entrypoint-initdb.d/db_monagenda_setup.sql

RUN chown -R mysql:mysql /docker-entrypoint-initdb.d/

VOLUME [ "/var/lib/mysql" ]

CMD ["mysqld", "--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci"]