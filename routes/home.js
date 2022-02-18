const router = require('express').Router();
// const bcrypt = require('bcrypt');
const { isPrivate } = require('../middlewares/checkAuth');
const userModel = require('../database/models/user');
const listModel = require('../database/models/list');
const movieModel = require('../database/models/movies');
const itemModel = require('../database/models/item');
const { registerValidation, listValidation } = require('../validators.js');
const userController = require('../controllers/userController');
const listController = require('../controllers/listController');
const itemController = require('../controllers/itemController');

router.get('/home', isPrivate, (req, res) => {
  userModel.getOne({ _id : req.session.user }, (err, result) => {
      if (result) {
        // found a match, render prole page
          var avatar = result.avatar;
          var uname = result.uname;

          listModel.getAll({ uname: uname }, (err, lists) => {
              if (lists) {
                  console.log(lists);
                  res.render('home', { pageTitle: 'Home', name: req.session.name, avatar, lists });
                  
              } else {
                  req.flash('error_msg', "Something went wrong. We could not load your lists. We are sorry.");
                  res.redirect('/home');
              };
          });
      } 
      else {
        // if something went so wrong we logout
        req.flash('error_msg', 'Something went really wrong. We are sorry.');
        res.redirect('/logout');
      }
  });
});

router.get('/getLists', function(req, res) {
    userModel.getOne({ _id : req.session.user }, (err, result) => {
      if (result) {
        // found a match, render prole page
          var avatar = result.avatar;
          var uname = result.uname;

          listModel.getAll({ uname: uname }, (err, lists) => {
              if (lists) {
                  console.log(lists);
                  res.status(200).send(lists)
              } else {
                  req.flash('error_msg', "Something went wrong. We could not load your lists. We are sorry.");
                  res.redirect('/home');
              };
          });
      } 
      else {
        // if something went so wrong we logout
        req.flash('error_msg', 'Something went really wrong. We are sorry.');
        res.redirect('/logout');
      }
  });
});

//router.get('/getListMovies', function(req, res) {
//    itemModel.getAll({ listID : "62076e7ce85d4caea410bcb3" }, (err, result) => {
//      if (result) {
//          console.log(result);
//          res.status(200).send(result);
//      } 
//      else {
//        // if something went so wrong we logout
//        req.flash('error_msg', 'We couldn\'t load your lists at the moment. We are sorry.');
//        res.redirect('/'+req.params._id);
//      }
//  });
//});

router.get('/getMovies', function(req, res) {
    movieModel.getAll((err, movies) => {
        if(movies) {
//            console.log(movies);
            res.status(200).send(movies);
        } else {
            req.flash('error_msg', 'Something went wrong loading the movies!');
            res.redirect(window.location.href);
        }
    });
});

router.get('/getInfo', function(req, res) {
    movieModel.getAll((err, movies) => {
        if(movies) {
            console.log(movies);
            res.status(200).send(movies);
        } else {
            req.flash('error_msg', 'Something went wrong loading the movies!');
            res.redirect(window.location.href);
        }
    });
});

router.get('/:movieID/getInfoDel', function(req, res) {
    itemModel.getAll({movieID: req.params.movieID},(err, movies) => {
        if(movies) {
            console.log(movies);
            res.status(200).send(movies);
        } else {
            req.flash('error_msg', 'Something went wrong loading the movies!');
            res.redirect(window.location.href);
        }
    });
});

router.get('/profile', isPrivate, (req, res) => {
  userModel.getOne({ _id : req.session.user }, (err, result) => {
      if (result) {
        console.log(result);
        // found a match, render prole page
        var fname = result.fname;
        var lname = result.lname;
        var uname = result.uname;
        var password = result.password;
        var genres = result.genres;
        var bio = result.bio;
        var avatar = result.avatar;

        res.render('profile', { pageTitle: 'Profile', user: req.session.user, fname,lname, 
        uname, password, genres, bio, avatar});
      } 
      else {
        // if something went so wrong we logout
        req.flash('error_msg', 'Something went really wrong. We are sorry.');
        res.redirect('/logout');
      }
  });
});

router.post('/update-profile', isPrivate, registerValidation, userController.updateUser);

module.exports = router;
