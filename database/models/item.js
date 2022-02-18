const mongoose = require('./connection');

const ItemSchema = new mongoose.Schema({
    listID: {type: String, required: true},
    movieID: {type: String, required: true},
    poster: { type: String, required: true },
    title: { type: String, required: true },
    year: { type: String, required: true },
    synopsis: { type: String, required: true },
    director: { type: String, required: true }
});

const Item = mongoose.model('Item', ItemSchema);

exports.create = function(obj, next) {
    const item = new Item(obj);
    
    item.save(function(err, item) {
        next(err, item);
    });
};

exports.getById = function(id, next) {
    Item.findById(id, function(err, item) {
        next(err, item);
    });
};

exports.getOne = function(query, next) {
    Item.findOne(query, function(err, item) {
        next(err, item);
    });
};

exports.getAll = function(query, next) {
    Item.find(query, function(err, items) {
        next(err, items);
    }).lean().populate();
};

exports.update = function (query, obj, next) {

    Item.updateOne(query, obj, function (err, obj) {
        next(err, obj);
    });

};

exports.delete = function (query, next) {
    Item.deleteOne(query, function(err, item) {
        next(err, item);
    });
};

exports.deleteAll = function (query, next) {
    Item.deleteMany(query, function (err, items) {
        next(err, items);
    });
};