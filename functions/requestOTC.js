const admin = require('firebase-admin');
const twilio = require('./twilio');

module.exports = (req, res) => {
	// Verify the user provided a phone
	if (!req.body.phone) {
		return res.status(422).send({ error: "Your must provide a phone number" });
	}

	// Format the phone number to remove dashes and parens
	const phone = String(req.body.phone).replace(/[^\d]/g, "");

	// Generate one time code, store into user object OR send error if user not found
	admin.auth().getUser(phone)
	.then(user => {
		const code = Math.floor((Math.random() * 8999 + 1000 ));
		twilio.messages.create({
			body: 'Your code is ' + code,
			to: phone,
			from: '+61731844428'
		}, (err) => {
			if (err) {
				return res.status(422).send({ error: err })
			} else {
				admin.database().ref('users/' + phone)
				.update({
					code: code,
					codeValid: true
				}, () => {
					res.send({success: true});
				});
			}
		})
		return
	})
	.catch(err => res.status(422).send({ error: err }));
}