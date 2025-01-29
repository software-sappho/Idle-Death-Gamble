package main

import (
	"fmt"
	"net/http"
)

func main() {
	// Serve static files (like index.html)
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/", fs)

	// Start the server
	port := ":8080"
	fmt.Println("Server running at http://localhost" + port)
	http.ListenAndServe(port, nil)
}
