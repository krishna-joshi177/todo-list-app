let tasks = [];
let editMode = false;
let editIndex = -1;

$(document).ready(function () {
    // Add task button click event
    $('#addTaskBtn').click(function () {
        $('#taskModalLabel').text('Add Task');
        $('#taskForm')[0].reset();
        editMode = false; // Reset edit mode
        $('#taskIndex').val(''); // Clear index
    });

    // Save task button click event
    $('#saveTaskBtn').click(function () {
        const taskDescription = $('#taskDescription').val();
        const responsiblePerson = $('#responsiblePerson').val();
        const taskETA = $('#taskETA').val();
        const index = $('#taskIndex').val();

        if (editMode) {
            // Update existing task
            tasks[index] = { description: taskDescription, responsible: responsiblePerson, eta: taskETA };
        } else {
            // Add new task
            tasks.push({ description: taskDescription, responsible: responsiblePerson, eta: taskETA });
        }

        $('#taskModal').modal('hide');
        renderTasks();
    });

    // Function to render tasks in the table
    function renderTasks() {
        const taskTableBody = $('#taskTableBody');
        taskTableBody.empty();
        tasks.forEach((task, index) => {
            taskTableBody.append(`
                <tr>
                    <td>${index + 1}</td>
                    <td>${task.description}</td>
                    <td>${task.responsible}</td>
                    <td>${new Date(task.eta).toLocaleString()}</td>
                    <td>
                        <button class="btn btn-success btn-sm" onclick="editTask(${index})"><i class="bi bi-pencil"></i></button>
                        <button class="btn btn-danger btn-sm" onclick="completeTask(${index})"><i class="bi bi-check-circle"></i></button>
                    </td>
                </tr>
            `);
        });
    }

    // Edit task function
    window.editTask = function (index) {
        const task = tasks[index];
        $('#taskDescription').val(task.description);
        $('#responsiblePerson').val(task.responsible);
        $('#taskETA').val(task.eta);
        $('#taskModalLabel').text('Edit Task');
        $('#taskIndex').val(index);
        editMode = true; // Set edit mode
        $('#taskModal').modal('show');
    };

    // Complete task function
    window.completeTask = function (index) {
        tasks.splice(index, 1); // Remove completed task
        renderTasks();
    };
});
