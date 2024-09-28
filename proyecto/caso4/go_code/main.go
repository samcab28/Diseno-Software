package main

import (
	"log"
	"net/http"

	httptransport "github.com/go-kit/kit/transport/http"

	customendpoint "Caso4/internal/endpoint"
	"Caso4/internal/service"
	"Caso4/internal/transport"
	"Caso4/pkg/cache"
	"Caso4/pkg/db"
)

func main() {
	// Inicializa las conexiones de la base de datos y caché
	dbConn, err := db.NewPostgresConnection()
	if err != nil {
		log.Fatal(err)
	}
	redisClient, err := cache.NewRedisClient()
	if err != nil {
		log.Fatal(err)
	}

	// Crea la instancia del servicio
	svc := service.NewService(dbConn, redisClient)

	// Define los endpoints
	endpoints := customendpoint.MakeEndpoints(svc)

	// Configura los handlers HTTP para los endpoints disponibles
	http.Handle("/get35PercentRecords", httptransport.NewServer(
		endpoints.Get35PercentRecordsEndpoint,
		httptransport.NopRequestDecoder,
		transport.EncodeResponse,
	))

	// Configura el handler para obtener datos utilizando pool de conexiones
	http.Handle("/get-35-percent-with-pool", httptransport.NewServer(
		endpoints.Get35PercentRecordsWithPoolEndpoint,
		httptransport.NopRequestDecoder,
		transport.EncodeResponse,
	))

	// Configura el handler para obtener datos utilizando caché y pool de conexiones
	http.Handle("/get-data-cache", httptransport.NewServer(
		endpoints.GetDataCachePoolEndpoint,
		httptransport.NopRequestDecoder,
		transport.EncodeResponse,
	))

	// Configura otros handlers...
	http.HandleFunc("/", transport.HomeHandler)

	log.Println("Server starting on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
