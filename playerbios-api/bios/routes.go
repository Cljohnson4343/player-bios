package bios

import "github.com/go-chi/chi"

// Routes returns the endpoints for the bios package
func Routes() *chi.Mux {
	router := chi.NewRouter()

	router.Get("/bios", getBiosHandler())

	return router
}
