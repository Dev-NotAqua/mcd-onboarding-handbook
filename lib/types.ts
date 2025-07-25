export interface ContentItem {
  type:
    | "text"
    | "heading"
    | "list"
    | "code"
    | "callout"
    | "image"
    | "discord-interface"
    | "discord-verification"
    | "trident-timer"
    | "hierarchy-interface"
    | "promotion-request"
  text?: string
  items?: string[]
  code?: string
  language?: string
  calloutType?: "info" | "warning" | "success" | "error"
  src?: string
  alt?: string
  caption?: string
}

export interface HandbookSection {
  id: string
  title: string
  content: ContentItem[]
}
