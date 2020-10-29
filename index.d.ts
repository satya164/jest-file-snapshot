/// <reference types="jest" />

import { DiffOptions } from 'jest-diff';

export const toMatchFile: (
  content: string | Buffer,
  filename?: string,
  options?: FileMatcherOptions
) => CustomMatcherResult;

declare interface FileMatcherOptions {
  diff?: DiffOptions;
}

declare global {
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R, T> {
      toMatchFile: (filename?: string, options?: FileMatcherOptions) => void;
    }

    interface Expect {
      toMatchFile: (filename?: string, options?: FileMatcherOptions) => void;
    }
  }
}
