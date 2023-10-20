document.addEventListener("DOMContentLoaded", function () {
    const todoList = document.getElementById("todo-list");
    const newTaskInput = document.getElementById("new-task");
    const addTaskButton = document.getElementById("add-task");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks() {
        todoList.innerHTML = "";
        tasks.forEach(task => {
            const newTask = document.createElement("li");
            newTask.classList.add("flex", "justify-between", "bg-white", "p-2", "mb-2");
            newTask.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button class="text-green-600" id="edit-task">Edit</button>
                    <button class="text-red-600" id="delete-task">Delete</button>
                </div>
            `;

            const editButton = newTask.querySelector("#edit-task");
            const deleteButton = newTask.querySelector("#delete-task");

            editButton.addEventListener("click", function () {
                const updatedText = prompt("Edit the task:", task.text);
                if (updatedText !== null) {
                    task.text = updatedText;
                    saveTasksToLocalStorage();
                    renderTasks();
                }
            });

            deleteButton.addEventListener("click", function () {
                const taskIndex = tasks.indexOf(task);
                tasks.splice(taskIndex, 1);
                saveTasksToLocalStorage();
                renderTasks();
            });

            todoList.appendChild(newTask);
        });
    }

    function addTask(taskText) {
        tasks.push({ text: taskText });
        saveTasksToLocalStorage();
        renderTasks();
    }

    function saveTasksToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    addTaskButton.addEventListener("click", function () {
        const taskText = newTaskInput.value;
        if (taskText.trim() === "") {
            alert("Task cannot be empty!");
            return;
        }

        addTask(taskText);
        newTaskInput.value = "";
    });

    renderTasks();
});
