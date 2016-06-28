var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var KafeSchema = new Schema({
	nama_kafe: String,
	deskripsi: String,
	alamat: String,
	lat: String,
	lng: String,
	img: String,
	type: String
});

module.export = mongoose.model('Kafe', KafeSchema);