import React from "react"
import useRightsStore from "../store/rightsStore"
import GridView from "../components/GridView"

const GridContainer = () => {

    // Store
    const {
        partnerName,
        effectiveDate,
        setPartnerName,
        setEffectiveDate,
        runSearch,
        results,
        errorSearch,
        reset,
    } = useRightsStore()

    const isSearchDisabled = !partnerName.trim() || !effectiveDate

    return <GridView partnerName={partnerName} 
                     effectiveDate={effectiveDate}
                     setPartnerName={setPartnerName}
                     setEffectiveDate={setEffectiveDate}
                     runSearch={runSearch}
                     isSearchDisabled={isSearchDisabled}
                     reset={reset}
                     errorSearch={errorSearch}
                     rows={results}/>
}

export default GridContainer