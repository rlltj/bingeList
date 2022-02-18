const mongoose = require('./connection');

const UserSchema = new mongoose.Schema({
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    uname: {type: String, required: true},
    password: {type: String, required: true},
    genres: [{type: String, required: false}],
    bio: {type: String, required: false},
    avatar: {type: String, required: true}
});

const User = mongoose.model('User', UserSchema);

exports.create = function(obj, next) {
    const user = new User(obj);
    
    user.save(function(err, user) {
        next(err, user);
    });
};

exports.getById = function(id, next) {
    User.findById(id, function(err, user) {
        next(err, user);
    });
};

exports.getOne = function(query, next) {
    User.findOne(query, function(err, user) {
        next(err, user);
    });
};

exports.update = function (query, obj, next) {
    // const upUser = new User(obj);

    User.updateOne(query, obj, function (err, obj) {
        next(err, obj);
    });

};

exports.populate = function (ref, next) {
    User.find().populate(ref, function (err, lists) {
        next(err, lists);
    });
};

//module.exports = User;