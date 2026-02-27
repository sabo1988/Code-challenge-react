import { vi } from "vitest"

export function rightsStoreState(overrides: Partial<any> = {}) {
  return {
    musicContractsText: "",
    partnerContractsText: "",
    setMusicContractsText: vi.fn(),
    setPartnerContractsText: vi.fn(),
    parseFiles: vi.fn(),
    uploadSuccess: "",
    error: "",

    partnerName: "",
    effectiveDate: "",
    setPartnerName: vi.fn(),
    setEffectiveDate: vi.fn(),
    runSearch: vi.fn(),
    results: [],
    errorSearch: "",
    reset: vi.fn(),

    ...overrides,
  }
}