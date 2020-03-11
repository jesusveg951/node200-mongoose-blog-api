const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email:{ type: String, required: true},

    social: {
        facebook: { type: String, required: false },
        twitter: { type: String, required: false },
        linkedIn: { type: String, required: false }
    },

    blog: {
        title: {type: String, require: true},
        article: {type: String, require: true},
        published: {type: String, require: true},
        featured: {type: String, require: true},
        author: {type: String, require: true}
    }
});

module.exports = mongoose.model('User', UserSchema);