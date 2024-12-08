FROM golang:latest
WORKDIR /app
WORKDIR /app
RUN go build -o app .
EXPOSE 9999
CMD ["./app"]
