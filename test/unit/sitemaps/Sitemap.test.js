'use strict'

const assert = require('assert')

describe('Sitemap', () => {
  it('should exist', () => {
    assert(global.app.api.sitemaps)
    assert(global.app.sitemaps)
    assert(global.app.sitemap)
  })
  it('should have TestSitemap in app.sitemaps', (done) => {
    assert(global.app.api.sitemaps.TestSitemap)
    assert(global.app.sitemaps.TestSitemap)
    done()
  })
  it('should build sitemaps from TestSitemap', (done) => {
    global.app.sitemaps.TestSitemap.build()
      .then(sitemap => {
        assert.equal(sitemap.length, 6)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})
