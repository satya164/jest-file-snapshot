const path = require('path');
const { toMatchFile } = require('../index');

expect.extend({ toMatchFile });

it('matches content of file on disk', () => {
  expect(`# this is a test`).toMatchFile(
    path.join(__dirname, '..', '__fixtures__', 'output.md')
  );
});
