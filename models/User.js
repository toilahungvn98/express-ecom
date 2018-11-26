const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
	firstName : { type : String, required : true },
	lastName  : { type : String, required  : true },
	email     : { 
		type : String,
	    required  : true,
	    unique    : true,
	    lowercase : true
	},
	password  : {type : String, required : true},
	phone     : { type : String, required : true },
	address   : { type : String , required : true},
	zipcode   : { type : String, required : true },
	created   : { type : Date, default : Date.now }
});

UserSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName
});

UserSchema.virtual('userURL').get(function() {
	return '/users/detail' + this._id;
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
}

module.exports = mongoose.model('User',UserSchema);
