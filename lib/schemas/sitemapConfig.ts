import * as joi from 'joi'

export const sitemapConfig = joi.object().keys({
  prefix: joi.string().allow('', null),
  host: joi.string(),
  cache: joi.object().keys({
    prefix: joi.string(),
    eject: joi.number()
  })
}).unknown()
