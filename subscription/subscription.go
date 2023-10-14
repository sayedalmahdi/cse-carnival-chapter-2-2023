package subscription

import (
	"database/sql"
	"encoding/json"

	//"fmt"
	"handyHire/models"
	"net/http"

	"github.com/gorilla/mux"
	//"github.com/gorilla/mux"
)

// insert subscription in database
func insertSubscriptionInDb(subscription models.Subscription) bool {
	db, err := sql.Open("mysql", "root:@tcp(localhost:3306)/handyhire")
	defer db.Close()

	insertSubscription, err := db.Query("INSERT INTO subscription VALUES (?, ?, ?, ?, ?)", subscription.ClientID, subscription.SubscriptionType, subscription.SubscriptionAmount, subscription.StartDate, subscription.EndDate)

	defer insertSubscription.Close()

	if err != nil {
		return false
	}

	return true
}

// insert subscription
func InsertSubscription(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var subscription models.Subscription
	err := json.NewDecoder(r.Body).Decode(&subscription)

	if err != nil {
		// set response header as forbidden
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(map[string]string{"message": "Invalid request!"})
	}

	// check if subscription already exists
	if getClientSubscriptionFromDb(subscription.ClientID).ClientID != "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Subscription already exists!"})
		return
	}

	if insertSubscriptionInDb(subscription) {
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]string{"message": "Subscription inserted successfully!"})
	} else {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"message": "Subscription insertion failed!"})
	}
}

// get a subscription of a client from database
func getClientSubscriptionFromDb(clientID string) models.Subscription {
	db, err := sql.Open("mysql", "root:@tcp(localhost:3306)/handyhire")
	defer db.Close()

	if err != nil {
		panic(err.Error())
	}

	subscription := models.Subscription{}
	err = db.QueryRow("SELECT * FROM subscription WHERE clientID = ?", clientID).Scan(&subscription.ClientID, &subscription.SubscriptionType, &subscription.SubscriptionAmount, &subscription.StartDate, &subscription.EndDate)

	if err != nil {
		if err == sql.ErrNoRows {
			return models.Subscription{}
		}
		panic(err.Error())
	}

	return subscription
}

// get a subscription of a client
func GetClientSubscription(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)

	clientID := params["clientID"]

	subscription := getClientSubscriptionFromDb(clientID)

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(subscription)
}

// delete a subscription of a client from database
func deleteClientSubscriptionFromDb(clientID string) bool {
	db, err := sql.Open("mysql", "root:@tcp(localhost:3306)/handyhire")
	defer db.Close()

	deleteSubscription, err := db.Query("DELETE FROM subscription WHERE clientID = ?", clientID)

	defer deleteSubscription.Close()

	if err != nil {
		return false
	}

	return true
}

// delete a subscription of a client
func DeleteClientSubscription(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)

	clientID := params["clientID"]

	if deleteClientSubscriptionFromDb(clientID) {
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]string{"message": "Subscription deleted successfully!"})
	} else {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"message": "Subscription deletion failed!"})
	}
}