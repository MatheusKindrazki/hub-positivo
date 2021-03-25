import mixpanel from 'mixpanel-browser'

export default function init(): void {
  mixpanel.init('0bb3ee9ebb217d5d18c5337546291ec8', {
    verbose: true,
    batch_requests: true,
    track_pageview: true
  })
}
