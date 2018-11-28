const express = require('express');
const router = express.Router();
const cartCtrl = require('./../controller/cartController');
const authMiddleware = require('./../middleware/authMiddleware');

/* GET cart page. */
router.get('/', cartCtrl.load_cart);


router.get('/add/:pId', cartCtrl.add_to_cart);


router.get('/checkout.html', authMiddleware.checkCookie , cartCtrl.check_out );


router.get('/update/:pId', cartCtrl.update_cart);



router.get('/abc', function(req, res, next) {

	req.session.destroy(function(err) {
		console.log(err);
	});
	res.redirect('/cart/checkout.html');
})

// router.post('/checkout/', controller.delete);


module.exports = router;
