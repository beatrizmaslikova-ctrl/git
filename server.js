const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

let data = { tasks: [], users: [] };

// LOAD DATA
if (fs.existsSync("data.json")) {
    data = JSON.parse(fs.readFileSync("data.json"));
}

// SAVE DATA
function save() {
    fs.writeFileSync("data.json", JSON.stringify(data));
}

// REGISTER
app.post("/register", (req, res) => {

    const { username, password } = req.body;

    if (data.users.find(u => u.username === username)) {
        return res.json({ message: "User exists" });
    }

    data.users.push({ username, password });

    save();

    res.json({ message: "Registered" });
});

// LOGIN
app.post("/login", (req, res) => {

    const { username, password } = req.body;

    const user = data.users.find(
        u => u.username === username && u.password === password
    );

    if (!user) {
        return res.json({ message: "Invalid login" });
    }

    res.json({ message: "Login success" });
});

// GET TASKS
app.get("/tasks", (req, res) => {
    res.json(data.tasks);
});

// ADD TASK
app.post("/tasks", (req, res) => {

    data.tasks.push(req.body);

    save();

    res.json({ message: "Task added" });
});

// DELETE TASK
app.delete("/tasks/:id", (req, res) => {

    data.tasks.splice(req.params.id, 1);

    save();

    res.json({ message: "Task deleted" });
});

// EDIT TASK
app.put("/tasks/:id", (req, res) => {

    data.tasks[req.params.id] = req.body;

    save();

    res.json({ message: "Task updated" });
});

// START SERVER
app.listen(3000, () => {
    console.log("Server started");
});