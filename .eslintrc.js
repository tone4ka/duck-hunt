module.exports = {
    env: {
        browser: true,
        es6: true,
        "jest/globals": true
    },
    extends: ["airbnb-base", "prettier"],
    parser: "babel-eslint",
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module"
    },
    rules: {
        "import/prefer-default-export": "off",
        "import/export": "off",
        "class-methods-use-this": "off",
        "no-unused-expressions": "off"
    },
    plugins: ["jest"]
};
