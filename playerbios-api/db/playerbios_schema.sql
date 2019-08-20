DROP TABLE IF EXISTS bios CASCADE;

/*
  This table represents a player bio.
*/
CREATE TABLE bios (
  id serial,
  first_name text,
  last_name text,
  bio_url varchar(2083),
  hometown text,
  latitude real,
  longitude real,
  born timestamp,
  league varchar(5),

  PRIMARY KEY(id),
  CONSTRAINT same_player_bio UNIQUE(first_name, last_name, league, bio_url)
)