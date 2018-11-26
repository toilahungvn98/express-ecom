const express = require('express');
const router = express.Router();
const cartCtrl = require('./../controller/cartController');
const authMiddleware = require('./../middleware/authMiddleware');
/* GET cart page. */
router.get('/', cartCtrl.load_cart);


router.get('/add/:pId', function(req, res, next) {
	res.send('product id :' + req.params.pId);
});


router.get('/checkout.html', authMiddleware.checkCookie ,function(req, res, next) {
	res.render('checkout',{ title : 'Checkout'});
});

router.get('/abc', function(req, res, next) {
	req.session.destroy(function(err) {
		console.log(err);
	})
	res.send('delete successs');
})

// router.post('/checkout/', controller.delete);


module.exports = router;
