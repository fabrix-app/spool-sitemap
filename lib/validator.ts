import * as joi from 'joi'
import { sitemapConfig } from './schemas/sitemapConfig'

export const Validator = {
  validateSitemapConfig (config) {
    return new Promise((resolve, reject) => {
      joi.validate(config, sitemapConfig, (err, value) => {
        if (err) {
          return reject(new TypeError('config.sitemap: ' + err))
        }
        return resolve(value)
      })
    })
  }
}
