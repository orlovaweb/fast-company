module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ["plugin:react/recommended", "standard"],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["react"],
    rules: {
        indent: ["off", 4],
        semi: [2, "always"],
        "space-before-function-paren": [
            "error",
            { anonymous: "always", named: "never" }
        ],
        "multiline-ternary": ["off"],
        "object-shorthand": ["off"],
        quotes: ["error", "double", { allowTemplateLiterals: true }]
    }
};
