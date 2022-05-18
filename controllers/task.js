const TaskModel = require('../models/task');
const UserModel = require('../models/user')
const mongoose = require('mongoose')

class TaskController {
    
    //Create a new task
    async createTask(req) {
        let result = {httpCode: 201};
        
        try{
            const _name = req.body.name;
            const _notes = req.body.notes;
            const _creator = req.user._id;
            const _priorityLvl = req.body.priorityLvl;
            const _completionDate = req.body.completionDate;

            await TaskModel.create({name: _name, notes: _notes, creator: _creator,
                    priorityLvl: _priorityLvl, completionDate: _completionDate});
        }
        catch(error){
            console.log(error)
            result.httpCode = 500;
        }
        return result;
    }

    //Edit a task - the user has to be either admin or the creator
    async modifyTask(req) {
        let result = {httpCode: 204};
        
        try{
            const _name = req.body.name;
            const _notes = req.body.notes;
            const _priorityLvl = req.body.priorityLvl;
            const _completionDate = req.body.completionDate;
            const _id = req.body._id;

            const user = await UserModel.findOne({ _id: req.user._id });
            const task = await TaskModel.findOne({_id: _id});

            if (task == null){
                result.httpCode = 400;
                result.message = "This task doesn't exist";
                return result;
            }
            if (user.role != "admin" && task.creator != req.user._id){
                result.httpCode = 403;
                result.message = "You can only edit your own tasks";
                return result;
            }

            await TaskModel.updateOne({_id: _id}, {name: _name, notes: _notes,
                                priorityLvl: _priorityLvl, completionDate: _completionDate});
        }
        catch(error){
            result.httpCode = 500;
        }
        return result;
    }

    //Delete a task - the user has to be either admin or the creator
    async deleteTask(req) {
        let result = {httpCode: 200};
        
        try{
            const _taskId = req.params.id;
            const _userId = req.user._id;
            const user = await UserModel.findOne({ _id: _userId });
            const task = await TaskModel.findOne({_id: _taskId});

            if (task == null){
                result.httpCode = 400;
                result.message = "This task doesn't exist";
                return result;
            }
            if (user.role != "admin" && task.creator != _userId){
                result.httpCode = 403;
                result.message = "You can only delete your own tasks";
                return result;
            }

            let assignedUsers = task.assignedUsers;
            for (let user of assignedUsers){
                let _user = await UserModel.findOne({ _id: user }).lean();
                let _assignedTasks = _user.assignedTasks;
                let i = 0;
                for (; i < _assignedTasks.length; i++)
                    if (_assignedTasks[i].toString() == _taskId)
                        continue
                _assignedTasks = _assignedTasks.splice(i, 1);
                await UserModel.updateOne({_id: user}, {assignedTasks: _assignedTasks});
            }
            
            await TaskModel.deleteOne({_id: _taskId});
        }
        catch(error){
            result.httpCode = 500;
        }
        return result;
    }

    //Update assigned tasks of the user obj and assigned users of the task obj
    async assignTaskToUser(req) {
        let result = {httpCode: 204};
        
        try{
            const _taskId = req.body.taskId;
            const _userId = req.body.userId;
            const user = await UserModel.findOne({ _id: _userId });
            const task = await TaskModel.findOne({ _id: _taskId });

            if (task == null){
                result.httpCode = 400;
                result.message = "This task doesn't exist";
                return result;
            }
            if (user.role != "admin" && task.creator != req.user._id){
                result.httpCode = 403;
                result.message = "You can only assign users to your own tasks";
                return result;
            }

            const _assignedTasks = user.assignedTasks;
            if (_assignedTasks.indexOf(_taskId) > -1){
                result.httpCode = 400;
                result.message = "Task already assigned to this user";
                return result;
            }

            _assignedTasks.push(_taskId);
            const _assignedUsers = task.assignedUsers;
            _assignedUsers.push(_userId);

            await UserModel.updateOne({_id: _userId}, {assignedTasks: _assignedTasks});
            await TaskModel.updateOne({_id: _taskId}, {assignedUsers: _assignedUsers});
        }
        catch(error){
            result.httpCode = 500;
        }
        return result;
    }

    //Set a task as complete - check if the user is admin/creator/assigned
    async setTaskAsComplete(req) {
        let result = {httpCode: 204};

        try{
            const _taskId = req.body.taskId;
            const _userId = req.user._id;
            const task = await TaskModel.findOne({_id: _taskId});
            const user = await UserModel.findOne({ _id: _userId });
            
            if (task == null){
                result.httpCode = 400;
                result.message = "This task doesn't exist";
                return result;
            }
            if (user.role != "admin" && task.creator != _userId &&
              !task.assignedUsers.includes(_userId) ){
                result.httpCode = 403;
                result.message = "You can't set a task as complete if you are not the creator or assigned";
                return result;
            }
            await TaskModel.updateOne({_id: _taskId}, {completed: true});            
        }
        catch(error){
            result.httpCode = 500;
        }
        return result;
    }

    processDate(tasks){
        for (let task of tasks){
            let date = new Date(task.completionDate);
            task.completionDate = date.toDateString() + " - " + date.toLocaleTimeString();
        }
        return tasks;
    }

    //Return all the user's assigned tasks, completed or not
    async getAllAssignedTasks(req, completed) {
        let result = {httpCode: 200};

        try{
            let assignedTasks = [];
            const user = await UserModel.findOne({ _id: req.user._id });
            for (const taskId of user.assignedTasks){
                assignedTasks.push(TaskModel.findOne({_id: taskId})
                                            .populate('creator')
                                            .populate('assignedUsers')
                                            .lean());
            }
            assignedTasks = await Promise.allSettled(assignedTasks);
            assignedTasks = assignedTasks.map((x) => {return x.value}).filter((x) => {return x.completed == completed});
            result.body = this.processDate(assignedTasks);
        }
        catch(error){
            result.httpCode = 500;
        }
        return result;
    }

    async getAllTasksCreatedByUser(req) {
        let result = {httpCode: 200};

        try{
            let createdTasks = await TaskModel.find({creator: req.user._id})
                                                .populate('creator')
                                                .populate('assignedUsers')
                                                .lean();
            result.body = this.processDate(createdTasks);
        }
        catch(error){
            result.httpCode = 500;
        }
        return result;
    }


}

module.exports = TaskController;
