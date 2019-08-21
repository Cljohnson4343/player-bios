## Virtual environment

This project uses a python virtual environment.

### Activating the virtual environment

Run the following command:

```shell
source ../../environments/player_scraper/bin/activate
```

## Data

This project uses player bio data scraped from various websites.

### Scraping

Activate your project's python virtual environment. From the /data/scrapers/player_bios directory run the following command:

```shell
scrapy crawl <{nba_bios|nfl_bios|mlb_bios|nhl_bios|tennis_bios}> -o <output file>
```

### Cleaning Data

#### Clean Player Bio

Run the following command:

```shell
python clean.py ./scrapers/<input file> <output file>
```

#### Extract US places from scraped bio info

Run the following command:

```shell
python address_extraction.py <input file> <output file>
```

#### Compile US places from extracted US places

Run the following command:

```shell
python compile_us_addresses.py <input csv file> [, ...] <output csv file>
```

#### Add Latitude and Longitude to US places

Run the following command:

```shell
python add_geocoding.py <csv file containing geocoded addrs> <json file of bios> <json output file>
```

### Inserting Data

Create and set up a postgresql database using the /playerbios-api/db/playerbios_schema.sql schema.
Run the following command:

```shell
playerbios-api insert <json input file> --config <config file>
```
