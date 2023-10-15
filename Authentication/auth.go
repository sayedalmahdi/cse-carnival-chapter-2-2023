package authentication

import (
	"database/sql"
	"encoding/json"
	"handyHire/models"

	//"fmt"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	//"github.com/gorilla/mux"
)


// check if the client already exists or not
func checkClient(clientID string) bool {
	db, _ := sql.Open("mysql", "root:@tcp(localhost:3306)/handyhire")
	defer db.Close()
	var client models.Client
	err := db.QueryRow("SELECT * FROM client WHERE clientID = ?", clientID).Scan(&client.ClientID)

	if err != nil {
		if err == sql.ErrNoRows {
			return false
		} else {
			panic(err.Error())
		}
	}

	return true
}

// signup for client
func SignupClient(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Allow-Control-Allow-Methods", "POST")

	var client models.Client
	err := json.NewDecoder(r.Body).Decode(&client)

	if err != nil {
		// set response header as forbidden
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(map[string]string{"message": "Invalid request!"})
	}

	// null check
	if client.ClientID == "" || client.Password == "" {
		// set response header as forbidden
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(map[string]string{"message": "user id and password are required!"})
		return
	}

	//: user already exists check
	if checkClient(client.ClientID) == true {
		// set response header as forbidden
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(map[string]string{"message": "user already exists!"})
		return
	}

	// insert into database
	db, _ := sql.Open("mysql", "root:@tcp(localhost:3306)/handyhire")
	defer db.Close()
	insert, err := db.Query("INSERT INTO client VALUES (?, ?, ?, ?, ?, ?, ?)", client.ClientID, client.Password, client.Name, client.ContactNo, client.NidNo, client.Email, client.Address)

	if err != nil {
		panic(err.Error())
	}

	defer insert.Close()

	// set response header as ok
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("Signup successful!")
}

// check if the worker already exists or not
func checkWorker(workerID string) bool {
	db, _ := sql.Open("mysql", "root:@tcp(localhost:3306)/handyhire")
	defer db.Close()
	var worker models.Worker
	err := db.QueryRow("SELECT * FROM worker WHERE workerID = ?", workerID).Scan(&worker.WorkerID)

	if err != nil {
		if err == sql.ErrNoRows {
			return false
		} else {
			panic(err.Error())
		}
	}

	return true
}

// signup for worker
func SignupWorker(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Allow-Control-Allow-Methods", "POST")

	var worker models.Worker
	err := json.NewDecoder(r.Body).Decode(&worker)

	if err != nil {
		// set response header as forbidden
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(map[string]string{"message": "Invalid request!"})
	}

	// null check
	if worker.WorkerID == "" || worker.Password == "" {
		// set response header as forbidden
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(map[string]string{"message": "worker id and password are required!"})
		return
	}

	//: user already exists check
	if checkWorker(worker.WorkerID) == true {
		// set response header as forbidden
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(map[string]string{"message": "worker already exists!"})
		return
	}

	// insert into database
	db, _ := sql.Open("mysql", "root:@tcp(localhost:3306)/handyhire")
	defer db.Close()
	insert, err := db.Query("INSERT INTO worker VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", worker.WorkerID, worker.Password, worker.Name, worker.ContactNo, worker.NidNo, worker.Email, worker.Address, worker.WorkerDescrption, worker.EarnedPoint, worker.Availability)

	if err != nil {
		panic(err.Error())
	}

	defer insert.Close()

	// set response header as ok
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Signup successful!"})
}


// check if the user is valid or not from database
func checkUserClient(clientID string, password string) bool {
	db, _ := sql.Open("mysql", "root:@tcp(localhost:3306)/handyhire")
	defer db.Close()
	var client models.Client
	err := db.QueryRow("SELECT * FROM client WHERE clientID = ?", clientID).Scan(&client.ClientID, &client.Password, &client.Name, &client.ContactNo, &client.NidNo, &client.Email, &client.Address)

	if err != nil {
		if err == sql.ErrNoRows {
			return false
		} else {
			panic(err.Error())
		}
	}

	if client.Password != password {
		return false
	}

	return true
}

// signin for client. controller function
func SigninClient(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Allow-Control-Allow-Methods", "POST")

	var client models.Client
	_ = json.NewDecoder(r.Body).Decode(&client)

	// null check
	if client.ClientID == "" || client.Password == "" {
		// set response header as forbidden
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(map[string]string{"message": "user id and password are required!"})
		return
	}

	// check credentials
	if checkUserClient(client.ClientID, client.Password) == false {
		// set response header as forbidden
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(map[string]string{"message": "Invalid credentials!"})
		return
	}

	// set response header as ok
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Login successful!"})
}


// check if the user is valid or not from database
func checkUserWorker(workerID string, password string) bool {
	db, _ := sql.Open("mysql", "root:@tcp(localhost:3306)/handyhire")
	defer db.Close()
	var worker models.Worker
	err := db.QueryRow("SELECT * FROM worker WHERE workerID = ?", workerID).Scan(&worker.WorkerID, &worker.Password, &worker.Name, &worker.ContactNo, &worker.NidNo, &worker.Email, &worker.Address, &worker.WorkerDescrption, &worker.EarnedPoint, &worker.Availability)

	if err != nil {
		if err == sql.ErrNoRows {
			return false
		} else {
			panic(err.Error())
		}
	}

	if worker.Password != password {
		return false
	}

	return true
}

// signin for worker. controller function
func SigninWorker(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Allow-Control-Allow-Methods", "POST")

	var worker models.Worker
	_ = json.NewDecoder(r.Body).Decode(&worker)

	// null check
	if worker.WorkerID == "" || worker.Password == "" {
		// set response header as forbidden
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(map[string]string{"message": "user id and password are required!"})
		return
	}

	// check credentials
	if checkUserWorker(worker.WorkerID, worker.Password) == false {
		// set response header as forbidden
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(map[string]string{"message": "Invalid credentials!"})
		return
	}

	// set response header as ok
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Login successful!"})
}