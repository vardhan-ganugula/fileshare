const filemodel = require("../models/fileStorage");
const fs = require("fs");
require("dotenv").config();

function generateCode() {
  const min = 1000;
  const max = 9999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function deleteFile(fileName) {

  setTimeout(() => {
    fs.unlink("./uploads/" + fileName, (err) => {
      if (err) {
        console.log(err);
      } else {
        // console.log("file deleted successfully");
        filemodel
          .deleteOne({ fileName })
          .then((res) => console.log(res))
          .catch((err) => console.error(err));
      }
    });
  }, process.env.EXPIRY_TIME);
}

async function uploadToDatabase(originalName, fileName, fileSize, customCode) {
  let code;
  if(customCode && customCode.length === 4){
    code = customCode;
  }else{
    code = generateCode();
  }

  try {
    const res = await filemodel.create({
      originalName: originalName,
      fileCode: code,
      fileName: fileName,
      fileSize: fileSize,
    });
    return {
      status: "success",
      msg: "file uploaded successfully",
      code: code,
    };
  } catch (er) {
    console.log(er);
    // console.log(code)
    uploadToDatabase();
  }
}

const handleFileupload = async (req, res) => {
  try {
    const uploadResult = await uploadToDatabase(
      req.file.originalname,
      req.file.filename,
      req.file.size,
      req.body.customCode
    );
    deleteFile(req.file.filename);
    return res.json(uploadResult);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      msg: "File upload failed",
    });
  }
};

const handleHome = (req, res) => {
  // console.log("hello world");
  res.json({
    status: "success",
    msg: "working fine",
  });
};

const handleFileCheck = async (req, res) => {
  const code = req.query.code;
  // console.log(res)
  // console.log(code);
  try {
    const result = await filemodel.findOne({ fileCode: code });
    if (result) {
      return res.json({
        status: "success",
        originalName: result.originalName,
        fileSize: result.fileSize,
      });
    } else {
      return res.status(404).json({
        status: "failed",
        msg: "file not found",
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      msg: "something went wrong",
    });
  }
};

const handleCheckCode = async (req, res) => {
  const code = req.query.code;
  // console.log(code)
  try {
    const result = await filemodel.findOne({ fileCode: code });

    if (!result) {
      return res.json({
        status: "success",
        message: "code is available",
      });
    } else {
      return res.status(404).json({
        status: "failed",
        message: "code is already taken",
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      message: "something went wrong",
    });
  }
};

module.exports = { handleFileupload, handleFileCheck, handleHome, handleCheckCode };
