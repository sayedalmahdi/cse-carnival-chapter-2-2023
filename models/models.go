package models

type client struct {
	ClientID  int    `json:"clientID"`
	Password  string `json:"password"`
	Name      string `json:"name"`
	ContactNo string `json:"contactNo"`
	NidNo     string `json:"nidNo"`
	Email     string `json:"email"`
	Address   string `json:"address"`
}

type clientpost struct {
	PostID               int    `json:"postID"`
	ClientID             int    `json:"clientID"`
	WorksType            string `json:"worksType"`
	WorksDescription     string `json:"worksDescription"`
	PreferredTime        string `json:"preferredTime"`
	OfferedPrice         int    `json:"offeredPrice"`
	PostAvailabilityTime string `json:"postAvailabilityTime"`
}

type worker struct {
	WorkerID         int    `json:"workerID"`
	Password         string `json:"password"`
	Name             string `json:"name"`
	ContactNo        string `json:"contactNo"`
	NidNo            string `json:"nidNo"`
	Email            string `json:"email"`
	Address          string `json:"address"`
	WorkerDescrption string `json:"workerDescrption"`
	EarnedPoint      int    `json:"earnedPoint"`
	Availability     bool   `json:"availability"`
}

type workerpost struct {
	PostID               int    `json:"postID"`
	WorkerID             int    `json:"workerID"`
	WorksType            string `json:"worksType"`
	WorksDescription     string `json:"worksDescription"`
	PreferredTime        string `json:"preferredTime"`
	OfferedPrice         int    `json:"offeredPrice"`
	PostAvailabilityTime string `json:"postAvailabilityTime"`
}

type skills struct {
	WorkerID        int    `json:"workerID"`
	SkillsName      string `json:"skillsName"`
	PreferredAmount int    `json:"preferredAmount"`
	Rating          int    `json:"rating"`
}

type review struct {
	ReviewNo   int    `json:"reviewNo"`
	ClientID   int    `json:"clientID"`
	WorkerID   int    `json:"workerID"`
	SkillsName string `json:"skillsName"`
	Stars 	int    `json:"stars"`
	Comment	string `json:"comment"`
}

type subscription struct {
	ClientID int `json:"clientID"`
	SubscriptionType string `json:"subscriptionType"`
	SubscriptionAmount int `json:"subscriptionAmount"`
	StartDate string `json:"startDate"`
	EndDate string `json:"endDate"`
}
