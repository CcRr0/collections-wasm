#!/bin/zsh

OUT_DIR="pkg"
LIB_NAME="fast_io_lib"

rm -rf ${OUT_DIR}/*
wasm-pack build --out-dir ${OUT_DIR} --out-name ${LIB_NAME} --target nodejs --no-pack --release
cat <<EOF > ${OUT_DIR}/package.json
{
    "private": true,
    "main": "${LIB_NAME}.js",
    "types": "${LIB_NAME}.d.ts"
}
EOF
node wasm-bundle.js ${OUT_DIR}
rm ${OUT_DIR}/.gitignore
rm ${OUT_DIR}/${LIB_NAME}_bg.wasm
rm ${OUT_DIR}/${LIB_NAME}_bg.wasm.d.ts
