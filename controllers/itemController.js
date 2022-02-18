const listModel = require('../database/models/list');
const userModel = require('../database/models/user');
const movieModel = require('../database/models/movies');
const itemModel = require('../database/models/item');
const { validationResult } = require('express-validator');

exports.addItem = (req, res) => {
    console.log(req.body);
    const listID = req.body.listID;
    const movieID = req.body.movieID;
    const title = req.body.title;
    const poster = req.body.poster;
    const year = req.body.year;
    const synopsis = req.body.synopsis;
    const director = req.body.director;
    
    itemModel.getOne({movieID: movieID, listID: listID}, (err, result) => {
        if(result) {
            console.log(result);
            // found a match, return to login with error
            req.flash('error_msg', 'Movie already exists in this list! Please choose a different one.');
            res.redirect('/' + listID);
        } else {
            const newItem = {
                listID,
                movieID,
                poster,
                title,
                year,
                synopsis,
                director
            };
            console.log(newItem);
            itemModel.create(newItem, (err, item) => {
                if (err) {
                    console.log(err);
                    req.flash('error_msg', 'Could not add movie to list. Please try again.');
                    res.redirect(req.body.listID);
                } else {
                    console.log(item);
                    req.flash('success_msg', 'Item sucessfully added!');
                    res.redirect(req.body.listID);
                }
            });
        }
    })
    
    
};
//
//exports.updateList = (req, res) => {
//    const errors = validationResult(req);
//
//    if (errors.isEmpty()) {
//        const { ltname, privacy, description } = req.body;
//
//        const upList = { ltname, privacy, description }
//
//        const update = {
//            $set: upList
//        };
//
//        console.log(update);
//        console.log(req.params._id);
//        listModel.update({ _id: req.params._id }, update, (err, update) => {
//            if (err) {
//                req.flash('error_msg', 'Could not update list. Please try again.');
//                res.redirect('/' + req.params._id);
//            } else {
//                req.flash('success_msg', 'You have succesfully updated this list!');
//                res.redirect('/' + req.params._id);
//            }
//        });
//    } else {
//        const messages = errors.array().map((item) => item.msg);
//
//        req.flash('error_msg', messages.join(' '));
//        res.redirect('/' + req.params._id);
//    }
//}
//
exports.deleteItem = (req, res) => {
    itemModel.getById(req.params.itemID, (err, result) => {
        if (result) {
            itemModel.delete(result, (err, result) => {
                if (err) {
                    req.flash('error_msg', 'Something went wrong deleting this item!');
                    res.redirect('/' + req.params.listID);
                } else {
                    req.flash('success_msg', 'Item sucessfully deleted!');
                    res.redirect('/' + req.params.listID);
                }
            })
        } else {
            req.flash('error_msg', 'Something went wrong! Please try again.');
            res.redirect('/' + req.params.listID);
        };
    })
}