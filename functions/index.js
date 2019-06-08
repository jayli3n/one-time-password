const functions = require('firebase-functions');
const admin = require('firebase-admin');
const createUser = require('./createUser');
// const createPassword = require('./createPassword');
// const verifyPassword = require('./verifyPassword');

//allows us to get direct access to firebase database
admin.initializeApp(functions.config().firebase);

exports.createUser = functions.https.onRequest((req, res) => {
	createUser(req, res);
});
// exports.createPassword;
// exports.verifyPassword;
