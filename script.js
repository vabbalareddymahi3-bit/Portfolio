// ===== THEME & NAV =====
const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

// Load theme
if(localStorage.getItem("theme") === "dark"){
  document.body.classList.add("dark");
  if(themeBtn) themeBtn.innerHTML = "🌙";
}

// Toggle theme
if(themeBtn){
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if(document.body.classList.contains("dark")){
    localStorage.setItem("theme","dark");
    themeBtn.innerHTML="🌙";
  } else {
    localStorage.setItem("theme","light");
    themeBtn.innerHTML="☀️";
  }
});
}

// Mobile menu
if(menuBtn){
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  menuBtn.classList.toggle("active");
});
}

// Close menu
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

// ===== TYPING EFFECT =====
const nameText = "Hi, I'm Mahendra";
const roleText = "B.Tech EEE Student | Web Developer";

let nameIndex = 0;
let roleIndex = 0;

function typeName(){
  if(nameIndex < nameText.length){
    document.querySelector(".typing-name").innerHTML += nameText.charAt(nameIndex);
    nameIndex++;
    setTimeout(typeName,100);
  } else {
    setTimeout(typeRole,500);
  }
}

function typeRole(){
  if(roleIndex < roleText.length){
    document.querySelector(".typing-text").innerHTML += roleText.charAt(roleIndex);
    roleIndex++;
    setTimeout(typeRole,80);
  }
}

if(document.querySelector(".typing-name")){
  typeName();
}

// ===== SCROLL =====
const sections = document.querySelectorAll(".section");

window.addEventListener("scroll", () => {
  sections.forEach(section=>{
    if(section.getBoundingClientRect().top < window.innerHeight-100){
      section.classList.add("show");
    }
  });
});

window.addEventListener("scroll", () => {
  const bar = document.getElementById("progress-bar");
  if(bar){
    let scrollTop = document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    bar.style.width = (scrollTop/height)*100 + "%";
  }
});

// ===== LOADER =====
window.addEventListener("load",()=>{
  setTimeout(()=>{
    const loader = document.getElementById("loader");
    if(loader) loader.style.display="none";
  },2000);
});

// ===== STUDY POPUP =====
const openBtn = document.getElementById("openStudyApp");
const popup = document.getElementById("studyPopup");
const closeBtn = document.getElementById("closePopup");

if(openBtn && popup && closeBtn){
  openBtn.onclick = () => popup.style.display="flex";
  closeBtn.onclick = () => popup.style.display="none";
}

// Outside click close
window.addEventListener("click",(e)=>{
  if(popup && e.target.classList.contains("popup")){
    popup.style.display="none";
  }
});

// ===== FEATURE SCREEN =====
function openFeature(type){
  const body = document.getElementById("popupBody");
  const title = document.getElementById("popupTitle");

  if(type === "todo"){
    title.innerText = "To-Do List";
    body.innerHTML = `
      <input id="taskInput" placeholder="Enter task">
      <button onclick="addTask()">Add</button>
      <ul id="taskList"></ul>
      <br><button onclick="goBack()">⬅ Back</button>
    `;
  }

  if(type === "attendance"){
    title.innerText = "Attendance Tracker";
    body.innerHTML = `
      <input id="attInput" type="number" placeholder="Enter %">
      <button onclick="saveAttendance()">Save</button>
      <p id="attResult"></p>
      <br><button onclick="goBack()">⬅ Back</button>
    `;
  }

  if(type === "countdown"){
    title.innerText = "Exam Countdown";
    body.innerHTML = `
      <input type="date" id="dateInput">
      <button onclick="startCountdown()">Start</button>
      <p id="countResult"></p>
      <br><button onclick="goBack()">⬅ Back</button>
    `;
  }
}

function goBack(){
  const body = document.getElementById("popupBody");
  const title = document.getElementById("popupTitle");

  title.innerText = "Student Study Helper";

  body.innerHTML = `
    <div class="study-grid">
      <div class="card" onclick="openFeature('todo')">✅ To-Do List</div>
      <div class="card" onclick="openFeature('attendance')">📚 Attendance</div>
      <div class="card" onclick="openFeature('countdown')">⏳ Countdown</div>
    </div>
  `;
}

// ===== TODO =====
function addTask(){
  const input = document.getElementById("taskInput");
  const list = document.getElementById("taskList");

  if(input.value.trim()!==""){
    const li=document.createElement("li");
    li.textContent=input.value;
    list.appendChild(li);
    input.value="";
  }
}

// ===== ATTENDANCE =====
function saveAttendance(){
  const val=document.getElementById("attInput").value;
  if(val==="") return;

  document.getElementById("attResult").innerText="Attendance: "+val+"%";
}

// ===== COUNTDOWN =====
function startCountdown(){
  const date=new Date(document.getElementById("dateInput").value);
  const today=new Date();
  const diff=Math.floor((date-today)/(1000*60*60*24));

  document.getElementById("countResult").innerText=
    diff<0 ? "Date already passed" : diff+" days left";
}