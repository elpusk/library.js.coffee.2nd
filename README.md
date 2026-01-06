# library.js.coffee.2nd
javascript library for coffee manager 2nd

# tools
- [node.js](https://nodejs.org/)

- tsc
  + all project installation : 
  ```
  npm install -g typescript
  tsc -v
  ```

  + local project installation : 
  ```
  npm install --save-dev typescript
  npx tsc -v
  ```
  + create tsconfig.json : `npx tsc --init`


# build
- debug : `npm run build`  
  + CommonJS directory : `./dist/cjs/`
  + ECMASCript Module : `./dist/esm/`
  
- release : `npm run release`
  + CommonJS directory : `./release/cjs/`
  + ECMASCript Module : `./release/esm/`
