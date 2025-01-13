#!/bin/sh

echo "Waiting for MYSQL"
until mysqladmin ping -h mysqldb --silent; do
  echo "Waiting for MySQL..."
  sleep 2
done

npm run db:migrate && nodemon ./index.js