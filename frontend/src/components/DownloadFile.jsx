import React, { useRef, useState } from "react";
import { MdOutlineCloudDownload } from "react-icons/md";
import { toast } from "react-toastify";
import axiosProfile from "../services/axiosService";
import OtpForm from "./OtpForm";

function DownloadFile() {
  const buttonRef = useRef();
  const [otp, setOtp] = useState("");
  const handleOtp = (newOtp) => {
    setOtp(newOtp);
  };
  const [downloadInfo, setDownloadinfo] = useState({
    fileName: "filename",
    fileSize: 0,
    downloadProgress: 0,
  });
  const downloadRef = useRef();
  const downloadProgressRef = useRef();
  const handleDownloadform = async (e) => {
    e.preventDefault();
    let status = false;
    if (buttonRef.current.getAttribute("type") == "button") {
      // checking for the otp is there or not
      if (otp === "") {
        toast.warning("Code required");
        return;
      }
      try {
        const res = await axiosProfile.get("/file_check", {
          params: {
            code: otp,
          },
        });
        if (res.status === 200) {
          status = true;
          setDownloadinfo({
            fileName: res.data.originalName,
            fileSize: (res.data.fileSize / (1024 * 1024)).toFixed(2) + "MB",
            downloadProgress: 0,
          });
        }
      } catch (e) {
        console.log(e);
      }

      console.log(status);
      if (status) {
        downloadRef.current.classList.remove("hidden");
        buttonRef.current.setAttribute("type", "submit");
        buttonRef.current.innerText = "Download file";
      } else {
        downloadRef.current.classList.add("hidden");
        toast.error("file not found");
      }
    } else {
      handleFileDownload(e);
    }
  };
  const handleFileDownload = async(e) => {

    try{
      const resp = await axiosProfile.get('/download/' + otp, {
        responseType : 'blob',
        onDownloadProgress : function(progress){
          const percent = ((progress.loaded / progress.total)*100).toFixed(1);
          console.log(percent)
          setDownloadinfo(prev => ({...prev, downloadProgress : percent}));
          downloadProgressRef.current.style.width = percent + '%';
        }
      });
      const downloadFileURL = URL.createObjectURL(resp.data);
      const fileDownload = document.createElement('a')
      fileDownload.setAttribute('href', downloadFileURL);
      fileDownload.setAttribute('download', downloadInfo.fileName)
      fileDownload.click();
    }catch(err){
      console.error(err)
    }
  }

  return (
    <div>
      <div className="flex flex-col p-5">
        <form onSubmit={handleFileDownload}>
          <h1 className="text-center font-bold text-2xl mt-5">Download File</h1>
          <p className="text-center text-sm text-zinc-400">enter the code</p>
          <div className="flex my-4 gap-4 items-center justify-center">
            <OtpForm length={4} handleOtp={handleOtp} />
          </div>
          <div className="hidden" ref={downloadRef}>
            <div className="p-2 rounded bg-sky-50 w-full flex-col ">
              <div className="flex gap-3 items-center text-blue-700">
                <div className="bg-sky-500 text-white rounded p-1">
                  <MdOutlineCloudDownload size={25} />
                </div>
                <div className="text-sm flex-grow text-black overflow-hidden whitespace-nowrap text-ellipsis">
                  {downloadInfo.fileName}
                </div>
                <div className="text-blue-500 block text-sm font-bold ">
                  {downloadInfo.fileSize}
                </div>
              </div>
              <div className=" mt-1 w-full flex items-center ">
                <div className="flex-grow h-2 bg-white">
                  <span className="block bg-blue-500 h-full w-1" ref={downloadProgressRef}></span>
                </div>
                <div className="flex-shrink p-1 text-xs font-bold">
                  {downloadInfo.downloadProgress}%
                </div>
              </div>
            </div>
          </div>
          <div>
            <button
              className="w-full py-2 bg-blue-500 rounded text-white mt-5"
              type="button"
              onClick={handleDownloadform}
              ref={buttonRef}
              id="test"
            >
              get file
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DownloadFile;
