'use strict'

const _ = require('lodash')
const smokesignals = require('smokesignals')

const fsStore = require('cache-manager-fs')

const Sitemap = require('../../dist').Sitemap

const App = {
  api: {
    sitemaps: {
      TestSitemap: class TestSitemap extends Sitemap {
        test() {
          return Promise.resolve([
            { url: '/page-1/',  changefreq: 'daily', priority: 0.3 },
            { url: '/page-2/',  changefreq: 'monthly',  priority: 0.7 },
            { url: '/page-3/', img: 'http://urlTest.com' }
          ])
        }

        test2() {
          return Promise.resolve([
            { url: '/page-4/',  changefreq: 'daily', priority: 0.3 },
            { url: '/page-5/',  changefreq: 'monthly',  priority: 0.7 },
            { url: '/page-6/', img: 'http://urlTest.com' }
          ])
        }
      }
    }
  },
  pkg: {
    name: 'spool-sitemaps-test',
    version: '1.0.0'
  },
  config: {
    main: {
      spools: [
        require('@fabrix/spool-router').RouterSpool,
        require('@fabrix/spool-express').ExpressSpool,
        require('@fabrix/spool-sequelize').SequelizeSpool,
        require('@fabrix/spool-caches').CachesSpool,
        require('@fabrix/spool-crons').CronsSpool,
        require('../../dist').SitemapSpool // spool-sitemap
      ]
    },
    caches: {
      stores: [
        {
          name: 'memory',
          store: 'memory',
          max: 100,
          ttl: 0
        }, {
          name: 'fs',
          store: fsStore
        }
      ],
      defaults: ['memory']
    },
    sitemap: {
      host: 'https://test.com',
      cache: {
        prefix: 'memory',
        eject: 100000
      }
    },
    crons: {
      live_mode: false,
      profile: 'test'
    },
    web: {
      express: require('express'),
      middlewares: {
        order: [
          'static',
          'addMethods',
          'cookieParser',
          'session',
          'bodyParser',
          'methodOverride',
          'router',
          'www',
          '404',
          '500'
        ],
        static: require('express').static('test/static')
      }
    },
    stores: {
      sqlitedev: {
        orm: 'sequelize',
        database: 'Sequelize',
        host: '127.0.0.1',
        dialect: 'postgres',
        migrate: 'drop'
      }
    },
    models: {
      defaultStore: 'sqlitedev',
      migrate: 'drop'
    },
    session: {
      secret: 'sitemap'
    }
  }
}

_.defaultsDeep(App, smokesignals.FailsafeConfig)
module.exports = App
