const path = require('path');
const { toMatchFile } = require('../index');

expect.extend({ toMatchFile });

it('matches content of file on disk with specified filename', () => {
  expect(`# this is a test`).toMatchFile(
    path.join(__dirname, '..', '__fixtures__', 'output.md')
  );
});

it('matches content of file on disk without filename', () => {
  expect(`# this is a another test`).toMatchFile();
});
