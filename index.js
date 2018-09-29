/* istanbul ignore file */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const diff = require('jest-diff');

exports.toMatchFile = function toMatchFile(content, filename) {
  const { isNot, snapshotState } = this;

  if (!filename) {
    throw new Error('You need to pass a `filename` to `.toMatchFile`.');
  }

  if (isNot) {
    throw new Error('You cannot use `.not` with `.toMatchFile`.');
  }

  if (snapshotState._updateSnapshot === 'none' && !fs.existsSync(filename)) {
    return {
      pass: false,
      message: () =>
        `New output file ${chalk.blue(
          path.basename(filename)
        )} was ${chalk.bold.red(
          'not written'
        )}. The update flag must be explicitly ` +
        'passed to write a new snapshot.\n\n + This is likely because this test is run in a continuous ' +
        'integration (CI) environment in which snapshots are not written by default.\n\n',
    };
  }

  if (fs.existsSync(filename)) {
    const output = fs.readFileSync(filename, 'utf8');

    if (output === content) {
      return { pass: true, message: () => '' };
    } else {
      if (snapshotState._updateSnapshot === 'all') {
        fs.writeFileSync(filename, content);
        snapshotState.updated++;

        return { pass: true, message: () => '' };
      } else {
        snapshotState.unmatched++;

        return {
          pass: false,
          message: () =>
            `${chalk.red('Received content')} doesn't match ${chalk.green(
              path.basename(filename)
            )}.\n\n${diff(content, output)}`,
        };
      }
    }
  } else {
    if (snapshotState._updateSnapshot === 'all') {
      fs.writeFileSync(filename, content);
      snapshotState.added++;

      return { pass: true, message: () => '' };
    } else {
      snapshotState.unmatched++;

      return {
        pass: false,
        message: () =>
          `The output file ${chalk.blue(
            path.basename(filename)
          )} ${chalk.bold.red("doesn't exist")}.`,
      };
    }
  }
};
