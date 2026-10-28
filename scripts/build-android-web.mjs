import { cp, mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const webDirectory = join(projectRoot, "www");
const webFiles = [
  "index.html",
  "reset-password.html",
  "styles.css",
  "app.js",
  "auth.js",
  "firebase.js",
  "firebase-config.js"
];
const webFolders = ["assets", "sections"];

await rm(webDirectory, { recursive: true, force: true });
await mkdir(webDirectory, { recursive: true });

for (const file of webFiles) {
  await cp(join(projectRoot, file), join(webDirectory, file));
}

for (const folder of webFolders) {
  await cp(join(projectRoot, folder), join(webDirectory, folder), { recursive: true });
}

console.log("Android web bundle created in www/");
