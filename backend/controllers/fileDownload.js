const path = require('path') 
const fileModel = require('../models/fileStorage') 





const handleDownloadFile = async (req, res) => {
    const fileCode = req.params.fileCode;
    try{
        const result = await fileModel.findOne({fileCode})
        if(result){
            const fileName = result.fileName;
            console.log(fileName)
            return res.download(path.resolve() + '/uploads/' + fileName)
        }else{
            return res.status(404).json({
                status : 'failed',
                msg : 'file not found on the server'
            })
        }
    }catch(e){
        console.error(e)
    }
    return res.json({
        status : 'success',
        msg : 'working on it'
    })
}


module.exports = handleDownloadFile;