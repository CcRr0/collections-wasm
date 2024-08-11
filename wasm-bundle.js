const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const dir = args[0];

const packageJson = JSON.parse(fs.readFileSync(path.join(dir, "package.json")).toString());
const entryPath = path.join(dir, packageJson.main);

let entry = fs.readFileSync(entryPath).toString();
const wasmPath = path.join(dir, entry.match(/'([^']+\.wasm)'/)[1]);
const wasmBase64 = fs.readFileSync(wasmPath, "base64");

entry = entry.replace("const path", "// const path");
entry = entry.replace(/const bytes\s*=\s*([^;]+);/, `const bytes = Buffer.from('${wasmBase64}', 'base64');`);
fs.writeFileSync(entryPath, entry);
