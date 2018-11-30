const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
    	type: String, 
    	required: true,
    	unique : true,
    	lowercase : true,
        min: 3,
        max: 100
    }
});

// Export model.
module.exports = mongoose.model('Category', CategorySchema);