const mongoose = require('./connection');

const ListSchema = new mongoose.Schema({
    uname: {type: String, ref:'User', required: true},
    ltname: {type: String, required: true},
    privacy: {type: String, required: true},
    description: {type: String, required: false}
});

const List = mongoose.model('List', ListSchema);

exports.create = function(obj, next) {
    const list = new List(obj);
    
    list.save(function(err, list) {
        next(err, list);
    });
};

exports.getById = function(id, next) {
    List.findById(id, function(err, list) {
        next(err, list);
    });
};

exports.getAll = function(query, next) {
    List.find(query, function(err, lists) {
        next(err, lists);
    }).lean();
};

exports.update = function (query, obj, next) {

    List.updateOne(query, obj, function (err, obj) {
        next(err, obj);
    });

};

exports.delete = function (query, next) {
    List.deleteOne(query, function (err, list) {
        next(err, list);
    });
};

exports.populate = function (ref, next) {
    List.populate(ref, function (err, items) {
        next(err, items);
    });
};

//module.exports = new List();