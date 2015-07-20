var express = require('express');
var router = express.Router();

// Members Page
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Members' });
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next(); // moves to the next piece of middleware
	}
	res.redirect('/users/login')
}


module.exports = router;
