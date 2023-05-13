module.exports = {
	testEnvironment: "node",
	setupFilesAfterEnv: ["./jest.setup.js"],
	testPathIgnorePatterns: ["/node_modules/", "/utils/"],
};
