// internal/endpoint/endpoints.go
package endpoint

import (
	"Caso4/internal/service"
	"context"

	"github.com/go-kit/kit/endpoint"
)

// Define request and response types
type GetDataRequest struct {
	Query string `json:"query"`
}

type GetDataResponse struct {
	Data []interface{} `json:"data"`
}

type Endpoints struct {
	GetDataEndpoint                     endpoint.Endpoint
	GetDataPoolEndpoint                 endpoint.Endpoint
	GetDataCacheEndpoint                endpoint.Endpoint
	Get35PercentRecordsEndpoint         endpoint.Endpoint
	GetDataCachePoolEndpoint            endpoint.Endpoint
	Get35PercentRecordsWithPoolEndpoint endpoint.Endpoint
}

func MakeGet35PercentRecordsEndpoint(svc service.Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		return svc.Get35PercentRecords(ctx) // Pasa el contexto al método
	}
}

// MakeEndpoints crea todos los endpoints a partir del servicio.
func MakeEndpoints(svc service.Service) Endpoints {
	return Endpoints{
		Get35PercentRecordsEndpoint:         MakeGet35PercentRecordsEndpoint(svc),
		Get35PercentRecordsWithPoolEndpoint: MakeGet35PercentRecordsWithPoolEndpoint(svc),
		GetDataCachePoolEndpoint:            MakeGetDataCachePoolEndpoint(svc),
	}
}

// MakeGet35PercentRecordsWithPoolEndpoint crea un endpoint para Get35PercentRecordsWithPool.
func MakeGet35PercentRecordsWithPoolEndpoint(svc service.Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		data, err := svc.Get35PercentRecordsWithPool(ctx)
		if err != nil {
			return nil, err
		}

		// Convertir []db.Registro a []interface{}
		var result []interface{}
		for _, record := range data {
			result = append(result, record)
		}

		return GetDataResponse{Data: result}, nil
	}
}

// MakeGetDataCachePoolEndpoint crea un endpoint para GetDataCachePool.
func MakeGetDataCachePoolEndpoint(s service.Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		// En lugar de obtener el query de la solicitud, vamos a definirlo aquí.
		query := "SELECT * FROM games_info" // Ejemplo de query

		data, err := s.GetDataCachePool(ctx, query)
		if err != nil {
			return nil, err
		}
		return GetDataResponse{Data: data}, nil
	}
}
