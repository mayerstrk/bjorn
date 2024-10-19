function softAssert(check: unknown, errorMessage: string) {
	if (!check) {
		console.error(errorMessage);
		return false;
	}
	return true;
}

export { softAssert };
