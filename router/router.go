package router

import (
	//"handyHire/controller"

	"handyHire/Authentication"
	"handyHire/HomePage"
	"handyHire/profile"
	"handyHire/review"

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


	// client post
	router.HandleFunc("/api/clientPost", homepage.InsertClientPost).Methods("POST") // insert client post
	router.HandleFunc("/api/clientPost/{clientID}/{postID}", homepage.UpdateClientPost).Methods("PUT") // update client post. clientID and postID can not be updated but every data should be present in request body
	router.HandleFunc("/api/clientPost/{clientID}", homepage.GetClientPosts).Methods("GET") // get all client posts of a client
	router.HandleFunc("/api/clientPost/{clientID}/{postID}", homepage.DeleteClientPost).Methods("DELETE") // delete client post


	// worker post
	router.HandleFunc("/api/workerPost", homepage.InsertWorkerPost).Methods("POST") // insert worker post
	router.HandleFunc("/api/workerPost/{workerID}/{postID}", homepage.UpdateWorkerPost).Methods("PUT") // update worker post. workerID and postID can not be updated but every data should be present in request body
	router.HandleFunc("/api/workerPost/{workerID}", homepage.GetWorkerPosts).Methods("GET") // get all worker posts of a worker
	router.HandleFunc("/api/workerPost/{workerID}/{postID}", homepage.DeleteWorkerPost).Methods("DELETE") // delete worker post


	// review
	router.HandleFunc("/api/review", review.InsertReview).Methods("POST") // insert review
	router.HandleFunc("/api/review/{workerID}/{skillsName}", review.GetWorkerReviews).Methods("GET") // get all reviews of a worker of a specific skillsName
	router.HandleFunc("/api/review/{reviewNo}/{clientID}/{workerID}/{skillsNo}", review.UpdateReview).Methods("PUT") // update review. reviewNo, clientID, workerID and skillsNo can not be updated but every data should be present in request body
	router.HandleFunc("/api/review/{reviewNo}", review.DeleteReview).Methods("DELETE") // delete review


	return router
}