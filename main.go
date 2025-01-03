package main

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"
)

func serve() {
	fmt.Println("Starting server on 9999")
	if err := http.ListenAndServe(":9999", nil); err != nil {
		fmt.Println("Server failed to start:", err)
	}
}

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		path := filepath.Join("./public", r.URL.Path)
		_, err := os.Stat(path)

		// If the requested file exists, serve it
		fmt.Println(err)
		if err == nil {
			http.ServeFile(w, r, path)
			return
		}

		// Otherwise, serve index.html for React Router routes
		http.ServeFile(w, r, filepath.Join("./public", "index.html"))
	})

	http.HandleFunc("/experience", func(w http.ResponseWriter, r *http.Request) {
		path := filepath.Join("./public", r.URL.Path)
		_, err := os.Stat(path)

		// If the requested file exists, serve it
		fmt.Println(err)
		if err == nil {
			http.ServeFile(w, r, path)
			return
		}

		// Otherwise, serve index.html for React Router routes
		http.ServeFile(w, r, filepath.Join("./public", "experience.html"))
	})

	serve()
}
