// загрузка задач
function loadTasks() {
    fetch("http://localhost:3000/tasks")
        .then(res => res.json())
        .then(tasks => {
            let list = document.getElementById("list");
            list.innerHTML = "";

            tasks.forEach(t => {
                let li = document.createElement("li");
                li.textContent = t.text;
                list.appendChild(li);
            });
        });
}

// добавить задачу
function addTask() {
    let text = document.getElementById("taskInput").value;

    fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ text })
    }).then(() => loadTasks());
}

// регистрация
function register() {
    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username: username.value,
            password: password.value
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
            username: username.value,
            password: password.value
        })
    })
    .then(res => res.json())
    .then(data => alert(data.message));
}

loadTasks();