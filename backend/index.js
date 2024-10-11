const express = require('express')
const app = express();
const dotenv = require('dotenv').config();
const upload = require('./middlewares/middleware.multer')
const mongoose = require('mongoose')
const cors = require('cors')
const {handleFileupload,handleFileCheck,handleHome} = require('./controllers/fileUpload')
const handleDownloadFile = require('./controllers/fileDownload')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
mongoose.connect(process.env.MONGO_URI).then(res => console.log('connection success')).catch(er=> console.error(er))



app.get('/', handleHome)
app.post('/upload_file', upload.single('file'), handleFileupload)
app.get('/file_check', handleFileCheck)
app.get('/download/:fileCode', handleDownloadFile)

const port = process.env.PORT || 3000;

app.listen(port, (server)=> {
    console.log('server is running at ' + port)
})