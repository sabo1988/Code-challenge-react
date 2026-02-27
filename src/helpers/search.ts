import type { MusicContract, PartnerUsageMap, ResultRow, Usage } from "../models/types"

const isActive = (c: MusicContract, date: string): boolean => {
    return   c.startDate > date
    ? false
    : !c.endDate
      ? true
      : date <= c.endDate
}



export const searchActiveContracts = (args: {
  contracts: MusicContract[]
  partnerUsages: PartnerUsageMap
  partnerName: string
  effectiveDate: string
}): ResultRow[] => {
  const { contracts, partnerUsages, partnerName, effectiveDate } = args

  const usage = partnerUsages[partnerName] as Usage | undefined
  if (!usage) return []

  return contracts
    .filter(c => isActive(c, effectiveDate))
    .filter(c => c.usages.includes(usage))
    .map(c => ({
      artist: c.artist,
      title: c.title,
      usage,
      startDate: c.startDate,
      ...(c.endDate ? { endDate: c.endDate } : {})
    }))
    .sort((a, b) =>
      a.artist.localeCompare(b.artist) ||
      a.title.localeCompare(b.title)
    )
}