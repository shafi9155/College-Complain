const path=require('path')
const multer=require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
    let ext=path.extname(file.originalname)
    cb(null,Date.now()+ext);
    }
  })

  const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
    fileFilter: function (req, file, cb) {
      console.log(file)
      // Only allow certain file types
      if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg'
      ) {
        cb(null, true)
      } else {
        cb(new Error('Only JPEG, PNG and Jpg files are allowed!'), false)
      }
    }
  });

  module.exports={upload}