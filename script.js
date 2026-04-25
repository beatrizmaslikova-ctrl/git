let tasks = [];

// загрузка задач с сервера
window.onload = function () {
    fetch("http://localhost:3000/tasks")
        .then(res => res.json())
        .then(data => {
            tasks = data;
            tasks.forEach(task => addTaskToList(task));
        });
};

// добавить задачу
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

// вывести задачу
function addTaskToList(task) {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = task.text + " (" + task.date + ")";

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function () {
        li.remove();
    };

    li.appendChild(span);
    li.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(li);
}

// регистрация
function register() {
    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        })
    })
    .then(res => res.json())
    .then(data => alert(data.message));
}

// логин
function login() {
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);

        if (data.message === "Login success") {
            localStorage.setItem("user", "logged");
        }
    });
}