var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register', {
  	'title': 'Register'
  }); // name of jade file
});

router.get('/login', function(req, res, next) {
  res.render('login', {
  	'title': 'Login'
  }); // name of jade file
});

router.post('/register', function(req, res, next){
	//Get Form Values
	var name = req.body.name; //comes from the name attribute of the input
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

		// Check for Image Field
	if(req.files.profileimage){
		console.log('Uploading File...');
		// File info
		var profileImageOriginalName = req.files.profileimage.originalName;
		var profileImageName = req.files.profileimage.name;
		var profileImageMime = req.files.profileimage.mimetype;
		var profileImagePath = req.files.profileimage.path;
		var profileImageExt = req.files.profileimage.extension;
		var profileimageSize = req.files.profileimage.size;
	} else {
		// set a default image for when user does not choose name
		var profileImageName = 'noimage.png';
	}

	// Form Validation
	req.checkBody('name', 'Name field is required').notEmpty(); // makes sure that the name is there
	req.checkBody('email', 'Email field is required').notEmpty();
	req.checkBody('email', 'Email not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	// Checks for errors
	var errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors: errors,
			name: name,
			email: email,
			username: username,
			password: password,
			password2: password2
		});
	} else {
		// we have NOT made a model to capture use functions
		var newUser = new User({
			name: name,
			email: email,
			username: username,
			password: password,
			profileimage: profileImageName
		});

		// create user
		// User.createUser(newUser, function(err, user){
		// 	if (err) throw err;
		// 	console.log(user);
		// });

		// Success Flash Message
		req.flash('success', 'You are new registered and may log in');

		res.location('/');
		res.redirect('/');
	}
});

module.exports = router;
