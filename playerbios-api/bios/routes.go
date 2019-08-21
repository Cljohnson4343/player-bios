package bios

import (
	"net/http"

	"github.com/go-chi/chi"
)

// Setup handles CORS preflight
func Setup(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", req.Header.Get("Origin"))
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PATCH, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	(*w).Header().Set("Access-Control-Allow-Credentials", "true")
}

// AllowCORS handles preflight OPTIONS requests
func AllowCORS(fn http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		Setup(&w, r)
		if r.Method == "OPTIONS" {
			return
		}

		fn.ServeHTTP(w, r)
	})

}

// Routes returns the endpoints for the bios package
func Routes() *chi.Mux {
	router := chi.NewRouter()

	router.Use(AllowCORS)

	router.Get("/bios", getBiosHandler())

	return router
}
