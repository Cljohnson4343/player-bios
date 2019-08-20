package bios

import (
	"net/http"
	"playerbios-api/db"

	"github.com/go-chi/render"
)

func getBiosHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		bios, err := db.GetBios()
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}

		render.JSON(w, r, bios)
	}
}
