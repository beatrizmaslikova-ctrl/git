let tasks = [];


window.onload = function () {
    let saved = localStorage.getItem("tasks");
    if (saved) {
        tasks = JSON.parse(saved);
        tasks.forEach(task => addTaskToList(task));
    }
};




function addTaskToList(task) {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = task.text + " (" + task.date + ")";

    if (task.done) {
        span.style.textDecoration = "line-through";
    }

    
    let doneBtn = document.createElement("button");
    doneBtn.textContent = "✔";
    doneBtn.onclick = function () {
        task.done = !task.done;
        span.style.textDecoration = task.done ? "line-through" : "none";
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = function () {
        let newText = prompt("Edit task:", task.text);
        if (newText) {
            task.text = newText;
            span.textContent = task.text + " (" + task.date + ")";
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    };

    
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function () {
        li.remove();
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    li.appendChild(span);
    li.appendChild(doneBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(li);
}


function clearTasks() {
    tasks = [];
    localStorage.removeItem("tasks");
    document.getElementById("taskList").innerHTML = "";
}


function addName() {
    let input = document.getElementById("nameText");
    let text = input.value;

    if (text === "") return;

    let li = document.createElement("li");
    li.textContent = text;

    document.getElementById("nameList").appendChild(li);
    input.value = "";
}
function register() {
    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        })
    }).then(res => res.json())
      .then(data => alert(data.message));
}

function login() {
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        })
    }).then(res => res.json())
      .then(data => alert(data.message));
}
function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value;

    if (text === "") return;

    let task = {
        text: text,
        date: new Date().toLocaleString()
    };

    fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    })
    .then(() => {
        addTaskToList(task);
        input.value = "";
    });
}