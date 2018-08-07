import { FabrixGeneric } from '@fabrix/fabrix/dist/common'
import { difference } from 'lodash'

export class Sitemap extends FabrixGeneric {
  constructor (app) {
    super(app)

    Object.defineProperties(this, {
      app: {
        enumerable: false,
        value: app
      },
      build: {
        enumerable: false,
        value: function() {
          const unhallowedMethods = ['build']
          const allowedMethods = difference(this.methods, unhallowedMethods)
          let urls = []

          return Promise.all(allowedMethods.map((method: string) => {
            return this[method]()
          }))
            .then((results: any = []) => {
              results.forEach((sitemap: any) => {
                urls = [...urls, ...sitemap]
              })

              return urls
            })
            .catch(err => {
              this.app.log.error(err)
              return urls
            })
        },
        writable: true
      }
    })
  }

  /**
   * Return the id of this sitemap
   */
  get id () {
    return this.constructor.name.replace(/(\w+)Sitemap/, '$1').toLowerCase()
  }

  /**
   * Gets the name of the sitemap class
   */
  get name() {
    return this.constructor.name
  }
}
