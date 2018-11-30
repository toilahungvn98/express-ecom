//model
const Category  = require('../models/Category');

//validation
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


exports.getDashboardAD = (req, res, next) => {
	res.render('admin/dashboard',{ title : 'Dashboard'});
}

//============PRODUCT

//view 

exports.getViewProduct = (req, res, next) => {

	res.render('admin/product', {title: 'Product'});
}

//create 
exports.getCreatePro = (req, res, next) => {
	res.send('GET: CREATE Product');
}

exports.postCreatePro = (req, res, next) => {
	res.send('POST: CREATE Product');
}

//update
exports.getUpdatePro = (req, res, next) => {
	res.send('GET : UPDATE Product');
}


exports.postUpdatePro = (req, res, next) => {
	res.send('POST : UPDATE Product');
}

//delete
exports.getDeletePro = (req, res, next) => {
	res.send('DELETE : ' + req.params.pId);
}




//============CATEGORY


//view 

exports.getViewCat = (req, res, next) => {
	const ifSuccess = req.signedCookies.success;
	const ifErrors = req.signedCookies.errName;
	const ifdelSS = req.signedCookies.deleteSS;
 
	Category.find()
	.exec((err, list_cate) => {
		if (err) { return next(err);}

		res.render('admin/category', { 
			categorys : list_cate,
			title : 'category',
			success : ifSuccess, 
			errName : ifErrors,
			delSS   : ifdelSS


		});

	});
	


}

//create 

exports.postCreateCat = [
body('category').trim().not().isEmpty().withMessage('Add name please!!')
.isLength({ min : 3, max : 100 }).withMessage('Length must be greater than 3 and less than 100'),

sanitizeBody('category').trim(),

(req, res, next) => {
	const errors = validationResult(req);
	const ifSuccess = req.signedCookies.success;
	const ifErrors = req.signedCookies.errName;

	const CategoryName = new Category({
		name : req.body.category
	})

	if (!errors.isEmpty()) {

		Category.find()
		.exec((err, list_cate) => {
			if (err) { return next(err);}

			res.render('admin/category', { title : 'category' , error : errors.array(), values : req.body,categorys : list_cate, success : ifSuccess, errName : ifErrors});
			return;
		});
		
	} else {
    		//CHeck name already exists
    		
    		Category.findOne({ name : req.body.category })
    		.exec( (err, already_exists ) => {
    			if (err) {return next(err); }

    			if (already_exists) {
    				res.cookie('errName','Category already exists!!',{ maxAge : 1000 , signed: true, httpOnly : true });
    				res.redirect('/admin/viewcategory');
    			} else {
    				//save to db
    				CategoryName.save( err => {

    					if (err) { return next(err); }

    					//Genre saved. Redirect to genre detail page.
    					res.cookie('success','Add category successfully!', { maxAge : 1000 , signed: true, httpOnly : true });
    					res.redirect('/admin/viewcategory');
    				});
    			}
    		})

    	}
    }
    ];
//update
exports.getUpdateCat = (req, res, next) => {
    const isUpdated = req.signedCookies.updateSS;
	Category.findById(req.params.pId, function(err, cate) {
		if (err) { return next(err);}

		if (cate == null) {
			res.redirect('/admin/viewcategory');
			return next(err); 
		}
		res.render('admin/updatecat', { 
			title : 'Update Category',
		    category : cate, 
		    updated : isUpdated
		 });
	});

}


exports.postUpdateCat = [

body('updatecat').trim().not().isEmpty().withMessage('Add name please!!')
.isLength({ min : 3, max : 100 }).withMessage('Length must be greater than 3 and less than 100'),

sanitizeBody('updatecat').trim(),

(req, res, next) => {
	const errors = validationResult(req);
	const updateCat = new Category({
		name : req.body.updatecat,
		_id  : req.params.pId
	});
    
    if (!errors.isEmpty()) {

    	res.render('admin/updatecat', { 
    		title : 'Update Category', 
    		category : updateCat,
    	    error : errors.array() 
    	});
     }
    else {
    	Category.findByIdAndUpdate(req.params.pId, updateCat,{}, function(err, cate) {
             if (err) { return next(err); }

             res.cookie('updateSS','Category Updated successfully!', { maxAge : 1000 , signed: true, httpOnly : true });
             res.redirect('/admin/updatecat/'+ cate._id);

       	});
    }

}

];

//delete
exports.getDeleteCat = (req, res, next) => {
	
	Category.findByIdAndRemove(req.params.pId, function(err, ss) {
		if (err) { return next(err); }
		res.cookie('deleteSS','Delete category successfully!', { maxAge : 1000 , signed: true, httpOnly : true });
		res.redirect('/admin/viewcategory');
		return;
	} );

}





//uploadFile
exports.getUpload = (req, res , next) => {
	res.render('admin/upload', { title : 'ADmin'});
}



exports.postUpload = (req, res , next) => {
	res.send('POST FILE');
}