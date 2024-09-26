// internal/transport/http.go
package transport

import (
    "context"
    "encoding/json"
    "fmt"
    "net/http"
    "Caso4/internal/endpoint"
)

func DecodeGetDataRequest(_ context.Context, r *http.Request) (interface{}, error) {
    var request endpoint.GetDataRequest
    if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
        return nil, err
    }
    return request, nil
}

func EncodeResponse(_ context.Context, w http.ResponseWriter, response interface{}) error {
    return json.NewEncoder(w).Encode(response)
}

func HomeHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "¡Hola! Bienvenido al microservicio.")
}