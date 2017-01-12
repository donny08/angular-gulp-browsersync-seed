var crypto = require('crypto');

module.exports = {

	encrypt: function (input) {
		var cipher = crypto.createCipher('aes-256-cbc','tiagoseed');
		var crypted = cipher.update(input,'utf8','hex');
		crypted += cipher.final('hex');
		
		return crypted;
	},

	decrypt: function (input) {
		var decipher = crypto.createDecipher('aes-256-cbc','tiagoseed'),
		dec = decipher.update(input,'hex','utf8');

		//check if it was able to decipher
		if(dec.length > 0) {
			dec += decipher.final('utf8');
			return dec;
		}
		return 0;
	}
};