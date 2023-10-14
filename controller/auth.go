package controller

import (
	"database/sql"
	"encoding/json"
	"handyHire/models"

	//"fmt"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	//"github.com/gorilla/mux"
)

//: need to work here. not changed yet
// check if the user is valid or not from database
func checkUser(userEmail string, password string) bool {
	db, _ := sql.Open("mysql", "root:@tcp(localhost:3306)/handyhire")
	defer db.Close()
	var operator models.Operator
	err := db.QueryRow("SELECT * FROM tbloperator WHERE email = ?", userEmail).Scan(&operator.Email, &operator.Password)

	if err != nil {
		if err == sql.ErrNoRows {
			return false
		} else {
			panic(err.Error())
		}
	}

	if operator.Password != password {
		return false
	}

	return true
}

// login function for admin
func Login(w http.ResponseWriter, r *http.Request) {
	//fmt.Println("1 login successful!")
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Allow-Control-Allow-Methods", "POST")

	var operator models.Operator
	_ = json.NewDecoder(r.Body).Decode(&operator)

	// null check
	if operator.Email == "" || operator.Password == "" {
		// set response header as forbidden
		w.WriteHeader(http.StatusForbidden)
		//fmt.Println("2 login successful!")
		json.NewEncoder(w).Encode("All fields are required!")
		return
	}

	// check credentials
	if checkUser(operator.Email, operator.Password) == false {
		// set response header as forbidden
		w.WriteHeader(http.StatusForbidden)
		//fmt.Println("3 login successful!")
		json.NewEncoder(w).Encode("Invalid credentials!")
		return
	}


	// set response header as ok
	w.WriteHeader(http.StatusOK)
	//fmt.Println("4 login successful!")
	json.NewEncoder(w).Encode("Login successful!")
}