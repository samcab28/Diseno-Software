// internal/transport/http.go
package transport

import (
    "context"
    "encoding/json"
    "net/http"
)

func DecodeGetDataRequest(_ context.Context, r *http.Request) (interface{}, error) {
    var request GetDataRequest
    if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
        return nil, err
    }
    return request, nil
}

func EncodeResponse(_ context.Context, w http.ResponseWriter, response interface{}) error {
    return json.NewEncoder(w).Encode(response)
}