import { Upload } from "react-bootstrap-icons";
import Dropzone from 'react-dropzone'

export default function UploadBox() {
    return (
        <div className="upload-box">

            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                    <form {...getRootProps()} className="upload-bg h-100">

                        <div>
                        <input {...getInputProps()} />
                            <div className="d-flex fs-3 justify-content-center">
                                <div className="gc-100 fw-lighter py-5">Upload/Drag JSON File here</div>
                            </div>
                            
                            <div className="d-flex justify-content-center">
                                <Upload size={52} color="#339966" />
                            </div>
                        </div>

                    </form>
                )}
            </Dropzone>



        </div>
    )
}