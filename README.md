# @passport-next/chai-connect-middleware

Status:
[![NPM version](https://img.shields.io/npm/v/@passport-next/chai-connect-middleware.svg)](https://www.npmjs.com/package/@passport-next/chai-connect-middleware)
[![Build Status](https://travis-ci.org/passport-next/chai-connect-middleware.svg?branch=master)](https://travis-ci.org/passport-next/chai-connect-middleware)
[![Coverage Status](https://coveralls.io/repos/github/passport-next/chai-connect-middleware/badge.svg?branch=master)](https://coveralls.io/github/passport-next/chai-connect-middleware?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/5144b93fb618689b9486/maintainability)](https://codeclimate.com/github/passport-next/chai-connect-middleware/maintainability)
[![Dependencies](https://david-dm.org/passport-next/chai-connect-middleware.png)](https://david-dm.org/passport-next/chai-connect-middleware)
[![SAST](https://gitlab.com/passport-next/chai-connect-middleware/badges/master/pipeline.svg)](https://gitlab.com/passport-next/chai-connect-middleware)

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

## Docs

[Please see the wiki](https://github.com/passport-next/chai-connect-middleware/wiki)

## Need help?

Please raise an [issue](https://github.com/passport-next/chai-connect-middleware/issues) and/or ask a question on [Stackoverflow](https://stackoverflow.com) with the `passport.js` tag.

## Support policy

We support all [node versions](https://github.com/nodejs/Release) supported by the Node Foundation



## Contributing

Please see [CONTRIBUTING.md](https://github.com/passport-next/chai-connect-middleware/blob/master/CONTRIBUTING.md)

