export const routes = {
  '/sitemap.xml': {
    'GET': {
      handler: 'SitemapController.siteMapXml',
      config: {
        prefix: 'sitemap.prefix',
        app: {
          permissions: {
            resource_name: 'apiGetSiteMapXml',
            roles: ['public', 'registered', 'admin']
          }
        }
      }
    }
  }
}
