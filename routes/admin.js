const express = require('express');

const router = express.Router();
const AdminCtrl = require('../controller/adminController');

router.get('/', AdminCtrl.getDashboardAD );

// Product
// view
router.get('/viewproduct', AdminCtrl.getViewProduct );

//create
router.get('/createpro', AdminCtrl.getCreatePro );

router.post('/createpro', AdminCtrl.postCreatePro );

//update
router.get('/updatepro', AdminCtrl.getUpdatePro );

router.post('/updatepro', AdminCtrl.postUpdatePro );

//delete 

router.get('/deletepro/:pId', AdminCtrl.getDeletePro);


//Category 
// view
router.get('/viewcategory', AdminCtrl.getViewCat );

//create

router.post('/viewcategory', AdminCtrl.postCreateCat );

//update
router.get('/updatecat/:pId', AdminCtrl.getUpdateCat );

router.post('/updatecat/:pId', AdminCtrl.postUpdateCat );

//delete 

router.get('/deletecat/:pId', AdminCtrl.getDeleteCat);





router.get('/upload', AdminCtrl.getUpload );


router.post('/upload', AdminCtrl.postUpload );

module.exports = router;