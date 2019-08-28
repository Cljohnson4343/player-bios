package db

import (
	"playerbios-api/models"
)

var biosAllScript = `
	SELECT 
		first_name,
		last_name,
		bio_url,
		hometown,
		latitude,
		longitude,
		born,
		league,
		id,
		county
	FROM bios;`

// GetBios returns all player bios from db
func GetBios() ([]*models.Bio, error) {
	rows, err := stmtMap["biosAll"].Query()
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	bios := make([]*models.Bio, 0)
	for rows.Next() {
		bio := models.Bio{}
		err = rows.Scan(
			&bio.First,
			&bio.Last,
			&bio.URL,
			&bio.Hometown,
			&bio.Latitude,
			&bio.Longitude,
			&bio.Born,
			&bio.League,
			&bio.ID,
			&bio.County,
		)
		if err != nil {
			return bios, err
		}
		bios = append(bios, &bio)
	}

	return bios, rows.Err()
}

var biosInsertScript = `
INSERT INTO bios(
	first_name,
	last_name,
	bio_url,
	hometown,
	latitude,
	longitude,
	born,
	league,
	county
)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
ON CONFLICT ON CONSTRAINT same_player_bio 
DO UPDATE SET 
	first_name = $1,
	last_name = $2,
	bio_url = $3,
	hometown = $4,
	latitude = $5,
	longitude = $6,
	born = $7,
	league = $8,
	county = $9
RETURNING id;`

// InsertBio inserts a player bio into the db
func InsertBio(b *models.Bio) (*models.Bio, error) {
	err := stmtMap["biosInsert"].QueryRow(
		b.First,
		b.Last,
		b.URL,
		b.Hometown,
		b.Latitude,
		b.Longitude,
		b.Born,
		b.League,
		b.County,
	).Scan(&b.ID)

	return b, err
}
