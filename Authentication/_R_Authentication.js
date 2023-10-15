const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");

const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");

let slideIndex = 0;

const userName = document.getElementById("name");
const email = document.getElementById("email");
const contactNo = document.getElementById("contactNo");
const nidNo = document.getElementById("nidNo");
const select = document.getElementById("selectRole");
const password = document.getElementById("password");

const clientSignUpAPI = "/api/signupClient";
const workerSignUpAPI = "/api/signupWorker";

inputs.forEach(inp =>{
    inp.addEventListener("focus",()=>{
        inp.classList.add("active");
    });
    inp.addEventListener("blur",()=>{
        if(inp.value != "") return;
        inp.classList.remove("active");
    })
})

toggle_btn.forEach((btn) =>{
    btn.addEventListener("click", () =>{
        main.classList.toggle("sign-up-mode");
    });
});

function moveSlider(){
    // let index = this.dataset.value;

    
    images.forEach(img => img.classList.remove("show"));
    slideIndex++;
    if(slideIndex>3){
        slideIndex=1;
    }
    let currentImage = document.querySelector(`.img-${slideIndex}`);
    currentImage.classList.add("show");

    setTimeout(moveSlider,2000);

    const textSlider = document.querySelector(".text-group");
    textSlider.style.transform = `translateY(${-(slideIndex-1)*2.2}rem)`

    bullets.forEach(bull => bull.classList.remove("active"));
    let currentBullet = document.querySelector(`.bull-${slideIndex}`);
    currentBullet.classList.add("active");
}


function toHomePage(){
    window.location.href = "../HomePage/_R_HomePage.html";
}

function userRegistration(){
    const selectedIndex = select.selectedIndex;
    const selectedOption = select.options[selectedIndex].value;
    const id = selectedOption + userName.value;
    if(selectedOption == "Customer"){
        localStorage.setItem("isWorker","false");
        clientRegistration(id,userName.value,email.value,contactNo.value,nidNo.value,password.value);
    }else if(selectedOption == "Worker"){
        localStorage.setItem("isWorker","true");
        workerRegistration(id,userName.value,email.value,contactNo.value,nidNo.value,password.value);
    }
}

const clientRegistration = (id,name,email,contactNo,nidNo,password) => {
    fetch('http://localhost:5000/api/signupClient', {
        method: 'POST',
        body: JSON.stringify({
            clientID: id,
            password: password,
            name: name,
            contactNo: contactNo,
            nidNo: nidNo,
            email: email
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("ERROR: ${response.status}");
            }
            return response.json();
        })
        .then(data => {
            window.location.href = "../HomePage/_R_HomePage.html";
            alert("Registration Successfull");
        })
        .catch(error => console.log(error));
}

const workerRegistration = (id,name,email,contactNo,nidNo,password) => {
    fetch('http://localhost:5000/api/signupWorker', {
        method: 'POST',
        body: JSON.stringify({
            workerID: id,
            password: password,
            name: name,
            contactNo: contactNo,
            nidNo: nidNo,
            email: email
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("ERROR: ${response.status}");
            }
            return response.json();
        })
        .then(data => {
            window.location.href = "../HomePage/_R_HomePage.html";
            alert("Registration Successfull");
        })
        .catch(error => console.log(error));
}

moveSlider();
