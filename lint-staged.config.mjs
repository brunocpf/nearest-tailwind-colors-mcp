/**
 * @type {Record<string, (filenames: string[]) => string[]>}
 */
export const config = {
  "*.(ts|tsx)": () => "npm run check-types",
  "*.(ts|tsx|js)": (filenames) => [
    `npx eslint --fix --max-warnings 0 --no-warn-ignored ${filenames.join(" ")}`,
    `npx prettier --write ${filenames.join(" ")}`,
  ],
};
