// pkg/cache/redis.go
package cache

import (
    "github.com/go-redis/redis/v8"
)

type RedisCache struct {
    *redis.Client
}

func NewRedisClient() (*RedisCache, error) {
	client := redis.NewClient(&redis.Options{
		Addr: "localhost:30102",
	})
	return &RedisCache{client}, nil
}

// Implementar métodos para cache...