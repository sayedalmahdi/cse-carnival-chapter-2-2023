package homepage

import (
	"database/sql"
	"encoding/json"
	"strconv"

	//"fmt"
	"handyHire/models"
	"net/http"

	"github.com/gorilla/mux"
)

// inserting clientPost to database
func insertClientPostToDb(clientPost models.Clientpost) {
	db, err := sql.Open("mysql", "root:@tcp(localhost:3306)/handyhire")
	defer db.Close()
	// port 3306 is the default port for mysql in xampp
	// here ftms is the database name

	if err != nil {
		panic(err.Error())
	}

	// insert clientPost to database
	insert, err := db.Query("INSERT INTO clientpost VALUES (?, ?, ?, ?, ?, ?, ?)", clientPost.PostID, clientPost.ClientID, clientPost.WorksType, clientPost.WorksDescription, clientPost.PreferredTime, clientPost.OfferedPrice, clientPost.PostAvailabilityTime)

	if err != nil {
		panic(err.Error())
	}

	defer insert.Close()
}

// controller for inserting clientpost
func InsertClientPost(w http.ResponseWriter, r *http.Request) {
	var clientPost models.Clientpost

	// decode the json request to clientPost
	err := json.NewDecoder(r.Body).Decode(&clientPost)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// insert clientPost to database
	insertClientPostToDb(clientPost)

	// send success response to client
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "success"})
}

// updating clientPost to database
func updateClientPostToDb(clientPost models.Clientpost) {
	db, err := sql.Open("mysql", "root:@tcp(localhost:3306)/handyhire")
	defer db.Close()
	// port 3306 is the default port for mysql in xampp
	// here ftms is the database name

	if err != nil {
		panic(err.Error())
	}

	// update clientPost to database
	update, err := db.Query("UPDATE clientpost SET worksType = ?, worksDescription = ?, preferredTime = ?, offeredPrice = ?, postAvailabilityTime = ? WHERE postID = ?", clientPost.WorksType, clientPost.WorksDescription, clientPost.PreferredTime, clientPost.OfferedPrice, clientPost.PostAvailabilityTime, clientPost.PostID)

	if err != nil {
		panic(err.Error())
	}

	defer update.Close()
}

// controller to update clientpost
func UpdateClientPost(w http.ResponseWriter, r *http.Request) {
	var clientPost models.Clientpost

	// decode the json request to clientPost
	err := json.NewDecoder(r.Body).Decode(&clientPost)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// get clientID and postID from url
	clientID := mux.Vars(r)["clientID"]
	postID := mux.Vars(r)["postID"]

	// convert postID to int
	postIDInt, err := strconv.Atoi(postID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "postID must be integer!"})
		return
	}

	// check if clientID and postID is valid
	if clientID != clientPost.ClientID || postIDInt != clientPost.PostID {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "clientID and postID can not be changed!"})
		return
	}

	// update clientPost to database
	updateClientPostToDb(clientPost)

	// send success response to client
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "success"})
}

// getting clientPosts of a client from database
func getClientPostsFromDb(clientID string) []models.Clientpost {
	var clientPosts []models.Clientpost

	db, err := sql.Open("mysql", "root:@tcp(localhost:3306)/handyhire")
	defer db.Close()
	// port 3306 is the default port for mysql in xampp
	// here ftms is the database name

	if err != nil {
		panic(err.Error())
	}

	// get clientPosts from database
	results, err := db.Query("SELECT * FROM clientpost WHERE clientID = ?", clientID)

	if err != nil {
		if err == sql.ErrNoRows {
			return clientPosts // empty clientPosts
		}
		panic(err.Error())
	}

	for results.Next() {
		var clientPost models.Clientpost

		err = results.Scan(&clientPost.PostID, &clientPost.ClientID, &clientPost.WorksType, &clientPost.WorksDescription, &clientPost.PreferredTime, &clientPost.OfferedPrice, &clientPost.PostAvailabilityTime)

		if err != nil {
			panic(err.Error())
		}

		clientPosts = append(clientPosts, clientPost)
	}

	return clientPosts
}

// controller to get clientPosts of a client
func GetClientPosts(w http.ResponseWriter, r *http.Request) {
	// get clientID from url
	clientID := mux.Vars(r)["clientID"]

	// get clientPosts from database
	clientPosts := getClientPostsFromDb(clientID)

	// send clientPosts as response to client
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(clientPosts)
}

// deleting clientPost from database
func deleteClientPostFromDb(clientID string, postID int) {
	db, err := sql.Open("mysql", "root:@tcp(localhost:3306)/handyhire")
	defer db.Close()
	// port 3306 is the default port for mysql in xampp
	// here ftms is the database name

	if err != nil {
		panic(err.Error())
	}

	// delete clientPost from database
	delete, err := db.Query("DELETE FROM clientpost WHERE clientID = ? AND postID = ?", clientID, postID)

	if err != nil {
		if err == sql.ErrNoRows {
			return
		}
		panic(err.Error())
	}

	defer delete.Close()
}

// controller to delete clientPost
func DeleteClientPost(w http.ResponseWriter, r *http.Request) {
	// get clientID and postID from url
	clientID := mux.Vars(r)["clientID"]
	postID := mux.Vars(r)["postID"]

	// convert postID to int
	postIDInt, err := strconv.Atoi(postID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "postID must be integer!"})
		return
	}

	// delete clientPost from database
	deleteClientPostFromDb(clientID, postIDInt)

	// send success response to client
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "success"})
}


// inserting workerPost to database
func insertWorkerPostToDb(workerPost models.Workerpost) {
	db, err := sql.Open("mysql", "root:@tcp(localhost:3306)/handyhire")
	defer db.Close()
	// port 3306 is the default port for mysql in xampp
	// here ftms is the database name

	if err != nil {
		panic(err.Error())
	}

	// insert workerPost to database
	insert, err := db.Query("INSERT INTO workerpost VALUES (?, ?, ?, ?, ?, ?, ?)", workerPost.PostID, workerPost.WorkerID, workerPost.WorksType, workerPost.WorksDescription, workerPost.PreferredTime, workerPost.OfferedPrice, workerPost.PostAvailabilityTime)

	if err != nil {
		panic(err.Error())
	}

	defer insert.Close()
}

// controller for inserting workerpost
func InsertWorkerPost(w http.ResponseWriter, r *http.Request) {
	var workerPost models.Workerpost

	// decode the json request to workerPost
	err := json.NewDecoder(r.Body).Decode(&workerPost)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// insert workerPost to database
	insertWorkerPostToDb(workerPost)

	// send success response to worker
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "success"})
}

// getting workerPosts of a worker from database
func getWorkerPostsFromDb(workerID string) []models.Workerpost {
	var workerPosts []models.Workerpost

	db, err := sql.Open("mysql", "root:@tcp(localhost:3306)/handyhire")
	defer db.Close()
	// port 3306 is the default port for mysql in xampp
	// here ftms is the database name

	if err != nil {
		panic(err.Error())
	}

	// get workerPosts from database
	results, err := db.Query("SELECT * FROM workerpost WHERE workerID = ?", workerID)

	if err != nil {
		if err == sql.ErrNoRows {
			return workerPosts // empty workerPosts
		}
		panic(err.Error())
	}

	for results.Next() {
		var workerPost models.Workerpost

		err = results.Scan(&workerPost.PostID, &workerPost.WorkerID, &workerPost.WorksType, &workerPost.WorksDescription, &workerPost.PreferredTime, &workerPost.OfferedPrice, &workerPost.PostAvailabilityTime)

		if err != nil {
			panic(err.Error())
		}

		workerPosts = append(workerPosts, workerPost)
	}

	return workerPosts
}

// controller to get workerPosts of a worker
func GetWorkerPosts(w http.ResponseWriter, r *http.Request) {
	// get workerID from url
	workerID := mux.Vars(r)["workerID"]

	// get workerPosts from database
	workerPosts := getWorkerPostsFromDb(workerID)

	// send workerPosts as response to worker
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(workerPosts)
}

// updating workerPost to database
func updateWorkerPostToDb(workerPost models.Workerpost) {
	db, err := sql.Open("mysql", "root:@tcp(localhost:3306)/handyhire")
	defer db.Close()
	// port 3306 is the default port for mysql in xampp
	// here ftms is the database name

	if err != nil {
		panic(err.Error())
	}

	// update workerPost to database
	update, err := db.Query("UPDATE workerpost SET worksType = ?, worksDescription = ?, preferredTime = ?, offeredPrice = ?, postAvailabilityTime = ? WHERE postID = ?", workerPost.WorksType, workerPost.WorksDescription, workerPost.PreferredTime, workerPost.OfferedPrice, workerPost.PostAvailabilityTime, workerPost.PostID)

	if err != nil {
		if err == sql.ErrNoRows {
			return
		}
		panic(err.Error())
	}

	defer update.Close()
}

// controller to update workerpost
func UpdateWorkerPost(w http.ResponseWriter, r *http.Request) {
	var workerPost models.Workerpost

	// decode the json request to workerPost
	err := json.NewDecoder(r.Body).Decode(&workerPost)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// get workerID and postID from url
	workerID := mux.Vars(r)["workerID"]
	postID := mux.Vars(r)["postID"]

	// convert postID to int
	postIDInt, err := strconv.Atoi(postID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "postID must be integer!"})
		return
	}

	// check if workerID and postID is valid
	if workerID != workerPost.WorkerID || postIDInt != workerPost.PostID {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "workerID and postID can not be changed!"})
		return
	}

	// update workerPost to database
	updateWorkerPostToDb(workerPost)

	// send success response to worker
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "success"})
}

// deleting workerPost from database
func deleteWorkerPostFromDb(workerID string, postID int) {
	db, err := sql.Open("mysql", "root:@tcp(localhost:3306)/handyhire")
	defer db.Close()
	// port 3306 is the default port for mysql in xampp
	// here ftms is the database name

	if err != nil {
		panic(err.Error())
	}

	// delete workerPost from database
	delete, err := db.Query("DELETE FROM workerpost WHERE workerID = ? AND postID = ?", workerID, postID)

	if err != nil {
		if err == sql.ErrNoRows {
			return
		}
		panic(err.Error())
	}

	defer delete.Close()
}

// controller to delete workerPost
func DeleteWorkerPost(w http.ResponseWriter, r *http.Request) {
	// get workerID and postID from url
	workerID := mux.Vars(r)["workerID"]
	postID := mux.Vars(r)["postID"]

	// convert postID to int
	postIDInt, err := strconv.Atoi(postID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "postID must be integer!"})
		return
	}

	// delete workerPost from database
	deleteWorkerPostFromDb(workerID, postIDInt)

	// send success response to worker
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "success"})
}