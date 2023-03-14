set -e 
docker-compose down 
docker volume rm local-benthos-hasura_db_data
docker volume rm local-benthos-hasura_target_db_data
echo "Cleanup complete!"