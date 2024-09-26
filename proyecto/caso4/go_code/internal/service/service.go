// internal/service/service.go
package service

import (
    "context"
    "yourproject/pkg/db"
    "yourproject/pkg/cache"
)

type Service interface {
    GetData(ctx context.Context, query string) ([]interface{}, error)
    GetDataPool(ctx context.Context, query string) ([]interface{}, error)
    GetDataCache(ctx context.Context, query string) ([]interface{}, error)
}

type basicService struct {
    db    *db.PostgresDB
    cache *cache.RedisCache
}

func NewService(db *db.PostgresDB, cache *cache.RedisCache) Service {
    return &basicService{db, cache}
}

func (s *basicService) GetData(ctx context.Context, query string) ([]interface{}, error) {
    // Implementar lógica para obtener datos
    return nil, nil
}

// Implementar GetDataPool y GetDataCache...