const listModel = require('../database/models/list');
const userModel = require('../database/models/user');
const itemModel = require('../database/models/item');
const { validationResult } = require('express-validator');

exports.createList = (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const { ltname, privacy, description } = req.body;

      userModel.getById(req.session.user, (err, result) => {
          if (result) {
              const uname = result.uname;
              const newList = {
                  uname,
                  ltname,
                  privacy,
                  description
              };
              
              listModel.create(newList, (err, list) => {
                if (err) {
                    console.log(err);
                    req.flash('error_msg', 'Could not create list. Please try again.');
                    res.redirect('/home');
                } else {
                    console.log(list);
                    req.flash('success_msg', 'List sucessfully created! Add to your list now!');
                    res.redirect('/' + list._id);
                }
              });
          } else {
                req.flash('error_msg', 'User cannot be found! Please try again.');
                res.redirect('/home');
          };
        });
    } else {
      const messages = errors.array().map((item) => item.msg);

      req.flash('error_msg', messages.join(' '));
      res.redirect('/home');
    };
};

exports.updateList = (req, res) => {
    const errors = validationResult(req);
    
    if (errors.isEmpty()) {
        const { ltname, privacy, description } = req.body;
        
        const upList = { ltname, privacy, description }
        
        const update = { 
            $set: upList
        };
        
        console.log(update);
        console.log(req.params._id);
        listModel.update({_id: req.params._id}, update, (err, update) => {
            if (err) {
                req.flash('error_msg', 'Could not update list. Please try again.');
                res.redirect('/' + req.params._id);
            } else {
                req.flash('success_msg', 'You have succesfully updated this list!');
                res.redirect('/' + req.params._id);
            }
        });
    } else {
        const messages = errors.array().map((item) => item.msg);

        req.flash('error_msg', messages.join(' '));
        res.redirect('/' + req.params._id);
    }
}

exports.deleteList = (req, res) => {
    listModel.getById(req.params._id, (err, result) => {
        if(result) {
            listModel.delete(result, (err, result) => {
                if(err) {
                    req.flash('error_msg', 'Something went wrong deleting this list!');
                    res.redirect('/' + req.params._id);
                } else {
                    itemModel.deleteAll({listID: req.params._id}, (err, result) => {
                        if(result){
                            console.log('Items from list deleted!');
                        } else {
                            console.log('Oh noes! Something went wrong deleting items.')
                        }
                    });
                    req.flash('success_msg', 'List sucessfully deleted!');
                    res.redirect('/home');
                }
            })
        } else {
            req.flash('error_msg', 'Something went wrong! Please try again.');
            res.redirect('/home');
        };
    })
}