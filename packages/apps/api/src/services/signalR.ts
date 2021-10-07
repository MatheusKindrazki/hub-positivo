import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr'

interface HubConnectProps {
  url: string
  token: string
}

export const stringSubscriptions = {
  HeaderNotification: 'HeaderNotification'
}

function createHubConnect(params: HubConnectProps): Promise<HubConnection> {
  return new Promise((resolve, reject) => {
    const connection = new HubConnectionBuilder()
      .withUrl(params.url, {
        headers: {
          Authorization: `Bearer ${params.token}`
        }
        // accessTokenFactory: () => `${params.token}`
      })
      .build()

    connection
      .start()
      .then(() => resolve(connection))
      .catch(err => reject(err))
  })
}

export type { HubConnection }

export { createHubConnect }
