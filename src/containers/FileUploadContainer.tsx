import React, {useEffect, useState} from "react"
import useRightsStore from "../store/rightsStore"
import FileUpload from "../components/FileUpload"

const FileUploadContainer = () => {

    // Store
    const {
        setMusicContractsText,
        setPartnerContractsText,
        parseFiles,
        uploadSuccess,
        error,
        musicContractsText,
        partnerContractsText,
    } = useRightsStore()

    // Hooks
    useEffect(() => {
        if (musicContractsText && partnerContractsText) {
            setDisabled(false)
        }
    }, [musicContractsText, partnerContractsText])



    // Local state
    const [disabled, setDisabled] = useState(true)

    // Functions
    const onClickParse = () => {
        parseFiles()
    }

    return <FileUpload setMusicContractsText={setMusicContractsText}
                       setPartnerContractsText={setPartnerContractsText}
                       disabled={disabled}
                       uploadSuccess={uploadSuccess}
                       error={error}
                       onClickParse={onClickParse}/>
}

export default FileUploadContainer