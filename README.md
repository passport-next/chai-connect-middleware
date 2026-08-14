# @passport-next/chai-connect-middleware

Status:
[![NPM version](https://img.shields.io/npm/v/@passport-next/chai-connect-middleware.svg)](https://www.npmjs.com/package/@passport-next/chai-connect-middleware)
[![Coverage Status](https://coveralls.io/repos/github/passport-next/chai-connect-middleware/badge.svg?branch=master)](https://coveralls.io/github/passport-next/chai-connect-middleware?branch=master)

## About

Helpers for testing [Connect](https://github.com/senchalabs/connect#readme) middleware
with the [Chai](https://www.chaijs.com/) assertion library.

## Install

```
$ npm install @passport-next/chai-connect-middleware
```

## Usage

### Basic middleware

```js
import { expect, use } from 'chai';
import connectMiddleware from '@passport-next/chai-connect-middleware';

const chai = use(connectMiddleware);

const middleware = (req, res) => {
  res.end(`Hello, ${req.user.name}!`);
};

it('tests Connect middleware', (done) => {
  const test = chai.connect.use(middleware);
  test.req((req) => {
    req.user = { name: 'Ada' };
  });
  test.end((res) => {
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.equal('Hello, Ada!');
    done();
  });
  test.dispatch();
});
```

### Express middleware

Pass `express` to add Express response helpers such as `res.redirect()`.

```js
import { expect, use } from 'chai';
import connectMiddleware from '@passport-next/chai-connect-middleware';

const chai = use(connectMiddleware);

const middleware = (req, res) => {
  res.redirect('/sign-in');
};

it('tests Express middleware', (done) => {
  const test = chai.connect.use('express', middleware);
  test.end((res) => {
    expect(res.statusCode).to.equal(302);
    expect(res.getHeader('Location')).to.equal('/sign-in');
    done();
  });
  test.dispatch();
});
```

### TypeScript request extensions

The package exports `Request` and `RequestExtensions` types. To describe fields
that your tests add to the mock request, augment the type-only
`@passport-next/chai-connect-middleware/request-extensions` module in a `.d.ts`
file included by your TypeScript configuration:

```ts
import '@passport-next/chai-connect-middleware/request-extensions';

declare module '@passport-next/chai-connect-middleware/request-extensions' {
  interface RequestExtensions {
    user?: {name: string};
    session?: Record<string, unknown>;
  }
}
```

The added fields are then available on the request passed to middleware and
`test.req()` callbacks. The composed request type can also be imported directly:

```ts
import type {Request} from '@passport-next/chai-connect-middleware';
```

`RequestExtensions` is empty by default and affects types only; the test remains
responsible for initializing any extended fields it uses.

## Docs

[Please see the wiki](https://github.com/passport-next/chai-connect-middleware/wiki)

## Need help?

Please raise an [issue](https://github.com/passport-next/chai-connect-middleware/issues) and/or ask a question on [Stackoverflow](https://stackoverflow.com) with the `passport.js` tag.

## Support policy

This package supports Node.js `^22.22.2` or `>=24.15.0`.



## Contributing

Please see [CONTRIBUTING.md](https://github.com/passport-next/chai-connect-middleware/blob/master/CONTRIBUTING.md)

