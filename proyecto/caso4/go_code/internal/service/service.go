package service

import (
	"Caso4/pkg/cache"
	"Caso4/pkg/db"
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"time"
)

// Service define los métodos que el servicio debe implementar
type Service interface {
	GetData(ctx context.Context, query string) ([]interface{}, error)
	GetDataPool(ctx context.Context, query string) ([]interface{}, error)
	GetDataCache(ctx context.Context, query string) ([]interface{}, error)
	Get35PercentRecords(ctx context.Context) ([]db.Registro, error)
	Get35PercentRecordsWithPool(ctx context.Context) ([]db.Registro, error)
	GetDataCachePool(ctx context.Context, query string) ([]interface{}, error)
}

// basicService es la implementación básica del servicio
type basicService struct {
	db    *db.PostgresDB
	cache *cache.RedisCache
}

// NewService crea una nueva instancia del servicio
func NewService(db *db.PostgresDB, cache *cache.RedisCache) Service {
	return &basicService{db, cache}
}

// GetData obtiene datos según la consulta proporcionada
func (s *basicService) GetData(ctx context.Context, query string) ([]interface{}, error) {
	// Implementar la lógica para obtener datos
	return nil, nil
}

// GetDataPool obtiene datos usando un pool de conexiones
func (s *basicService) GetDataPool(ctx context.Context, query string) ([]interface{}, error) {
	// Implementar la lógica para obtener datos usando un pool
	return nil, nil
}

// GetDataCache obtiene datos desde la caché
func (s *basicService) GetDataCache(ctx context.Context, query string) ([]interface{}, error) {
	// Implementar la lógica para obtener datos desde la caché
	return nil, nil
}

// Get35PercentRecords obtiene el 35% de los registros de la base de datos
func (s *basicService) Get35PercentRecords(ctx context.Context) ([]db.Registro, error) {
	return s.db.Get35PercentRecords() // Llama al método del DB
}

// Get35PercentRecordsWithPool obtiene el 35% de los registros usando un pool de conexiones.
func (s *basicService) Get35PercentRecordsWithPool(ctx context.Context) ([]db.Registro, error) {
	pool := s.db.GetPool() // Obtiene el pool de conexiones

	query := `SELECT id, name, release_date, required_age, price FROM (
        SELECT *, ROW_NUMBER() OVER () AS rn
        FROM games_info
    ) sub
    WHERE rn <= (SELECT COUNT(*) * 0.35 FROM games_info);`

	rows, err := pool.Query(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var registros []db.Registro
	for rows.Next() {
		var r db.Registro
		if err := rows.Scan(&r.ID, &r.Name, &r.ReleaseDate, &r.RequiredAge, &r.Price); err != nil {
			return nil, err
		}
		registros = append(registros, r)
	}

	return registros, nil
}

// GetDataCachePool obtiene datos usando un pool de conexiones y también utiliza caché (Redis).
func (s *basicService) GetDataCachePool(ctx context.Context, query string) ([]interface{}, error) {
	cacheKey := fmt.Sprintf("cache_pool_%s", query)

	// Primero intenta obtener los datos desde la caché.
	val, err := s.cache.Get(ctx, cacheKey).Result()
	if err == nil && val != "" {
		// Si hay un hit, deserializa los datos de la caché y retorna.
		var registros []interface{}
		if err := json.Unmarshal([]byte(val), &registros); err == nil {
			fmt.Println("Cache hit")
			return registros, nil
		}
	}

	// Si no hay datos en la caché, consulta la base de datos usando el pool de conexiones.
	fmt.Println("Cache miss")
	pool := s.db.GetPool() // Obtiene el pool configurado
	rows, err := pool.Query(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("error al ejecutar la consulta con pool: %w", err)
	}
	defer rows.Close()

	var registros []interface{}
	for rows.Next() {
		var id int
		var nombre string
		var releaseDate sql.NullTime
		var requiredAge int
		var price float64
		if err := rows.Scan(&id, &nombre, &releaseDate, &requiredAge, &price); err != nil {
			return nil, fmt.Errorf("error al escanear el resultado: %w", err)
		}
		registros = append(registros, map[string]interface{}{
			"id":           id,
			"nombre":       nombre,
			"release_date": releaseDate.Time.Format("2006-01-02"),
			"required_age": requiredAge,
			"price":        price,
		})
	}

	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("error durante la iteración de las filas: %w", err)
	}

	// Guarda el resultado en la caché.
	data, err := json.Marshal(registros)
	if err != nil {
		fmt.Printf("Error al serializar los datos para Redis: %v\n", err)
		return registros, nil
	}

	setErr := s.cache.Set(ctx, cacheKey, data, 10*time.Minute).Err()
	if setErr != nil {
		fmt.Printf("Error al guardar los datos en Redis: %v\n", setErr)
	} else {
		fmt.Println("Datos almacenados en Redis con éxito")
	}

	return registros, nil
}
