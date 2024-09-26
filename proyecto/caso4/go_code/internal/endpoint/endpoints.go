// internal/endpoint/endpoints.go
package endpoint

import (
    "context"
    "github.com/go-kit/kit/endpoint"
    "yourproject/internal/service"
)

type Endpoints struct {
    GetDataEndpoint       endpoint.Endpoint
    GetDataPoolEndpoint   endpoint.Endpoint
    GetDataCacheEndpoint  endpoint.Endpoint
}

func MakeGetDataEndpoint(s service.Service) endpoint.Endpoint {
    return func(ctx context.Context, request interface{}) (interface{}, error) {
        req := request.(GetDataRequest)
        data, err := s.GetData(ctx, req.Query)
        if err != nil {
            return nil, err
        }
        return GetDataResponse{Data: data}, nil
    }
}

// Implementar MakeGetDataPoolEndpoint y MakeGetDataCacheEndpoint...