# jest-file-snapshot

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![MIT License][license-badge]][license]
[![Version][version-badge]][package]

Jest matcher to write snapshots to a separate file instead of the default snapshot file used by Jest. Writing a snapshot to a separate file means you have proper syntax highlighting in the output file, and better readability without those pesky escape characters. It's also useful if you have binary content.

## Installation

```sh
npm install --save-dev jest-file-snapshot
```

or

```sh
yarn add --dev jest-file-snapshot
```

## Usage

Extend Jest's `expect`:

```js
import { toMatchFile } from 'jest-file-snapshot';

expect.extend({ toMatchFile });
```

Then use it in your tests:

```js
it('matches content of file on disk', () => {
  expect(content).toMatchFile();
});
```

The content passed can be of type `string` or a `Buffer`. The comparison be done using `Buffer.equals()` instead of `===` if a `Buffer` is passed.

The matcher takes two optional arguments:

- `filepath`: path to the file whose content should be matched, e.g. `expect(content).toMatchFile(path.join(__dirname, 'output.md'))`
- `options`: additional options object for the matcher, with following properties:
  - `diff`: options for [`jest-diff`](https://github.com/facebook/jest/tree/master/packages/jest-diff)

You should also [exclude the output files from Jest's watcher](https://jestjs.io/docs/en/configuration#watchpathignorepatterns-array-string) so that updating the snapshot doesn't re-run the tests again.

For example, by default `toMatchFile` uses a folder named `__file_snapshots__` which you can exclude by adding the following under the `jest` key in `package.json`:

```json
"watchPathIgnorePatterns": [
  "__file_snapshots__"
]
```

## Credits

- [jest-image-snapshot](https://github.com/americanexpress/jest-image-snapshot)

## Contributing

Make sure your code passes the unit tests, ESLint and TypeScript. Run the following to verify:

```sh
yarn test
yarn lint
yarn typescript
```

To fix formatting errors, run the following:

```sh
yarn lint -- --fix
```

<!-- badges -->

[build-badge]: https://img.shields.io/circleci/project/github/satya164/jest-file-snapshot/main.svg?style=flat-square
[build]: https://circleci.com/gh/satya164/jest-file-snapshot
[coverage-badge]: https://img.shields.io/codecov/c/github/satya164/jest-file-snapshot.svg?style=flat-square
[coverage]: https://codecov.io/github/satya164/jest-file-snapshot
[license-badge]: https://img.shields.io/npm/l/jest-file-snapshot.svg?style=flat-square
[license]: https://opensource.org/licenses/MIT
[version-badge]: https://img.shields.io/npm/v/jest-file-snapshot.svg?style=flat-square
[package]: https://www.npmjs.com/package/jest-file-snapshot
