package db

import (
	"database/sql"
)

var db *sql.DB

var stmtMap = map[string]*sql.Stmt{}

var scriptMap = map[string]string{
	"biosAll":    biosAllScript,
	"biosInsert": biosInsertScript,
}

func initStatements(database *sql.DB) error {
	var err error

	db = database

	for k, script := range scriptMap {
		stmtMap[k], err = database.Prepare(script)
		if err != nil {
			return err
		}
	}

	return nil
}
