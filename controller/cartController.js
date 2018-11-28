
const rawdb = require('./../models/database.json');

// console.log(rawdb);

exports.load_cart = function(req, res, next) {

	res.render('cart', { title: 'cart'});

}

exports.add_to_cart = function(req, res, next) {
     // console.log(req.session.id);
     const pId = req.params.pId;

     const sessionId = req.session.id;
     rawdb.product.forEach(function(val) {


     	if( pId == val.id) {
     		if (typeof req.session.cart == 'undefined') {
     			req.session.cart = [];
     			req.session.cart.push({
     				id   : val.id,
     				title: val.title,
     				name : val.name,
     				qty  : 1,
     				price: parseFloat(val.price).toFixed(2),
     				image: val.imgUrl
     			});
     		} 
     		else {

     			//update qty
     			const cart = req.session.cart;
     			var newItem = true;

     			for (let i = 0; i < cart.length; i++) {
     				if (cart[i].id == pId ) {
     					cart[i].qty++;
     					newItem = false;
     					break;
     				}
     			}

     			if (newItem) {
     				cart.push({
     					id   : val.id,
     					title: val.title,
     					name : val.name,
     					qty  : 1,
     					price: parseFloat(val.price).toFixed(2),
     					image: val.imgUrl
     				});	
                }//newItem


            }       
        }

    });
     
     res.redirect('/shop.html');
 };


 exports.update_cart = function(req, res, next) {
 	const pId = req.params.pId;
 	const cart = req.session.cart;
 	const action = req.query.action;

 	for (let i = 0; i < cart.length; i++ ){
 		if (cart[i].id == pId) {
 			switch (action) {
 				case "up":
 				cart[i].qty++;
 				break;
 				case "down":
 				cart[i].qty--;
 				if (cart[i].qty < 1) {
 					cart[i].qty = 1;
 				}
 				break;
 				case "delete":
 				cart.splice(i, 1);
 				if (cart.length == 0) {
 					delete req.session.cart;
 				}
 				break;

 				default:
 				return;
 				break;
 			}

 			res.redirect('/cart');

 			return;
 		}
 	}

 }




 exports.check_out = function(req, res, next) {
 	res.render('checkout',{ title : 'Checkout'});
 }