module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        },
    },
    settings: {
        'import/extensions': ['.js', '.jsx', '.tsx', '.ts'],
        'import/resolver': {
            'typescript': {}
        },
        react: {
            version: "detect"
        }

    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript"
    ],
    rules: {
        "react/prop-types": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        // "import/no-unresolved": 0,
        // "import/extensions": 0,
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'react/display-name': 'off',
        'jsx-a11y/alt-text': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        // Add any custom rules here
    }
};