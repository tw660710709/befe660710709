#same version as go mod
FROM golang:1.24.5 AS builder 

WORKDIR /app

#copy for download go lib
COPY go.mod go.sum ./
RUN go mod download

#copy for build soruce code
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -o main .

FROM alpine:latest

RUN apk --no-cache add ca-certificates curl

WORKDIR /root

COPY --from=builder /app/main .

ENTRYPOINT ["./main"]