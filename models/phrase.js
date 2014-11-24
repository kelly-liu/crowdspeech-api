var mongoose = require('mongoose');
var moment = require('moment');
var objectId = mongoose.Schema.Types.ObjectId;

var phraseSchema = mongoose.Schema({
	text: {type: String, required: true},
	dateCreated: {type: Date, default: moment()},
	numTimesUsed: {type: Number},
	author: {type: objectId, ref: 'User', required: true},
});

phraseSchema.method('createPhrase', function(text, dateCreated, numTimesUsed, author, callback) {
	var phrase = new Phrase ({
		text:text,
		dateCreated: dateCreated,
		numTimesUsed: numTimesUsed,
		author: author
	});

	phrase.save(function(err) {
		callback(err, phrase);
	});
});

phraseSchema.method('sortByDateCreated', function(phrases, callback) {
	if (phrases != null) {
		phrases.sort({dateCreated: -1});
		callback(phrases);
	}
	
});

phraseSchema.method('sortByNumTimesUsed', function(phrases, callback) {
	if (phrases != null) {
		phrases.sort({numTimesUsed: -1});
		callback(phrases);
	}
	
});

phraseSchema.method('deletePhrase', function(phraseId, author, callback) {
	Phrase.findOneAndRemove({_id: phraseId, author: author}, function(err, phrase) {
		callback(err, phrase);
	});
});

phraseSchema.method('getAll', function(callback) {
	Phrase.find({}, function(err, phrases) {
		callback(err, phrases);
	});
	
});

phraseSchema.method('getById', function(phraseId, callback) {
	Phrase.findById(phraseId, function(err, found) {
		callback(err, found)
	});

})
var Phrase = mongoose.model('Phrase', phraseSchema);

module.exports = Phrase;