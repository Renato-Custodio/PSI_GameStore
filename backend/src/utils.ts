import bcrypt from "bcrypt";

async function hashPassword(password: string): Promise<string> {
	// should be used in the register route to hash the password
	const saltRounds = 10;
	const salt = await bcrypt.genSalt(saltRounds);
	const hashedPassword = await bcrypt.hash(password, salt);
	return hashedPassword;
}

function checkPassword( // should be used in the login route to check if the password is correct
	password: string,
	passwordHash: string
): Promise<boolean> {
	return bcrypt.compare(password, passwordHash);
}

function validatePassword(password: string): boolean {
	// should be used in the register route to check if the password is valid
	const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
	return regex.test(password);
}

function validateUsername(username: string): boolean {
	// should be used in the register route to check if the username is valid
	const regex = /^[a-zA-Z0-9]{3,20}$/;
	return regex.test(username);
}

function validateCardChecksum(cardNumber: string): boolean {
	// Remove any non-digit characters from the card number
	const cleanedNumber = cardNumber.replace(/\D/g, "");

	// Convert the card number to an array of digits
	const digits = Array.from(cleanedNumber, Number);

	// Double every other digit, starting from the second-to-last digit
	for (let i = digits.length - 2; i >= 0; i -= 2) {
		let doubled = digits[i] * 2;

		// If the doubled digit is greater than 9, subtract 9 from it
		if (doubled > 9) {
			doubled -= 9;
		}

		digits[i] = doubled;
	}

	// Sum all the digits
	const sum = digits.reduce((acc, digit) => acc + digit, 0);

	// Check if the sum is divisible by 10
	return sum % 10 === 0;
}

export { hashPassword, checkPassword, validatePassword, validateUsername, validateCardChecksum };
