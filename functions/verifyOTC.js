const admin = require('firebase-admin');

module.exports = (req, res) => {
	// Verify the user provided a phone
	if (!req.body.phone || ! req.body.code) {
		return res.status(422).send({ error: "Your must provide a phone number and code" });
	}

	// Format the phone number to remove dashes and parens
	// Format code into integer
	const phone = String(req.body.phone).replace(/[^\d]/g, "");
	const code = parseInt(req.body.code);

	// Compare user entered code with code in db
	admin().auth().getUser(phone)
	.then(user => {
		const ref = admin().database().ref('users/' + user.uid);
		ref.on('value', snapshot => {
			// Stops the listener
			ref.off();

			const user = snapshot.val();
			if (user.code !== code || !user.codeValid) {
				return res.status(422).send({ error: 'Code not valid' });
			}

			ref.update({
				codeValid: false
			});

			admin.auth().createCustomToken(user.uid)
			.then(token => res.send({token: token}))
			.catch(err => {
				return res.status(422).send({ error: err });
			});
		})

		return
	})
	.catch(err => {
		return res.status(422).send({ error: err });
	});
}