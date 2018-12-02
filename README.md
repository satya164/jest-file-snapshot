# jest-file-snapshot

Jest matcher to write snapshots to a separate file instead of the default snapshot file used by Jest. Writing a snapshot to a separate file means you have proper syntax highlighting in the output file, and better readability without those pesky escape characters.

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
it("matches content of file on disk", () => {
  expect(content).toMatchFile();
});
```

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
