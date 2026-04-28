const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

// Load saved theme
if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark");
    themeBtn.innerHTML = "☀️ Light Mode";
}

// Theme toggle
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme", "dark");
        themeBtn.innerHTML = "☀️ Light Mode";
    } else {
        localStorage.setItem("theme", "light");
        themeBtn.innerHTML = "🌙 Dark Mode";
    }
});

// Mobile menu toggle
menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

// Close menu after clicking link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
    });
});

//typing-text Animation
const nameText = "Hi, I'm Mahendra";
const roleText = "B.Tech EEE Student | Web Developer";

let nameIndex = 0;
let roleIndex = 0;

// Typing animation for name
function typeName() {
    if (nameIndex < nameText.length) {
        document.querySelector(".typing-name").innerHTML += nameText.charAt(nameIndex);
        nameIndex++;
        setTimeout(typeName, 100);
    } else {
        setTimeout(typeRole, 500);
    }
}

// Typing animation for role
function typeRole() {
    if (roleIndex < roleText.length) {
        document.querySelector(".typing-text").innerHTML += roleText.charAt(roleIndex);
        roleIndex++;
        setTimeout(typeRole, 80);
    }
}

typeName();

//Fade-in Animation for Sections
const sections = document.querySelectorAll(".section");

window.addEventListener("scroll", () => {
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;

    if(sectionTop < window.innerHeight - 100){
      section.classList.add("show");
    }
  });
});