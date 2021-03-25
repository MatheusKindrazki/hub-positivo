export type CustomEvent = Event & {
  detail?: string
}

export interface PageViewed {
  page_path: string
  page_title: string
  page_url: string
}
