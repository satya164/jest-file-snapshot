const { toMatchFileUsing } = require('../index');

expect.extend({
  toMatchFile: toMatchFileUsing({ fileExtension: '.csv' }),
});

it('matches content of file on disk with file extension', () => {
  expect(`col_1, col_2\nv11,v12\nv21,v22`).toMatchFile();
});

it('overrides the default extension', () => {
  expect(`this is not a csv`).toMatchFile(undefined, { fileExtension: '' });
});
