const twilio = require('twilio');
// phone number: +61731844428

const accountSid = 'ACab22854952be1438cf02aa4b1e9a4d3e';
const authToken = 'e4a0f733d3676019ec462271cf8ed9a1';

module.exports = new twilio.Twilio(accountSid, authToken);