import { Upload } from "react-bootstrap-icons";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { uploadRecord } from "../../features/records/recordsSlice";
import { useDispatch, useSelector } from "react-redux";

import ClipLoader from "react-spinners/ClipLoader";

export default function UploadBox() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.records);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      if (file.name.slice(-4) === ".csv") {
        const data = new FormData();
        data.append("file", file);
        console.log(data);

        dispatch(uploadRecord(data));
      } else {
        console.log("Error not CSV");
      }
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  if (isLoading) {
    return (
      <div className="upload-box">
        <form className="upload-bg h-100">
          <div class="d-flex align-items-center justify-content-center h-100">
            <div class="d-flex flex-column">
              <ClipLoader size={70} />
            </div>
          </div>
        </form>
      </div>
    );
  }
  if (isDragActive) {
    return (
      <div className="upload-box">
        <form {...getRootProps()} className="upload-bg h-100">
          <div>
            <input accept=".csv" type="file" id="file" {...getInputProps()} />
            <div className="d-flex fs-3 justify-content-center">
              <div className="gc-100 fw-lighter py-5">Make sure to drop a CSV File</div>
            </div>
            <div className="d-flex justify-content-center">
              <Upload size={52} color="#339966" />
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="upload-box">
      <form {...getRootProps()} className="upload-bg h-100">
        <div>
          <input {...getInputProps()} />
          <div className="d-flex fs-3 justify-content-center">
            <div className="gc-100 fw-lighter py-5">
              Upload/Drag CSV File here
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <Upload size={52} color="#339966" />
          </div>
        </div>
      </form>
    </div>
  );
}
