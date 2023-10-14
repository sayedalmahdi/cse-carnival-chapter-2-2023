package models

type Client struct {
	ClientID  string `json:"clientID"`
	Password  string `json:"password"`
	Name      string `json:"name"`
	ContactNo string `json:"contactNo"`
	NidNo     string `json:"nidNo"`
	Email     string `json:"email"`
	Address   string `json:"address"`
}

type Clientpost struct {
	PostID               int    `json:"postID"`
	ClientID             int    `json:"clientID"`
	WorksType            string `json:"worksType"`
	WorksDescription     string `json:"worksDescription"`
	PreferredTime        string `json:"preferredTime"`
	OfferedPrice         int    `json:"offeredPrice"`
	PostAvailabilityTime string `json:"postAvailabilityTime"`
}

type Worker struct {
	WorkerID         string `json:"workerID"`
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

type Workerpost struct {
	PostID               int    `json:"postID"`
	WorkerID             int    `json:"workerID"`
	WorksType            string `json:"worksType"`
	WorksDescription     string `json:"worksDescription"`
	PreferredTime        string `json:"preferredTime"`
	OfferedPrice         int    `json:"offeredPrice"`
	PostAvailabilityTime string `json:"postAvailabilityTime"`
}

type Skills struct {
	WorkerID        int    `json:"workerID"`
	SkillsName      string `json:"skillsName"`
	PreferredAmount int    `json:"preferredAmount"`
	Rating          int    `json:"rating"`
}

type Review struct {
	ReviewNo   int    `json:"reviewNo"`
	ClientID   int    `json:"clientID"`
	WorkerID   int    `json:"workerID"`
	SkillsName string `json:"skillsName"`
	Stars      int    `json:"stars"`
	Comment    string `json:"comment"`
}

type Subscription struct {
	ClientID           int    `json:"clientID"`
	SubscriptionType   string `json:"subscriptionType"`
	SubscriptionAmount int    `json:"subscriptionAmount"`
	StartDate          string `json:"startDate"`
	EndDate            string `json:"endDate"`
}
