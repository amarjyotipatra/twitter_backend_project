import multer from "multer";
import multerS3 from "multer-s3"
import aws from "aws-sdk"
import dotenv from "dotenv";

dotenv.config();


aws.config.update({
    region:process.env.REGION,
    secretAccessKey: process.env.SECRETACCESSKEY,
    accessKeyId: process.env.ACCESSKEY,
})

 const s3 = new aws.S3()
const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.BUCKETNAME,
      acl:'public-read',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
    })
  })

export default upload;