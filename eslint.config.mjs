import typescriptEslint from "@typescript-eslint/eslint-plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
    {
        plugins: {
            "@typescript-eslint": typescriptEslint,
        },
        rules: {
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@next/next/no-duplicate-head": "off", 
            "@typescript-eslint/no-unsafe-member-access": "off",
            '@typescript-eslint/no-empty-object-type': 'off',
            "@typescript-eslint/no-unsafe-return": "off",
            "@typescript-eslint/no-non-null-assertion": "off",
            "@typescript-eslint/no-var-requires": "off",
            '@typescript-eslint/no-require-imports': 'off', 
            '@typescript-eslint/no-unused-expressions': 'off',
            "@typescript-eslint/no-unsafe-function-type": "off",
            "@typescript-eslint/no-assign-module-variable":"off"
        },
        settings: {
            "import/resolver": {
                typescript: {
                    project: path.join(__dirname, "tsconfig.json"),
                },
            },
        },
        ignores: [
            'node_modules',
            'dist',
            '.next',
            '*.test.js',
            '*.spec.js',
          ],
    },
];

export default eslintConfig;