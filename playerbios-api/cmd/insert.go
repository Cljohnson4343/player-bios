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
	"errors"
	"fmt"
	"net/http"
	"os"
	pb "playerbios-api/bios"
	"playerbios-api/db"
	res "playerbios-api/err"
	"strings"

	"github.com/spf13/cobra"
)

func isJSONFile(name string) bool {
	s := strings.Split(name, ".")
	ext := strings.TrimSpace(s[len(s)-1])

	return ext == "json"
}

// insertCmd represents the insert command
var insertCmd = &cobra.Command{
	Use:   "insert [json file[s] of bios to insert]",
	Short: "Insert player bios from json file",
	Args: func(cmd *cobra.Command, args []string) error {
		if len(args) < 1 {
			return errors.New("requires atleast one json file argument")
		}

		for _, v := range args {
			if !isJSONFile(v) {
				return fmt.Errorf("invalid json file specified: %s", v)
			}
		}
		return nil
	},
	Run: func(cmd *cobra.Command, args []string) {
		database := db.InitDB()
		defer db.Shutdown(database)

		e := res.NewNilError()
		for _, v := range args {
			bios, insErr := pb.GetBiosFromJSONFile(v)
			if insErr != nil {
				e.Addf(http.StatusBadRequest, "error getting bios from file: %v", insErr)
				break
			}

			insE := pb.InsertBios(bios)
			if insErr != nil {
				e.AddError(insE)
				break
			}
		}

		if e = e.GetError(); e != nil {
			fmt.Fprintf(os.Stderr, "%s", e.JSON())
		}
	},
}

func init() {
	rootCmd.AddCommand(insertCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// insertCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// insertCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
