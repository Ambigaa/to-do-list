document.addEventListener("DOMContentLoaded", loadTasks);

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

document.getElementById("addBtn").onclick = addTask;

// Add task
function addTask() {
    if (taskInput.value.trim() === "") {
        alert("Please enter a task");
        return;
    }

    createTask(taskInput.value);
    saveTask(taskInput.value);
    taskInput.value = "";
}

// Create task UI
function createTask(text) {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = text;

    let btns = document.createElement("div");
    btns.className = "buttons";

    let done = document.createElement("button");
    done.textContent = "Done";
    done.className = "done-btn";
    done.onclick = () => li.classList.toggle("completed");

    let edit = document.createElement("button");
    edit.textContent = "Edit";
    edit.className = "edit-btn";

    let save = document.createElement("button");
    save.textContent = "Save";
    save.className = "save-btn";

    edit.onclick = () => {
        let input = document.createElement("input");
        input.value = span.textContent;
        span.replaceWith(input);

        edit.style.display = "none";
        save.style.display = "inline-block";
    };

    save.onclick = () => {
        let input = li.querySelector("input");
        let newSpan = document.createElement("span");
        newSpan.textContent = input.value;

        input.replaceWith(newSpan);
        edit.style.display = "inline-block";
        save.style.display = "none";

        updateTask(text, newSpan.textContent);
    };

    let del = document.createElement("button");
    del.textContent = "Del";
    del.className = "delete-btn";
    del.onclick = () => {
        li.remove();
        removeTask(text);
    };

    btns.append(done, edit, save, del);
    li.append(span, btns);
    taskList.appendChild(li);
}

// LocalStorage functions
function saveTask(task) {
    let list = JSON.parse(localStorage.getItem("tasks")) || [];
    list.push(task);
    localStorage.setItem("tasks", JSON.stringify(list));
}

function loadTasks() {
    let list = JSON.parse(localStorage.getItem("tasks")) || [];
    list.forEach(t => createTask(t));
}

function removeTask(text) {
    let list = JSON.parse(localStorage.getItem("tasks")) || [];
    list = list.filter(t => t !== text);
    localStorage.setItem("tasks", JSON.stringify(list));
}

function updateTask(oldT, newT) {
    let list = JSON.parse(localStorage.getItem("tasks")) || [];
    let index = list.indexOf(oldT);
    if (index !== -1) list[index] = newT;
    localStorage.setItem("tasks", JSON.stringify(list));
}
