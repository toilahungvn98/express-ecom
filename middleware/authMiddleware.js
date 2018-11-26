//model
const User = require('../models/User');


exports.checkCookie = (req, res, next) => {
console.log(req.cookies.userId);
 if(!req.cookies.userId) {
     res.redirect('/users/login');
     return;
 }
User.findById(req.cookies.userId, { password : 0 })
 		.then( user => {

 			if (!user) {
 				// res.redirect('/users/login');
 				res.redirect('/users/login');
 				return;
  			}
         console.log(user);
  			
  		})
 		.catch(err => console.log(err));
 next();
}