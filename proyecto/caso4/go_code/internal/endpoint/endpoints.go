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

type GetDataPool struct {
    Data []interface{} `json:"data"`
}

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

// Implement MakeGetDataPoolEndpoint and MakeGetDataCacheEndpoint here...
func MakeGetDataPoolEndpoint(s service.Service) endpoint.Endpoint {
    return func(ctx context.Context, request interface{}) (interface{}, error) {
        req := request.(GetDataRequest)
        data, err := s.GetDataPool(ctx, req.Query)
        if err != nil {
            return nil, err
        }
        return GetDataResponse{Data: data}, nil
    }
}

func MakeGetDataCacheEndpoint(s service.Service) endpoint.Endpoint {
    return func(ctx context.Context, request interface{}) (interface{}, error) {
        req := request.(GetDataRequest)
        data, err := s.GetDataCache(ctx, req.Query)
        if err != nil {
            return nil, err
        }
        return GetDataResponse{Data: data}, nil
    }
}