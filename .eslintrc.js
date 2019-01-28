module.exports = {
    "extends": ["airbnb-base", "plugin:node/recommended"],
    "rules": {
        "import/no-extraneous-dependencies": ["error", {
            "devDependencies": ['**/__tests__/*.js', 'helpers/test-helpers.js']
        }],
        "node/no-unpublished-require": "off"
    },
    "plugins": ["jest"],
    "env": {
        "jest/globals": true
    }
};