const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    default: "",
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  priorityLvl: {
    type: Number,
    enum: [1, 2, 3],
    default: 3
  },
  completionDate: {
    type: Date,
    required: true
  },
  assignedUsers: {
    type: [Schema.Types.ObjectId],
    ref: 'user',
    default: []
  }
},{
  collection: 'tasks'
});

const TaskModel = mongoose.model('task', TaskSchema);

module.exports = TaskModel;