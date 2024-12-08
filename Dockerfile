FROM golang:latest
WORKDIR /app
RUN go mod download
WORKDIR /app
RUN go build -o app .
EXPOSE 9999
CMD ["./app"]
