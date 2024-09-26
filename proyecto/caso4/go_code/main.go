package main

import (
	"log"
	"net/http"
	httptransport "github.com/go-kit/kit/transport/http"

	"Caso4/internal/service"
	customendpoint "Caso4/internal/endpoint"
	"Caso4/internal/transport"
	"Caso4/pkg/db"
	"Caso4/pkg/cache"
)

func main() {
	// Initialize DB and cache connections
	dbConn, err := db.NewPostgresConnection()
	if err != nil {
		log.Fatal(err)
	}
	redisClient, err := cache.NewRedisClient()
	if err != nil {
		log.Fatal(err)
	}

	// Create service instance
	svc := service.NewService(dbConn, redisClient)

	// Define endpoints
	endpoints := customendpoint.Endpoints{
		GetDataEndpoint:      customendpoint.MakeGetDataEndpoint(svc),
		GetDataPoolEndpoint:  customendpoint.MakeGetDataPoolEndpoint(svc),
		GetDataCacheEndpoint: customendpoint.MakeGetDataCacheEndpoint(svc),
	}

	// Configure HTTP handlers
	http.Handle("/getData", httptransport.NewServer(
		endpoints.GetDataEndpoint,
		transport.DecodeGetDataRequest,
		transport.EncodeResponse,
	))
	// Configure other handlers...

	http.HandleFunc("/", transport.HomeHandler)

	log.Println("Server starting on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}