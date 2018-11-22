var express = require('express');
var router = express.Router();
var productCtrl = require('./../controller/productController');

/* GET home page. */
router.get('/*.:productId', productCtrl.product_detail);


module.exports = router;
 