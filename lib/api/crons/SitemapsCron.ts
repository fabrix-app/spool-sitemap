import { Cron } from '@fabrix/spool-crons'

export class SitemapsCron extends Cron {
  build() {
    // Every Day at midnight build the sitemap
    const rule = new this.scheduler.RecurrenceRule()
    rule.minute = 0
    rule.hour = 24
    // Schedule the recurring job
    this.scheduler.scheduleJob('SitemapsCron.build', rule, () => {
      this.app.services.ProxySitemapService.build()
        .catch(err => {
          this.app.log.error(err)
        })
    })
  }
}
