let tasks = [];

// storage downloud
window.onload = function() {
    let saved = localStorage.getItem("tasks");
    if (saved) {
        tasks = JSON.parse(saved);
        tasks.forEach(addTaskToList);
    }
};

function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value;

    if (text === "") return;

    tasks.push(text);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    addTaskToList(text);
    input.value = "";
}

function addTaskToList(text) {
    let li = document.createElement("li");
    li.textContent = text;

    // delete button
    let btn = document.createElement("button");
    btn.textContent = "Delete";
    btn.onclick = function() {
        li.remove();
        tasks = tasks.filter(t => t !== text);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    li.appendChild(btn);
    document.getElementById("taskList").appendChild(li);
}