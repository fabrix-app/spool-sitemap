'use strict'

const assert = require('assert')
const supertest = require('supertest')

describe('SitemapController', () => {
  let publicUser
  before((done) => {
    publicUser = supertest.agent(global.app.spools.express.server)
    done()
  })

  it('should exist', () => {
    assert(global.app.controllers.SitemapController)
  })

  it('should get sitemap.xml', (done) => {
    publicUser
      .get('/sitemap.xml')
      .expect(200)
      .end((err, res) => {
        done(err)
      })
  })
})
