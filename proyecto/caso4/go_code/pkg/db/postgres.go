// pkg/db/postgres.go
package db

import (
    "database/sql"
    _ "github.com/lib/pq"
)

type PostgresDB struct {
    *sql.DB
}

func NewPostgresConnection() (*PostgresDB, error) {
	db, err := sql.Open("postgres", "postgres://username:password@localhost:30100/dbname?sslmode=disable")
	if err != nil {
		return nil, err
	}
	return &PostgresDB{db}, nil
}

// Implementar métodos para queries...