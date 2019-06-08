const functions = require('firebase-functions');
const admin = require('firebase-admin');
const createUser = require('./createUser');
const requestOTC = require('./requestOTC');
//const verifyPassword = require('./verifyPassword');

//allows us to get direct access to firebase database
admin.initializeApp(functions.config().firebase);

exports.createUser = functions.https.onRequest((req, res) => {
	createUser(req, res);
});
exports.requestOTC = functions.https.onRequest((req, res) => {
	requestOTC(req, res);
});
//exports.verifyPassword;
