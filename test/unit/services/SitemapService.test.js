'use strict'

const assert = require('assert')

describe('SitemapService', () => {
  let SitemapService
  it('should exist', () => {
    assert(global.app.services.SitemapService)
    SitemapService = global.app.services.SitemapService
  })
  it('should build', (done) => {
    SitemapService.build()
      .then(results => {
        console.log(results)
        assert.equal(results.length, 6)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('should have the sitemap in app.sitemap after build()', (done) => {
    console.log(global.app.sitemap)
    assert.equal(global.app.sitemap.urls.length, 6)
    // global.app.sitemap.urls.forEach(url => {
    //   assert.include(url.url, global.app.config.get('proxySitemap.host'))
    // })
    done()
  })
})
