module.exports = {
  preset: "ts-jest", // Ensure TypeScript is handled by ts-jest
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
