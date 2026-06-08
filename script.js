// 🔥 FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyCyVyNB4GgneaJzqMoWEmAJRBnz9hSThoM",
  authDomain: "studyhelperapp-7350b.firebaseapp.com",
  databaseURL: "https://studyhelperapp-7350b-default-rtdb.firebaseio.com",
  projectId: "studyhelperapp-7350b",
  storageBucket: "studyhelperapp-7350b.firebasestorage.app",
  messagingSenderId: "558431076895",
  appId: "1:558431076895:web:7d0e973743cc78547bcb2a"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();


// ===== THEME & NAV =====
const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if(localStorage.getItem("theme") === "dark"){
  document.body.classList.add("dark");
  if(themeBtn) themeBtn.innerHTML = "🌙";
}

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

if(menuBtn){
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    menuBtn.classList.toggle("active");
  });
}

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


// ===== LOADER =====
window.addEventListener("load",()=>{
  setTimeout(()=>{
    const loader = document.getElementById("loader");
    if(loader) loader.style.display="none";
  },1500);
});


// ===== STUDY POPUP =====
const openBtn = document.getElementById("openStudyApp");
const popup = document.getElementById("studyPopup");
const closeBtn = document.getElementById("closePopup");

if(openBtn && popup && closeBtn){
  openBtn.onclick = () => popup.style.display="flex";
  closeBtn.onclick = () => popup.style.display="none";
}

window.addEventListener("click",(e)=>{
  if(popup && e.target.classList.contains("popup")){
    popup.style.display="none";
  }
});


// ===== FEATURE SWITCH =====
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
    showTasks();
  }

  else if(type === "attendance"){
    title.innerText = "Attendance Tracker";
    body.innerHTML = `
      <input id="totalClasses" type="number" placeholder="Total Classes">
      <input id="attendedClasses" type="number" placeholder="Attended">
      <button onclick="calcAttendance()">Calculate</button>
      <p id="attResult"></p>
      <canvas id="chart" width="200" height="200"></canvas>
      <br><button onclick="goBack()">⬅ Back</button>
    `;
  }

  else if(type === "countdown"){
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


// ===== TODO (FIREBASE) =====
function addTask(){
  const input = document.getElementById("taskInput");

  if(input.value.trim() !== ""){
    db.ref("tasks").push({
      text: input.value
    });

    input.value="";
  }
}

function showTasks(){
  const list = document.getElementById("taskList");

  db.ref("tasks").on("value", snap => {
    list.innerHTML = "";

    snap.forEach(child => {
      const data = child.val();
      const id = child.key;

      let li = document.createElement("li");

      li.innerHTML = `
        ${data.text}
        <button onclick="deleteTask('${id}')">❌</button>
      `;

      list.appendChild(li);
    });
  });
}

function deleteTask(id){
  db.ref("tasks/" + id).remove();
}


// ===== ATTENDANCE =====
function calcAttendance(){
  let total = document.getElementById("totalClasses").value;
  let attended = document.getElementById("attendedClasses").value;

  if(total==="" || attended==="") return;

  let percent = ((attended/total)*100).toFixed(2);

  document.getElementById("attResult").innerText =
    "Attendance: "+percent+"%";

  drawChart(percent);

  // 🔥 Save to Firebase
  db.ref("attendance").push({
    total,
    attended,
    percent
  });
}


// ===== GRAPH =====
function drawChart(percent){
  const canvas = document.getElementById("chart");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0,0,200,200);

  ctx.beginPath();
  ctx.moveTo(100,100);
  ctx.fillStyle="green";
  ctx.arc(100,100,80,0,(percent/100)*2*Math.PI);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(100,100);
  ctx.fillStyle="red";
  ctx.arc(100,100,80,(percent/100)*2*Math.PI,2*Math.PI);
  ctx.fill();
}


// ===== COUNTDOWN =====
let timer;

function startCountdown(){
  const dateInput = document.getElementById("dateInput").value;

  runCountdown(dateInput);

  // 🔥 Save to Firebase
  db.ref("countdown").set({
    date: dateInput
  });
}

function runCountdown(savedDate){
  clearInterval(timer);

  const target = new Date(savedDate);

  timer = setInterval(()=>{
    const now = new Date();
    const diff = target - now;

    if(diff <= 0){
      document.getElementById("countResult").innerText = "Time's up!";
      clearInterval(timer);
      return;
    }

    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff / (1000*60*60)) % 24);
    const minutes = Math.floor((diff / (1000*60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
   
    document.getElementById("countResult").innerHTML =
      `<b>${days}</b>d : <b>${hours}</b>h : <b>${minutes}</b>m : <b>${seconds}</b>s`;

  },1000);
}


// ===== CONTACT FORM =====
const form = document.querySelector(".contact-form");

if(form){
  form.addEventListener("submit", e=>{
    e.preventDefault();

    const name = e.target[0].value;
    const email = e.target[1].value;
    const message = e.target[2].value;

    db.ref("messages").push({name,email,message});

    alert("Message sent!");
    form.reset();
  });
}