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
    function addTask(taskTextValue, save = true) {
        let taskText;
        
        // If called from event listener, get value from input
        if (taskTextValue === undefined || taskTextValue === null) {
            taskText = taskInput.value.trim();
        } else {
            taskText = taskTextValue;
        }
        
        if (taskText === '') {
            alert('Please enter a task');
            return;
        }

        // Create list item element
        const li = document.createElement('li');
        
        // Create text node and set it as textContent
        const textNode = document.createTextNode(taskText);
        li.appendChild(textNode);

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');
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
    addButton.addEventListener('click', addTask);

    // Event listener for Enter key in input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks from Local Storage when page loads
    loadTasks();
});

