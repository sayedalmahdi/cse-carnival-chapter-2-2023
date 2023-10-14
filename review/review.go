package review

import (
	"database/sql"
	"encoding/json"
	"handyHire/models"
	"net/http"
	"strconv"
)

// insert review in database
func insertReviewInDb(review models.Review) bool {
	db, err := sql.Open("mysql", "root:@tcp(localhost:3306)/handyhire")
	defer db.Close()

	insertReview, err := db.Query("INSERT INTO review VALUES (?, ?, ?, ?, ?, ?)", review.ReviewNo, review.ClientID, review.WorkerID, review.SkillsName, review.Stars, review.Comment)
	defer insertReview.Close()

	if err != nil {
		return false
	}

	return true
}

// insert review
func InsertReview(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var review models.Review
	_ = json.NewDecoder(r.Body).Decode(&review)

	if insertReviewInDb(review) {
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]string{"message": "Review inserted successfully!"})
	} else {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"message": "Review insertion failed!"})
	}
}

// get all reviews of a worker from database of a specific skillsName
func getWorkerReviewsFromDb(workerID string, skillsName string) []models.Review {
	db, err := sql.Open("mysql", "root:@tcp(localhost:3306)/handyhire")
	defer db.Close()

	if err != nil {
		panic(err.Error())
	}

	reviews, err := db.Query("SELECT * FROM review WHERE workerID = ? AND skillsName = ?", workerID, skillsName)
	defer reviews.Close()

	if err != nil {
		if err == sql.ErrNoRows {
			return nil
		}
		panic(err.Error())
	}

	var review models.Review
	var reviewsList []models.Review

	for reviews.Next() {
		err = reviews.Scan(&review.ReviewNo, &review.ClientID, &review.WorkerID, &review.SkillsName, &review.Stars, &review.Comment)

		if err != nil {
			panic(err.Error())
		}

		reviewsList = append(reviewsList, review)
	}

	return reviewsList
}

// controller function to get all reviews of a worker
func GetWorkerReviews(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	workerID := r.URL.Query().Get("workerID")
	skillsName := r.URL.Query().Get("skillsName")

	reviewsList := getWorkerReviewsFromDb(workerID, skillsName)

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(reviewsList)
}


// update review in database
func updateReviewInDb(review models.Review) bool {
	db, err := sql.Open("mysql", "root:@tcp(localhost:3306)/handyhire")
	defer db.Close()

	updateReview, err := db.Query("UPDATE review SET stars = ?, comment = ? WHERE reviewNo = ?", review.Stars, review.Comment, review.ReviewNo)
	defer updateReview.Close()

	if err != nil {
		return false
	}

	return true
}

// controller function to update review
func UpdateReview(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var review models.Review
	_ = json.NewDecoder(r.Body).Decode(&review)

	// get reviewNo, clientID, workerID, skillsName from url
	reviewNo := r.URL.Query().Get("reviewNo")
	clientID := r.URL.Query().Get("clientID")
	workerID := r.URL.Query().Get("workerID")
	skillsName := r.URL.Query().Get("skillsName")

	// convert reviewNo from string to int
	reviewNoInt, err := strconv.Atoi(reviewNo)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"message": "reviewNo should be int!"})
		return
	}

	// check if reviewNo, clientID, workerID, skillsName is matched
	if review.ReviewNo != reviewNoInt || review.ClientID != clientID || review.WorkerID != workerID || review.SkillsName != skillsName {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"message": "reviewNo, clientID, workerID, skillsName can not be updated!"})
		return
	}

	updateReviewInDb(review)

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Review updated successfully!"})
}

// delete review from database
func deleteReviewFromDb(reviewNo int) bool {
	db, err := sql.Open("mysql", "root:@tcp(localhost:3306)/handyhire")
	defer db.Close()

	deleteReview, err := db.Query("DELETE FROM review WHERE reviewNo = ?", reviewNo)
	defer deleteReview.Close()

	if err != nil {
		return false
	}

	return true
}

// controller function to delete review
func DeleteReview(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// get reviewNo from url
	reviewNo := r.URL.Query().Get("reviewNo")

	// convert reviewNo from string to int
	reviewNoInt, err := strconv.Atoi(reviewNo)

	if err != nil {
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(map[string]string{"message": "reviewNo should be int!"})
		return
	}

	deleteReviewFromDb(reviewNoInt)

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Review deleted successfully!"})
}
