document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // If no task text is provided, return
        if (!taskText) return;

        // Create a new list item
        const li = document.createElement('li');
        li.textContent = taskText;
        li.classList.add('task-item');

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';
        removeButton.onclick = function() {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText); // Remove from Local Storage
        };

        // Append the button to the list item and the item to the list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Save to Local Storage if allowed
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear the input field
        taskInput.value = "";
    }

    // Function to remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Event listener for adding task on button click
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        addTask(taskText); // Adds the task with saving
    });

    // Event listener for adding task on pressing Enter key
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            addTask(taskText); // Adds the task with saving
        }
    });
});