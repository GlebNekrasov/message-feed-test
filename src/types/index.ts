import type { Dayjs } from 'dayjs'

export interface ColoredContent {
  content: string
  backgoundColor: string
}

export interface ContentPostTone {
  position: number
  tone: number
  length: number
}

export interface Message {
  id: number
  date: Dayjs
  authorName: string
  authorUrl: string
  content: string
  contentPostTones: ContentPostTone[]
}

export interface MessageApi {
  id: number
  date: string
  authorName: string
  authorUrl: string
  content: string
  contentPostTones: ContentPostTone[]
}
