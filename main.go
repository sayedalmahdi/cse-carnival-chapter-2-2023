package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"handyHire/router"

	_ "github.com/go-sql-driver/mysql"
	"github.com/rs/cors"
)

func main() {
	if CreateDbConnection() {
		fmt.Println("Server is running on port 5000...")
	} else {
		fmt.Println("Server is stopped!")
		return
	}

	r := router.Router()

	// Create a CORS handler with desired options.
	// it will allow api to be accessed from any origin
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"}, // All origins
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
	})

	// wrapping router with the CORS handler.
	// wrapping is done to allow api to be accessed from any origin
	handler := c.Handler(r)

	//connect  my frontend dir G:\SUST_FTMS_Frontend with my backend dir G:\SUST_FTMS_Backend also handle handler
	// http.Handle("/", http.FileServer(http.Dir("G:\\SUST_FTMS_Frontend"))) // registering router with http Handle.
	http.Handle("/api/", handler) // registering router with http Handle.
	// it will handle all the incoming requests. "/" means all incoming requests.
	// second parameter is the router. here it is wrapped with CORS handler.

	http.ListenAndServe(":5000", nil) // this will start the server.
	// second parameter is the handler. nil means use default handler.
	// default handler is router. so it will use router to handle all the incoming requests.

	fmt.Println("Server is stopped!...") // shows that server is stopped
}

// connecting to mysql database
func CreateDbConnection() bool {
	db, err := sql.Open("mysql", "root:@tcp(localhost:3306)/handyhire")
	defer db.Close()
	// port 3306 is the default port for mysql in xampp
	// here ftms is the database name

	if err != nil {
		fmt.Println("Error connecting databse!")
		return false
		// panic(err.Error())
	}


    // db.SetMaxOpenConns(10)
    // db.SetMaxIdleConns(5)

    // Ping the database to ensure the connection is valid.
    if err := db.Ping(); err != nil {
        fmt.Printf("Could not connect to the database: %v", err)
		return false
    }

	fmt.Println("Successfully connected to mysql database.")
	return true
}