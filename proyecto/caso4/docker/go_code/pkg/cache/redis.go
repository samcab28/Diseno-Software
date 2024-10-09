package cache

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/go-redis/redis/v8"
)

type RedisCache struct {
	client *redis.Client
}

// NewRedisClient crea un cliente de Redis usando variables de entorno.
func NewRedisClient() (*RedisCache, error) {
	host := os.Getenv("REDIS_HOST")
	port := os.Getenv("REDIS_PORT")
	password := os.Getenv("REDIS_PASSWORD")

	if host == "" || port == "" {
		return nil, fmt.Errorf("REDIS_HOST y REDIS_PORT deben estar configurados")
	}

	client := redis.NewClient(&redis.Options{
		Addr:     fmt.Sprintf("%s:%s", host, port),
		Password: password,
		DB:       0, // Usar la base de datos 0
	})

	// Intentar una conexión para verificar si es exitosa.
	ctx := context.Background()
	if _, err := client.Ping(ctx).Result(); err != nil {
		return nil, err
	}

	return &RedisCache{client: client}, nil
}

// Get permite obtener un valor de Redis.
func (c *RedisCache) Get(ctx context.Context, key string) *redis.StringCmd {
	return c.client.Get(ctx, key)
}

// Set permite establecer un valor en Redis.
func (c *RedisCache) Set(ctx context.Context, key string, value interface{}, expiration time.Duration) *redis.StatusCmd {
	return c.client.Set(ctx, key, value, expiration)
}