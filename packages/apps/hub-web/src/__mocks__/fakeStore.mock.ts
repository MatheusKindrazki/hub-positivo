import { store } from '~/store'

type MockStore = typeof store

interface ReturnPayload {
  type: string
  payload?: any
}

export const dispatchedActions: ReturnPayload[] = []

export const fakeStore: MockStore = {
  ...store,
  dispatch: (action: ReturnPayload) => dispatchedActions.push(action) as any
}
