const mongoose =require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectID,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    task: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['new', 'in_progress', 'completed'],
        default: 'new'
    }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;