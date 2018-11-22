


exports.product_detail =  function(req, res, next) {
	var idSP = req.params.productId;
	if (!req.session.addToCart) {
		req.session.addToCart = [];
	}
	if (req.session.addToCart.indexOf(idSP) == -1) {
       req.session.addToCart.push(idSP);
	}
	
  res.render('product-detail.ejs', { title: 'product detail' , proId : req.params.productId });
}