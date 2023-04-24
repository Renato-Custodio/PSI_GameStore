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

export { hashPassword, checkPassword, validatePassword };
