find ./src -name "*.jsx" -exec sh -c 'mv "$0" "${0%.jsx}.tsx"' {} \;
find ./src -name "*.js" -exec sh -c 'mv "$0" "${0%.js}.ts"' {} \;