import { FabrixApp } from '@fabrix/fabrix'
import { clone } from 'lodash'

export const Utils = {
  /**
   * copyDefaults - Copies the default configuration so that it can be restored later
   * @param app
   * @returns {Promise.<{}>}
   */
  copyDefaults: (app: FabrixApp) => {
    app.config.set('sitemapDefaults', clone(app.config.get('sitemap')))
    return Promise.resolve({})
  }
}
