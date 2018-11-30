const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
	category :  [{type: Schema.Types.ObjectId, ref: 'Category'}],
	name: {
		type: String, 
		required: true,
		unique : true,
		min: 3,
		max: 100
	},
	title : { type : String, required : true},
	image : { type : String, required : true },
	price : { type : Number, required : true},
	sale_price : { type : Number, required : true},
	brand : { type : String, required : true},
	size  :[{type:String}],
	color :[{type:String}],
	status: {
		type: String, 
		required: true, 
		enum: ['Available', 'Almost over', 'Sold', 'Hot'], 
		default: 'Available'},
    description : { type: String, required : true }



});


// Virtual for this genre instance URL.
ProductSchema
.virtual('url')
.get(function () {
	return '/shop/product/'+this._id;
});

// Export model.
module.exports = mongoose.model('Product', ProductSchema);