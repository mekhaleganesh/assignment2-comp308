var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',(req, res, next)=> {
  res.render('index', {   title: 'Home' });
});


/* GET about page. */
router.get('/about',(req, res, next)=> {
  res.render('about', {   title: 'Who Am i ?'});
});

/* GET project page. */
router.get('/projects',(req, res, next)=> {
  res.render('projects', {   title: 'My Projects'});
});

/* GET service page. */
router.get('/service',(req, res, next)=> {
  res.render('service', {   title: 'Services',});
});

/* GET contact page. */
router.get('/contact',(req, res, next)=> {
  res.render('contact', {  title: 'Contact Me'});
});



module.exports = router;
