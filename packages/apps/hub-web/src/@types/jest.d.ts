// custom jest.d.ts somewhere in the source

declare namespace jest {
  interface Matchers<R> {
    toContainObject(value: object): CustomMatcherResult<R>
  }
}
