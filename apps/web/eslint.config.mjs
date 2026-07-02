// @ts-check
import next from "eslint-config-next";
import prettier from "eslint-config-prettier";

/** @type {import("eslint").Linter.Config[]} */
const config = [{ ignores: [".next/**", "out/**", "node_modules/**"] }, ...next, prettier];

export default config;
