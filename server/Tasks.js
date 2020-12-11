const {Schema, model} = require('mongoose')

const schema = new Schema({
    task_name: {
        type: String,
        required: true
    },

    task_description: {
        type: String,
        required: true
    },

    deadline: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    }
})

module.exports = model('Tasks', schema)