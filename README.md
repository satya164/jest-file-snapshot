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
  expect(content).toMatchFile(filepath);
});
```

The matcher takes one argument, which is the path to the file whose content should be matched.

You should also [exclude the output files from Jest's wacher](https://jestjs.io/docs/en/configuration#watchpathignorepatterns-array-string) so that updating the snapshot doesn't re-run the tests again.

## Credits

- [jest-image-snapshot](https://github.com/americanexpress/jest-image-snapshot)
