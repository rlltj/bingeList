const router = require('express').Router();
// const bcrypt = require('bcrypt');
const { isPrivate } = require('../middlewares/checkAuth');
const userModel = require('../database/models/user');
const listModel = require('../database/models/list');
const movieModel = require('../database/models/movies');
const itemModel = require('../database/models/item')
const { listValidation } = require('../validators.js');
const userController = require('../controllers/userController');
const listController = require('../controllers/listController');
const itemController = require('../controllers/itemController');

router.post('/:_id/update-list', isPrivate, listValidation, listController.updateList);

//router.post('/:listID/:movieID/add-to-list', isPrivate, itemController.addItem);

router.post('/add-to-list', isPrivate, itemController.addItem);
router.post('/:listID/:itemID/delete-from-list', isPrivate, itemController.deleteItem);

router.get('/:_id', isPrivate, (req,res) => {
    userModel.getOne({ _id : req.session.user }, (err, result) => {
        if (result) {
            console.log(result);
            // found a match, render prole page
            var uname = result.uname;
            var avatar = result.avatar;
            
            console.log(req.params._id)
            listModel.getById(req.params._id, (err, list) => {
                if (list) {
                    console.log(list);
                    var ltname = list.ltname;
                    var privacy = list.privacy;
                    var description = list.description;
                    
                    itemModel.getAll({listID: list._id}, (err, item) => {
                        if (item) {
                            console.log(item);
                            
//                            var movieID = item.movieID;
//                            var poster = item.poster;
//                            var title = item.title;
//                            var year = item.year;
//                            var synopsis = item.synopsis;
//                            var director = item.director;
                            
                            res.render('list', { user: req.session.user, listID: req.params._id, ltname, uname, avatar, privacy, description, item });
                        } else {
                            req.flash('error_msg', 'Items cannot be found!');
                            res.redirect('/' + list._id);
                        };
                    });
                } else {
                    // if something went so wrong we logout
                    req.flash('error_msg', 'List does not exist!');
                    res.redirect('/home');
                };
            });
        } else {
            // if something went so wrong we logout
            req.flash('error_msg', 'User does not have this list!');
            res.redirect('/home');
        };
  });
});

router.post('/create-list', isPrivate, listValidation, listController.createList);

router.get('/:_id/delete-list', isPrivate, listController.deleteList);

module.exports = router;
