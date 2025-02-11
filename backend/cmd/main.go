package main

import (
	"flag"
	"fmt"
	"log"
	"os"

	"kininaru_clip/backend/cmd/server"
)

func main() {
	defaultPort := "8080"
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
		flag.StringVar(&port, "addr", defaultPort, "default server port")
	}
	flag.Parse()

	addr := fmt.Sprintf(":%s", port)
	log.Printf("Listening on %s...\n", addr)
	server.Serve(addr)
}
