#!/bin/zsh

rm -rf dist/*
mkdir -p dist/lib
cp -r src/lib/pkg dist/lib
tsc
