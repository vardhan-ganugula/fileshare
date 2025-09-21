const express = require('express')
const app = express();
const dotenv = require('dotenv').config();
const upload = require('./middlewares/middleware.multer')
const mongoose = require('mongoose')
const cors = require('cors')
const {handleFileupload,handleFileCheck,handleHome, handleCheckCode} = require('./controllers/fileUpload')
const handleDownloadFile = require('./controllers/fileDownload');
const path = require('path');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
mongoose.connect(process.env.MONGO_URI).then(res => console.log('connection success')).catch(er=> console.error(er))


app.post('/api/upload_file', upload.single('file'), handleFileupload)
app.get('/api/file_check', handleFileCheck)
app.get('/api/download/:fileCode', handleDownloadFile)
app.get('/api/check-code', handleCheckCode)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
    })
}else{
    app.get('/', handleHome)
}


const port = process.env.PORT || 3000;



app.listen(port, (server)=> {
    console.log('server is running at ' + port)
})