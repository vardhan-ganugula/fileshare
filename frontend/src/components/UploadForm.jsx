import React, { useEffect, useRef, useState } from 'react'
import {UploadFile, DownloadFile} from './index'

function UploadForm() {
    const btnRefs = useRef();
    const [isUpload, setUpload] = useState(true)
    const handleNavigate = (elem) => {
        btnRefs.current.childNodes.forEach( (child) => {
            child.classList.remove('active')
        })
        elem.target.classList.add('active')
        if(elem.target.classList.contains('upload')){
            setUpload(true)
        }else{
            setUpload(false)
        }
    }
  return (
    <div className='border w-[300px] h-auto mr-14 rounded-lg p-5'>
        <div className="card_header" ref={btnRefs}>
            <div className="btn upload active" onClick={handleNavigate}>Upload</div>
            <div className="btn download" onClick={handleNavigate}>Download</div>
        </div>
        <div>
            {isUpload ? <UploadFile/> : <DownloadFile/>}
        </div>
    </div>
  )
}

export default UploadForm