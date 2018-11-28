const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/',function(req, res, next) {
	  res.render('index', { title: 'home' });
});
//shop
router.get('/shop.html', function(req, res, next) {
  res.render('shop', { title: 'shop' });
  console.log(req.session.id);
 
});

//gallery
router.get('/gallery.html', function(req, res, next) {
  res.render('gallery', { title: 'gallery' });
});

// about
router.get('/about.html', function(req, res, next) {
  res.render('about', { title: 'about' });

});

// contact
router.get('/contact.html', function(req, res, next) {
  res.render('contact', { title: 'contact' });
 
});


module.exports = router;
