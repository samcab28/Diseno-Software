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
	endpoints := customendpoint.Endpoints{
		Get35PercentRecordsEndpoint: customendpoint.MakeGet35PercentRecordsEndpoint(svc), // Agrega este endpoint
	}

	// Configura los handlers HTTP
	http.Handle("/getData", httptransport.NewServer(
		endpoints.GetDataEndpoint,
		transport.DecodeGetDataRequest,
		transport.EncodeResponse,
	))

	// Configura el handler para obtener el 35% de los registros
	http.Handle("/get35PercentRecords", httptransport.NewServer(
		endpoints.Get35PercentRecordsEndpoint,
		httptransport.NopRequestDecoder, // Usa un decodificador apropiado si necesitas parámetros
		transport.EncodeResponse,
	))

	// Configura otros handlers...
	http.HandleFunc("/", transport.HomeHandler)

	log.Println("Server starting on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
