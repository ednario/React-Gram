const multer = require('multer')
const path = require('path')

// Destination to store images
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = ""

    if(req.baseUrl.includes("users")) {
      folder = "users"
    } else if (req.baseUrl.includes("photos")) {
      folder = "photos"
    }

    cb(null, `public/${folder}`)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000 // 1MB
  },
  fileFilter(req, file, cb) {
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'))
    }

    cb(undefined, true)
  }
})

module.exports = { imageUpload }