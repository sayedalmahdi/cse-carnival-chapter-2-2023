function toggleForms() {
    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");
  
    if (signupForm.style.display === "none") {
      signupForm.style.display = "block";
      loginForm.style.display = "none";
    } else {
      signupForm.style.display = "none";
      loginForm.style.display = "block";
    }
  }