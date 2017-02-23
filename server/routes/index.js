var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// define the user model
let UserModel = require('../models/users');
let User = UserModel.User; // alias for User

// define the contact model
let game = require('../models/contacts');

// function to check if the user is authenticated
function requireAuth(req, res, next) {
  // check if the user is logged index
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
}

/* GET home page. */
router.get('/',(req, res, next)=> {
  res.render('index', {   title: 'Home' ,
 displayName: req.user ? req.user.displayName : ''});
  
});


/* GET about page. */
router.get('/about',(req, res, next)=> {
  res.render('about', {   title: 'Who Am i ?',
 displayName: req.user ? req.user.displayName : ''});
});

/* GET project page. */
router.get('/projects',(req, res, next)=> {
  res.render('projects', {   title: 'My Projects',
 displayName: req.user ? req.user.displayName : ''});
});

/* GET service page. */
router.get('/service',(req, res, next)=> {
  res.render('service', {   title: 'Services', 
  displayName: req.user ? req.user.displayName : ''});
});

/* GET contact page. */
router.get('/contact',(req, res, next)=> {
  res.render('contact', {  title: 'Contact Me',
 displayName: req.user ? req.user.displayName : ''});
});



a
//===== Login page ===//

/* GET /login - render the login view */
router.get('/login', (req, res, next) => {
  // check to see  if the user is not already logged index
  if(!req.user) {
    // render the login page
    res.render('auth/login', {
      title: 'Login',
      games: '',
      messages: req.flash('loginMessage'),
      displayName: req.user ? req.user.displayName : ''
    });
    return;
  } else {
    return res.redirect('/'); // redirect to the home
  }
});

// POST /login - process the login page
router.post('/login', passport.authenticate('local', {
  successRedirect: '/contact',
  failureRedirect: '/login',
  failureFlash: true
}));


//====Register Page ===//

// GET /register - render the register page
router.get('/register', (req, res, next) =>{
  // check if the user is not already logged in
  if(!req.user) {
    // render the registration page
    res.render('auth/register', {
      title: 'Register',
      games: '',
      messages: req.flash('registerMessage'),
      displayName: req.user ? req.user.displayName : ''
    });
  }
});
// POST /register - process the registration view
router.post('/register', (req, res, next) => {
  User.register(
    new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        displayName: req.body.displayName
      }),
      req.body.password,
      (err) => {
        if(err) {
          console.log('Error insterting new user');
          if(err.name == 'UserExistsError') {
            req.flash('registerMessage', 'Registration Error: User Alresady Exists!');
          }
          return res.render('auth/register', {
            title: 'Register',
            contact: '',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
          });
        }
        // if registration is successful
        return passport.authenticate('local')(req, res, ()=>{
          res.redirect('/');
        });
      });
});

// GET /logout - logout the user and redirect to the home page
router.get('/logout', (req, res, next)=>{
  req.logout();
  res.redirect('/'); // redirect to homepage
});


module.exports = router;
