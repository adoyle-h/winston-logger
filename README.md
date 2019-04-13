# @adoyle.me/winston-logger
![Node Version][Node Version Image]
[![Npm Package Version][Npm Package Version Image]][Npm Package Version LINK]
[![License][License Image]][License LINK]
![NodeJS Package Dependencies][NodeJS Package Dependencies Link]
[![Build Status][Build Status Image]][Build Status Link]
[![Code Climate][Code Climate Image]][Code Climate Link]
[![Test Coverage][Test Coverage Image]][Test Coverage Link]

A wrapper of [winston](https://github.com/winstonjs). For simple usage.

## TOC

<!-- MarkdownTOC GFM -->

- [Installation](#installation)
- [Usage](#usage)
- [Versioning](#versioning)
- [Copyright and License](#copyright-and-license)

<!-- /MarkdownTOC -->


## Installation

`npm install -S @adoyle.me/winston-logger`

## Usage

```js
import Factory from '@adoyle.me/winston-logger';
// const Factory = require('@adoyle.me/winston-logger');

const Logger = Factory.new();

// const Logger = Factory.new({
//     files: [
//         {
//             level: 'error',
//             filename: 'logs/error.log',
//         },
//         {
//             level: 'debug',
//             filename: 'logs/all.log',
//         },
//     ],
//     console: false,
// });

const logger = Logger.create();
// const logger = Logger.create({label: 'xxx'});
// const logger = Logger.create({label: 'xxx', depth: null});


logger.debug('hahahah');
logger.info('hello %s', 'world');
logger.error('error= %O', {message: 'failed'});
```

## Versioning

The versioning follows the rules of SemVer 2.0.0.

**BUT**, anything may have **BREAKING CHANGES** at **ANY TIME** when major version is zero (0.y.z), which is for initial development and the public API should be considered unstable.

When major version is zero, You should save it with prefix `~`.

For more information on SemVer, please visit http://semver.org/.

## Copyright and License

Copyright (c) 2019 ADoyle. The project is licensed under the **Apache License Version 2.0**.

See the [LICENSE][] file for the specific language governing permissions and limitations under the License.

See the [NOTICE][] file distributed with this work for additional information regarding copyright ownership.


<!-- Links -->

[LICENSE]: ./LICENSE
[NOTICE]: ./NOTICE


<!-- links -->

[Node Version Image]: https://img.shields.io/node/v/@adoyle.me/winston-logger.svg
[Npm Package Version Image]: https://img.shields.io/npm/v/@adoyle.me/winston-logger.svg
[Npm Package Version LINK]: https://www.npmjs.com/package/@adoyle.me/winston-logger
[License Image]: https://img.shields.io/npm/l/@adoyle.me/winston-logger.svg
[License LINK]: https://github.com/adoyle-h/winston-logger/blob/master/LICENSE
[NodeJS Package Dependencies Link]: https://david-dm.org/adoyle-h/winston-logger.svg
[Build Status Image]: https://travis-ci.org/adoyle-h/winston-logger.svg?branch=master
[Build Status Link]: https://travis-ci.org/adoyle-h/winston-logger
[Code Climate Image]: https://codeclimate.com/github/adoyle-h/winston-logger/badges/gpa.svg
[Code Climate Link]: https://codeclimate.com/github/adoyle-h/winston-logger
[Test Coverage Image]: https://codeclimate.com/github/adoyle-h/winston-logger/badges/coverage.svg
[Test Coverage Link]: https://codeclimate.com/github/adoyle-h/winston-logger/coverage
