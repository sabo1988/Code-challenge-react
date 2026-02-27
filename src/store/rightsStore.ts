import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { parseMusicContracts, parsePartnerContracts } from "../helpers/parsers"
import { searchActiveContracts } from "../helpers/search"
import type { MusicContract, PartnerUsageMap, ResultRow } from "../models/types"

interface RightsState {
  musicContractsText: string
  partnerContractsText: string
  uploadSuccess: string
  contracts: MusicContract[]
  partnerUsages: PartnerUsageMap

  partnerName: string
  effectiveDate: string

  results: ResultRow[]
  error?: string
  errorSearch?: string

  setMusicContractsText: (t: string) => void
  setPartnerContractsText: (t: string) => void
  setPartnerName: (v: string) => void
  setEffectiveDate: (v: string) => void

  parseFiles: () => void
  runSearch: () => void
  reset: () => void
}

const initialState = {
  musicContractsText: "",
  partnerContractsText: "",
  uploadSuccess:"",
  filesLoadedCorrectly: false,
  contracts: [] as MusicContract[],
  partnerUsages: {} as PartnerUsageMap,
  partnerName: "",
  effectiveDate: "",
  results: [] as ResultRow[],
  error: "",
  errorSearch: "",
}

const useRightsStore = create<RightsState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      setMusicContractsText: (t) =>
        set({ musicContractsText: t }, false, "setMusicContractsText"),

      setPartnerContractsText: (t) =>
        set({ partnerContractsText: t }, false, "setPartnerContractsText"),

      setPartnerName: (v) =>
        set({ partnerName: v }, false, "setPartnerName"),

      setEffectiveDate: (v) =>
        set({ effectiveDate: v }, false, "setEffectiveDate"),

      parseFiles: () => {
        const { musicContractsText, partnerContractsText } = get()

        try {
          const contracts = parseMusicContracts(musicContractsText)
          const partnerUsages = parsePartnerContracts(partnerContractsText)
          set({ 
            contracts, 
            partnerUsages, 
            error: '', 
            uploadSuccess: "Files parsed successfully ✔", 
            musicContractsText : "", 
            partnerContractsText:"" }
            , false, "parseFiles")
        } catch (e: any) {
            set(
                {
                error: e.errors.join("\n"),
                contracts: [],
                partnerUsages: {},
                uploadSuccess: '',
                }, false, "parseFiles"
            )
        }
      },

      runSearch: () => {
        const { contracts, partnerUsages, partnerName, effectiveDate } = get()

        if (!contracts.length || !Object.keys(partnerUsages).length) {
          set({ errorSearch: "Upload both files first, then search.", results: [] }, false, "runSearch:missingFiles")
          return
        }

        if (!partnerName.trim()) {
          set({ errorSearch: "Enter a partner name.", results: [] }, false, "runSearch:missingPartner")
          return
        }

        if (!effectiveDate) {
          set({ errorSearch: "Select an effective date.", results: [] }, false, "runSearch:missingDate")
          return
        }

        const results = searchActiveContracts({
          contracts,
          partnerUsages,
          partnerName: partnerName.trim(),
          effectiveDate,
        })

        set(
          {
            results,
            errorSearch: results.length ? undefined : "No matching active contracts found.",
          },
          false,
          "runSearch"
        )
      },

      reset: () => set({ ...initialState }, false, "reset"),
    }),
    { name: "RightsStore" }
  )
)

export default useRightsStore