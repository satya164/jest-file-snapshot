# jest-file-snapshot

Jest matcher to write snapshots to a separate file instead of the default snapshot file used by Jest. Writing a snapshot to a separate file means you have proper syntax highlighting in the output file, and you don't have those pesky escape charcaters.

## Installation

```sh
npm install jest-file-snapshot
```

or

```sh
yarn add jest-file-snapshot
```

## Usage

Extend Jest's `expect`:

```js
import { toMatchFile } from 'jest-file-snapshot';

expect.extend({ toMatchFile });
```

Then use it in your tests:

```js
it('demonstrates this matcher`s usage', () => {
  ...
  expect(content).toMatchFile(filepath);
});
```

The matcher takes one argument, which is the path to the file whose content should be matched.
