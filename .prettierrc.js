module.exports = {
  bracketSpacing: true,
  singleQuote: true,
  trailingComma: "all",
  parser: "typescript",
  printWidth: 80,
  overrides: [
    {
      files: ["app/router.ts"],
      options: {
        printWidth: 200,
      },
    },
  ],
};
