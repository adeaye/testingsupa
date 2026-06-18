"use client";
import React, { useState } from "react";
import axios from "axios";
import { createSharepointRestClient } from "../../service/sharepoint";

// const settings = {
//   tenantName: "tenderboardbiz",
//   siteName: "trialsharepointAPI",
//   clientID: "e08a0f9d-272d-4956-850f-dec129e72a49",
//   tenantID: "c3a8dfd6-4207-48f3-bba2-37e3387879aa",
//   appID: "00000003-0000-0ff1-ce00-000000000000",
//   baseUploadDirectory: "Shared Documents",
// }

const settings = {
  tenantName: "tenderboardbiz",
  siteName: "TBSharePointIntegration",
  clientID: "f0f2ce72-10c2-4b9e-93d4-18f9b89f24ef",
  tenantID: "c3a8dfd6-4207-48f3-bba2-37e3387879aa",
  appID: "00000003-0000-0ff1-ce00-000000000000",
  baseUploadDirectory: "Shared Documents",
}

const SharePointUploader = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [folderContents, setFolderContents] = useState(null);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    const sharepoint = await createSharepointRestClient(settings);

    try {
      setStatus("⏳ Uploading...");
      const fileResponse = await axios.get("/api/downloadpdf");
      const uploadFile = file || fileResponse.data;
      console.log("uploadfile", { fileResponse, uploadFile });
      const res = await sharepoint.uploadFile(
        "TBTestFolder2",
        "sample.pdf",
        uploadFile,
      );
      console.log("res upload", res);
      setStatus(`✅ File uploaded: ${res.data.d.Name}`);
    } catch (err) {
      console.error("Upload failed:", err);
      setStatus(
        `❌ Upload failed: ${err.response?.data?.error?.message?.value || err.message}`,
      );
    }
  };

  const handleCreateDir = async () => {
    const sharepoint = await createSharepointRestClient(settings);
    console.log("SHAREPOINT", sharepoint);
    const result = await sharepoint.createDirectory("TBTestFolder");
    console.log(result);
  };

  const handleListSharedFolderContents = async () => {
    const sharepoint = await createSharepointRestClient(settings);

    try {
      setStatus("⏳ Loading shared folder contents...");
      const result = await sharepoint.listSharedFolderContents();
      setFolderContents(result);
      setStatus("✅ Shared folder contents loaded");
      console.log("shared folder contents", result);
    } catch (err) {
      console.error("List shared folder contents failed:", err);
      setStatus(
        `❌ Load failed: ${err.response?.data?.error?.message?.value || err.message}`,
      );
    }
  };

  return (
    <div className="p-4 border rounded-md max-w-md">
      <input type="file" onChange={handleChange} />
      <button
        onClick={handleUpload}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Upload to SharePoint
      </button>
      <div className="mt-2 text-sm">{status}</div>

      <button onClick={handleCreateDir}>Create dir</button>

      <button onClick={handleListSharedFolderContents} className="mt-2 block">
        List Shared Documents
      </button>

      {folderContents && (
        <pre className="mt-4 max-h-72 overflow-auto rounded-md bg-slate-100 p-3 text-xs">
          {JSON.stringify(folderContents, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default SharePointUploader;
