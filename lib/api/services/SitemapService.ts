import { FabrixService as Service } from '@fabrix/fabrix/dist/common'
import { createSitemap } from 'sitemap'

/**
 * @module SitemapService
 * @description SitemapService
 */
export class SitemapService extends Service {
  /**
   * Builds all Sitemaps
   */
  build() {
    let siteMaps = [], urls = []

    Object.keys(this.app.sitemaps).forEach(sitemap => {
      // skip loop if the property is from prototype
      if (!this.app.sitemaps.hasOwnProperty(sitemap)) {
        return
      }
      if (!this.app.sitemaps[sitemap].hasOwnProperty('build')) {
        return
      }
      siteMaps.push(this.app.sitemaps[sitemap])
    })

    return Promise.all(siteMaps.map(sitemap => {
      return sitemap.build()
    }))
      .then((results = []) => {
        // Add all the results to a single array
        results.forEach(sitemap => {
          urls = [...urls, ...sitemap]
        })

        // Build a new map
        const newMap = createSitemap({
          hostname: this.app.config.get('sitemap.host'),
          cacheTime: this.app.config.get('sitemap.cache.eject'),
          urls: urls
        })

        // Initiate the map
        newMap.toString()

        // Map the composed urls to the app's sitemap
        newMap.urls.forEach(url => {
          // Remove the old url object if it exists
          this.app.sitemap.del(url)
          // Add the new url object
          this.app.sitemap.add(url)
        })
        return urls
      })
      .catch(err => {
        this.app.log.error(err)
        return Promise.reject(err)
      })
  }
}

