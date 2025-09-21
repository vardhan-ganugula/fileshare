import { useId, useRef, useState } from "react";
import { FaCloudUploadAlt, FaFile } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import axiosProfile from "../services/axiosService";
export default function UploadFile() {
  const fileId = useId();
  const filenameRef = useRef();
  const filesizeRef = useRef();
  const fileuploadPercent = useRef();
  const fileprogressPercent = useRef();
  const filestatusRef = useRef();
  const uploadbtnRef = useRef();
  const codeRef = useRef();
  const [file, setFile] = useState(null);
  const [customCodeAvailable, setCustomCodeAvailable] = useState(false);
  const [customCode, setCustomCode] = useState("");
  const fileSizeLimit = import.meta.env.VITE_FILE_SIZE || 25;

  const handleUploadFile = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("customCode", customCode)
    toast.promise(
      axiosProfile
        .post("/upload_file", formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: function (progress) {
            let percent = Math.round((progress.loaded / progress.total) * 100);
            fileuploadPercent.current.innerHTML = percent + "%";
            fileprogressPercent.current.style.width = percent + "%";
          },
        })
        .then((resp) => {
          const code = resp.data.code;
          codeRef.current.classList.remove("hidden");
          codeRef.current.innerText = code;
        })
        .catch((err) => console.error(err)),
      {
        error: "error occured",
        success: "file uploaded successfully",
        pending: "file uploading",
      }
    );
  };
  const handleFile = (e) => {
    handleReset();
    const filesz = Math.ceil(e.target.files[0].size / (1024 * 1024));
    if (filesz > fileSizeLimit) {
      toast.error("File size limit: " + fileSizeLimit);
      return;
    }
    filestatusRef.current.classList.remove("hidden");
    uploadbtnRef.current.classList.remove("hidden");
    filenameRef.current.innerHTML = e.target.files[0].name;
    filesizeRef.current.innerHTML = filesz + " MB";
    setFile(e.target.files[0]);
  };
  const handleReset = () => {
    filestatusRef.current.classList.add("hidden");
    uploadbtnRef.current.classList.add("hidden");
    setFile(null);
  };

  const handleCheckCustomCode = async (code) => {
    try {
      const resp = await axiosProfile.get('/check-code?code=' + code);
      const response = await resp.data;
      toast.success(response.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message)
    }
  } 

  return (
    <>
      <div>
        <form className="w-full h-full mt-5 pt-5 " onSubmit={handleUploadFile}>
          <div className="w-full">
            <label
              htmlFor={fileId}
              className="p-5 border-dashed border-blue-400 rounded-lg w-full border-2 bg-blue-50 text-xs flex items-center justify-center flex-col cursor-pointer"
            >
              <div className="text-blue-500 mb-5 mt-7">
                <FaCloudUploadAlt size={50} />
              </div>
              <div className="mb-7 w-[170px] whitespace-nowrap text-ellipsis text-mono text-center overflow-hidden">
                Choose the file
              </div>
            </label>
          </div>
          <div>
            <input type="file" hidden id={fileId} onChange={handleFile} />
          </div>
          <div
            className="w-full border rounded px-3 py-2 bg-blue-50 relative hidden mt-3"
            ref={filestatusRef}
          >
            <div
              className="absolute top-3 right-3 cursor-pointer"
              onClick={handleReset}
            >
              <RxCross1 size={15} />
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink p-3 bg-white rounded">
                <FaFile />
              </div>
              <div className="flex-grow">
                <div
                  ref={filenameRef}
                  className="w-[140px] font-bold whitespace-nowrap overflow-hidden text-ellipsis text-xs"
                ></div>
                <div
                  ref={filesizeRef}
                  className="text-xs text-gray-600 font-bold mt-1"
                ></div>
              </div>
            </div>
            <div className="flex gap-1 items-center justify-center mt-2">
              <div className="w-full bg-white rounded-full h-2 flex-grow relative before:absolute before:w-1 before:bg-blue-500 before:h-full before:rounded-s-full flex overflow-hidden">
                <span
                  className="inline-block bg-blue-500 w-0 h-full"
                  ref={fileprogressPercent}
                ></span>
              </div>
              <div className="flex-shrink text-xs" ref={fileuploadPercent}>
                0%
              </div>
            </div>
          </div>

          <div className="w-full flex gap-2 mt-2 ml-1">
            <input
              type="checkbox"
              name="custom_code"
              id="custom_code"
              className="checked:bg-sky-500"
              onChange={(e) => setCustomCodeAvailable(e.target.checked)}
            />
            <label htmlFor="custom_code" className="text-sm">
              use my own code
            </label>
          </div>

          <div
            style={{
              display: customCodeAvailable === true ? "block" : "none",
            }}
          >
            <div className="w-full bg-sky-100 border-b border-blue-500 mt-2">
              <input
                type="text"
                className="w-full outline-none ring-0 bg-transparent text-center leading-8"
                value={customCode}
                onChange={(e) => {
                  let ch = e.nativeEvent.data;
                  if (ch && ch >= "0" && ch <= "9" && customCode.length < 4) {
                    setCustomCode((prev) => prev + ch);
                  }
                  if(customCode.length === 3){
                    handleCheckCustomCode(customCode + ch)
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Backspace") {
                    setCustomCode((prev) => prev.slice(0, prev.length - 1));
                  }
                  if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
                    e.preventDefault();
                  }
                }}
              />
            </div>
          </div>
          <div
            className="w-full border rounded px-3 py-2 bg-blue-50 relative text-center tracking-widest font-bold text-blue-600 mt-3 hidden"
            ref={codeRef}
          >
            5001
          </div>

          <button
            ref={uploadbtnRef}
            type="submit"
            className="w-full bg-blue-500 py-2 rounded text-white mt-2 hidden"
          >
            upload
          </button>
        </form>
      </div>
    </>
  );
}
