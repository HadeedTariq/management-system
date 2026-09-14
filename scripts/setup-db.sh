#!/bin/sh

set -e

echo "Waiting for PostgreSQL..."

until docker compose exec -T postgres pg_isready -U your_user_name -d your_db_name > /dev/null 2>&1
do
  sleep 1
done

echo "Running migrations..."
docker compose exec server npm run db:migrate

echo "Importing development data..."
cat database/seed.sql | docker compose exec -T postgres psql -U your_user_name -d your_db_name

echo "Database setup complete."