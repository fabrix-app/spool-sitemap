# spool-sitemap


[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Build Status][ci-image]][ci-url]
[![Test Coverage][coverage-image]][coverage-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Follow @FabrixApp on Twitter][twitter-image]][twitter-url]

Sitemap for Fabrix Apps. Creates a sitemap.xml available at `/sitemap.xml`, and rebuilds on a cron schedule.

## Install

```sh
$ npm install --save @fabrix/spool-sitemap
```

## Configure

Require the spool
```js
// config/main.ts
import { SitemapSpool } from '@fabrix/spool-sitemap'
export const main = {
  spools: [
    // ... other spools
    SitemapSpool
  ]
}
```

Configure the spool
```js
// config/sitemap.ts
export const sitemap = {
  host: 'https://<hostname>',
  cache: 1000000
}
```

Run the Build Cronjob
```
// config/engine
...
crons_config: {
  auto_schedule: true,
  uptime_delay: 180,
  profiles: {
    development: [
      'SitemapsCron.build'
    ]
  }
}
```

## Creating a Sitemap
Sitemaps are created in the `/api/sitemaps`. Create one or many methods that return a Promise and array like the one below.  Under the hood, Sitemap uses [Sitemap](https://github.com/ekalinin/sitemap.js) for more examples on acceptable returns.

The sitemap is broken into methods so that it can deliver multiple sitemaps if necessary and break them up accordingly.

```js
import { Sitemap } from '@fabrix/spool-sitemap')

export class TestSitemap extends Sitemap {
  test() {
    return Promise.resolve([
      { url: '/page-1/',  changefreq: 'daily', priority: 0.3 },
      { url: '/page-2/',  changefreq: 'monthly',  priority: 0.7 },
      { url: '/page-3/', img: 'http://urlTest.com' }
    ])
  }
}
```


[npm-image]: https://img.shields.io/npm/v/@fabrix/spool-sitemap.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@fabrix/spool-sitemap
[ci-image]: https://img.shields.io/circleci/project/github/fabrix-app/spool-sitemap/master.svg
[ci-url]: https://circleci.com/gh/fabrix-app/spool-sitemap/tree/master
[daviddm-image]: http://img.shields.io/david/fabrix-app/spool-sitemap.svg?style=flat-square
[daviddm-url]: https://david-dm.org/fabrix-app/spool-sitemap
[gitter-image]: http://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/fabrix-app/fabrix
[twitter-image]: https://img.shields.io/twitter/follow/FabrixApp.svg?style=social
[twitter-url]: https://twitter.com/FabrixApp
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/fabrix-app/spool-sitemap.svg?style=flat-square
[coverage-url]: https://codeclimate.com/github/fabrix-app/spool-sitemap/coverage
