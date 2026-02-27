import React from "react"
import type { ResultRow } from "../models/types"

type GridViewProps = {
  partnerName: string
  setPartnerName: (value : string) => void
  setEffectiveDate: (value : string) => void
  runSearch: () => void
  reset:() => void
  effectiveDate: string
  isSearchDisabled: boolean
  rows: ResultRow[]
  errorSearch: string | undefined
}

const GridView = ({partnerName, setPartnerName, rows, effectiveDate, setEffectiveDate, runSearch, reset, isSearchDisabled, errorSearch} : GridViewProps ) => {
    return <>
            <div className="card shadow-sm p-4">
                <h5 className="mb-3">Search Active Contracts</h5>
                <div className="row g-3">
                    {/* Partner Input */}
                    <div className="col-md-6">
                    <label className="form-label">Partner</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. YouTube"
                        value={partnerName}
                        onChange={e => setPartnerName(e.target.value)}
                    />
                    </div>
                    <div className="col-md-6">
                    <label className="form-label">Effective Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={effectiveDate}
                        onChange={e => setEffectiveDate(e.target.value)}
                    />
                    </div>
                </div>
                <div className="mt-4 d-flex gap-2">
                    <button
                    className="btn btn-primary"
                    onClick={runSearch}
                    disabled={isSearchDisabled}
                    >
                    Search
                    </button>

                    <button
                    className="btn btn-outline-secondary"
                    onClick={reset}
                    >
                    Reset
                    </button>
                </div>
                {
                    errorSearch ? <div className="mt-4 alert alert-danger" role="alert">
                                    {errorSearch}
                                </div> : null
                }
            </div>
            <div className="card shadow-sm mt-4">
                <div className="card-body">
                    <h5 className="card-title mb-3">
                        Contracts ({rows.length})
                    </h5>
                    <div className="table-responsive">
                        <table className="table table-striped table-hover table-bordered align-middle">
                            <thead className="table">
                                <tr>
                                    <th>Artist</th>
                                    <th>Title</th>
                                    <th>Usage</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, index) => (
                                    <tr key={`${row.artist}-${row.title}-${index}`}>
                                    <td>{row.artist}</td>
                                    <td>{row.title}</td>
                                    <td>
                                        <span className="badge bg-primary">
                                        {row.usage}
                                        </span>
                                    </td>
                                    <td>{row.startDate}</td>
                                    <td>{row.endDate ?? "-"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    </>
}

export default GridView