const API_URL = "https://iron-paradise-backend.onrender.com";
// ================= MENU TOGGLE =================
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
  menu.classList.toggle('bx-x');
  navbar.classList.toggle('active');
}

window.onscroll = () => {
  menu.classList.remove('bx-x'); // ✅ removed wrong "v"
  navbar.classList.remove('active');
}

// ================= TYPED TEXT =================
const typed = new Typed('.multiple-text', {
  strings: ['Physical Fitness', 'Weight Gain','Strength Training','Fat Loss','Weight Lifting','Running'],
  typeSpeed: 60,
  backSpeed: 60,
  backDelay: 1000,
  loop: true,
});

// ================= AUTH NAVBAR CONTROL =================
function updateAuthUI() {

  const user = localStorage.getItem("ironParadiseUser");

  const logoutLink = document.getElementById("logoutLink");
  const registerLink = document.getElementById("registerLink");
  const heroRegisterLink = document.getElementById("heroRegisterLink");

  if(!logoutLink || !registerLink) return;

  // reset state
  logoutLink.style.display = "none";
  registerLink.style.display = "inline-block";
  if(heroRegisterLink) heroRegisterLink.style.display = "inline-block";

  // if logged in
  if(user){
    logoutLink.style.display = "inline-block";
    registerLink.style.display = "none";
    if(heroRegisterLink) heroRegisterLink.style.display = "none";
  }
}

// run after everything loads
window.addEventListener("load", updateAuthUI);

// logout function (used by anchor)
function logout(){
    alert("Logged out successfully");
  localStorage.removeItem("ironParadiseUser");
  window.location.href = "signin.html";
}

// ================= REGISTER API =================
const registerForm = document.querySelector("#registerForm");

if(registerForm){
  registerForm.addEventListener("submit", async (e)=>{
    e.preventDefault();

    const data = {
      name: document.querySelector("#name").value,
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
      gender: document.querySelector("#gender").value
    };

    const res = await fetch(`${API_URL}/api/users/register`,{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message);

// after successful register → go to signin
if(result.message === "User Registered"){
   window.location.href = "signin.html";
}
  });
}

// ================= LOGIN API =================
const loginForm = document.querySelector("#loginForm");

if(loginForm){
  loginForm.addEventListener("submit", async (e)=>{
    e.preventDefault();

    const data = {
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value
    };

    const res = await fetch(`${API_URL}/api/users/login`,{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message);

    if(result.message === "Login Successful"){
      // 🔥 IMPORTANT FIX
      localStorage.setItem("ironParadiseUser", JSON.stringify(result.user));
      updateAuthUI();
      window.location.href = "index.html";
    }
  });
}

// ================= BOOK POPUP =================

function bookFreeClass(){

  const user = JSON.parse(localStorage.getItem("ironParadiseUser"));

  if(!user){
    alert("Please sign in first 💪");
    window.location.href="signin.html";
    return;
  }

  document.getElementById("bookPopup").style.display="flex";

  // autofill
  document.getElementById("popupName").value = user.name;
  document.getElementById("popupEmail").value = user.email;
  document.getElementById("popupGender").value = user.gender;
}

function closePopup(){
  document.getElementById("bookPopup").style.display="none";
}

// submit booking
const popupForm = document.getElementById("popupBookForm");

if(popupForm){
popupForm.addEventListener("submit", async(e)=>{
e.preventDefault();

const user = JSON.parse(localStorage.getItem("ironParadiseUser"));

const data = {
name:user.name,
email:user.email,
gender:user.gender,
mobile:document.getElementById("popupMobile").value,
exercise:document.getElementById("popupExercise").value,
date:document.getElementById("popupDate").value,
time:document.getElementById("popupTime").value
};

const res = await fetch(`${API_URL}/api/users/book-class`,{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify(data)
});

const result = await res.json();

document.getElementById("popupMsg").innerText=result.message;

});
}