var express = require('express');
var router = express.Router();

/* gets all phrases in database */
router.get('/', function(req, res) {
	Phrase.getAll(function(phrases) {
		if(err) {
			res.status(err.statusCode).send(err);
			return;
		}
		if (req.body.numTimes) {
			Phrases.sortByDateCreated(phrases, function(sortedPhrases) {
				if(err) {
					res.status(err.statusCode).send(err);
					return;
				}
				res.status(200).send(sortedPhrases);
			});
		}
		else { //defaults sorted by date
			Phrases.sortByNumTimesUsed(phrases, function(sortedPhrases) {
				if(err) {
					res.status(err.statusCode).send(err);
					return;
				}
				res.status(200).send(sortedPhrases);
			});
		}
	});
});

/* get one phrase in database */
router.get('/:phraseId', function(req, res) {
	Phrase.getById(req.params.phraseId, function(err, phrase) {
		if (err) {
			res.status(err.statusCode).send(err);
			return;
		}
		res.status(200).send(phrase);
	})
});

/*create one phrase in database */
router.post('/:phraseId', function(req, res) {
	Phrase.createPhrase(req.body.text, 0, function(err, phrase) {
		if(err) {
			res.status(err.statusCode).send(err);
			return;
		}
		res.status(200).send(phrase);
	})

});

/* Delete a phrase in database */
router.delete('/:phraseId', function(req, res) {
	Phrase.deletePhrase(req.params.phraseId, req.user._id, function(err, phrase) {
		if(err) {
			res.status(err.statusCode).send(err);
			return;
		}
		res.status(200).send(phrase);
	})
});




module.exports = router;