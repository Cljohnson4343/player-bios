package bios

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"playerbios-api/db"
	res "playerbios-api/err"
	"playerbios-api/models"
)

// GetBiosFromJSONFile returns bios from json file
func GetBiosFromJSONFile(name string) ([]*models.Bio, error) {
	file, err := os.Open(name)
	if err != nil {
		return nil, fmt.Errorf(
			"error opening file %s: %v",
			name,
			err,
		)
	}
	defer file.Close()

	bios := make([]*models.Bio, 0)
	err = json.NewDecoder(file).Decode(&bios)
	if err != nil {
		return nil, fmt.Errorf(
			"error decoding file %s: %v",
			name,
			err,
		)
	}
	/*
		b, err := ioutil.ReadAll(file)
		if err != nil {
			return nil, fmt.Errorf(
				"error reading file %s: %v",
				name,
				err,
			)
		}
		bios, err := models.UnmarshalJSON(b)
		if err != nil {
			return nil, fmt.Errorf(
				"error unmarshaling file %s: %v",
				name,
				err,
			)
		}
	*/

	return bios, nil
}

func InsertBios(bios []*models.Bio) *res.Error {
	e := res.NewNilError()
	for _, bio := range bios {
		_, err := db.InsertBio(bio)
		if err != nil {
			e.Addf(
				http.StatusBadRequest,
				"error inserting bio %v: %v",
				bio,
				err,
			)
		}
	}

	return e.GetError()
}
