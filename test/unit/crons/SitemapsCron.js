'use strict'
/* global describe, it */
const assert = require('assert')
const _ = require('lodash')

describe('Cron', () => {
  it('should exist', () => {
    assert(global.app.api.crons)
    assert(global.app.crons)
  })
  it('should have the crons from profile testProfile', done => {
    assert(global.app.api.crons.SitemapsCron)
    assert(global.app.crons.SitemapsCron)
    assert.equal(global.app.crons.SitemapsCron.id, 'sitemaps')
    assert.equal(global.app.crons.SitemapsCron.name, 'SitemapsCron')
    assert.equal(typeof global.app.crons.SitemapsCron.build, 'function')

    done()
  })
})
