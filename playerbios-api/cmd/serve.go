package cmd

/*
Copyright © 2019 NAME HERE <EMAIL ADDRESS>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import (
	"fmt"
	"log"
	"net/http"
	"playerbios-api/bios"
	"playerbios-api/db"

	"github.com/go-chi/chi"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var portFlag *int

// serveCmd represents the serve command
var serveCmd = &cobra.Command{
	Use:   "serve",
	Short: "Serve the playerbios api",
	Run: func(cmd *cobra.Command, args []string) {
		database := db.InitDB()
		defer db.Shutdown(database)

		baseAPIURL := fmt.Sprintf("/api/v%d", viper.GetInt("version"))
		router := chi.NewRouter()
		router.Route(baseAPIURL, func(r chi.Router) {
			r.Mount("/bios", bios.Routes())
		})

		walkFunc := func(method string, route string, handler http.Handler, middlewares ...func(http.Handler) http.Handler) error {
			log.Printf("%s %s\n", method, route) // walk and print out all routes
			return nil
		}
		if err := chi.Walk(router, walkFunc); err != nil {
			log.Panicf("Logging err: %s\n", err.Error()) // panic if there is an error
		}

		log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", *portFlag), router))
	},
}

func init() {
	rootCmd.AddCommand(serveCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// serveCmd.PersistentFlags().String("foo", "", "A help for foo")
	portFlag = serveCmd.Flags().Int("port", 4343, "port to use")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// serveCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
