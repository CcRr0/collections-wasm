#!/bin/zsh

LIB_NAME=$(grep -m 1 '^name' Cargo.toml | sed 's/name = "//;s/"//')

rm -rf pkg/*
wasm-pack build --out-dir pkg --out-name ${LIB_NAME} --target nodejs --no-pack --release
cat <<EOF > pkg/package.json
{
    "private": true,
    "main": "${LIB_NAME}.js",
    "types": "${LIB_NAME}.d.ts"
}
EOF
node ../../../../wasm-bundle.js pkg
rm pkg/.gitignore
rm pkg/${LIB_NAME}_bg.wasm
rm pkg/${LIB_NAME}_bg.wasm.d.ts
