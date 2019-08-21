clean-db:
	@echo "\nCleaning the database...\n"
	psql -d playerBiosDB -f ./playerbios-api/db/playerbios_schema.sql

start-db:
	@echo "Opening db..."
	@psql -d playerBiosDB

start: 
	@echo "\nStarting the server...\n"
	@cd playerbios-api && go build && ./playerbios-api serve --config config.yaml && cd .. 

build:
	go build -a
