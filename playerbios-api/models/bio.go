package models

import (
	"encoding/json"
	"strconv"
	"time"
)

// Bio is the representation of a player bio
type Bio struct {
	ID        int        `json:"id"`
	First     string     `json:"first_name"`
	Last      string     `json:"last_name"`
	Born      *time.Time `json:"born"`
	URL       string     `json:"url"`
	Hometown  string     `json:"hometown"`
	Latitude  float32    `json:"lat"`
	Longitude float32    `json:"lon"`
	League    string     `json:"league"`
}

// UnmarshalJSON unmarshals given byte slice into Bio struct
func UnmarshalJSON(j []byte) ([]*Bio, error) {
	var rawStrings []map[string]string

	err := json.Unmarshal(j, &rawStrings)
	if err != nil {
		return nil, err
	}

	bios := make([]*Bio, 0)
	for _, bio := range rawStrings {
		for k, v := range bio {
			b := Bio{}
			switch k {
			case "first_name":
				b.First = v
			case "last_name":
				b.Last = v
			case "born":
				if v != "--" {
					born, err := time.Parse(time.RFC3339, v)
					if err != nil {
						return nil, err
					}
					b.Born = &born
				}
			case "url":
				b.URL = v
			case "hometown":
				b.Hometown = v
			case "lat":
				lat, err := strconv.ParseFloat(v, 32)
				if err != nil {
					return nil, err
				}
				b.Latitude = float32(lat)
			case "lon":
				lon, err := strconv.ParseFloat(v, 32)
				if err != nil {
					return nil, err
				}
				b.Longitude = float32(lon)
			case "league":
				b.League = v
			default:
			}
			bios = append(bios, &b)
		}
	}

	return bios, nil
}
