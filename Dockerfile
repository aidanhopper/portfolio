FROM golang:latest
WORKDIR /app
COPY . .
RUN go build -o app .
EXPOSE 9999
CMD ["./app"]
