var express = require('express');
var router = express.Router();
var cartCtrl = require('./../controller/cartController');
/* GET cart page. */
router.get('/', cartCtrl.load_cart);

router.get('/add/:pId', function(req, res, next) {
	res.send('product id :' + req.params.pId);
});

router.get('/checkout.html',function(req, res, next) {
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
