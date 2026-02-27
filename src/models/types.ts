export type Usage = "digital download" | "streaming"

export interface MusicContract {
  artist: string
  title: string
  usages: Usage[]
  startDate: string
  endDate?: string
}

export type PartnerUsageMap = Record<string, Usage>

export interface ResultRow {
  artist: string
  title: string
  usage: Usage
  startDate: string
  endDate?: string
}