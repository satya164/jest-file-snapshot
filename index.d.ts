/// <reference types="jest" />

import { DiffOptions } from 'jest-diff';

declare module 'jest-file-snapshot' {
  export const toMatchFile: jest.CustomMatcher;
}

declare interface FileMatcherOptions {
  diff?: DiffOptions;
}

declare global {
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R, T> {
      toMatchFile: (
        output: string | Buffer,
        filename?: string,
        options?: FileMatcherOptions
      ) => void;
    }

    interface Expect {
      toMatchFile: (
        output: string | Buffer,
        filename?: string,
        options?: FileMatcherOptions
      ) => void;
    }
  }
}
