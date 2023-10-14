package router

import (
	//"handyHire/controller"

	authentication "handyHire/Authentication"

	"github.com/gorilla/mux"
)

func Router() *mux.Router {
	router := mux.NewRouter()

	// authentication
	router.HandleFunc("/api/signupClient", authentication.SignupClient).Methods("POST") // signup for client
	router.HandleFunc("/api/signupWorker", authentication.SignupWorker).Methods("POST") // signup for worker
	router.HandleFunc("/api/signinClient", authentication.SigninClient).Methods("POST") // signin for client
	router.HandleFunc("/api/signinWorker", authentication.SigninWorker).Methods("POST") // signin for worker

	return router
}