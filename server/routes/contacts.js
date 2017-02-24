

var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// define the user model
let UserModel = require('../models/users');
let User = UserModel.User; // alias for User

// define the contact model
let contact = require('../models/contacts');

// function to check if the user is authenticated
function requireAuth(req, res, next) {
  // check if the user is logged index
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
}

router.get('/', requireAuth, (req, res, next) => {
  // find all contacts in the contacts collection
  contact.find( (err, contacts) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('contacts/view', {
        title: 'Business Contacts',
        contacts: contacts,
        displayName: req.user ? req.user.displayName : ''
      });
    }
  });

});


//  GET the contact Details page in order to add a new contact
router.get('/add', requireAuth, (req, res, next) => {
  res.render('contacts/details', {
    title: "Add a Contact",
    contacts: '',
    displayName: req.user ? req.user.displayName : ''
  });
});

// POST process the contact Details page and create a new contact - CREATE
router.post('/add', requireAuth, (req, res, next) => {

    let newContact = contact({
      "name": req.body.name,
      "number": req.body.number,
      "email": req.body.email
    });

    contact.create(newContact, (err, conatact) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        res.redirect('/contacts');
      }
    });
});

// GET the contact Details page in order to edit a new contact
router.get('/:id', requireAuth, (req, res, next) => {

    try {
      // get a reference to the id from the url
      let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);

        // find one contact by its id
      contact.findById(id, (err, contacts) => {
        if(err) {
          console.log(err);
          res.end(error);
        } else {
          // show the contact details view
          res.render('contacts/details', {
              title: 'Contact Details',
              contacts: contacts,
              displayName: req.user ? req.user.displayName : ''
          });
        }
      });
    } catch (err) {
      console.log(err);
      res.redirect('/errors/404');
    }

    // POST - process the information passed from the details form and update the document
router.post('/:id', requireAuth, (req, res, next) => {
  // get a reference to the id from the url
    let id = req.params.id;

     let updatedcontact = contact({
       "_id": id,
      "name": req.body.name,
      "number": req.body.number,
      "email": req.body.email
    });

    contact.update({_id: id}, updatedcontact, (err) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        // refresh the contact List
        res.redirect('/contacts');
      }
    });

});

// GET - process the delete by user id
router.get('/delete/:id', requireAuth, (req, res, next) => {
  // get a reference to the id from the url
    let id = req.params.id;

    contact.remove({_id: id}, (err) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        // refresh the contacts list
        res.redirect('/contacts');
      }
    });
});

});


module.exports = router;