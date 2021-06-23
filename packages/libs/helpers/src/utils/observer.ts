/* eslint-disable accessor-pairs */
export const EVENTS = '__events__'
export const SHARED = '__shared__'
export const OBSERVERS = '__observers__'

export type EventsArray<T = any> = Array<T>
export type Observer<T = any> = (data: T | undefined) => void
export type ObserversArray<T = any> = Array<Observer<T>>

declare global {
  interface Window {
    __shared__: {
      __events__: Record<string, EventsArray>
      __observers__: Record<string, ObserversArray>
    }
  }
}

export interface SubscriptionOptions {
  every?: boolean
  latest?: boolean
}

export default class ObservableMCF<T = any> {
  private _namespace!: string

  private static initialize() {
    if (!window[SHARED]) {
      window[SHARED] = {
        [EVENTS]: {},
        [OBSERVERS]: {}
      }
    }
    if (!window[SHARED][EVENTS]) {
      window[SHARED][EVENTS] = {}
    }
    if (!window[SHARED][OBSERVERS]) {
      window[SHARED][OBSERVERS] = {}
    }
  }

  constructor(namespace: string) {
    ObservableMCF.initialize()

    this.namespace = namespace
  }

  private get events(): EventsArray<T> {
    return window[SHARED][EVENTS][this._namespace]
  }

  private set events(newEvents: EventsArray<T>) {
    window[SHARED][EVENTS][this._namespace] = newEvents
  }

  private get observers(): ObserversArray<T> {
    return window[SHARED][OBSERVERS][this._namespace]
  }

  private set observers(newObservers: ObserversArray<T>) {
    window[SHARED][OBSERVERS][this._namespace] = newObservers
  }

  private set namespace(namespace: string) {
    this._namespace = namespace

    if (!this.events) this.events = []
    if (!this.observers) this.observers = []
  }

  publish(data: T): void {
    this.observers.forEach((observer: Observer<T>) => observer(data))

    this.events.push(data)
  }

  dispatch = this.publish

  subscribe(data: Observer<T>): void {
    const events = this.events

    if (events.length > 0) {
      const lastEvent = events[events.length - 1]
      data(lastEvent)
    }

    this.observers = this.observers.concat(data)
  }

  unsubscribe(data: Observer<T>): void {
    this.observers = this.observers.filter(obs => obs !== data)
  }

  clear(): void {
    this.observers?.forEach((observer: Observer<T>) => observer(undefined))

    this.events = []
    this.observers = []
  }
}
