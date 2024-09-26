package main

import (
    "log"
    "net/http"
    "github.com/go-kit/kit/endpoint"
    httptransport "github.com/go-kit/kit/transport/http"
    "Caso4/internal/service"
    "Caso4/internal/endpoint"
    "Caso4/internal/transport"
    "Caso4/pkg/db"
    "Caso4/pkg/cache"
)

func main() {
    // Inicializar conexiones de DB y cache
    dbConn, err := db.NewPostgresConnection()
    if err != nil {
        log.Fatal(err)
    }
    redisClient, err := cache.NewRedisClient()
    if err != nil {
        log.Fatal(err)
    }

    // Crear instancia del servicio
    svc := service.NewService(dbConn, redisClient)

    // Definir endpoints
    endpoints := endpoint.Endpoints{
        GetDataEndpoint: endpoint.MakeGetDataEndpoint(svc),
        GetDataPoolEndpoint: endpoint.MakeGetDataPoolEndpoint(svc),
        GetDataCacheEndpoint: endpoint.MakeGetDataCacheEndpoint(svc),
    }

    // Configurar handlers HTTP
    http.Handle("/getData", httptransport.NewServer(
        endpoints.GetDataEndpoint,
        transport.DecodeGetDataRequest,
        transport.EncodeResponse,
    ))
    // Configurar otros handlers...

    log.Fatal(http.ListenAndServe(":8080", nil))
}







