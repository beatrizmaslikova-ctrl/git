// LOAD TASKS
function loadTasks() {
    fetch("http://localhost:3000/tasks")
        .then(res => res.json())
        .then(tasks => {
            let list = document.getElementById("list");
            list.innerHTML = "";

            tasks.forEach((task, index) => {
                addTaskToList(task, index);
            });
        });
}

// SHOW TASK
function addTaskToList(task, index) {

    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = task.text;

    // EDIT BUTTON
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.onclick = function () {

        let newText = prompt("Edit task:", task.text);

        if (newText) {

            fetch(`http://localhost:3000/tasks/${index}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ text: newText })
            })
            .then(() => loadTasks());
        }
    };

    // DELETE BUTTON
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.onclick = function () {

        fetch(`http://localhost:3000/tasks/${index}`, {
            method: "DELETE"
        })
        .then(() => loadTasks());
    };

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    document.getElementById("list").appendChild(li);
}

// ADD TASK
function addTask() {

    let text = document.getElementById("taskInput").value;

    fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
    })
    .then(() => {
        loadTasks();
    });
}

// REGISTER
function register() {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    })
    .then(res => res.json())
    .then(data => alert(data.message));
}

// LOGIN
function login() {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    })
    .then(res => res.json())
    .then(data => alert(data.message));
}

loadTasks();