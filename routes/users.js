const express = require('express');
const router = express.Router();

const UserCtrl = require('../controller/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.redirect('/users/login');
})

router.get('/login', function(req, res, next) {
  res.render('login', { title : 'login'});
});



router.get('/register', UserCtrl.get_register );

router.post('/register', UserCtrl.post_register );

router.get('/success', UserCtrl.success_register);


module.exports = router;
