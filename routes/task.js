const express = require('express');
const TaskController = require('../controllers/task')

const router = express.Router();

/* Get all the user's assigned tasks not completed
    GET http://[server_URI]/api/task/assigned_tasks
*/
router
.get('/assigned_tasks',
    async (req, res) => {
        const taskController = new TaskController();
        let result = await taskController.getAllAssignedTasks(req, completed=false);

        let httpCode = result.httpCode;
        delete (result.httpCode);

        return (res.status(httpCode).send(typeof result.body == 'object' && Object.keys(result.body).length ? result.body : null));
    }
)
/* Get all the completed user's assigned tasks
    GET http://[server_URI]/api/task/completed_tasks
*/
.get('/completed_tasks',
    async (req, res) => {
        const taskController = new TaskController();
        let result = await taskController.getAllAssignedTasks(req, completed=true);

        let httpCode = result.httpCode;
        delete (result.httpCode);

        return (res.status(httpCode).send(typeof result.body == 'object' && Object.keys(result.body).length ? result.body : null));
    }
)
/* Get all tasks which have been created by the user
    GET http://[server_URI]/api/task/created_tasks
*/
.get('/created_tasks',
    async (req, res) => {
        const taskController = new TaskController();
        let result = await taskController.getAllTasksCreatedByUser(req);

        let httpCode = result.httpCode;
        delete (result.httpCode);

        return (res.status(httpCode).send(typeof result.body == 'object' && Object.keys(result.body).length ? result.body : null));
    }
)


/* Create a new task
    POST http://[server_URI]/api/task
    Body: {
        name: String - REQUIRED
        notes: String - REQUIRED
        priorityLvl: Number {1|2|3} - REQUIRED
        date: String/Number (Number for Unix Time, String otherwise) - REQUIRED
    }
*/
router
.post('/',
    async (req, res) => {
        const taskController = new TaskController();
        let result = await taskController.createTask(req);

        let httpCode = result.httpCode;
        delete (result.httpCode);

        return (res.status(httpCode).send(Object.keys(result).length ? result : null));
    }
)

/* Edit a task 
    PUT http://[server_URI]/api/task
    Body: {
        name: String - REQUIRED
        notes: String - REQUIRED
        priorityLvl: Number {1|2|3} - REQUIRED
        date: String/Number (Number for Unix Time, String otherwise) - REQUIRED,
        _id: String - REQUIRED
    }
*/
router
.put('/',
    async (req, res) => {
        const taskController = new TaskController();
        let result = await taskController.modifyTask(req);

        let httpCode = result.httpCode;
        delete (result.httpCode);

        return (res.status(httpCode).send(Object.keys(result).length ? result : null));
    }
)
/* Assign a task to a given user
    PUT http://[server_URI]/api/task/assign
    Body: {
        taskId: String - REQUIRED
        userId: String - REQUIRED
    }
*/
.put('/assign',
    async (req, res) => {
        const taskController = new TaskController();
        let result = await taskController.assignTaskToUser(req);

        let httpCode = result.httpCode;
        delete (result.httpCode);

        return (res.status(httpCode).send(Object.keys(result).length ? result : null));
    }
)
/* Set a task as complete
    PUT http://[server_URI]/api/task/complete
    Body: {
        taskId: String - REQUIRED
    }
*/
.put('/complete',
    async (req, res) => {
        const taskController = new TaskController();
        let result = await taskController.setTaskAsComplete(req);

        let httpCode = result.httpCode;
        delete (result.httpCode);

        return (res.status(httpCode).send(Object.keys(result).length ? result : null));
    }
)

/* Delete a task
    DELETE http://[server_URI]/api/task/:id
    Params: {
        taskId: String - REQUIRED
    }
*/
router
.delete('/:id',
    async (req, res) => {
        const taskController = new TaskController();
        let result = await taskController.deleteTask(req);

        let httpCode = result.httpCode;
        delete (result.httpCode);

        return (res.status(httpCode).send(Object.keys(result).length ? result : null));
    }
)


module.exports = router;
