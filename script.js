document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Array to store tasks
    let tasks = [];

    // Load tasks from Local Storage when page loads
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = storedTasks;
        storedTasks.forEach(function(taskText) {
            addTask(taskText, false);
        });
    }

    // Add task function
    function addTask(taskText, save = true) {
        if (taskText === '' || taskText === undefined || taskText === null) {
            return;
        }

        // Create list item element
        const li = document.createElement('li');
        
        // Create span for the task text
        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = taskText;
        li.appendChild(taskTextSpan);

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        removeBtn.onclick = function() {
            // Remove from DOM
            taskList.removeChild(li);
            // Remove from tasks array
            const taskIndex = tasks.indexOf(taskText);
            if (taskIndex > -1) {
                tasks.splice(taskIndex, 1);
                // Update Local Storage
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        };
        
        // Append remove button to li
        li.appendChild(removeBtn);
        
        // Append li to task list
        taskList.appendChild(li);

        // Save to Local Storage if save parameter is true
        if (save) {
            tasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            // Clear the input field
            taskInput.value = '';
        }
    }

    // Event listener for Add Task button
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task');
            return;
        }
        addTask(taskText, true);
    });

    // Event listener for Enter key in input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText === '') {
                alert('Please enter a task');
                return;
            }
            addTask(taskText, true);
        }
    });

    // Load tasks from Local Storage when page loads
    loadTasks();
});

