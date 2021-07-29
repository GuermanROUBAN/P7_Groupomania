// Plugin password-validator permet de controler graca au passwordSchema les caracteres requis pour le mot de passe
const passwordValidator = require('password-validator');

// Create a schema
const passwordSchema = new passwordValidator();

// Add properties to it
passwordSchema
	.is().min(8)                                    // Minimum length 8
	.is().max(255)                                  // Maximum length 100
	.has().uppercase(1)                              // Must have uppercase letters
	.has().lowercase()                              // Must have lowercase letters
	.has().digits(2)                                // Must have at least 2 digits
	.has().not().spaces()                           // Should not have spaces
	.is().not().oneOf(['Passw0rd', 'Password123']) // Blacklist these values

// Exports
module.exports = passwordSchema;
