package router

import (
	//"handyHire/controller"

	"handyHire/Authentication"
	"handyHire/profile"

	"github.com/gorilla/mux"
)

func Router() *mux.Router {
	router := mux.NewRouter()

	// authentication
	router.HandleFunc("/api/signupClient", authentication.SignupClient).Methods("POST") // signup for client
	router.HandleFunc("/api/signupWorker", authentication.SignupWorker).Methods("POST") // signup for worker
	router.HandleFunc("/api/signinClient", authentication.SigninClient).Methods("POST") // signin for client
	router.HandleFunc("/api/signinWorker", authentication.SigninWorker).Methods("POST") // signin for worker


	// profile
	router.HandleFunc("/api/client/{clientID}", profile.GetClientInfo).Methods("GET") // get client profile info
	router.HandleFunc("/api/worker/{workerID}", profile.GetWorkerInfo).Methods("GET") // get worker profile info
	router.HandleFunc("/api/client/{clientID}", profile.UpdateClientInfo).Methods("PUT") // update client profile info. clientID can not be updated but every data should be present in request body
	router.HandleFunc("/api/worker/{workerID}", profile.UpdateWorkerInfo).Methods("PUT") // update worker profile info. workerID can not be updated but every data should be present in request body


	return router
}