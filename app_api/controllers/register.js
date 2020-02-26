 const db = require('../models/db');

module.exports.enumRegister = function (req, res) {
	var email = req.query.username
	var password = req.query.password
	var confirmPass= req.query.confirmPass
	
	req.checkQuery('username', 'Email is required').notEmpty();
	req.checkQuery('username', 'That is not a proper email').isEmail();
	req.checkQuery('password', 'Password is required').notEmpty(); 
	req.checkQuery('confirmPass', 'Confirm password is required').notEmpty(); 

	// Get Errors
	req.getValidationResult().then(function(result){
		if (!result.isEmpty()) {
			var errors = result.array().map(function (elem) {
				return elem.msg;
			});
			console.log('Validation Errors: ' + errors.join(' , '));
			req.flash('errors', errors.join(' , '));  
			res.render('register', {messages: req.flash('errors')});
		}
	else {
		
	console.log(`Email: ${email}`);
	console.log(`Password: ${password}`);
	console.log(`Password Confirmation: ${confirmPass}`);
  
	if (password != confirmPass) {	
	  //Passwords do not match 
	  req.flash('danger', "Passwords do not match");
	  console.log("Passwords dont match"); 
	  res.render('register', {messages: req.flash('danger')});
	}
	else if (email) {
		db.client.query(`SELECT * FROM users WHERE email='${email}'`, (err, result, rows)=>{
		if (result.rows.length === 0) {
			// OK to add User, email not found in db
			db.client.query(`INSERT INTO users (email,password) VALUES ('${email}','${password}')`,(err,result,rows) =>{
				console.log(result.rows) ; 
				if (err) {
					console.log("INSERT ERROR"); 
					console.log("Postgres Error:", err);
					res.redirect('back');			
				} 
				else if  (res !== undefined) {
					req.flash('success', 'You are now Registered!');
					console.log("Response:" ,result) ; 
					console.log("Registered!");
					res.render('login', {messages: req.flash('success')});
				}
			});
		}
		else {
		  // Email already exists in the db
		  req.flash('danger', "This email is already registered");
		  console.log("email already exists"); 
		  res.render('register', {messages: req.flash('danger')});
		}
		});
	}
	else {
		res.redirect('back')
	}
	}
});
};
