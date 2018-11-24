//model

const User = require('../models/User');
//validation
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// hash password
const bcrypt = require('bcryptjs');


exports.get_register =  function(req, res, next) {

	res.render('register', { title : 'register' });
}

exports.post_register = [
body('firstName').trim().isLength({ min: 3 }).withMessage('First name characters must be more than 3.'),
body('lastName').trim().isLength({ min: 3 }).withMessage('Last name characters must be more than 3.'),
body('email').trim().isEmail().withMessage('Email Invalid !!!'),
body('phone').isLength({ min : 9 , max : 11 }).withMessage('Number phone Invalid!!'),
body('address').not().isEmpty().withMessage('Address is required'),
body('zipcode').trim().isLength({ min : 5 }).withMessage('Zipcode characters must be more than 5.'),
body('password').isLength({ min : 8 }).withMessage('Password characters must be more than 8')
.custom((value,{req, loc, path }) => {
	if (value !== req.body.Repassword) {
		throw new Error("Password dont' match ");
	}
	return value;
}),

 // sanitize fields
 sanitizeBody('firstName').trim().escape(),
 sanitizeBody('lastName').trim().escape(),
 sanitizeBody('zipcode').trim().escape(),
 sanitizeBody('password').trim().escape(),



 (req, res, next) => {


 	const errors = validationResult(req);

     // console.log(errors.array());

     if (!errors.isEmpty()) {

     	res.render('register', { title : 'register', error : errors.array(), user : req.body });
     	return;
     }
     else {

     	bcrypt.hash(req.body.password, 10, (err, hash) => {
     		if (err) {
     			console.log(err);
     			return;
     		} 
     		else {
              // is valid
              const user = new User({
              	firstName : req.body.firstName,
              	lastName  : req.body.lastName,
              	email     : req.body.email,
              	password  : hash,
              	phone     : req.body.phone,
              	address   : req.body.address,
              	zipcode   : req.body.zipcode
              });

              user.save()
              .then( user => {
              	console.log(user);
                res.redirect('/users');

              })
              .catch( err => next(err) )

          }
      }) //hash

    }
    
 }

 ];

 exports.success_register = function(req, res, next) {
 	res.json({ text : 'Success'})  
 }