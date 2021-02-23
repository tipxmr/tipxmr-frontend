find ./src -name "*.js" -exec sh -c 'mv "$0" "${0%.js}.ts"' {} \;
find ./src/pages -name "*.ts" -exec sh -c 'mv "$0" "${0%.ts}.tsx"' {} \;