/* istanbul ignore file */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const diff = require('jest-diff');
const mkdirp = require('mkdirp');
const filenamify = require('filenamify');

exports.toMatchFile = function toMatchFile(content, filename, options = {}) {
  const { isNot, snapshotState } = this;

  if (filename === undefined) {
    // If file name is not specified, generate one from the test title
    filename = path.join(
      path.dirname(this.testPath),
      '__file_snapshots__',
      `${filenamify(this.currentTestName, {
        replacement: '-',
      }).replace(/\s/g, '-')}-${this.assertionCalls}`
    );
  }

  options = {
    // Options for jest-diff
    diff: Object.assign(
      {
        expand: false,
        contextLines: 5,
        aAnnotation: 'Snapshot',
      },
      options.diff
    ),
  };

  if (snapshotState._updateSnapshot === 'none' && !fs.existsSync(filename)) {
    // We're probably running in CI environment

    snapshotState.unmatched++;

    return {
      pass: isNot,
      message: () =>
        `New output file ${chalk.blue(
          path.basename(filename)
        )} was ${chalk.bold.red('not written')}.\n\n` +
        'The update flag must be explicitly passed to write a new snapshot.\n\n' +
        `This is likely because this test is run in a ${chalk.blue(
          'continuous integration (CI) environment'
        )} in which snapshots are not written by default.\n\n`,
    };
  }

  if (fs.existsSync(filename)) {
    const output = fs.readFileSync(filename, 'utf8');

    if (isNot) {
      // The matcher is being used with `.not`

      if (output !== content) {
        // The value of `pass` is reversed when used with `.not`
        return { pass: false, message: () => '' };
      } else {
        snapshotState.unmatched++;

        return {
          pass: true,
          message: () =>
            `Expected received content ${chalk.red(
              'to not match'
            )} the file ${chalk.blue(path.basename(filename))}.`,
        };
      }
    } else {
      if (output === content) {
        return { pass: true, message: () => '' };
      } else {
        if (snapshotState._updateSnapshot === 'all') {
          mkdirp.sync(path.dirname(filename));
          fs.writeFileSync(filename, content);

          snapshotState.updated++;

          return { pass: true, message: () => '' };
        } else {
          snapshotState.unmatched++;

          return {
            pass: false,
            message: () =>
              `Received content ${chalk.red(
                "doesn't match"
              )} the file ${chalk.blue(path.basename(filename))}.\n\n${diff(
                output,
                content,
                options.diff
              )}`,
          };
        }
      }
    }
  } else {
    if (
      !isNot &&
      (snapshotState._updateSnapshot === 'new' ||
        snapshotState._updateSnapshot === 'all')
    ) {
      mkdirp.sync(path.dirname(filename));
      fs.writeFileSync(filename, content);

      snapshotState.added++;

      return { pass: true, message: () => '' };
    } else {
      snapshotState.unmatched++;

      return {
        pass: true,
        message: () =>
          `The output file ${chalk.blue(
            path.basename(filename)
          )} ${chalk.bold.red("doesn't exist")}.`,
      };
    }
  }
};
