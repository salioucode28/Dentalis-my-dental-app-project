import nextPlugin from "@next/eslint-plugin-next"

export default [
  {
    ignores: [".next/**", "node_modules/**"],
  },
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@next/next/no-html-link-for-pages": "off",
    },
  },
]
