/// <reference types="jest" />

import { DiffOptions } from 'jest-diff';

declare type FileMatcherOptions = {
  diff: DiffOptions
}

declare namespace jest {
  interface Matchers<R> {
    toMatchFile: (output: string, filename?: string, options?: FileMatcherOptions) => void
  }

  interface Expect {
    toMatchFile: (output: string, filename?: string, options?: FileMatcherOptions) => void
  }
}
