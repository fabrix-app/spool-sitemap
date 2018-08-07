import { ExtensionSpool } from '@fabrix/fabrix/dist/common/spools/extension'
import { createSitemap } from 'sitemap'

import { Validator } from './validator'
import { Utils } from './utils'

import * as config from './config/index'
import * as pkg from '../package.json'
import * as api  from './api/index'

export class SitemapSpool extends ExtensionSpool {

  private _sitemap: any

  constructor(app) {
    super(app, {
      config: config,
      pkg: pkg,
      api: api
    })

    this.extensions = {
      sitemap: {
        get: () => {
          return this.sitemap
        },
        set: (newSitemap) => {
          throw new Error('sitemap can not be set through FabrixApp, check spool-sitemap instead')
        },
        enumerable: true,
        configurable: true
      }
    }
  }

  get sitemap () {
    return this._sitemap
  }

  /**
   * Validates the dependencies and config
   */
  async validate () {
    const requiredSpools = ['express', 'engine', 'caches']
    const spools = Object.keys(this.app.spools)

    if (!spools.some(v => requiredSpools.indexOf(v) >= 0)) {
      return Promise.reject(new Error(`spool-sitemap requires spools: ${ requiredSpools.join(', ') }!`))
    }

    if (!this.app.config.get('sitemap')) {
      return Promise.reject(new Error('No configuration found at config.sitemap!'))
    }

    return Promise.all([
      Validator.validateSitemapConfig(this.app.config.get('sitemap'))
    ])
  }

  /**
   * TODO document method
   */
  async configure () {
    this._sitemap = createSitemap({
      hostname: this.app.config.get('sitemap.host'),
      cacheTime: this.app.config.get('sitemap.cache'),
      urls: []
    })

    return Promise.all([
      Utils.copyDefaults(this.app)
    ])
  }

  /**
   * Build a basic sitemap
   */
  // async initialize () {
  //   return this.app.services.SitemapService.build()
  // }
}

