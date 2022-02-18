const bcrypt = require('bcrypt');
const userModel = require('../database/models/user');
const { validationResult } = require('express-validator');

exports.registerUser = (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const { fname, lname, uname, password, genres, bio, avatar } = req.body;

      userModel.getOne({ uname: uname }, (err, result) => {
          if (result) {
            console.log(result);
            // found a match, return to login with error
            req.flash('error_msg', 'Username already exists. Please choose a different one.');
              res.redirect('/register')

          } else {
            const saltRounds = 10;

            // Hash password
            bcrypt.hash(password, saltRounds, (err, hashed) => {
              const newUser = {
                  fname,
                  lname,
                  uname,
                  password: hashed,
                  genres,
                  bio,
                  avatar
              };

              userModel.create(newUser, (err, user) => {
                if (err) {
                    console.log(err);
                  req.flash('error_msg', 'Could not create user. Please try again.');
                  res.redirect('/register');
                  // res.status(500).send({ message: "Could not create user"});
                } else {
                  req.flash('success_msg', 'You are now registered! Login now!');
                  res.redirect('/login');
                }
              });
            });
          }
      });
    } else {
      const messages = errors.array().map((item) => item.msg);

      req.flash('error_msg', messages.join(' '));
      res.redirect('/register');
    }
};

exports.loginUser = (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const {
        uname,
        password
      } = req.body;

      // Next items go here... Same as before, this will be replaced.
      userModel.getOne({ uname: uname }, (err, user) => {
          if (err) {
            // Database error occurred...
              console.log(err);
            req.flash('error_msg', 'Something happened! Please try again.');
            res.redirect('/login');
          } else {
            // Successful query
            if (user) {
                // User found!

                // next block of code goes here
                // Check password with hashed value in the database
                bcrypt.compare(password, user.password, (err, result) => {
                  // passwords match (result == true)
                  if (result) {
                    // Update session object once matched!
                    req.session.user = user._id;
                    req.session.name = user.fname;

                    console.log(req.session);

                    res.redirect('/home');
                  } else {
                    // passwords don't match
                    req.flash('error_msg', 'Incorrect password. Please try again.');
                    res.redirect('/login');
                  }
                });
            } 
            else {
              // No user found
              req.flash('error_msg', 'No registered user with that username. Please register or check the username again.');
              res.redirect('/login');
            }
          }
      });
    } else {
      const messages = errors.array().map((item) => item.msg);

      req.flash('error_msg', messages.join(' '));
      res.redirect('/login');
    }
};

exports.updateUser = (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { fname, lname, uname, password, npassword, genres, bio, avatar } = req.body;
    
    if (npassword == ""){
      const upUser = {
        fname,
        lname,
        uname,
        password,
        genres,
        bio,
        avatar
      }
      const update = {
        $set: upUser
      };
      console.log(update);
      // userModel.update({uname:uname}, { $set: upUser});
      //     req.flash('success_msg', 'You have succesfully updated your profile!');
      //     res.redirect('/profile');      
      userModel.update({uname:uname}, update, (err, update)=>{
        if (err) {
          console.log(err);
          req.flash('error_msg', 'Could not update user. Please try again.');
          res.redirect('/profile');
          // res.status(500).send({ message: "Could not create user"});
        } else {
          req.flash('success_msg', 'You have succesfully updated your profile!');
          res.redirect('/profile');
        }
      });
    }
    else {
      const saltRounds = 10;
      // Hash password
      bcrypt.hash(npassword, saltRounds, (err, hashed) => {
        const upUser = {
            fname,
            lname,
            uname,
            password: hashed,
            genres,
            bio,
            avatar
        };
        const update = {
          $set: upUser
        };

        userModel.update({uname:uname}, update, (err,update)=>{
          if (err) {
            console.log(err);
            req.flash('error_msg', 'Could not update user. Please try again.');
            res.redirect('/profile');
            // res.status(500).send({ message: "Could not create user"});
          } else {
            req.flash('success_msg', 'You have succesfully updated your profile!');
            res.redirect('/profile');
          }
        });
      });
    }
  } else {
    const messages = errors.array().map((item) => item.msg);

    req.flash('error_msg', messages.join(' '));
    res.redirect('/profile');
  }
};


exports.logoutUser = (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.redirect('/login');
    });
  }
};