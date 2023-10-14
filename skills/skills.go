package skills

import (
	"database/sql"
	"encoding/json"

	//"fmt"
	"handyHire/models"
	"net/http"

	//"github.com/gorilla/mux"
)

// insert skills in database
func insertSkillsInDb(skills models.Skills) bool {
	db, err := sql.Open("mysql", "root:@tcp(localhost:3306)/handyhire")
	defer db.Close()

	insertSkills, err := db.Query("INSERT INTO skills VALUES (?, ?, ?, ?)", skills.WorkerID, skills.SkillsName, skills.PreferredAmount, skills.Rating)
	defer insertSkills.Close()

	if err != nil {
		return false
	}

	return true
}

// insert skills
func InsertSkills(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var skills models.Skills
	_ = json.NewDecoder(r.Body).Decode(&skills)

	if insertSkillsInDb(skills) {
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode([]byte(`{"message": "Skills inserted successfully!"}`))
	} else {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode([]byte(`{"message": "Skills insertion failed!"}`))
	}
}

// get all skills of a worker from database
func getWorkerSkillsFromDb(workerID string) []models.Skills {
	db, err := sql.Open("mysql", "root:@tcp(localhost:3306)/handyhire")
	defer db.Close()

	if err != nil {
		panic(err.Error())
	}

	skills, err := db.Query("SELECT * FROM skills WHERE workerID = ?", workerID)
	defer skills.Close()

	if err != nil {
		if err == sql.ErrNoRows {
			return nil
		}
		panic(err.Error())
	}

	var allSkills []models.Skills

	for skills.Next() {
		var skill models.Skills
		err = skills.Scan(&skill.WorkerID, &skill.SkillsName, &skill.PreferredAmount, &skill.Rating)

		if err != nil {
			panic(err.Error())
		}

		allSkills = append(allSkills, skill)
	}


	return allSkills
}

// get all skills of a worker. contoller function
func GetWorkerSkills(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// params := mux.Vars(r)
	// workerID := params["workerID"]

	workerID := r.URL.Query().Get("workerID")

	allSkills := getWorkerSkillsFromDb(workerID)

	getWorkerSkillsFromDb(workerID)

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(allSkills)
}

// update skills in database
func updateSkillsInDb(skills models.Skills) bool {
	db, err := sql.Open("mysql", "root:@tcp(localhost:3306)/handyhire")
	defer db.Close()

	updateSkills, err := db.Query("UPDATE skills SET preferredAmount = ?, rating = ? WHERE workerID = ? AND skillsName = ?", skills.PreferredAmount, skills.Rating, skills.WorkerID, skills.SkillsName)
	defer updateSkills.Close()

	if err != nil {
		return false
	}

	return true
}

// update skills. controller function
func UpdateSkills(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var skills models.Skills
	_ = json.NewDecoder(r.Body).Decode(&skills)

	// get workerID and skillsName from url
	workerID := r.URL.Query().Get("workerID")
	skillsName := r.URL.Query().Get("skillsName")

	// workerID and skillsName can not be updated
	if workerID != skills.WorkerID || skillsName != skills.SkillsName {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode([]byte(`{"message": "WorkerID and skillsName can not be updated!"}`))
		return
	}

	if updateSkillsInDb(skills) {
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode([]byte(`{"message": "Skills updated successfully!"}`))
	} else {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode([]byte(`{"message": "Skills updation failed!"}`))
	}
}

// delete skills from database
func deleteSkillsFromDb(workerID string, skillsName string) bool {
	db, err := sql.Open("mysql", "root:@tcp(localhost:3306)/handyhire")
	defer db.Close()

	deleteSkills, err := db.Query("DELETE FROM skills WHERE workerID = ? AND skillsName = ?", workerID, skillsName)
	defer deleteSkills.Close()

	if err != nil {
		return false
	}

	return true
}

// delete skills. controller function
func DeleteSkills(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// get workerID and skillsName from url
	workerID := r.URL.Query().Get("workerID")
	skillsName := r.URL.Query().Get("skillsName")

	if deleteSkillsFromDb(workerID, skillsName) {
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode([]byte(`{"message": "Skills deleted successfully!"}`))
	} else {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode([]byte(`{"message": "Skills deletion failed!"}`))
	}
}