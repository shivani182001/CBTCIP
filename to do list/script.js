// script.js

document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            addedAt: new Date().toLocaleString()
        };
        saveTask(task);
        taskInput.value = '';
        renderTasks();
    }
}

function saveTask(task) {
    let tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function loadTasks() {
    renderTasks();
}

function renderTasks() {
    const tasks = getTasks();
    const taskList = document.getElementById('task-list');
    const completedList = document.getElementById('completed-list');
    taskList.innerHTML = '';
    completedList.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.textContent = `${task.text} (Added: ${task.addedAt})`;
        const completeButton = document.createElement('button');
        completeButton.textContent = task.completed ? 'Undo' : 'Complete';
        completeButton.onclick = () => toggleTaskCompletion(task.id);
        taskItem.appendChild(completeButton);
        if (task.completed) {
            taskItem.classList.add('completed');
            completedList.appendChild(taskItem);
        } else {
            taskList.appendChild(taskItem);
        }
    });
}

function toggleTaskCompletion(taskId) {
    let tasks = getTasks();
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.completed = !task.completed;
            if (task.completed) {
                task.completedAt = new Date().toLocaleString();
            } else {
                delete task.completedAt;
            }
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}
