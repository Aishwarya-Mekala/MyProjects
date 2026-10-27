
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearCompleted = document.getElementById("clearCompleted");

let tasks = [];

try {
    const savedTasks = JSON.parse(
        localStorage.getItem("myTodoTasks") || "[]"
    );

    if (Array.isArray(savedTasks)) {
        tasks = savedTasks.filter(task =>
            task &&
            typeof task.text === "string" &&
            typeof task.completed === "boolean" &&
            typeof task.id === "number"
        );
    }
} catch {
    tasks = [];
}

function saveTasks() {
    try {
        localStorage.setItem("myTodoTasks", JSON.stringify(tasks));
    } catch {
        alert("Could not save tasks in this browser.");
    }
}

function renderTasks() {
    taskList.replaceChildren();

    tasks.forEach(function (task) {
        const li = document.createElement("li");
        li.classList.toggle("completed", task.completed);

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.setAttribute("aria-label", "Complete " + task.text);

        checkbox.addEventListener("change", function () {
            task.completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        const span = document.createElement("span");
        span.textContent = task.text;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";

        deleteButton.addEventListener("click", function () {
            tasks = tasks.filter(item => item.id !== task.id);
            saveTasks();
            renderTasks();
        });

        li.append(checkbox, span, deleteButton);
        taskList.appendChild(li);
    });

    const remaining = tasks.filter(task => !task.completed).length;
    taskCount.textContent = remaining + " tasks remaining";
}

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = taskInput.value.trim();

    if (!text) return;

    tasks.push({
        id: Date.now() + Math.random(),
        text: text,
        completed: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
    taskInput.focus();
});

clearCompleted.addEventListener("click", function () {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
});

renderTasks();
