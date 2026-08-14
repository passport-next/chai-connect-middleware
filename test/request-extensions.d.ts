import '@passport-next/chai-connect-middleware/request-extensions';

declare module '@passport-next/chai-connect-middleware/request-extensions' {
  interface RequestExtensions {
    query?: {hello: string};
  }
}