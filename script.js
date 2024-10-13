// Load tasks from Local Storage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTasks(); // Load tasks from Local Storage
});

// Function to load tasks from Local Storage
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // Load tasks without saving again to avoid duplication
}

// Function to add tasks to the DOM and Local Storage
function addTask(taskText, save = true) {
    // Create task elements
    const taskList = document.querySelector('#task-list');
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;
    
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
        removeTask(taskItem, taskText);
    });

    taskItem.appendChild(removeButton);
    taskList.appendChild(taskItem);

    // Save task to Local Storage if applicable
    if (save) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
}

// Function to remove tasks from the DOM and Local Storage
function removeTask(taskItem, taskText) {
    taskItem.remove(); // Remove from the DOM

    // Remove from Local Storage
    let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks = storedTasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
}

// Event listener to add a new task from input
document.querySelector('#add-task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const taskInput = document.querySelector('#task-input');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        addTask(taskText); // Add task and save to Local Storage
        taskInput.value = ''; // Clear input
    }
});
