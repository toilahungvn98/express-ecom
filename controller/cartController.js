

exports.load_cart = function(req, res, next) {

	res.render('cart', { title: 'cart', productcart : req.session.addToCart });

}