import type { MusicContract, PartnerUsageMap, Usage } from "../models/types"

const isUsage = (u: string): u is Usage =>
  u === "digital download" || u === "streaming"

const isIsoDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s)

const addError = (errors: string[], line: number | null, message: string) => {
  const prefix = line ? `Line ${line}: ` : ""
  errors.push(`${prefix}${message}`)
}

export const parsePartnerContracts = (text: string): PartnerUsageMap => {
  const errors: string[] = []

  const lines = text
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(Boolean)

  if (lines.length <= 1) {
    throw new Error("Partner Contracts file is empty or missing data")
  }

  if (lines[0] !== "Partner|Usage") {
    addError(errors, 1, `Invalid header. Expected "Partner|Usage"`)
  }

  const map: PartnerUsageMap = {}

  lines.slice(1).forEach((line, idx) => {
    const lineNo = idx + 2
    const parts = line.split("|")

    if (parts.length !== 2) {
      addError(errors, lineNo, `Invalid column count. Expected 2 but got ${parts.length}`)
      return
    }

    const partner = (parts[0] ?? "").trim()
    const usageRaw = (parts[1] ?? "").trim()

    if (!partner) addError(errors, lineNo, "Partner is required")
    if (!usageRaw) addError(errors, lineNo, "Usage is required")
    if (usageRaw && !isUsage(usageRaw))
      addError(errors, lineNo, `Invalid usage "${usageRaw}"`)

    if (partner && usageRaw && isUsage(usageRaw)) {
      map[partner] = usageRaw
    }
  })

  if (errors.length) {
    const err = new Error(errors.join("\n"));
    (err as any).errors = errors
    throw err
  }

  return map
}

export const parseMusicContracts = (text: string): MusicContract[] => {
  const errors: string[] = []

  const lines = text
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(Boolean)

  if (lines.length <= 1) {
    throw new Error("Music Contracts file is empty or missing data")
  }

  if (lines[0] !== "Artist|Title|Usages|StartDate|EndDate") {
    addError(errors, 1, `Invalid header. Expected correct Music Contracts header`)
  }

  const out: MusicContract[] = []

  lines.slice(1).forEach((line, idx) => {
    const lineNo = idx + 2
    const parts = line.split("|")

    if (parts.length !== 5) {
      addError(errors, lineNo, `Invalid column count. Expected 5 but got ${parts.length}`)
      return
    }

    const artist = (parts[0] ?? "").trim()
    const title = (parts[1] ?? "").trim()
    const usagesRaw = (parts[2] ?? "").trim()
    const startDate = (parts[3] ?? "").trim()
    const endDate = (parts[4] ?? "").trim()

    if (!artist) addError(errors, lineNo, "Artist is required")
    if (!title) addError(errors, lineNo, "Title is required")

    if (!startDate) addError(errors, lineNo, "StartDate is required")
    if (startDate && !isIsoDate(startDate))
      addError(errors, lineNo, `Invalid StartDate "${startDate}"`)

    if (endDate && !isIsoDate(endDate))
      addError(errors, lineNo, `Invalid EndDate "${endDate}"`)

    if (startDate && endDate && isIsoDate(startDate) && isIsoDate(endDate) && startDate > endDate) {
      addError(errors, lineNo, `EndDate cannot be before StartDate`)
    }

    const rawUsages = usagesRaw
      .split(",")
      .map(u => u.trim())
      .filter(Boolean)

    if (!rawUsages.length)
      addError(errors, lineNo, "At least one usage is required")

    rawUsages.forEach(u => {
      if (!isUsage(u))
        addError(errors, lineNo, `Invalid usage "${u}"`)
    })

    const validUsages = rawUsages.filter(isUsage)

    const rowIsValid =
      artist &&
      title &&
      startDate &&
      isIsoDate(startDate) &&
      (!endDate || isIsoDate(endDate)) &&
      (!endDate || startDate <= endDate) &&
      validUsages.length > 0

    if (rowIsValid) {
      out.push({
        artist,
        title,
        usages: validUsages,
        startDate,
        ...(endDate ? { endDate } : {}),
      })
    }
  })

  if (errors.length) {
    const err = new Error(errors.join("\n"));
    (err as any).errors = errors
    throw err
  }

  return out
}