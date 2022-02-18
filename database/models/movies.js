const mongoose = require('./connection');

const MoviesSchema = new mongoose.Schema({
    poster: { type: String, required: true },
    title: { type: String, required: true },
    year: { type: String, required: true },
    synopsis: { type: String, required: true },
    director: { type: String, required: true }
});

const Movie= mongoose.model('Movie', MoviesSchema);

exports.create = function (obj, next) {
    const movie = new Movie(obj);

    movie.save(function (err, movie) {
        next(err, item);
    });
};

exports.getById = function (id, next) {
    Movie.findById(id, function (err, movie) {
        next(err, movie);
    });
};

exports.getAll = function (next) {
    Movie.find(function (err, movies) {
        next(err, movies);
    }).lean();
};

exports.update = function (query, obj, next) {

    Movie.updateOne(query, obj, function (err, obj) {
        next(err, obj);
    });

};

exports.delete = function (query, next) {
    Movie.deleteOne(query, function (err, movie) {
        next(err, movie);
    })
}