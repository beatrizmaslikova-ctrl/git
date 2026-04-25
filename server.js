const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// "база данных" (файл)
let tasks = [];
let users = [];

// загрузка из файла
if (fs.existsSync("data.json")) {
    const data = JSON.parse(fs.readFileSync("data.json"));
    tasks = data.tasks || [];
    users = data.users || [];
}

// сохранить в файл
function saveData() {
    fs.writeFileSync("data.json", JSON.stringify({ tasks, users }));
}

// -------- AUTH --------

// регистрация
app.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (users.find(u => u.username === username)) {
        return res.json({ message: "User exists" });
    }

    users.push({ username, password });
    saveData();
    res.json({ message: "Registered" });
});

// логин
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (!user) return res.json({ message: "Invalid login" });

    res.json({ message: "Login success" });
});

// -------- TASKS --------

// получить задачи
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// добавить задачу
app.post("/tasks", (req, res) => {
    const task = req.body;
    tasks.push(task);
    saveData();
    res.json({ message: "Task added" });
});

// удалить задачу
app.delete("/tasks/:id", (req, res) => {
    tasks.splice(req.params.id, 1);
    saveData();
    res.json({ message: "Deleted" });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});