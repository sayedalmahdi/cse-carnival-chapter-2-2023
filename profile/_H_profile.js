const profile = document.getElementById("profile");
const history = document.getElementById("history");
const seeOrders = document.getElementById("seeOrders");

const inWorker = document.getElementById("InWorker");
const historyButton = document.getElementById("OrderHstry");


function onPageLoading(){
    history.style.display = "none";
    seeOrders.style.display = "none";
}
// profile.style.display = "none";


inWorker.addEventListener("click",function(){
    profile.style.display = "none";
    seeOrders.style.display = "flex";
});

historyButton.addEventListener("click",function(){
    profile.style.display = "none";
    history.style.display = "flex";
})

onPageLoading();