# SHOPX API

This project was created with
[NodeJS](https://nodejs.org/en/), [TypeScript](https://www.typescriptlang.org/) and
[CouchBase](https://www.couchbase.com/)

## Installation

Run `npm install` to install all the dependencies. It will create a `node_modules` folder.

## Production server

Run `npm run start` for a production server. Server Will start at `http://localhost:3000/`

## Development server

Run `npm run dev` for a dev server. Server Will start at `http://localhost:3000/`
The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.
It complies all the `typescript` files into `javascript`.

## Code Formatter

Run `npm run lint:ci` to format the project. It will fix all the syntax and code format all over the folders.

## Code Lint Fixer

Run `npm run lint-fix` to lint the project. It will fix all the errors and code format all over the folders.
It will throw error if you have not followed the rules defined in `tslint`.

## Visual Studio Code Recommended Plugin

- TSLint (<https://github.com/Microsoft/vscode-typescript-tslint-plugin)>
- vscode-icons (<https://github.com/vscode-icons/vscode-icons)>
- prettier (<https://github.com/prettier/prettier-vscode)>
- bracket pair colorizer (<https://github.com/CoenraadS/BracketPair)>
- styleline (<https://github.com/shinnn/vscode-stylelint)>
