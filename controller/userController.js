//model

const User = require('../models/User');
//validation
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// hash password
const bcrypt = require('bcryptjs');

//token
const jwt = require('jsonwebtoken');
//===================================================================================
// get login

exports.get_login = (req, res, next) => {

	res.render('login', { title : 'login'});

}
//post login
exports.post_login = [

body('email').trim().not().isEmpty().withMessage('Email is Required')
.isEmail().withMessage('Email Invalid!!'),
body('password').trim().not().isEmpty().withMessage('Password is required'),

sanitizeBody('password').trim().escape(),

(req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		res.render('login', { title : 'login', error : errors.array(), user : req.body });
		return;
	} else {

		User.findOne({ email : req.body.email }).exec()
		.then( user => {
			if (!user) {
				res.redirect('/users/login');
				return;
			}

			user.comparePassword(req.body.password, function(err, isMatch) {
				if (err) {
					next(err);
				}
				if (isMatch === false) {
					res.render('login', { title : 'login', error : [{msg: 'Password incorrect!'}] ,user : req.body });
					return;
				}
                 //token
                 const userTK = jwt.sign({
                 	id : user._id
                 }, 'secret_user', { expiresIn : '5h'});

                 res.cookie('userId', userTK, { maxAge : 18000000, httpOnly : true});
                 res.redirect('/users/success');
             });

		})
		.catch( err => next(err));
		
	}
}

];
//post login
 // .custom( email => {
 //         User.findOne({ email : email }).exec( pass => {
 //         	bcrypt.compare(req.body.Upassword, pass.password, (err, result) => {
 //                 if (err) {
 //                 	return true;
 //                 } else {
 //                 	return false;
 //                 }
 //         	});
 //           });
 //   } ).withMessage('Password or email is incorrect!!'),

// exports.post_login = [

//    body('email').trim().not().isEmpty().withMessage('Email is Required')
//    .isEmail().withMessage('Email Invalid!!'),
//    body('password').trim().not().isEmpty().withMessage('Password is required'),

//    sanitizeBody('password').trim().escape(),

//    (req, res, next) => {
//    	const errors = validationResult(req);

//      if (!errors.isEmpty()) {
//      	res.render('login', { title : 'login', error : errors.array(), user : req.body });
//      	return;
//      }
//       else {
//         User.findOne({ email : req.body.email }).exec()
//            .then( user => {
//            	if (!user) {
//            	res.render('login', { title : 'login', error : [{msg : 'Email does not exist!'}], user : req.body });   
//            	}
//            console.log(user._id);
//         	bcrypt.compare(req.body.password, user.password, (err, user) => {
//         		if (err) {
//         		 console.log(err);
//         		 return;
//            		}
//            		if (user) {
//                    const userTK = jwt.sign({
//                    	id : ''
//                    }, 'secret_user', { expiresIn : '5h'});

//                    res.json({user , token : userTK});
//                     // res.cookie('user_tk' ,userTK , { httpOnly : true });//5hour
//                     // res.redirect('/users/success');
//            		}
//            		res.render('login', { title : 'login', error : [{msg : 'Password incorrect!'}], user : req.body });    
//           	});
//         })
//         .catch( err => console.log(err));


//       }

//  }


// ];


// exports.post_login = (req, res, next) => {

//  User.findOne({ email : req.body.email })
//  .then( user => {
//  	if (!user) {
//  		res.redirect('/users/login');
//  		return;
//  	}
//  	const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
//  	if (!passwordIsValid) {
//  		return res.status(401).send({ auth : false, token : null});
//  	}
//     else {
//     	const mtoken = jwt.sign({ id : user._id }, 'secret_user', { expiresIn : '5h'});
//     	res.cookie('mtoken' ,mtoken , { maxAge : 18000000 ,httpOnly : true });
//         res.redirect('/users/success');      	// res.status(200).send({ auth : true, token : mtoken });
//     }

//  }).catch( err => next(err) );

// }



//get register

exports.get_register =  function(req, res, next) {

	res.render('register', { title : 'register' });
}
//post register
exports.post_register = [
body('firstName').trim().isLength({ min: 2 }).withMessage('First name characters must be more than 3.'),
body('lastName').trim().isLength({ min: 2 }).withMessage('Last name characters must be more than 3.'),
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
              	//dang ky thanh cong cap cho token
              	const JWToken = jwt.sign({ id : user._id }, 'secret_user', {
              		expiresIn : '5h' // co han trong 5hour
              	});
                res.cookie('atoken' ,JWToken , { maxAge : 18000000 ,httpOnly : true });//5hour
                res.redirect('/users/success');

                // res.redirect('/users');
                 // res.json({ user, token : JWToken})
             })
              .catch( err => next(err) )

          }
      }) //save user vua create vao database, tao cookie chua token

     }

 }

 ];



//protected phai co token moi hien thi info user
exports.success_register = (req, res, next) => {
      //lay cookie chua token vua tao user
      const registerCookie = req.cookies.atoken;
      const loginCookie  = req.cookies.userId;
      // console.log(getCookie);
      if(registerCookie !== undefined) {
      	jwt.verify(registerCookie, 'secret_user', (err, decoded) => {

      		if ( err ) {
      			res.status(500).send({ err });
      			return;
      		}
 		// res.status(200).send(decoded);

 		User.findById(decoded.id, { password : 0 })
 		.then( user => {

 			if (!user) {
 				// res.redirect('/users/login');
 				res.status(500).send('ko the truy cap');
 				return;
 			}
 			res.status(200).send(user);
 			return;
 		})
 		.catch(err => console.log(err));

 	});

      }
      else if (loginCookie !== undefined) {
      	jwt.verify(loginCookie, 'secret_user', (err, decoded) => {
      		if ( err ) {
      			res.status(500).send({ err })
      			return;
      		}
 		// res.status(200).send(decoded);

 		User.findById(decoded.id, { password : 0 })
 		.then( user => {

 			if (!user) {
 				// res.redirect('/users/login');
 				res.status(500).send('ko the truy cap');
 				return;
 			}
 			res.status(200).send(user);
 			return;
 		})
 		.catch(err => console.log(err));

 	});


    } else {
    	res.redirect('/users/login');
    }

      

  }


  exports.logout = (req, res, next ) => {
  	res.clearCookie('atoken');
	res.clearCookie('userId');

	res.redirect('/');
}























