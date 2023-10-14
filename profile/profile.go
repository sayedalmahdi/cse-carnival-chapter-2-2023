package profile

import (
	"database/sql"
	"encoding/json"
	"handyHire/models"
	"net/http"

	"github.com/gorilla/mux"
)

// get client info
func getClientInfo(clientID string) models.Client {
	db, _ := sql.Open("mysql", "root:@tcp(localhost:3306)/handyhire")
	defer db.Close()

	// get client info
	client := models.Client{}
	row := db.QueryRow("SELECT * FROM client WHERE clientID = ?", clientID)
	row.Scan(&client.ClientID, &client.Password, &client.Name, &client.ContactNo, &client.NidNo, &client.Email, &client.Address)

	return client
}

// controller for getting client info
func GetClientInfo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// get client id from url.
	// url is: /api/client/{clientID}
	params := mux.Vars(r)
	clientID := params["clientID"]

	// get client info
	client := getClientInfo(clientID)

	// set response header as ok
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(client)
}

// get worker info
func getWorkerInfo(workerID string) models.Worker {
	db, _ := sql.Open("mysql", "root:@tcp(localhost:3306)/handyhire")
	defer db.Close()

	// get worker info
	worker := models.Worker{}
	row := db.QueryRow("SELECT * FROM worker WHERE workerID = ?", workerID)
	row.Scan(&worker.WorkerID, &worker.Password, &worker.Name, &worker.ContactNo, &worker.NidNo, &worker.Email, &worker.Address, &worker.WorkerDescrption, &worker.EarnedPoint, &worker.Availability)

	return worker
}

// controller for getting worker info
func GetWorkerInfo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// get worker id from url.
	// url is: /api/worker/{workerID}
	params := mux.Vars(r)
	workerID := params["workerID"]

	// get worker info
	worker := getWorkerInfo(workerID)

	// set response header as ok
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(worker)
}

// update client info
func updateClientInfo(client models.Client) {
	db, _ := sql.Open("mysql", "root:@tcp(localhost:3306)/handyhire")
	defer db.Close()

	// update client info
	update, err := db.Query("UPDATE client SET password = ?, name = ?, contactNo = ?, nidNo = ?, email = ?, address = ? WHERE clientID = ?", client.Password, client.Name, client.ContactNo, client.NidNo, client.Email, client.Address, client.ClientID)

	if err != nil {
		panic(err.Error())
	}

	defer update.Close()
}

// controller for updating client info
func UpdateClientInfo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var client models.Client
	_ = json.NewDecoder(r.Body).Decode(&client)

	// get client id from url.
	// url is: /api/client/{clientID}
	params := mux.Vars(r)
	clientID := params["clientID"]

	// client id can not be updated
	if client.ClientID != clientID {
		// set response header as forbidden
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(map[string]string{"message": "client id can not be updated!"})
		return
	}

	// update client info
	updateClientInfo(client)

	// set response header as ok
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Client info updated successfully!"})
}

// update worker info
func updateWorkerInfo(worker models.Worker) {
	db, _ := sql.Open("mysql", "root:@tcp(localhost:3306)/handyhire")
	defer db.Close()

	// update worker info
	update, err := db.Query("UPDATE worker SET password = ?, name = ?, contactNo = ?, nidNo = ?, email = ?, address = ?, workerDescrption = ?, earnedPoint = ?, availability = ? WHERE workerID = ?", worker.Password, worker.Name, worker.ContactNo, worker.NidNo, worker.Email, worker.Address, worker.WorkerDescrption, worker.EarnedPoint, worker.Availability, worker.WorkerID)

	if err != nil {
		panic(err.Error())
	}

	defer update.Close()
}

// controller for updating worker info
func UpdateWorkerInfo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var worker models.Worker
	_ = json.NewDecoder(r.Body).Decode(&worker)

	// get worker id from url.
	// url is: /api/worker/{workerID}
	params := mux.Vars(r)
	workerID := params["workerID"]

	// worker id can not be updated
	if worker.WorkerID != workerID {
		// set response header as forbidden
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(map[string]string{"message": "worker id can not be updated!"})
		return
	}

	// update worker info
	updateWorkerInfo(worker)

	// set response header as ok
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Worker info updated successfully!"})
}