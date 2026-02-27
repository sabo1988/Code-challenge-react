import React from "react"

type FileUploadProps = {
  setMusicContractsText: (text: string) => void
  setPartnerContractsText: (text: string) => void
  disabled: boolean
  onClickParse: () => void
  uploadSuccess: string
  error: string | undefined
}

const FileUpload = ({setMusicContractsText, setPartnerContractsText, disabled, onClickParse, uploadSuccess, error} : FileUploadProps ) => {
    return (
    <div className="card shadow-sm d-flex flex-column mb-3">
        <div className="p-2">
            <label className="form-label fw-bold">Music Contracts file</label>
            <input
                type="file"
                className="form-control"
                accept={".txt"}
                onChange={async (e) => {
                const file = e.target.files?.[0]
                if (!file) return
                const text = await file.text()
                setMusicContractsText(text)
                }}/>
        </div>
        <div className="p-2">
            <label className="form-label fw-bold">Partner Contracts file</label>
            <input
                type="file"
                className="form-control"
                accept={".txt"}
                onChange={async (e) => {
                const file = e.target.files?.[0]
                if (!file) return
                const text = await file.text()
                setPartnerContractsText(text)
                }}/>
        </div>
        <div className="p-2 d-grid d-md-flex justify-content-md-end">

            <button type="button" className="btn btn-primary" disabled={disabled} onClick={() => onClickParse()}>Parse files</button>
        </div>
        {
            uploadSuccess ? <div className="alert alert-success" role="alert">
                               Contracts uploaded successfully!
                            </div> : null
        }
        {
            error ? <div className="alert alert-danger" role="alert">
                               {error}
                            </div> : null
        }
    </div> )
}

export default FileUpload