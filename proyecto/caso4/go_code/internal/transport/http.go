// internal/transport/http.go
package transport

import (
    "context"
    "encoding/json"
    "fmt"
    "net/http"
    "Caso4/internal/endpoint"
    "Caso4/pkg/db"
)

// DecodeGetDataRequest decodifica la solicitud para obtener datos
func DecodeGetDataRequest(_ context.Context, r *http.Request) (interface{}, error) {
    var request endpoint.GetDataRequest
    if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
        return nil, err
    }
    return request, nil
}

// EncodeResponse codifica la respuesta en formato JSON
func EncodeResponse(_ context.Context, w http.ResponseWriter, response interface{}) error {
    return json.NewEncoder(w).Encode(response)
}

// HomeHandler es el handler para la ruta principal
func HomeHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "¡Hola! Bienvenido al microservicio.")
}

// get35PercentHandler maneja la solicitud para obtener el 35% de los registros
func get35PercentHandler(pgDB *db.PostgresDB) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        registros, err := pgDB.Get35PercentRecords()  // Cambia a Get35PercentRecords
        if err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }

        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(registros)
    }
}
