// pkg/db/postgres.go
package db

import (
	"database/sql"
	_ "github.com/lib/pq"
)

// Registro representa la estructura de los registros que obtendrás
type Registro struct {
	ID          int       // Para la columna 'id'
	Name        string    // Para la columna 'name'
	ReleaseDate sql.NullTime // Para la columna 'release_date'
	RequiredAge int       // Para la columna 'required_age'
	Price       float64   // Para la columna 'price'
}

type PostgresDB struct {
	*sql.DB
}

// Nueva conexión a PostgreSQL
func NewPostgresConnection() (*PostgresDB, error) {
    db, err := sql.Open("postgres", "postgres://postgres:CLtj6P4W3a@localhost:30100/games?sslmode=disable")
    if err != nil {
        return nil, err
    }
    return &PostgresDB{db}, nil
}

// get35PercentRecords ejecuta la consulta para obtener aproximadamente el 35% de los registros
func (pgDB *PostgresDB) Get35PercentRecords() ([]Registro, error) {
    query := `SELECT id, name, release_date, required_age, price FROM (
        SELECT *, ROW_NUMBER() OVER () AS rn
        FROM games_info
    ) sub
    WHERE rn <= (SELECT COUNT(*) * 0.35 FROM games_info);`

    rows, err := pgDB.Query(query)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var registros []Registro
    for rows.Next() {
        var r Registro
        // Escanea todas las columnas de la tabla
        if err := rows.Scan(&r.ID, &r.Name, &r.ReleaseDate, &r.RequiredAge, &r.Price); err != nil {
            return nil, err
        }
        registros = append(registros, r)
    }
    return registros, nil
}