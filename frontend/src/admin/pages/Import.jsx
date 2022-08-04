import { Download } from "react-bootstrap-icons";
import UploadBox from "../components/UploadBox";

//Backend 
import { useEffect } from 'react' 
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

function ImportFailed() { 
    return (
        <>
            <div>
                <h1 className="fw-bold fs-4 pb-3">Import Tennis Records CSV</h1>
            </div>
            <div className="pt-3">
                <h1 className="fw-bold fs-5">Record Failed to upload.</h1>
                <p>Please check the table below for the error and try to check for system solutions, or try to fix them first in your CSV and reupload.</p>
            </div>
            {/* Table here */}
        </>
    )
}

function Import() {
    const navigate = useNavigate();
    //Redirect if not logged in
    const {user} = useSelector((state)=> state.auth)

    useEffect(()=> {
        if(!user){
            navigate('/admin-login')
        }
    }, [user, navigate]) 
    return (
        <>
            <div>
                <h1 className="fw-bold fs-4 pb-3">Import Tennis Records CSV</h1>
            </div>

            <UploadBox />

            <div className="pt-3">
                <h1 className="fw-bold fs-5">Upload Instructions</h1>
                <p>In order for the system to recognize your JSON file, please follow the spreadsheet demo file attached below.</p>
            </div>

            <div className="py-1">
                <h1 className="fw-bold fs-5">Note:</h1>
                <ul className="py-2">
                    <li>Individual player ID’s should be unique.</li>
                    <li>Make sure to upload a JSON file.</li>
                    <li>You can make a copy of our sample spreadsheet and save as CSV and then use this tool to convert to JSON.</li>
                </ul>
                <div>

                    <div className="text-wrap">
                        <Download className="fs-1 me-3 float-start" color="green" />

                        <div>
                            <a href="" className="u-green msg-100">
                                Download Demo Excel file
                            </a>
                        </div>

                        <div>
                            <a href="" className="u-green msg-100">
                                Online CSV to JSON converter
                            </a>
                        </div>

                    </div>

                </div>
            </div>

            <div className="py-4">
                <h1 className="fw-bold fs-5">Upload Manually</h1>
                You can also upload manually here:
                <button type="button" className="ms-4 px-2 btn btn-green-transparent btn-sm" style={{ fontSize: "16px", borderWidth: "2px", width: "200px", height: "40px", fontWeight: "600" }}>Upload Record Manually</button>
            </div>
        </>

    );
}

export default Import;
