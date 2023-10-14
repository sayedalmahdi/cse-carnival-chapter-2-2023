const inputs = document.querySelectorAll(".input-field");

const main = document.querySelector("main");

const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");

const styleForm = document.getElementById("styleForm");

let slideIndex = 0;

inputs.forEach(inp =>{
    inp.addEventListener("focus",()=>{
        inp.classList.add("active");
    });
    inp.addEventListener("blur",()=>{
        if(inp.value != "") return;
        inp.classList.remove("active");
    })
})

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

function openForm(){
    styleForm.style.visibility = "visible";
}

function closeForm(){
    console.log("Here");
    styleForm.style.visibility = "hidden";
}

// moveSlider();