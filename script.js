let tasks = [];


window.onload = function () {
    let saved = localStorage.getItem("tasks");
    if (saved) {
        tasks = JSON.parse(saved);
        tasks.forEach(task => addTaskToList(task));
    }
};


function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value;

    if (text === "") return;

    let task = {
        text: text,
        date: new Date().toLocaleString(),
        done: false
    };

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    addTaskToList(task);
    input.value = "";
}


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