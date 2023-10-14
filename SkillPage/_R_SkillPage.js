const check_box_1 = document.getElementById("skill-1");
const check_box_2 = document.getElementById("skill-2");
const check_box_3 = document.getElementById("skill-3");

const totalPrice = document.getElementById("totalPrice");

let totalAmount = 0;

check_box_1.addEventListener("change", function() {
    if (check_box_1.checked) {
      totalAmount += 200;
    } else {
      totalAmount -= 200;
    }
    totalPrice.innerHTML = "Total Price : "+totalAmount;
});

check_box_2.addEventListener("change", function() {
    if (check_box_2.checked) {
      totalAmount += 400;
    }else {
      totalAmount -= 400;
    }
    totalPrice.innerHTML = "Total Price : "+totalAmount;
});

check_box_3.addEventListener("change",function(){
    if (check_box_3.checked) {
        totalAmount += 1000;
    } else {
        totalAmount -= 1000;
    }
    totalPrice.innerHTML = "Total Price : "+totalAmount;
});

