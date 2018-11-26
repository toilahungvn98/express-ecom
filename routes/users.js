const express = require('express');
const router = express.Router();

const UserCtrl = require('../controller/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.redirect('/users/login');
})

router.get('/login', UserCtrl.get_login);

router.post('/login', UserCtrl.post_login);


router.get('/register', UserCtrl.get_register );

router.post('/register', UserCtrl.post_register );

//protected

router.get('/success' ,UserCtrl.success_register);

//logout

router.get('/logout', UserCtrl.logout );

//middleware 
// function verifyToken(req, res, next) {

// 	  	//Get auth header value
// 	const bearerHeader = req.headers['authorization'];
//      //check if bearer is undefined
     
//      if (typeof bearerHeader !== 'undefined') {
//          //split at the space
//          const bearer = bearerHeader.split(' ');
//          //Get token from array
//          const bearerToken = bearer[1];
//          //Set the token
         
//          req.cookies.atoken = bearerToken;
//          //Next middleware
//          console.log('middle :' + bearerHeader);

        
//          next();
      
//      } else {
//      	//Forbidden
//      	res.status(500).send({ error : 'not find token ' })
//       }

// }

module.exports = router;
