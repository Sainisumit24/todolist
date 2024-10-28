document.addEventListener('DOMContentLoaded', (event) => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task');
    const timeInput = document.getElementById('time');
    const taskList = document.getElementById('task-list');

    let taskCounter = 0;
    let tasks = [];

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(taskInput.value, timeInput.value);
        taskInput.value = ''; // Clear input after adding
        timeInput.value = ''; // Clear time input after adding
    });

    function addTask(task, time) {
        taskCounter++;
        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <td>${taskCounter}</td>
            <td>
                <select class="status-dropdown">
                    <option value="not-done">Not Done</option>
                    <option value="done">Done</option>
                </select>
            </td>
            <td>${task}</td>
            <td>${new Date(time).toLocaleString()}</td>
            <td class="actions">
                <button class="reset-button">Reset Time</button>
            </td>
        `;

        // Add event listener for status change
        newRow.querySelector('.status-dropdown').addEventListener('change', function() {
            const statusCell = newRow.cells[1];
            statusCell.className = this.value;
            highlightNextTask();
        });

        // Add event listener for reset button
        newRow.querySelector('.reset-button').addEventListener('click', function() {
            const newTime = prompt("Enter new time:", time);
            if (newTime) {
                newRow.cells[3].textContent = new Date(newTime).toLocaleString();
                updateTask(taskCounter - 1, newTime);
                setReminder(task, newTime);
                highlightNextTask();
            }
        });

        taskList.appendChild(newRow);
        
        tasks.push({ row: newRow, time: new Date(time), task });

        // Set reminder
        setReminder(task, time);

        // Highlight if the task is due soon
        highlightNextTask();
    }

    function setReminder(task, time) {
        const now = new Date();
        const reminderTime = new Date(time);
        
        if (reminderTime > now) {
            const timeout = reminderTime - now;
            setTimeout(() => {
                alert(`Reminder: Task "${task}" is not done!`);
            }, timeout);
        }
    }

    function updateTask(index, newTime) {
        tasks[index].time = new Date(newTime);
    }

    function highlightNextTask() {
        const now = new Date();
        let closestTask = null;

        tasks.forEach(task => {
            task.row.classList.remove('highlight');
            if (task.row.querySelector('.status-dropdown').value !== 'done') {
                const timeDiff = task.time - now;
                if (timeDiff > 0 && (!closestTask || timeDiff < (closestTask.time - now))) {
                    closestTask = task;
                }
            }
        });

        if (closestTask) {
            closestTask.row.classList.add('highlight');
        }
    }
});
