// internal/endpoint/endpoints.go
package endpoint

import (
    "context"
    "github.com/go-kit/kit/endpoint"
    "Caso4/internal/service"
)

// Define request and response types
type GetDataRequest struct {
    Query string `json:"query"`
}

type GetDataResponse struct {
    Data []interface{} `json:"data"`
}

type Endpoints struct {
    GetDataEndpoint       endpoint.Endpoint
    GetDataPoolEndpoint   endpoint.Endpoint
    GetDataCacheEndpoint  endpoint.Endpoint
    Get35PercentRecordsEndpoint endpoint.Endpoint
}

func MakeGet35PercentRecordsEndpoint(svc service.Service) endpoint.Endpoint {
    return func(ctx context.Context, request interface{}) (interface{}, error) {
        return svc.Get35PercentRecords(ctx) // Pasa el contexto al método
    }
}
