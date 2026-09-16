import { defineConfig } from "eslint/config";
import next from "eslint-config-next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([{
    // meadows-web is a separate application with its own dependencies, its own
    // tsconfig and its own "@/*" root. Linting it from here resolves its
    // imports against this project and reports errors that do not exist.
    ignores: ["meadows-web/**"],
}, {
    extends: [...next],
}]);
