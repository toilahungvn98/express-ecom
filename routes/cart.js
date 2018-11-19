var express = require('express');
var router = express.Router();

/* GET cart page. */
router.get('/', function(req, res, next) {
  res.render('cart', { title: 'cart' });
});

router.get('/add/:pId', function(req, res, next) {
	res.send('product id :' + req.params.pId);
});

router.get('/checkout.html',function(req, res, next) {
	res.render('checkout',{ title : 'Checkout'});
});

// router.post('/checkout/', controller.delete);


module.exports = router;
