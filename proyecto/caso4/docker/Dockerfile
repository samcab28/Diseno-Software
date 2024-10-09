FROM golang:1.20

WORKDIR /app

COPY go_code/go.mod go_code/go.sum ./
RUN go mod download

COPY go_code/ .

RUN go build -o main .

EXPOSE 8080

CMD ["./main", "--host", "0.0.0.0", "--port", "8080"]